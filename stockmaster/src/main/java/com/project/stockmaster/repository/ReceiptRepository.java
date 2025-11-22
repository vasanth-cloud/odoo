package com.project.stockmaster.repository;

import com.project.stockmaster.Models.Receipt;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReceiptRepository extends JpaRepository<Receipt, Long> {
}
