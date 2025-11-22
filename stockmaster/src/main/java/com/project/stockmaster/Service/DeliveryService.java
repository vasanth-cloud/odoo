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
public class DeliveryService {

    private final DeliveryOrderRepository deliveryRepository;
    private final DeliveryItemRepository deliveryItemRepository;
    private final ProductRepository productRepository;
    private final WarehouseRepository warehouseRepository;
    private final StockRepository stockRepository;
    private final StockLedgerRepository ledgerRepository;

    // Create draft delivery
    @Transactional
    public DeliveryResponse createDraft(DeliveryRequest request) {

        Warehouse wh = warehouseRepository.findById(request.getWarehouseId())
                .orElseThrow(() -> new ResourceNotFoundException("Warehouse not found"));

        DeliveryOrder delivery = DeliveryOrder.builder()
                .customerName(request.getCustomerName())
                .warehouse(wh)
                .createdAt(Instant.now())
                .status(DocumentStatus.DRAFT)
                .build();

        List<DeliveryItem> items = new ArrayList<>();

        if (request.getItems() != null) {
            for (DeliveryItemRequest ir : request.getItems()) {
                Product p = productRepository.findById(ir.getProductId())
                        .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

                DeliveryItem item = DeliveryItem.builder()
                        .deliveryOrder(delivery)
                        .product(p)
                        .quantity(ir.getQuantity())
                        .build();

                items.add(item);
            }
        }

        delivery.setItems(items);
        DeliveryOrder saved = deliveryRepository.save(delivery);

        return toResponse(saved);
    }

    // Add items to draft
    @Transactional
    public DeliveryResponse addItems(Long deliveryId, List<DeliveryItemRequest> requests) {
        DeliveryOrder delivery = deliveryRepository.findById(deliveryId)
                .orElseThrow(() -> new ResourceNotFoundException("Delivery not found"));

        if (delivery.getStatus() != DocumentStatus.DRAFT) {
            throw new RuntimeException("Only draft deliveries can be updated");
        }

        for (DeliveryItemRequest ir : requests) {
            Product p = productRepository.findById(ir.getProductId())
                    .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

            DeliveryItem item = DeliveryItem.builder()
                    .deliveryOrder(delivery)
                    .product(p)
                    .quantity(ir.getQuantity())
                    .build();

            delivery.getItems().add(item);
        }

        deliveryRepository.save(delivery);
        return toResponse(delivery);
    }

    // Validate delivery (stock decreases)
    @Transactional
    public DeliveryResponse validate(Long deliveryId) {
        DeliveryOrder delivery = deliveryRepository.findById(deliveryId)
                .orElseThrow(() -> new ResourceNotFoundException("Delivery not found"));

        if (delivery.getStatus() != DocumentStatus.DRAFT) {
            throw new RuntimeException("Delivery already processed or invalid state");
        }

        Warehouse wh = delivery.getWarehouse();

        for (DeliveryItem item : delivery.getItems()) {
            Product p = item.getProduct();
            Integer qty = item.getQuantity();

            Stock stock = stockRepository.findByProductAndWarehouse(p, wh)
                    .orElseThrow(() -> new RuntimeException("No stock found for outgoing product!"));

            if (stock.getQuantity() < qty) {
                throw new RuntimeException("Insufficient stock: " + p.getProductName());
            }

            // reduce stock
            stock.setQuantity(stock.getQuantity() - qty);
            stockRepository.save(stock);

            // ledger OUT entry
            StockLedger ledger = StockLedger.builder()
                    .timestamp(Instant.now())
                    .product(p)
                    .warehouse(wh)
                    .qtyChange(-qty)
                    .type(LedgerType.OUT)
                    .reference("DELIVERY#" + delivery.getId())
                    .note("Delivery validated")
                    .build();

            ledgerRepository.save(ledger);
        }

        delivery.setStatus(DocumentStatus.COMPLETED);
        deliveryRepository.save(delivery);

        return toResponse(delivery);
    }

    public DeliveryResponse getOne(Long id) {
        DeliveryOrder delivery = deliveryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Delivery not found"));
        return toResponse(delivery);
    }

    public List<DeliveryResponse> listAll() {
        return deliveryRepository.findAll().stream().map(this::toResponse).collect(Collectors.toList());
    }

    private DeliveryResponse toResponse(DeliveryOrder d) {
        List<DeliveryItemResponse> items = (d.getItems() == null) ? new ArrayList<>()
                : d.getItems().stream().map(i ->
                DeliveryItemResponse.builder()
                        .productId(i.getProduct().getId())
                        .productName(i.getProduct().getProductName())
                        .productCode(i.getProduct().getProductCode())
                        .quantity(i.getQuantity())
                        .build()
        ).collect(Collectors.toList());

        return DeliveryResponse.builder()
                .id(d.getId())
                .customerName(d.getCustomerName())
                .warehouseName(d.getWarehouse().getWarehouseName())
                .createdAt(d.getCreatedAt())
                .status(d.getStatus().name())
                .items(items)
                .build();
    }
}
