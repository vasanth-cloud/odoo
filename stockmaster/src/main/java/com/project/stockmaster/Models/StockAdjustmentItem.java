package com.project.stockmaster.Models;

import com.project.stockmaster.Models.Product;
import com.project.stockmaster.Models.StockAdjustment;
import com.project.stockmaster.Models.Warehouse;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "stock_adjustment_items")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StockAdjustmentItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "adjustment_id")
    private StockAdjustment adjustment;

    @ManyToOne(optional = false)
    @JoinColumn(name = "product_id")
    private Product product;

    @ManyToOne(optional = false)
    @JoinColumn(name = "warehouse_id")
    private Warehouse warehouse;

    private Integer systemQuantity;   // quantity before adjustment (system)
    private Integer countedQuantity;  // physical counted quantity
    private Integer difference;       // counted - system
    private String reason;            // optional reason for variance
}
