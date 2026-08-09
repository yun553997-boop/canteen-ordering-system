package com.canteen.controller;

import cn.dev33.satoken.annotation.SaCheckRole;
import cn.dev33.satoken.annotation.SaMode;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.canteen.common.R;
import com.canteen.entity.BizOrder;
import com.canteen.entity.BizOrderItem;
import com.canteen.service.BizOrderItemService;
import com.canteen.service.BizOrderService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.io.OutputStream;
import java.math.BigDecimal;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@RestController
@RequestMapping("/api/v1/admin/statistics")
@RequiredArgsConstructor
@SaCheckRole(value = {"ADMIN_CANTEEN", "ADMIN_SYSTEM"}, mode = SaMode.OR)
public class StatisticsController {

    private final BizOrderService bizOrderService;
    private final BizOrderItemService bizOrderItemService;

    // ==================== 概览接口 ====================

    @GetMapping("/overview")
    public R<Map<String, Object>> overview(@RequestParam(defaultValue = "today") String period) {
        LocalDateTime[] range = parsePeriod(period);
        LocalDateTime start = range[0];
        LocalDateTime end = range[1];

        LambdaQueryWrapper<BizOrder> wrapper = new LambdaQueryWrapper<>();
        wrapper.between(BizOrder::getCreateTime, start, end);
        List<BizOrder> orders = bizOrderService.list(wrapper);

        Map<String, Object> result = new LinkedHashMap<>();
        result.put("cards", buildCards(orders));
        result.put("trend", buildTrend(orders, period));
        result.put("statusRatio", buildStatusRatio(orders));
        result.put("topDishes", buildTopDishes(orders));
        return R.ok(result);
    }

    // ==================== 卡片统计 ====================

    private Map<String, Object> buildCards(List<BizOrder> orders) {
        long total = orders.size();
        long pendingPickup = orders.stream().filter(o -> "READY".equals(o.getStatus())).count();
        long completed = orders.stream().filter(o -> "COMPLETED".equals(o.getStatus())).count();
        long cancelled = orders.stream().filter(o -> "CANCELLED".equals(o.getStatus()) || "EXPIRED".equals(o.getStatus())).count();

        Map<String, Object> cards = new LinkedHashMap<>();
        cards.put("totalOrders", total);
        cards.put("pendingPickup", pendingPickup);
        cards.put("completed", completed);
        cards.put("cancelled", cancelled);
        return cards;
    }

    // ==================== 趋势折线图 ====================

    private List<Map<String, Object>> buildTrend(List<BizOrder> orders, String period) {
        DateTimeFormatter fmt;
        List<String> allLabels;

        if ("today".equals(period) || "yesterday".equals(period)) {
            // 按小时
            fmt = DateTimeFormatter.ofPattern("HH:00");
            allLabels = new ArrayList<>();
            for (int h = 0; h < 24; h++) {
                allLabels.add(String.format("%02d:00", h));
            }
        } else {
            // 按日期
            fmt = DateTimeFormatter.ofPattern("MM-dd");
            allLabels = new ArrayList<>();
            LocalDate start = "last_7_days".equals(period) ? LocalDate.now().minusDays(6) : LocalDate.now();
            for (int i = 0; i < 7; i++) {
                allLabels.add(start.plusDays(i).format(DateTimeFormatter.ofPattern("MM-dd")));
            }
        }

        Map<String, Long> grouped = orders.stream()
                .collect(Collectors.groupingBy(o -> o.getCreateTime().format(fmt), LinkedHashMap::new, Collectors.counting()));

        List<Map<String, Object>> trend = new ArrayList<>();
        for (String label : allLabels) {
            Map<String, Object> point = new LinkedHashMap<>();
            point.put("label", label);
            point.put("count", grouped.getOrDefault(label, 0L));
            trend.add(point);
        }
        return trend;
    }

    // ==================== 状态饼图 ====================

    private List<Map<String, Object>> buildStatusRatio(List<BizOrder> orders) {
        Map<String, String> statusNameMap = new LinkedHashMap<>();
        statusNameMap.put("PENDING", "待确认");
        statusNameMap.put("PREPARING", "制作中");
        statusNameMap.put("READY", "待取餐");
        statusNameMap.put("COMPLETED", "已完成");
        statusNameMap.put("CANCELLED", "已取消");
        statusNameMap.put("EXPIRED", "已过期");

        Map<String, Long> grouped = orders.stream()
                .collect(Collectors.groupingBy(BizOrder::getStatus, Collectors.counting()));

        List<Map<String, Object>> ratio = new ArrayList<>();
        for (Map.Entry<String, String> entry : statusNameMap.entrySet()) {
            Map<String, Object> item = new LinkedHashMap<>();
            item.put("name", entry.getValue());
            item.put("value", grouped.getOrDefault(entry.getKey(), 0L));
            ratio.add(item);
        }
        return ratio;
    }

    // ==================== TOP 5 菜品 ====================

    private List<Map<String, Object>> buildTopDishes(List<BizOrder> orders) {
        if (orders.isEmpty()) return Collections.emptyList();

        List<Long> orderIds = orders.stream().map(BizOrder::getId).collect(Collectors.toList());

        LambdaQueryWrapper<BizOrderItem> itemWrapper = new LambdaQueryWrapper<>();
        itemWrapper.in(BizOrderItem::getOrderId, orderIds);
        List<BizOrderItem> items = bizOrderItemService.list(itemWrapper);

        // 按 dishName 汇总 quantity
        Map<String, Integer> dishQtyMap = items.stream()
                .collect(Collectors.groupingBy(BizOrderItem::getDishName,
                        Collectors.summingInt(BizOrderItem::getQuantity)));

        return dishQtyMap.entrySet().stream()
                .sorted((a, b) -> b.getValue().compareTo(a.getValue()))
                .limit(5)
                .map(e -> {
                    Map<String, Object> m = new LinkedHashMap<>();
                    m.put("dishName", e.getKey());
                    m.put("quantity", e.getValue());
                    return m;
                })
                .collect(Collectors.toList());
    }

    // ==================== Excel 导出 ====================

    @GetMapping("/export")
    public void export(@RequestParam(required = false) String startTime,
                       @RequestParam(required = false) String endTime,
                       HttpServletResponse response) throws IOException {
        LocalDateTime start = (startTime != null && !startTime.isEmpty())
                ? LocalDateTime.parse(startTime)
                : LocalDateTime.of(LocalDate.now(), LocalTime.MIN);
        LocalDateTime end = (endTime != null && !endTime.isEmpty())
                ? LocalDateTime.parse(endTime)
                : LocalDateTime.of(LocalDate.now(), LocalTime.MAX);

        LambdaQueryWrapper<BizOrder> wrapper = new LambdaQueryWrapper<>();
        wrapper.between(BizOrder::getCreateTime, start, end)
                .orderByDesc(BizOrder::getCreateTime);
        List<BizOrder> orders = bizOrderService.list(wrapper);

        // 状态中文映射
        Map<String, String> statusMap = Map.of(
                "PENDING", "待确认", "PREPARING", "制作中", "READY", "待取餐",
                "COMPLETED", "已完成", "CANCELLED", "已取消", "EXPIRED", "已过期"
        );
        Map<String, String> mealMap = Map.of(
                "BREAKFAST", "早餐", "LUNCH", "午餐", "DINNER", "晚餐"
        );

        try (Workbook workbook = new XSSFWorkbook()) {
            Sheet sheet = workbook.createSheet("订单明细");
            // 表头样式
            CellStyle headerStyle = workbook.createCellStyle();
            Font headerFont = workbook.createFont();
            headerFont.setBold(true);
            headerStyle.setFont(headerFont);
            headerStyle.setFillForegroundColor(IndexedColors.GREY_25_PERCENT.getIndex());
            headerStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
            headerStyle.setBorderBottom(BorderStyle.THIN);
            headerStyle.setBorderTop(BorderStyle.THIN);
            headerStyle.setBorderLeft(BorderStyle.THIN);
            headerStyle.setBorderRight(BorderStyle.THIN);

            // 表头
            Row headerRow = sheet.createRow(0);
            String[] headers = {"订单号", "餐次", "总金额", "状态", "下单时间"};
            for (int i = 0; i < headers.length; i++) {
                Cell cell = headerRow.createCell(i);
                cell.setCellValue(headers[i]);
                cell.setCellStyle(headerStyle);
                sheet.setColumnWidth(i, 20 * 256);
            }

            // 数据行
            DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
            int rowIdx = 1;
            for (BizOrder order : orders) {
                Row row = sheet.createRow(rowIdx++);
                row.createCell(0).setCellValue(order.getOrderNo());
                row.createCell(1).setCellValue(mealMap.getOrDefault(order.getMealType(), order.getMealType()));
                row.createCell(2).setCellValue(order.getTotalAmount() != null
                        ? order.getTotalAmount().doubleValue() : 0);
                row.createCell(3).setCellValue(statusMap.getOrDefault(order.getStatus(), order.getStatus()));
                row.createCell(4).setCellValue(order.getCreateTime() != null
                        ? order.getCreateTime().format(dtf) : "");
            }

            // 输出
            response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
            String filename = URLEncoder.encode("订单明细.xlsx", StandardCharsets.UTF_8);
            response.setHeader("Content-Disposition", "attachment; filename*=UTF-8''" + filename);
            try (OutputStream os = response.getOutputStream()) {
                workbook.write(os);
                os.flush();
            }
        }
    }

    // ==================== 工具 ====================

    private LocalDateTime[] parsePeriod(String period) {
        LocalDate today = LocalDate.now();
        return switch (period) {
            case "yesterday" -> new LocalDateTime[]{
                    LocalDateTime.of(today.minusDays(1), LocalTime.MIN),
                    LocalDateTime.of(today.minusDays(1), LocalTime.MAX)
            };
            case "last_7_days" -> new LocalDateTime[]{
                    LocalDateTime.of(today.minusDays(6), LocalTime.MIN),
                    LocalDateTime.of(today, LocalTime.MAX)
            };
            default -> new LocalDateTime[]{
                    LocalDateTime.of(today, LocalTime.MIN),
                    LocalDateTime.of(today, LocalTime.MAX)
            };
        };
    }
}
