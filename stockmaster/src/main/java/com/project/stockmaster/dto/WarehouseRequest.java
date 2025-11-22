package com.project.stockmaster.dto;

import lombok.Data;

@Data
public class WarehouseRequest {
    private String warehouseCode;
    private String warehouseName;
    private String location;
}
