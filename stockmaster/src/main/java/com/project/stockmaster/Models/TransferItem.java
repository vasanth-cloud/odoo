package com.project.stockmaster.Models;



import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "transfer_items")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TransferItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "transfer_id")
    private TransferOrder transferOrder;

    @ManyToOne(optional = false)
    @JoinColumn(name = "product_id")
    private Product product;

    private Integer quantity;
}
