package com.project.stockmaster.dto;

import lombok.Data;

@Data
public class ReceiptItemRequest {
    private Long productId;
    private Integer quantity;
}
