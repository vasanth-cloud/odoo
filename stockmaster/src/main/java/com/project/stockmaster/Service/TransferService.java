package com.project.stockmaster.Service;

import com.project.stockmaster.dto.*;
import com.project.stockmaster.exception.ResourceNotFoundException;
import com.project.stockmaster.Models.*;
import com.project.stockmaster.Models.enums.DocumentStatus;
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
public class TransferService {

    private final TransferOrderRepository transferRepository;
    private final WarehouseRepository warehouseRepository;
    private final ProductRepository productRepository;
    private final StockRepository stockRepository;
    private final StockLedgerRepository ledgerRepository;
    private final TransferItemRepository transferItemRepository;

    // Create a draft transfer
    @Transactional
    public TransferResponse createDraft(TransferRequest request) {

        Warehouse source = warehouseRepository.findById(request.getSourceWarehouseId())
                .orElseThrow(() -> new ResourceNotFoundException("Source warehouse not found"));

        Warehouse dest = warehouseRepository.findById(request.getDestinationWarehouseId())
                .orElseThrow(() -> new ResourceNotFoundException("Destination warehouse not found"));

        if (Objects.equals(source.getId(), dest.getId())) {
            throw new RuntimeException("Source and destination cannot be same");
        }

        TransferOrder order = TransferOrder.builder()
                .sourceWarehouse(source)
                .destinationWarehouse(dest)
                .createdBy(request.getCreatedBy())
                .createdAt(Instant.now())
                .status(DocumentStatus.DRAFT)
                .build();

        List<TransferItem> items = new ArrayList<>();

        for (TransferItemRequest ir : request.getItems()) {
            Product p = productRepository.findById(ir.getProductId())
                    .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

            TransferItem item = TransferItem.builder()
                    .transferOrder(order)
                    .product(p)
                    .quantity(ir.getQuantity())
                    .build();

            items.add(item);
        }

        order.setItems(items);
        TransferOrder saved = transferRepository.save(order);

        return toResponse(saved);
    }

    // Add items to draft
    @Transactional
    public TransferResponse addItems(Long transferId, List<TransferItemRequest> requests) {

        TransferOrder order = transferRepository.findById(transferId)
                .orElseThrow(() -> new ResourceNotFoundException("Transfer not found"));

        if (order.getStatus() != DocumentStatus.DRAFT) {
            throw new RuntimeException("Only draft transfers can be updated");
        }

        for (TransferItemRequest ir : requests) {

            Product p = productRepository.findById(ir.getProductId())
                    .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

            TransferItem item = TransferItem.builder()
                    .transferOrder(order)
                    .product(p)
                    .quantity(ir.getQuantity())
                    .build();

            order.getItems().add(item);
        }

        transferRepository.save(order);
        return toResponse(order);
    }

    // Validate → Move stock
    @Transactional
    public TransferResponse validate(Long transferId) {

        TransferOrder order = transferRepository.findById(transferId)
                .orElseThrow(() -> new ResourceNotFoundException("Transfer not found"));

        if (order.getStatus() != DocumentStatus.DRAFT) {
            throw new RuntimeException("Only draft transfers can be validated");
        }

        Warehouse source = order.getSourceWarehouse();
        Warehouse dest = order.getDestinationWarehouse();

        for (TransferItem item : order.getItems()) {

            Product p = item.getProduct();
            Integer qty = item.getQuantity();

            // ------------------------------
            // 1) Deduct stock from source
            // ------------------------------
            Stock sourceStock = stockRepository.findByProductAndWarehouse(p, source)
                    .orElseThrow(() -> new RuntimeException("No stock in source warehouse"));

            if (sourceStock.getQuantity() < qty) {
                throw new RuntimeException("Insufficient source stock for product: " + p.getProductName());
            }

            sourceStock.setQuantity(sourceStock.getQuantity() - qty);
            stockRepository.save(sourceStock);

            // Ledger OUT
            StockLedger ledgerOut = StockLedger.builder()
                    .timestamp(Instant.now())
                    .product(p)
                    .warehouse(source)
                    .qtyChange(-qty)
                    .type(LedgerType.TRANSFER)
                    .reference("TRANSFER#" + order.getId())
                    .note("Transfer OUT")
                    .build();
            ledgerRepository.save(ledgerOut);

            // ------------------------------
            // 2) Add stock to destination
            // ------------------------------
            Stock destStock = stockRepository.findByProductAndWarehouse(p, dest)
                    .orElseGet(() -> Stock.builder()
                            .product(p)
                            .warehouse(dest)
                            .quantity(0)
                            .build());

            destStock.setQuantity(destStock.getQuantity() + qty);
            stockRepository.save(destStock);

            // Ledger IN
            StockLedger ledgerIn = StockLedger.builder()
                    .timestamp(Instant.now())
                    .product(p)
                    .warehouse(dest)
                    .qtyChange(qty)
                    .type(LedgerType.TRANSFER)
                    .reference("TRANSFER#" + order.getId())
                    .note("Transfer IN")
                    .build();
            ledgerRepository.save(ledgerIn);
        }

        order.setStatus(DocumentStatus.COMPLETED);
        transferRepository.save(order);

        return toResponse(order);
    }

    public TransferResponse getOne(Long id) {
        TransferOrder t = transferRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Transfer not found"));
        return toResponse(t);
    }

    public List<TransferResponse> listAll() {
        return transferRepository.findAll()
                .stream().map(this::toResponse).collect(Collectors.toList());
    }

    private TransferResponse toResponse(TransferOrder t) {
        List<TransferItemResponse> items = (t.getItems() == null) ? new ArrayList<>()
                : t.getItems().stream().map(i ->
                TransferItemResponse.builder()
                        .productId(i.getProduct().getId())
                        .productName(i.getProduct().getProductName())
                        .productCode(i.getProduct().getProductCode())
                        .quantity(i.getQuantity())
                        .build()
        ).collect(Collectors.toList());

        return TransferResponse.builder()
                .id(t.getId())
                .createdAt(t.getCreatedAt())
                .createdBy(t.getCreatedBy())
                .sourceWarehouse(t.getSourceWarehouse().getWarehouseName())
                .destinationWarehouse(t.getDestinationWarehouse().getWarehouseName())
                .status(t.getStatus().name())
                .items(items)
                .build();
    }
}
