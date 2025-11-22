package com.project.stockmaster.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class DeliveryItemResponse {
    private Long productId;
    private String productName;
    private String productCode;
    private Integer quantity;
}
