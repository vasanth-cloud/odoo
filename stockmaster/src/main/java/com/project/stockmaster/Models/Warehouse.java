package com.project.stockmaster.Models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "warehouses")
public class Warehouse {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String warehouseCode;  // WH001 etc.

    @Column(nullable = false)
    private String warehouseName;  // Main Warehouse, Raw Material Store

    private String location;       // Optional address
}
