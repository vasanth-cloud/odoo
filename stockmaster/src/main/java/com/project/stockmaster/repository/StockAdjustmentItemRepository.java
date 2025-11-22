package com.project.stockmaster.repository;

import com.project.stockmaster.Models.StockAdjustmentItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StockAdjustmentItemRepository extends JpaRepository<StockAdjustmentItem, Long> {
}
