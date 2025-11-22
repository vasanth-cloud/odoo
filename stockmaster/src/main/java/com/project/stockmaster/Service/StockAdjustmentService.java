package com.project.stockmaster.Service;

import com.project.stockmaster.dto.*;
import com.project.stockmaster.exception.ResourceNotFoundException;
import com.project.stockmaster.Models.*;
import com.project.stockmaster.Models.enums.LedgerType;
import com.project.stockmaster.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StockAdjustmentService {

    private final StockAdjustmentRepository adjustmentRepository;
    private final StockAdjustmentItemRepository adjustmentItemRepository;
    private final ProductRepository productRepository;
    private final WarehouseRepository warehouseRepository;
    private final StockRepository stockRepository;
    private final StockLedgerRepository ledgerRepository;


    @Transactional
    public StockAdjustmentResponse createAndApply(StockAdjustmentRequest request) {

        StockAdjustment adj = StockAdjustment.builder()
                .performedBy(request.getPerformedBy())
                .createdAt(Instant.now())
                .note(request.getNote())
                .build();

        List<StockAdjustmentItem> items = new ArrayList<>();

        for (StockAdjustmentItemRequest ir : request.getItems()) {

            Product product = productRepository.findById(ir.getProductId())
                    .orElseThrow(() -> new ResourceNotFoundException("Product not found: " + ir.getProductId()));

            Warehouse warehouse = warehouseRepository.findById(ir.getWarehouseId())
                    .orElseThrow(() -> new ResourceNotFoundException("Warehouse not found: " + ir.getWarehouseId()));

            // get system stock (0 if absent)
            Integer systemQty = stockRepository.findByProductAndWarehouse(product, warehouse)
                    .map(Stock::getQuantity).orElse(0);

            Integer counted = Optional.ofNullable(ir.getCountedQuantity()).orElse(0);
            Integer diff = counted - systemQty;

            StockAdjustmentItem item = StockAdjustmentItem.builder()
                    .adjustment(adj)
                    .product(product)
                    .warehouse(warehouse)
                    .systemQuantity(systemQty)
                    .countedQuantity(counted)
                    .difference(diff)
                    .reason(ir.getReason())
                    .build();

            items.add(item);

            // Update stock to counted value (create if missing)
            Stock stock = stockRepository.findByProductAndWarehouse(product, warehouse)
                    .orElseGet(() -> Stock.builder().product(product).warehouse(warehouse).quantity(0).build());

            stock.setQuantity(counted);
            stockRepository.save(stock);

            // Ledger entry for adjustment (positive if counted>system)
            StockLedger ledger = StockLedger.builder()
                    .timestamp(Instant.now())
                    .product(product)
                    .warehouse(warehouse)
                    .qtyChange(diff)
                    .type(LedgerType.ADJUSTMENT)
                    .reference("ADJ")
                    .note("Adjustment: " + (ir.getReason() == null ? "" : ir.getReason()))
                    .build();
            ledgerRepository.save(ledger);
        }

        adj.setItems(items);
        StockAdjustment saved = adjustmentRepository.save(adj);

        return toResponse(saved);
    }

    public StockAdjustmentResponse getOne(Long id) {
        StockAdjustment adj = adjustmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Adjustment not found"));
        return toResponse(adj);
    }

    public List<StockAdjustmentResponse> listAll() {
        return adjustmentRepository.findAll().stream().map(this::toResponse).collect(Collectors.toList());
    }

    private StockAdjustmentResponse toResponse(StockAdjustment adj) {
        List<StockAdjustmentItemResponse> items = (adj.getItems() == null) ? Collections.emptyList()
                : adj.getItems().stream().map(i ->
                StockAdjustmentItemResponse.builder()
                        .productId(i.getProduct().getId())
                        .productCode(i.getProduct().getProductCode())
                        .productName(i.getProduct().getProductName())
                        .warehouseId(i.getWarehouse().getId())
                        .warehouseName(i.getWarehouse().getWarehouseName())
                        .systemQuantity(i.getSystemQuantity())
                        .countedQuantity(i.getCountedQuantity())
                        .difference(i.getDifference())
                        .reason(i.getReason())
                        .build()
        ).collect(Collectors.toList());

        return StockAdjustmentResponse.builder()
                .id(adj.getId())
                .performedBy(adj.getPerformedBy())
                .createdAt(adj.getCreatedAt())
                .note(adj.getNote())
                .items(items)
                .build();
    }
}
