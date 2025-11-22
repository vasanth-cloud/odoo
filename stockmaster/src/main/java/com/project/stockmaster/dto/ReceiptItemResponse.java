package com.project.stockmaster.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ReceiptItemResponse {
    private Long productId;
    private String productCode;
    private String productName;
    private Integer quantity;
}
