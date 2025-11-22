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
public class ReceiptService {

    private final ReceiptRepository receiptRepository;
    private final ReceiptItemRepository receiptItemRepository;
    private final ProductRepository productRepository;
    private final WarehouseRepository warehouseRepository;
    private final StockRepository stockRepository;
    private final StockLedgerRepository ledgerRepository;

    // Create a receipt in DRAFT state (items are saved but stock NOT updated)
    @Transactional
    public ReceiptResponse createDraft(ReceiptRequest request) {

        Warehouse wh = warehouseRepository.findById(request.getWarehouseId())
                .orElseThrow(() -> new ResourceNotFoundException("Warehouse not found"));

        Receipt receipt = Receipt.builder()
                .supplierName(request.getSupplierName())
                .warehouse(wh)
                .createdAt(Instant.now())
                .status(DocumentStatus.DRAFT)
                .build();

        List<ReceiptItem> items = new ArrayList<>();
        if (request.getItems() != null) {
            for (ReceiptItemRequest ir : request.getItems()) {
                Product p = productRepository.findById(ir.getProductId())
                        .orElseThrow(() -> new ResourceNotFoundException("Product not found: " + ir.getProductId()));

                ReceiptItem item = ReceiptItem.builder()
                        .receipt(receipt)
                        .product(p)
                        .quantity(ir.getQuantity())
                        .build();
                items.add(item);
            }
        }

        receipt.setItems(items);
        Receipt saved = receiptRepository.save(receipt);

        // receipt.items are saved via cascade
        return toResponse(saved);
    }

    // Add items to an existing draft
    @Transactional
    public ReceiptResponse addItemsToDraft(Long receiptId, List<ReceiptItemRequest> itemRequests) {
        Receipt receipt = receiptRepository.findById(receiptId)
                .orElseThrow(() -> new ResourceNotFoundException("Receipt not found"));

        if (receipt.getStatus() != DocumentStatus.DRAFT) {
            throw new RuntimeException("Can only add items to draft receipts");
        }

        List<ReceiptItem> newItems = new ArrayList<>();
        for (ReceiptItemRequest r : itemRequests) {
            Product p = productRepository.findById(r.getProductId())
                    .orElseThrow(() -> new ResourceNotFoundException("Product not found: " + r.getProductId()));
            ReceiptItem item = ReceiptItem.builder()
                    .receipt(receipt)
                    .product(p)
                    .quantity(r.getQuantity())
                    .build();
            newItems.add(item);
        }

        receipt.getItems().addAll(newItems);
        Receipt saved = receiptRepository.save(receipt);
        return toResponse(saved);
    }

    // Validate a receipt -> set COMPLETED, update stock, create ledger entries
    @Transactional
    public ReceiptResponse validateReceipt(Long receiptId) {
        Receipt receipt = receiptRepository.findById(receiptId)
                .orElseThrow(() -> new ResourceNotFoundException("Receipt not found"));

        if (receipt.getStatus() != DocumentStatus.DRAFT) {
            throw new RuntimeException("Only draft receipts can be validated");
        }

        Warehouse wh = receipt.getWarehouse();

        for (ReceiptItem item : receipt.getItems()) {
            Product p = item.getProduct();
            int qty = item.getQuantity();

            // update or create stock record for product+warehouse
            Optional<Stock> optStock = stockRepository.findByProductAndWarehouse(p, wh);
            Stock stock = optStock.orElseGet(() -> Stock.builder()
                    .product(p)
                    .warehouse(wh)
                    .quantity(0)
                    .build());

            stock.setQuantity(stock.getQuantity() + qty);
            stockRepository.save(stock);

            // ledger entry
            StockLedger ledger = StockLedger.builder()
                    .timestamp(Instant.now())
                    .product(p)
                    .warehouse(wh)
                    .qtyChange(qty)
                    .type(LedgerType.IN)
                    .reference("RECEIPT#" + receipt.getId())
                    .note("Receipt validated")
                    .build();
            ledgerRepository.save(ledger);
        }

        receipt.setStatus(DocumentStatus.COMPLETED);
        Receipt saved = receiptRepository.save(receipt);
        return toResponse(saved);
    }

    // Cancel a receipt (only drafts or completed depending on policy) — here we only allow cancelling drafts
    @Transactional
    public void cancelDraft(Long receiptId) {
        Receipt receipt = receiptRepository.findById(receiptId)
                .orElseThrow(() -> new ResourceNotFoundException("Receipt not found"));
        if (receipt.getStatus() != DocumentStatus.DRAFT) {
            throw new RuntimeException("Only draft receipts can be cancelled");
        }
        receipt.setStatus(DocumentStatus.CANCELLED);
        receiptRepository.save(receipt);
    }

    public ReceiptResponse getReceipt(Long id) {
        Receipt r = receiptRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Receipt not found"));
        return toResponse(r);
    }

    public List<ReceiptResponse> listAll() {
        return receiptRepository.findAll().stream().map(this::toResponse).collect(Collectors.toList());
    }

    // mapper
    private ReceiptResponse toResponse(Receipt r) {
        List<ReceiptItemResponse> items = (r.getItems() == null) ? Collections.emptyList()
                : r.getItems().stream().map(i ->
                ReceiptItemResponse.builder()
                        .productId(i.getProduct().getId())
                        .productCode(i.getProduct().getProductCode())
                        .productName(i.getProduct().getProductName())
                        .quantity(i.getQuantity())
                        .build()
        ).collect(Collectors.toList());

        return ReceiptResponse.builder()
                .id(r.getId())
                .supplierName(r.getSupplierName())
                .createdAt(r.getCreatedAt())
                .warehouseName(r.getWarehouse().getWarehouseName())
                .status(r.getStatus().name())
                .items(items)
                .build();
    }
}
