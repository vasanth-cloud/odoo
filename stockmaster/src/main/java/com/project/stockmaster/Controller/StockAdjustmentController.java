package com.project.stockmaster.Controller;

import com.project.stockmaster.dto.*;
import com.project.stockmaster.Service.StockAdjustmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/adjustments")
@RequiredArgsConstructor
public class StockAdjustmentController {

    private final StockAdjustmentService adjustmentService;

    // create and apply adjustment immediately
    @PostMapping
    public ResponseEntity<StockAdjustmentResponse> createAdjustment(@RequestBody StockAdjustmentRequest request) {
        return ResponseEntity.ok(adjustmentService.createAndApply(request));
    }

    @GetMapping("/{id}")
    public ResponseEntity<StockAdjustmentResponse> getOne(@PathVariable Long id) {
        return ResponseEntity.ok(adjustmentService.getOne(id));
    }

    @GetMapping
    public ResponseEntity<List<StockAdjustmentResponse>> listAll() {
        return ResponseEntity.ok(adjustmentService.listAll());
    }
}
