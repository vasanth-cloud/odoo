package com.project.stockmaster.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class DashboardKpiResponse {

    private Long totalProducts;
    private Long totalWarehouses;
    private Long totalStock;

    private Long lowStockCount;

    private Long totalReceipts;
    private Long totalDeliveries;
    private Long totalTransfers;
    private Long totalAdjustments;

    private List<LedgerMiniDTO> latestMovements;
}
