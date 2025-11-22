package com.project.stockmaster.dto;

import lombok.Builder;
import lombok.Data;

import java.time.Instant;
import java.util.List;

@Data
@Builder
public class DeliveryResponse {
    private Long id;
    private String customerName;
    private String warehouseName;
    private Instant createdAt;
    private String status;
    private List<DeliveryItemResponse> items;
}
