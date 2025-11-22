package com.project.stockmaster.Controller;

import com.project.stockmaster.dto.*;
import com.project.stockmaster.Service.TransferService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transfers")
@RequiredArgsConstructor
public class TransferController {

    private final TransferService transferService;

    @PostMapping
    public ResponseEntity<TransferResponse> createDraft(@RequestBody TransferRequest request) {
        return ResponseEntity.ok(transferService.createDraft(request));
    }

    @PostMapping("/{id}/items")
    public ResponseEntity<TransferResponse> addItems(
            @PathVariable Long id,
            @RequestBody List<TransferItemRequest> requests
    ) {
        return ResponseEntity.ok(transferService.addItems(id, requests));
    }

    @PostMapping("/{id}/validate")
    public ResponseEntity<TransferResponse> validate(@PathVariable Long id) {
        return ResponseEntity.ok(transferService.validate(id));
    }

    @GetMapping("/{id}")
    public ResponseEntity<TransferResponse> getOne(@PathVariable Long id) {
        return ResponseEntity.ok(transferService.getOne(id));
    }

    @GetMapping
    public ResponseEntity<List<TransferResponse>> listAll() {
        return ResponseEntity.ok(transferService.listAll());
    }
}
