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
        <el-button type="primary" :icon="CirclePlus" @click="openDialog()">开通食堂账号</el-button>
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
        <el-button type="primary" link :icon="Edit" @click="openDialog(scope.row)">编辑</el-button>
        <el-button type="danger" link :icon="Delete" disabled title="暂不支持">删除</el-button>
      </template>
    </ProTable>

    <!-- 开通 / 编辑食堂管理员账号弹窗 -->
    <el-dialog
      v-model="dialogVisible"
      :title="editingId ? '编辑食堂管理员' : '开通食堂管理员账号'"
      width="480px"
      :close-on-click-modal="false"
      destroy-on-close
    >
      <el-form ref="formRef" :model="form" :rules="rules" label-width="90px">
        <el-form-item label="用户名" prop="username">
          <el-input
            v-model="form.username"
            placeholder="请输入用户名 / 工号"
            maxlength="30"
            :disabled="!!editingId"
          />
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input
            v-model="form.phone"
            placeholder="请输入手机号"
            maxlength="11"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" :loading="submitting" :disabled="!hasChanged" @click="handleSubmit">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts" name="systemUser">
import { CirclePlus, Delete, Edit } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import type { FormInstance, FormRules } from "element-plus";
import { computed, reactive, ref } from "vue";

import { System } from "@/api/interface";
import { createCanteenStaff, getSystemUserList } from "@/api/modules/system";
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
  { prop: "operation", label: "操作", fixed: "right", width: 140 }
]);

// 新增 / 编辑弹窗
const dialogVisible = ref(false);
const submitting = ref(false);
const editingId = ref<number | null>(null);
const originalPhone = ref("");
const formRef = ref<FormInstance>();
const defaultForm = { username: "", phone: "" };
const form = reactive({ ...defaultForm });

// 编辑模式下内容是否有变化
const hasChanged = computed(() => {
  if (!editingId.value) return true; // 新增模式始终允许确认
  return form.phone !== originalPhone.value;
});

const rules: FormRules = {
  username: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    { min: 2, max: 30, message: "用户名长度 2-30 个字符", trigger: "blur" }
  ],
  phone: [
    { required: true, message: "请输入手机号", trigger: "blur" },
    { pattern: /^1[3-9]\d{9}$/, message: "请输入正确的手机号", trigger: "blur" }
  ]
};

function openDialog(row?: System.SysUserInfo) {
  if (row) {
    editingId.value = row.id!;
    form.username = row.username;
    form.phone = row.phone;
    originalPhone.value = row.phone;
  } else {
    editingId.value = null;
    originalPhone.value = "";
    Object.assign(form, defaultForm);
  }
  dialogVisible.value = true;
}

async function handleSubmit() {
  const valid = await formRef.value?.validate().catch(() => false);
  if (!valid) return;
  submitting.value = true;
  try {
    await createCanteenStaff({ username: form.username, phone: form.phone });
    ElMessage.success(editingId.value ? "编辑成功" : "开通成功");
    dialogVisible.value = false;
    proTable.value?.getTableList();
  } catch {
    // error handled by interceptor
  } finally {
    submitting.value = false;
  }
}
</script>
