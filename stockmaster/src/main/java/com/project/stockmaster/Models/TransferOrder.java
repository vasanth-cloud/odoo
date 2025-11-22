package com.project.stockmaster.Models;

import com.project.stockmaster.Models.enums.DocumentStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;
import java.util.List;

@Entity
@Table(name = "transfer_orders")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TransferOrder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "source_warehouse_id")
    private Warehouse sourceWarehouse;

    @ManyToOne(optional = false)
    @JoinColumn(name = "destination_warehouse_id")
    private Warehouse destinationWarehouse;

    private Instant createdAt;

    @Enumerated(EnumType.STRING)
    private DocumentStatus status;

    private String createdBy;

    @OneToMany(mappedBy = "transferOrder", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<TransferItem> items;
}
