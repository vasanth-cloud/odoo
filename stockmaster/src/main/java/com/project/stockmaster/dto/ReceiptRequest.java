package com.project.stockmaster.dto;

import lombok.Data;

import java.util.List;

@Data
public class ReceiptRequest {
    private String supplierName;
    private Long warehouseId;
    private List<ReceiptItemRequest> items;
}
