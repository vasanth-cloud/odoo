package com.project.stockmaster.Service;

import com.project.stockmaster.dto.DashboardKpiResponse;
import com.project.stockmaster.dto.LedgerMiniDTO;
import com.project.stockmaster.Models.StockLedger;
import com.project.stockmaster.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final ProductRepository productRepository;
    private final WarehouseRepository warehouseRepository;
    private final StockRepository stockRepository;
    private final ReceiptRepository receiptRepository;
    private final DeliveryOrderRepository deliveryRepository;
    private final TransferOrderRepository transferRepository;
    private final StockAdjustmentRepository adjustmentRepository;
    private final StockLedgerRepository ledgerRepository;

    public DashboardKpiResponse getDashboard() {

        Long totalProducts = productRepository.count();
        Long totalWarehouses = warehouseRepository.count();
        Long totalStock = stockRepository.findAll().stream()
                .mapToLong(s -> s.getQuantity())
                .sum();

        Long lowStockCount = stockRepository.findAll().stream()
                .filter(s -> s.getQuantity() < 10)
                .count();

        Long totalReceipts = receiptRepository.count();
        Long totalDeliveries = deliveryRepository.count();
        Long totalTransfers = transferRepository.count();
        Long totalAdjustments = adjustmentRepository.count();

        List<LedgerMiniDTO> latest = ledgerRepository.findAll().stream()
                .sorted((a, b) -> b.getTimestamp().compareTo(a.getTimestamp()))
                .limit(5)
                .map(l -> LedgerMiniDTO.builder()
                        .productName(l.getProduct().getProductName())
                        .warehouseName(l.getWarehouse().getWarehouseName())
                        .qtyChange(l.getQtyChange())
                        .type(l.getType().name())
                        .timestamp(l.getTimestamp())
                        .build()
                )
                .collect(Collectors.toList());

        return DashboardKpiResponse.builder()
                .totalProducts(totalProducts)
                .totalWarehouses(totalWarehouses)
                .totalStock(totalStock)
                .lowStockCount(lowStockCount)
                .totalReceipts(totalReceipts)
                .totalDeliveries(totalDeliveries)
                .totalTransfers(totalTransfers)
                .totalAdjustments(totalAdjustments)
                .latestMovements(latest)
                .build();
    }

}
