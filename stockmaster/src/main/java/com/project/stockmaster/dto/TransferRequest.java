package com.project.stockmaster.dto;

import lombok.Data;
import java.util.List;

@Data
public class TransferRequest {
    private Long sourceWarehouseId;
    private Long destinationWarehouseId;
    private String createdBy;
    private List<TransferItemRequest> items;
}
