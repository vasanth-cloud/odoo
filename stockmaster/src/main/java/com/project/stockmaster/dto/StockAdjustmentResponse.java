package com.project.stockmaster.dto;

import lombok.Builder;
import lombok.Data;

import java.time.Instant;
import java.util.List;

@Data
@Builder
public class StockAdjustmentResponse {
    private Long id;
    private String performedBy;
    private Instant createdAt;
    private String note;
    private List<StockAdjustmentItemResponse> items;
}
