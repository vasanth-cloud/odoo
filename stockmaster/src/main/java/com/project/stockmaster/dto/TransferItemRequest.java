package com.project.stockmaster.dto;

import lombok.Data;

@Data
public class TransferItemRequest {
    private Long productId;
    private Integer quantity;
}
