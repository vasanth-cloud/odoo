package com.project.stockmaster.dto;

import lombok.Data;

import java.util.List;

@Data
public class StockAdjustmentRequest {
    private String performedBy; // optional, can come from token
    private String note;
    private List<StockAdjustmentItemRequest> items;
}
