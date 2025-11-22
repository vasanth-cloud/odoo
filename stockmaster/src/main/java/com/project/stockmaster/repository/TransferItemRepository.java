package com.project.stockmaster.repository;

import com.project.stockmaster.Models.TransferItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransferItemRepository extends JpaRepository<TransferItem, Long> {
}
