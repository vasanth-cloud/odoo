package com.project.stockmaster.repository;

import com.project.stockmaster.Models.DeliveryOrder;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DeliveryOrderRepository extends JpaRepository<DeliveryOrder, Long> {
}
