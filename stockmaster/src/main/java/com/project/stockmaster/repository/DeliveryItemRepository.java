package com.project.stockmaster.repository;

import com.project.stockmaster.Models.DeliveryItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DeliveryItemRepository extends JpaRepository<DeliveryItem, Long> {
}
