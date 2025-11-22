package com.project.stockmaster.repository;

import com.project.stockmaster.Models.Stock;
import com.project.stockmaster.Models.Product;
import com.project.stockmaster.Models.Warehouse;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StockRepository extends JpaRepository<Stock, Long> {
    Optional<Stock> findByProductAndWarehouse(Product product, Warehouse warehouse);
}
