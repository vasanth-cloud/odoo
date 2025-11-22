package com.project.stockmaster.Controller;

import com.project.stockmaster.Service.WarehouseService;
import com.project.stockmaster.dto.WarehouseRequest;
import com.project.stockmaster.dto.WarehouseResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/warehouses")
@RequiredArgsConstructor
public class WarehouseController {

    private final WarehouseService warehouseService;

    @PostMapping
    public ResponseEntity<WarehouseResponse> create(@RequestBody WarehouseRequest request) {
        return ResponseEntity.ok(warehouseService.createWarehouse(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<WarehouseResponse> update(
            @PathVariable Long id,
            @RequestBody WarehouseRequest request
    ) {
        return ResponseEntity.ok(warehouseService.updateWarehouse(id, request));
    }

    @GetMapping
    public ResponseEntity<List<WarehouseResponse>> getAll() {
        return ResponseEntity.ok(warehouseService.getAllWarehouses());
    }

    @GetMapping("/{id}")
    public ResponseEntity<WarehouseResponse> getOne(@PathVariable Long id) {
        return ResponseEntity.ok(warehouseService.getWarehouse(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        warehouseService.deleteWarehouse(id);
        return ResponseEntity.ok("Warehouse deleted");
    }
}
