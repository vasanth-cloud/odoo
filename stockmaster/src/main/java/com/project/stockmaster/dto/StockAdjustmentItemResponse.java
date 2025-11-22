package com.project.stockmaster.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class StockAdjustmentItemResponse {
    private Long productId;
    private String productCode;
    private String productName;
    private Long warehouseId;
    private String warehouseName;
    private Integer systemQuantity;
    private Integer countedQuantity;
    private Integer difference;
    private String reason;
}
