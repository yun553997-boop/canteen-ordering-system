<template>
  <div class="merchant-wallet">
    <!-- 余额卡片 -->
    <el-card shadow="never" class="wallet-card">
      <div class="balance-block">
        <span class="balance-label">商家余额（元）</span>
        <span class="balance-value">¥{{ fmtYuan(balance) }}</span>
      </div>
    </el-card>

    <!-- 提取卡片 -->
    <el-card shadow="never" class="wallet-card">
      <template #header>
        <span class="card-title">提取到银行卡</span>
      </template>
      <div class="withdraw-row">
        <el-input-number
          v-model="withdrawAmount"
          :min="0"
          :precision="2"
          :step="10"
          placeholder="提取金额"
          style="width: 200px"
        />
        <span class="unit">元</span>
        <el-button type="primary" @click="openWithdraw">提取</el-button>
      </div>
      <div class="form-tip">提取金额将扣减商家余额并记录流水，到账为模拟（无真实银行卡对接）。</div>
    </el-card>

    <!-- 流水卡片 -->
    <el-card shadow="never" class="wallet-card">
      <template #header>
        <span class="card-title">流水</span>
      </template>
      <el-table :data="logs" v-loading="logsLoading" style="width: 100%">
        <el-table-column prop="flowNo" label="流水号" min-width="180" />
        <el-table-column label="类型" width="100">
          <template #default="{ row }">{{ typeLabel(row.changeType) }}</template>
        </el-table-column>
        <el-table-column label="变动金额" width="140">
          <template #default="{ row }">
            <span :class="row.changeAmount < 0 ? 'amount-negative' : 'amount-positive'">
              {{ (row.changeAmount > 0 ? '+' : '') + fmtYuan(row.changeAmount) }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="变动后余额" width="140">
          <template #default="{ row }">¥{{ fmtYuan(row.balanceAfter) }}</template>
        </el-table-column>
        <el-table-column label="时间" width="180">
          <template #default="{ row }">{{ formatTime(row.createTime) }}</template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="pagination"
        v-model:current-page="page"
        v-model:page-size="pageSize"
        :total="total"
        :page-sizes="[10, 20, 50]"
        layout="total, sizes, prev, pager, next"
        @current-change="loadLogs"
        @size-change="handleSizeChange"
      />
    </el-card>

    <!-- 提取弹窗（模拟银行卡信息） -->
    <el-dialog v-model="withdrawDialog" title="提取到银行卡" width="420px">
      <el-form label-width="80px">
        <el-form-item label="开户银行">
          <el-input v-model="bankForm.bankName" placeholder="如：中国工商银行" />
        </el-form-item>
        <el-form-item label="银行卡号">
          <el-input v-model="bankForm.cardNo" placeholder="请输入银行卡号" />
        </el-form-item>
        <el-form-item label="户名">
          <el-input v-model="bankForm.name" placeholder="请输入持卡人姓名" />
        </el-form-item>
        <el-form-item label="提取金额">
          <span class="dialog-amount">¥{{ fmtYuan((withdrawAmount || 0) * 100) }}</span>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="withdrawDialog = false">取消</el-button>
        <el-button type="primary" @click="confirmWithdraw">确认提取</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts" name="merchantWallet">
import { onMounted, reactive, ref } from "vue";
import { ElLoading, ElMessage } from "element-plus";

import { getMerchantBalance, getMerchantLogs, withdrawMerchant, type MerchantWalletLog } from "@/api/modules/merchantWallet";

const balance = ref(0);
const withdrawAmount = ref<number | null>(null);
const withdrawDialog = ref(false);
const bankForm = reactive({ bankName: "", cardNo: "", name: "" });

const logs = ref<MerchantWalletLog[]>([]);
const total = ref(0);
const page = ref(1);
const pageSize = ref(10);
const logsLoading = ref(false);

/** 分 → 元（两位小数） */
function fmtYuan(cents: number | null | undefined) {
  return ((cents || 0) / 100).toFixed(2);
}

function formatTime(ts?: string) {
  return (ts || "").replace("T", " ");
}

const TYPE_LABEL: Record<string, string> = {
  RECHARGE: "充值",
  CONSUME: "消费",
  REFUND: "退款",
  WITHDRAW: "提取",
  INCOME: "收入"
};

function typeLabel(type: string) {
  return TYPE_LABEL[type] || type;
}

async function loadBalance() {
  try {
    const res = await getMerchantBalance();
    balance.value = res.data.balance ?? 0;
  } catch {
    // 错误已由拦截器处理
  }
}

async function loadLogs() {
  logsLoading.value = true;
  try {
    const res = await getMerchantLogs({ page: page.value, pageSize: pageSize.value });
    logs.value = res.data.records || [];
    total.value = res.data.total || 0;
  } catch {
    logs.value = [];
  } finally {
    logsLoading.value = false;
  }
}

function handleSizeChange() {
  page.value = 1;
  loadLogs();
}

function openWithdraw() {
  if (withdrawAmount.value == null || withdrawAmount.value <= 0) {
    ElMessage.warning("请输入提取金额");
    return;
  }
  withdrawDialog.value = true;
}

function confirmWithdraw() {
  if (withdrawAmount.value == null || withdrawAmount.value <= 0) {
    ElMessage.warning("请输入提取金额");
    return;
  }
  if (!bankForm.bankName || !bankForm.cardNo || !bankForm.name) {
    ElMessage.warning("请填写完整银行卡信息");
    return;
  }
  const amountFen = Math.round(withdrawAmount.value * 100);
  const loading = ElLoading.service({ text: "转账中...", fullscreen: true });
  setTimeout(async () => {
    try {
      await withdrawMerchant(amountFen);
      loading.close();
      ElMessage.success("提取成功");
      withdrawDialog.value = false;
      withdrawAmount.value = null;
      loadBalance();
      page.value = 1;
      loadLogs();
    } catch {
      loading.close();
    }
  }, 1500);
}

onMounted(() => {
  loadBalance();
  loadLogs();
});
</script>

<style scoped>
.merchant-wallet {
  padding: 16px;
}

.wallet-card {
  margin-bottom: 16px;
}

.balance-block {
  display: flex;
  align-items: baseline;
  gap: 16px;
}

.balance-label {
  font-size: 14px;
  color: #666;
}

.balance-value {
  font-size: 32px;
  font-weight: 600;
  color: #ff6b35;
}

.card-title {
  font-weight: 600;
}

.withdraw-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.unit {
  color: #666;
}

.form-tip {
  margin-top: 8px;
  font-size: 12px;
  color: #999;
}

.amount-positive {
  color: #67c23a;
}

.amount-negative {
  color: #f56c6c;
}

.dialog-amount {
  font-size: 16px;
  font-weight: 600;
  color: #ff6b35;
}

.pagination {
  margin-top: 16px;
  justify-content: flex-end;
}
</style>
