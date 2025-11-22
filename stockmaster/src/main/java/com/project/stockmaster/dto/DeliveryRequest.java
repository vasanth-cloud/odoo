package com.project.stockmaster.dto;

import lombok.Data;
import java.util.List;

@Data
public class DeliveryRequest {
    private String customerName;
    private Long warehouseId;
    private List<DeliveryItemRequest> items;
}
