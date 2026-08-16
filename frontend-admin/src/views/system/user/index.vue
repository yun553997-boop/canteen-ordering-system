<template>
  <div class="table-box">
    <ProTable
      ref="proTable"
      title="人员管理"
      :columns="columns"
      :request-api="getTableList"
      :data-callback="dataCallback"
    >
      <template #tableHeader>
        <el-button type="primary" :icon="CirclePlus" @click="openDialog">开通食堂账号</el-button>
      </template>
      <template #status="scope">
        <el-tag :type="scope.row.status === 1 ? 'success' : 'danger'" size="small">
          {{ scope.row.status === 1 ? '启用' : '禁用' }}
        </el-tag>
      </template>
      <template #isInitialPassword="scope">
        <el-tag :type="scope.row.isInitialPassword === 1 ? 'warning' : 'success'" size="small">
          {{ scope.row.isInitialPassword === 1 ? '初始密码' : '已修改' }}
        </el-tag>
      </template>
      <template #operation="scope">
        <el-button
          v-if="scope.row.status === 1"
          type="danger"
          link
          :icon="Delete"
          @click="openDeactivate(scope.row)"
        >
          注销
        </el-button>
      </template>
    </ProTable>

    <!-- 开通食堂管理员账号弹窗 -->
    <el-dialog
      v-model="dialogVisible"
      title="开通食堂管理员账号"
      width="480px"
      :close-on-click-modal="false"
      destroy-on-close
    >
      <el-form ref="formRef" :model="form" :rules="rules" label-width="90px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名 / 工号" maxlength="30" />
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="form.phone" placeholder="请输入手机号" maxlength="11" />
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <div style="display: flex; gap: 8px; width: 100%">
            <el-input v-model="form.code" placeholder="请输入验证码" maxlength="6" />
            <el-button :disabled="smsCountdown > 0" @click="handleSendSms">
              {{ smsCountdown > 0 ? smsCountdown + 's' : '发送验证码' }}
            </el-button>
          </div>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" :loading="submitting" @click="handleSubmit">确定</el-button>
      </template>
    </el-dialog>

    <!-- 注销食堂管理员账号弹窗 -->
    <el-dialog
      v-model="deactivateVisible"
      title="注销食堂管理员账号"
      width="480px"
      :close-on-click-modal="false"
      destroy-on-close
    >
      <el-form label-width="90px">
        <el-form-item label="用户名">
          <el-input :model-value="deactivateTarget?.username" disabled />
        </el-form-item>
        <el-form-item label="手机号">
          <el-input :model-value="deactivateTarget?.phone" disabled />
        </el-form-item>
        <el-form-item label="验证码">
          <div style="display: flex; gap: 8px; width: 100%">
            <el-input v-model="deactivateCode" placeholder="请输入验证码" maxlength="6" />
            <el-button :disabled="deactivateCountdown > 0" @click="handleDeactivateSendSms">
              {{ deactivateCountdown > 0 ? deactivateCountdown + 's' : '发送验证码' }}
            </el-button>
          </div>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="deactivateVisible = false">取消</el-button>
        <el-button type="danger" :loading="deactivateSubmitting" @click="handleDeactivate">确认注销</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts" name="systemUser">
import { CirclePlus, Delete } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import type { FormInstance, FormRules } from "element-plus";
import { reactive, ref } from "vue";

import { System } from "@/api/interface";
import { createCanteenStaff, deactivateCanteenStaff, getSystemUserList, sendSmsCode } from "@/api/modules/system";
import ProTable from "@/components/ProTable/index.vue";
import { ColumnProps, ProTableInstance } from "@/components/ProTable/interface";

const proTable = ref<ProTableInstance>();

// dataCallback: 适配 ProTable 的分页数据结构
const dataCallback = (data: any) => {
  const inner = data.data || data;
  return {
    list: inner.records || inner.list || [],
    total: inner.total || 0
  };
};

// 请求封装：ProTable 传 pageNum，后端接收 page
const getTableList = (params: any) => {
  const { pageNum, pageSize, ...rest } = params;
  return getSystemUserList({ page: pageNum, pageSize, ...rest });
};

// 列定义
const columns = reactive<ColumnProps<System.SysUserInfo>[]>([
  { type: "index", label: "#", width: 60 },
  {
    prop: "username",
    label: "用户名",
    width: 140,
    search: { el: "input", props: { placeholder: "搜索用户名" } }
  },
  { prop: "phone", label: "手机号", width: 140 },
  { prop: "role", label: "角色", width: 120 },
  { prop: "status", label: "状态", width: 90 },
  { prop: "isInitialPassword", label: "密码状态", width: 110 },
  { prop: "createTime", label: "创建时间", width: 170 },
  { prop: "operation", label: "操作", fixed: "right", width: 100 }
]);

// ========== 开通 ==========
const dialogVisible = ref(false);
const submitting = ref(false);
const formRef = ref<FormInstance>();
const form = reactive({ username: "", phone: "", code: "" });
const smsCountdown = ref(0);
let smsTimer: ReturnType<typeof setInterval> | null = null;

const rules: FormRules = {
  username: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    { min: 2, max: 30, message: "用户名长度 2-30 个字符", trigger: "blur" }
  ],
  phone: [
    { required: true, message: "请输入手机号", trigger: "blur" },
    { pattern: /^1[3-9]\d{9}$/, message: "请输入正确的手机号", trigger: "blur" }
  ],
  code: [{ required: true, message: "请输入验证码", trigger: "blur" }]
};

function openDialog() {
  Object.assign(form, { username: "", phone: "", code: "" });
  smsCountdown.value = 0;
  dialogVisible.value = true;
}

function startSmsCountdown() {
  smsCountdown.value = 60;
  if (smsTimer) clearInterval(smsTimer);
  smsTimer = setInterval(() => {
    smsCountdown.value--;
    if (smsCountdown.value <= 0 && smsTimer) {
      clearInterval(smsTimer);
      smsTimer = null;
    }
  }, 1000);
}

async function handleSendSms() {
  if (!form.phone || !/^1[3-9]\d{9}$/.test(form.phone)) {
    ElMessage.warning("请输入正确的手机号");
    return;
  }
  try {
    const res = await sendSmsCode(form.phone);
    ElMessage.success(`验证码已发送（演示：${res.data}）`);
    startSmsCountdown();
  } catch {
    // error handled by interceptor
  }
}

async function handleSubmit() {
  const valid = await formRef.value?.validate().catch(() => false);
  if (!valid) return;
  submitting.value = true;
  try {
    await createCanteenStaff({ username: form.username, phone: form.phone, code: form.code });
    ElMessage.success("开通成功");
    dialogVisible.value = false;
    proTable.value?.getTableList();
  } catch {
    // error handled by interceptor
  } finally {
    submitting.value = false;
  }
}

// ========== 注销 ==========
const deactivateVisible = ref(false);
const deactivateSubmitting = ref(false);
const deactivateTarget = ref<System.SysUserInfo | null>(null);
const deactivateCode = ref("");
const deactivateCountdown = ref(0);
let deactivateTimer: ReturnType<typeof setInterval> | null = null;

function openDeactivate(row: System.SysUserInfo) {
  deactivateTarget.value = row;
  deactivateCode.value = "";
  deactivateCountdown.value = 0;
  deactivateVisible.value = true;
}

function startDeactivateCountdown() {
  deactivateCountdown.value = 60;
  if (deactivateTimer) clearInterval(deactivateTimer);
  deactivateTimer = setInterval(() => {
    deactivateCountdown.value--;
    if (deactivateCountdown.value <= 0 && deactivateTimer) {
      clearInterval(deactivateTimer);
      deactivateTimer = null;
    }
  }, 1000);
}

async function handleDeactivateSendSms() {
  const phone = deactivateTarget.value?.phone;
  if (!phone) return;
  try {
    const res = await sendSmsCode(phone);
    ElMessage.success(`验证码已发送（演示：${res.data}）`);
    startDeactivateCountdown();
  } catch {
    // error handled by interceptor
  }
}

async function handleDeactivate() {
  if (!deactivateCode.value) {
    ElMessage.warning("请输入验证码");
    return;
  }
  deactivateSubmitting.value = true;
  try {
    await deactivateCanteenStaff({ userId: deactivateTarget.value!.id!, code: deactivateCode.value });
    ElMessage.success("注销成功");
    deactivateVisible.value = false;
    proTable.value?.getTableList();
  } catch {
    // error handled by interceptor
  } finally {
    deactivateSubmitting.value = false;
  }
}
</script>
