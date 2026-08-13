<template>
  <div class="dashboard-box">
    <!-- 头部：标题 + 时间切换 + 导出 -->
    <div class="dashboard-header">
      <h2 class="title">数据看板</h2>
      <div class="header-right">
        <span class="range-label">{{ rangeLabel }}</span>
        <el-select v-model="period" style="width: 110px" size="small" @change="onPeriodChange">
          <el-option label="今日" value="today" />
          <el-option label="昨日" value="yesterday" />
          <el-option label="近7天" value="last_7_days" />
          <el-option label="近30天" value="last_30_days" />
          <el-option label="自定义" value="custom" />
        </el-select>
        <el-date-picker
          v-if="period === 'custom'"
          v-model="dateRange"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          size="small"
          :disabled-date="disabledDate"
          @change="onDateChange"
        />
        <el-button type="primary" size="small" :loading="exporting" @click="handleExport">导出报表</el-button>
      </div>
    </div>

    <!-- 数据卡片 -->
    <el-row :gutter="20" class="card-row">
      <el-col :xs="12" :sm="6">
        <div class="stat-card">
          <div class="stat-label">订餐总数</div>
          <div class="stat-value">{{ overview.cards.totalOrders }}</div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="6">
        <div class="stat-card">
          <div class="stat-label">待取餐</div>
          <div class="stat-value blue">{{ overview.cards.pendingPickup }}</div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="6">
        <div class="stat-card">
          <div class="stat-label">已完成</div>
          <div class="stat-value green">{{ overview.cards.completed }}</div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="6">
        <div class="stat-card danger">
          <div class="stat-label">退餐/取消</div>
          <div class="stat-value red">{{ overview.cards.cancelled }}</div>
        </div>
      </el-col>
    </el-row>

    <!-- 图表行 -->
    <el-row :gutter="20" class="chart-row">
      <el-col :xs="24" :lg="12">
        <div class="chart-card">
          <div class="chart-title">订餐趋势</div>
          <div class="chart-box">
            <ECharts :option="trendOption" />
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :lg="12">
        <div class="chart-card">
          <div class="chart-title">订单状态分布</div>
          <div class="chart-box">
            <ECharts :option="pieOption" />
          </div>
        </div>
      </el-col>
    </el-row>

    <!-- TOP 5 菜品 -->
    <div class="table-card">
      <div class="chart-title">菜品销量</div>
      <el-table :data="overview.topDishes.slice(0, 5)" size="small" style="width: 100%">
        <el-table-column type="index" label="排名" width="60" />
        <el-table-column prop="dishName" label="菜品名称" />
        <el-table-column prop="quantity" label="销量" width="120" align="right">
          <template #default="{ row }">
            <el-tag type="warning" size="small">{{ row.quantity }} 份</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup lang="ts" name="home">
import { computed, onMounted, reactive, ref } from "vue";
import { ElMessage } from "element-plus";
import { ECOption } from "@/components/ECharts/config";
import ECharts from "@/components/ECharts/index.vue";
import { exportOrderExcel, getStatisticsOverview } from "@/api/modules/statistics";
import type { OverviewData } from "@/api/modules/statistics";

const period = ref("today");
const dateRange = ref<[Date, Date] | null>(null);
const exporting = ref(false);

const periodLabels: Record<string, string> = {
  today: "今日",
  yesterday: "昨日",
  last_7_days: "近7天",
  last_30_days: "近30天"
};

const rangeLabel = computed(() => {
  if (period.value === "custom" && dateRange.value) {
    const fmt = (d: Date) => `${(d.getMonth() + 1).toString().padStart(2, "0")}/${d.getDate().toString().padStart(2, "0")}`;
    return `${fmt(dateRange.value[0])} - ${fmt(dateRange.value[1])}`;
  }
  return periodLabels[period.value] || "";
});

function disabledDate(time: Date) {
  const today = new Date();
  today.setHours(23, 59, 59, 999);
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  thirtyDaysAgo.setHours(0, 0, 0, 0);
  return time > today || time < thirtyDaysAgo;
}

function onPeriodChange() {
  if (period.value !== "custom") {
    dateRange.value = null;
    fetchData();
  }
}

function onDateChange(val: [Date, Date] | null) {
  if (val) {
    const days = Math.ceil((val[1].getTime() - val[0].getTime()) / 86400000) + 1;
    if (days > 30) {
      ElMessage.warning("自定义时段最长30天");
      dateRange.value = null;
      return;
    }
    fetchData();
  }
}

const overview = reactive<OverviewData>({
  cards: { totalOrders: 0, pendingPickup: 0, completed: 0, cancelled: 0 },
  trend: [],
  statusRatio: [],
  topDishes: []
});

// 折线图 option
const trendOption = computed<ECOption>(() => ({
  tooltip: { trigger: "axis" },
  grid: { left: "3%", right: "4%", bottom: "3%", containLabel: true },
  xAxis: {
    type: "category",
    data: overview.trend.map(t => t.label),
    axisLabel: { color: "#999", fontSize: 12 }
  },
  yAxis: {
    type: "value",
    minInterval: 1,
    axisLabel: { color: "#999" }
  },
  series: [
    {
      type: "line",
      data: overview.trend.map(t => t.count),
      smooth: true,
      lineStyle: { color: "#FF6B35", width: 2 },
      itemStyle: { color: "#FF6B35" },
      areaStyle: {
        color: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            { offset: 0, color: "rgba(255,107,53,0.3)" },
            { offset: 1, color: "rgba(255,107,53,0.02)" }
          ]
        }
      }
    }
  ]
}));

// 饼图 option
const pieOption = computed<ECOption>(() => ({
  tooltip: { trigger: "item" },
  legend: { bottom: 0, textStyle: { fontSize: 12, color: "#999" } },
  series: [
    {
      type: "pie",
      radius: ["55%", "75%"],
      center: ["50%", "45%"],
      data: overview.statusRatio
        .filter(s => s.value > 0)
        .map(s => ({ name: s.name, value: s.value })),
      label: { formatter: "{b}\n{d}%" },
      color: ["#FF6B35", "#FF8C42", "#FFA940", "#FFC069", "#91CC75", "#EE6666"]
    }
  ]
}));

// 计算当前选择的时间范围（用于 overview 与 export）
function buildRange(): { period?: string; startTime?: string; endTime?: string } {
  const fmt = (d: Date) => {
    const y = d.getFullYear();
    const m = (d.getMonth() + 1).toString().padStart(2, "0");
    const day = d.getDate().toString().padStart(2, "0");
    return `${y}-${m}-${day}`;
  };
  if (period.value === "custom" && dateRange.value) {
    return {
      startTime: fmt(dateRange.value[0]) + "T00:00:00",
      endTime: fmt(dateRange.value[1]) + "T23:59:59"
    };
  }
  return { period: period.value };
}

async function fetchData() {
  try {
    const { data } = await getStatisticsOverview(buildRange());
    if (data) {
      overview.cards = data.cards;
      overview.trend = data.trend;
      overview.statusRatio = data.statusRatio;
      overview.topDishes = data.topDishes;
    }
  } catch {
    // error handled by interceptor
  }
}

async function handleExport() {
  exporting.value = true;
  try {
    const range = buildRange();
    // 后端 export 仅支持 startTime/endTime，非自定义周期前端自行换算
    let params: { startTime?: string; endTime?: string } = {};
    if (range.startTime && range.endTime) {
      params = { startTime: range.startTime, endTime: range.endTime };
    } else {
      const { startTime, endTime } = resolvePeriodRange(period.value);
      params = { startTime, endTime };
    }
    const blob = await exportOrderExcel(params);
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `订单报表_${period.value}.xlsx`;
    a.click();
    URL.revokeObjectURL(url);
    ElMessage.success("导出成功");
  } catch {
    // error handled by interceptor
  } finally {
    exporting.value = false;
  }
}

// 非自定义周期换算起止时间
function resolvePeriodRange(p: string): { startTime: string; endTime: string } {
  const today = new Date();
  const fmt = (d: Date) => {
    const y = d.getFullYear();
    const m = (d.getMonth() + 1).toString().padStart(2, "0");
    const day = d.getDate().toString().padStart(2, "0");
    return `${y}-${m}-${day}`;
  };
  let start = new Date(today);
  let end = new Date(today);
  if (p === "yesterday") {
    start.setDate(today.getDate() - 1);
    end.setDate(today.getDate() - 1);
  } else if (p === "last_7_days") {
    start.setDate(today.getDate() - 6);
  } else if (p === "last_30_days") {
    start.setDate(today.getDate() - 29);
  }
  return {
    startTime: fmt(start) + "T00:00:00",
    endTime: fmt(end) + "T23:59:59"
  };
}

onMounted(() => {
  fetchData();
});
</script>

<style scoped lang="scss">
.dashboard-box {
  padding: 20px;
}
.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  .title {
    margin: 0;
    font-size: 20px;
    color: #303133;
  }
  .header-right {
    display: flex;
    align-items: center;
    gap: 16px;
  }
}

.card-row {
  margin-bottom: 20px;
}
.stat-card {
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  .stat-label {
    font-size: 14px;
    color: #999;
    margin-bottom: 8px;
  }
  .stat-value {
    font-size: 32px;
    font-weight: bold;
    color: #303133;
  }
  .blue {
    color: #409eff;
  }
  .green {
    color: #67c23a;
  }
  .red {
    color: #f56c6c;
  }
  &.danger {
    border: 1px solid #fde2e2;
    background: #fef0f0;
  }
}

.chart-row {
  margin-bottom: 20px;
}
.chart-card {
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  margin-bottom: 20px;
}
.chart-title {
  font-size: 16px;
  font-weight: 600;
  color: #303133;
  margin-bottom: 16px;
}
.chart-box {
  width: 100%;
  height: 320px;
}

.table-card {
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}
</style>
