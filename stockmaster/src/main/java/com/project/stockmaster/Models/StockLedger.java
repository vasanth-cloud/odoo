package com.project.stockmaster.Models;



import com.project.stockmaster.Models.enums.LedgerType;
import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;

@Entity
@Table(name = "stock_ledger")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StockLedger {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Instant timestamp;

    @ManyToOne(optional = false)
    @JoinColumn(name = "product_id")
    private Product product;

    @ManyToOne(optional = false)
    @JoinColumn(name = "warehouse_id")
    private Warehouse warehouse;

    private Integer qtyChange; // positive for IN, negative for OUT

    @Enumerated(EnumType.STRING)
    private LedgerType type;

    private String reference; // e.g., Receipt#123
    private String note;
}

