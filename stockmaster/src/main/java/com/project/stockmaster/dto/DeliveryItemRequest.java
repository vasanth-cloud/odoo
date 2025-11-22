package com.project.stockmaster.dto;

import lombok.Data;

@Data
public class DeliveryItemRequest {
    private Long productId;
    private Integer quantity;
}
