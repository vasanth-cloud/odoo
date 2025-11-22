package com.project.stockmaster.repository;
import com.project.stockmaster.Models.Warehouse;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WarehouseRepository extends JpaRepository<Warehouse, Long> {
    boolean existsByWarehouseCode(String code);
}
