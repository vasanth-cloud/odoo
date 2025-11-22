package com.project.stockmaster.dto;

import lombok.Data;

@Data
public class StockAdjustmentItemRequest {
    private Long productId;
    private Long warehouseId;
    private Integer countedQuantity;
    private String reason; // optional
}
