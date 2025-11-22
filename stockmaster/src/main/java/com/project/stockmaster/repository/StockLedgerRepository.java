package com.project.stockmaster.repository;

import com.project.stockmaster.Models.StockLedger;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StockLedgerRepository extends JpaRepository<StockLedger, Long> {
}
