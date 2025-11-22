package com.project.stockmaster.dto;

import lombok.Builder;
import lombok.Data;

import java.time.Instant;

@Data
@Builder
public class LedgerMiniDTO {
    private String productName;
    private String warehouseName;
    private Integer qtyChange;
    private String type;
    private Instant timestamp;
}
