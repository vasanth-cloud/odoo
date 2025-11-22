package com.project.stockmaster.repository;

import com.project.stockmaster.Models.TransferOrder;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransferOrderRepository extends JpaRepository<TransferOrder, Long> {
}
