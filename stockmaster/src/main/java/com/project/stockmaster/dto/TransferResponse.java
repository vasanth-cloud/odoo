package com.project.stockmaster.dto;

import lombok.Builder;
import lombok.Data;

import java.time.Instant;
import java.util.List;

@Data
@Builder
public class TransferResponse {
    private Long id;
    private String sourceWarehouse;
    private String destinationWarehouse;
    private Instant createdAt;
    private String status;
    private String createdBy;
    private List<TransferItemResponse> items;
}
