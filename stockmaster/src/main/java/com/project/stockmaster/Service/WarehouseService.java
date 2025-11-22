package com.project.stockmaster.Service;

import com.project.stockmaster.Models.Warehouse;
import com.project.stockmaster.dto.WarehouseRequest;
import com.project.stockmaster.dto.WarehouseResponse;
import com.project.stockmaster.exception.ResourceNotFoundException;

import com.project.stockmaster.repository.WarehouseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class WarehouseService {

    private final WarehouseRepository warehouseRepository;

    public WarehouseResponse createWarehouse(WarehouseRequest request) {

        if (warehouseRepository.existsByWarehouseCode(request.getWarehouseCode())) {
            throw new RuntimeException("Warehouse code already exists");
        }

        Warehouse warehouse = Warehouse.builder()
                .warehouseCode(request.getWarehouseCode())
                .warehouseName(request.getWarehouseName())
                .location(request.getLocation())
                .build();

        warehouseRepository.save(warehouse);

        return toResponse(warehouse);
    }

    public WarehouseResponse updateWarehouse(Long id, WarehouseRequest request) {

        Warehouse warehouse = warehouseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Warehouse not found"));

        warehouse.setWarehouseCode(request.getWarehouseCode());
        warehouse.setWarehouseName(request.getWarehouseName());
        warehouse.setLocation(request.getLocation());

        warehouseRepository.save(warehouse);

        return toResponse(warehouse);
    }

    public List<WarehouseResponse> getAllWarehouses() {
        return warehouseRepository.findAll()
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public WarehouseResponse getWarehouse(Long id) {
        Warehouse wh = warehouseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Warehouse not found"));
        return toResponse(wh);
    }

    public void deleteWarehouse(Long id) {
        Warehouse wh = warehouseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Warehouse not found"));
        warehouseRepository.delete(wh);
    }

    private WarehouseResponse toResponse(Warehouse w) {
        return WarehouseResponse.builder()
                .id(w.getId())
                .warehouseCode(w.getWarehouseCode())
                .warehouseName(w.getWarehouseName())
                .location(w.getLocation())
                .build();
    }
}
