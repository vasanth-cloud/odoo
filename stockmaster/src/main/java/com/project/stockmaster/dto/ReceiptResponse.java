package com.project.stockmaster.dto;

import lombok.Builder;
import lombok.Data;

import java.time.Instant;
import java.util.List;

@Data
@Builder
public class ReceiptResponse {
    private Long id;
    private String supplierName;
    private Instant createdAt;
    private String warehouseName;
    private String status;
    private List<ReceiptItemResponse> items;
}
