package com.project.stockmaster.Controller;

import com.project.stockmaster.dto.DashboardKpiResponse;
import com.project.stockmaster.Service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping
    public ResponseEntity<DashboardKpiResponse> getDashboard() {
        return ResponseEntity.ok(dashboardService.getDashboard());
    }
}
