package com.project.stockmaster.Controller;

import com.project.stockmaster.dto.*;
import com.project.stockmaster.Service.ReceiptService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/receipts")
@RequiredArgsConstructor
public class ReceiptController {

    private final ReceiptService receiptService;

    // create draft receipt
    @PostMapping
    public ResponseEntity<ReceiptResponse> createDraft(@RequestBody ReceiptRequest request) {
        return ResponseEntity.ok(receiptService.createDraft(request));
    }

    // add items to existing draft
    @PostMapping("/{id}/items")
    public ResponseEntity<ReceiptResponse> addItems(@PathVariable Long id,
                                                    @RequestBody List<ReceiptItemRequest> items) {
        return ResponseEntity.ok(receiptService.addItemsToDraft(id, items));
    }

    // validate -> completes receipt and updates stock
    @PostMapping("/{id}/validate")
    public ResponseEntity<ReceiptResponse> validate(@PathVariable Long id) {
        return ResponseEntity.ok(receiptService.validateReceipt(id));
    }

    // cancel draft
    @PostMapping("/{id}/cancel")
    public ResponseEntity<String> cancel(@PathVariable Long id) {
        receiptService.cancelDraft(id);
        return ResponseEntity.ok("Receipt cancelled");
    }

    @GetMapping("/{id}")
    public ResponseEntity<ReceiptResponse> getOne(@PathVariable Long id) {
        return ResponseEntity.ok(receiptService.getReceipt(id));
    }

    @GetMapping
    public ResponseEntity<List<ReceiptResponse>> listAll() {
        return ResponseEntity.ok(receiptService.listAll());
    }
}
