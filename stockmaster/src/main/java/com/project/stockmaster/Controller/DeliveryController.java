package com.project.stockmaster.Controller;

import com.project.stockmaster.dto.*;
import com.project.stockmaster.Service.DeliveryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/delivery")
@RequiredArgsConstructor
public class DeliveryController {

    private final DeliveryService deliveryService;

    @PostMapping
    public ResponseEntity<DeliveryResponse> createDraft(@RequestBody DeliveryRequest request) {
        return ResponseEntity.ok(deliveryService.createDraft(request));
    }

    @PostMapping("/{id}/items")
    public ResponseEntity<DeliveryResponse> addItems(
            @PathVariable Long id,
            @RequestBody List<DeliveryItemRequest> items) {
        return ResponseEntity.ok(deliveryService.addItems(id, items));
    }

    @PostMapping("/{id}/validate")
    public ResponseEntity<DeliveryResponse> validate(@PathVariable Long id) {
        return ResponseEntity.ok(deliveryService.validate(id));
    }

    @GetMapping("/{id}")
    public ResponseEntity<DeliveryResponse> getOne(@PathVariable Long id) {
        return ResponseEntity.ok(deliveryService.getOne(id));
    }

    @GetMapping
    public ResponseEntity<List<DeliveryResponse>> listAll() {
        return ResponseEntity.ok(deliveryService.listAll());
    }
}
