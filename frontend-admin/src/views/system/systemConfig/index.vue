<template>
  <div class="config-container">
    <el-card shadow="never" class="config-card">
      <template #header>
        <span class="card-title">取餐超时设置</span>
      </template>
      <el-form label-width="180px">
        <el-form-item label="超时作废时间">
          <el-input-number v-model="form.timeoutMinutes" :min="1" :max="1440" />
          <span class="unit">分钟</span>
          <div class="form-tip">出餐（备餐完成）后超过该时长仍未取餐，订单将自动作废（不退款）。将提前 20 分钟向用户发送取餐提醒。</div>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card shadow="never" class="config-card">
      <template #header>
        <span class="card-title">餐次订餐时间段</span>
      </template>
      <el-form label-width="120px">
        <el-form-item label="早餐">
          <el-time-picker
            v-model="form.breakfastStart"
            format="HH:mm"
            value-format="HH:mm"
            placeholder="开始时间"
            style="width: 160px"
          />
          <span class="separator">至</span>
          <el-time-picker
            v-model="form.breakfastEnd"
            format="HH:mm"
            value-format="HH:mm"
            placeholder="截止时间"
            style="width: 160px"
          />
        </el-form-item>
        <el-form-item label="午餐">
          <el-time-picker
            v-model="form.lunchStart"
            format="HH:mm"
            value-format="HH:mm"
            placeholder="开始时间"
            style="width: 160px"
          />
          <span class="separator">至</span>
          <el-time-picker
            v-model="form.lunchEnd"
            format="HH:mm"
            value-format="HH:mm"
            placeholder="截止时间"
            style="width: 160px"
          />
        </el-form-item>
        <el-form-item label="晚餐">
          <el-time-picker
            v-model="form.dinnerStart"
            format="HH:mm"
            value-format="HH:mm"
            placeholder="开始时间"
            style="width: 160px"
          />
          <span class="separator">至</span>
          <el-time-picker
            v-model="form.dinnerEnd"
            format="HH:mm"
            value-format="HH:mm"
            placeholder="截止时间"
            style="width: 160px"
          />
        </el-form-item>
        <div class="form-tip">用户仅在对应时间段内可以下单，早于开始或晚于截止时间均无法订餐。</div>
      </el-form>
    </el-card>

    <div class="config-footer">
      <el-button type="primary" :loading="saving" @click="handleSave">保存</el-button>
    </div>
  </div>
</template>

<script setup lang="ts" name="systemConfig">
import { ElMessage } from "element-plus";
import { onMounted, reactive, ref } from "vue";

import { CONFIG_KEYS, getSystemConfigs, saveSystemConfigs } from "@/api/modules/systemConfig";

const saving = ref(false);

const form = reactive({
  timeoutMinutes: 60,
  breakfastStart: "",
  breakfastEnd: "",
  lunchStart: "",
  lunchEnd: "",
  dinnerStart: "",
  dinnerEnd: ""
});

async function loadConfigs() {
  try {
    const res = await getSystemConfigs();
    const cfg = res.data || {};
    form.timeoutMinutes = Number(cfg[CONFIG_KEYS.TIMEOUT_MINUTES] ?? 60);
    form.breakfastStart = cfg[CONFIG_KEYS.BREAKFAST_START] ?? "";
    form.breakfastEnd = cfg[CONFIG_KEYS.BREAKFAST_END] ?? "";
    form.lunchStart = cfg[CONFIG_KEYS.LUNCH_START] ?? "";
    form.lunchEnd = cfg[CONFIG_KEYS.LUNCH_END] ?? "";
    form.dinnerStart = cfg[CONFIG_KEYS.DINNER_START] ?? "";
    form.dinnerEnd = cfg[CONFIG_KEYS.DINNER_END] ?? "";
  } catch {
    // 错误已由拦截器处理
  }
}

function validateTimeRange() {
  const ranges = [
    { label: "早餐", start: form.breakfastStart, end: form.breakfastEnd },
    { label: "午餐", start: form.lunchStart, end: form.lunchEnd },
    { label: "晚餐", start: form.dinnerStart, end: form.dinnerEnd }
  ];
  for (const item of ranges) {
    if (!item.start || !item.end) {
      ElMessage.warning(`请填写${item.label}的开始和截止时间`);
      return false;
    }
    if (item.start >= item.end) {
      ElMessage.warning(`${item.label}的截止时间必须晚于开始时间`);
      return false;
    }
  }
  return true;
}

async function handleSave() {
  if (!validateTimeRange()) return;
  saving.value = true;
  try {
    await saveSystemConfigs({
      [CONFIG_KEYS.TIMEOUT_MINUTES]: String(form.timeoutMinutes),
      [CONFIG_KEYS.BREAKFAST_START]: form.breakfastStart,
      [CONFIG_KEYS.BREAKFAST_END]: form.breakfastEnd,
      [CONFIG_KEYS.LUNCH_START]: form.lunchStart,
      [CONFIG_KEYS.LUNCH_END]: form.lunchEnd,
      [CONFIG_KEYS.DINNER_START]: form.dinnerStart,
      [CONFIG_KEYS.DINNER_END]: form.dinnerEnd
    });
    ElMessage.success("保存成功");
  } catch {
    // 错误已由拦截器处理
  } finally {
    saving.value = false;
  }
}

onMounted(() => {
  loadConfigs();
});
</script>

<style scoped>
.config-container {
  padding: 16px;
}

.config-card {
  margin-bottom: 16px;
}

.card-title {
  font-weight: 600;
}

.unit {
  margin-left: 8px;
  color: #666;
}

.separator {
  margin: 0 12px;
  color: #999;
}

.form-tip {
  width: 100%;
  margin-top: 6px;
  font-size: 12px;
  line-height: 1.6;
  color: #999;
}

.config-footer {
  padding-left: 120px;
}
</style>
