<template>
  <div class="table-box">
    <ProTable
      ref="proTable"
      title="操作日志"
      :columns="columns"
      :request-api="getTableList"
      :data-callback="dataCallback"
    >
      <template #module="scope">
        <el-tag size="small" type="info">{{ scope.row.module }}</el-tag>
      </template>
      <template #action="scope">
        <el-tag size="small" :type="actionType(scope.row.action)">{{ scope.row.action }}</el-tag>
      </template>
      <template #result="scope">
        <el-tag size="small" :type="scope.row.result === '成功' ? 'success' : 'danger'">
          {{ scope.row.result }}
        </el-tag>
      </template>
      <template #costTime="scope">
        <span>{{ scope.row.costTime }}ms</span>
      </template>
    </ProTable>
  </div>
</template>

<script setup lang="ts" name="systemLog">
import { reactive, ref } from "vue";

import { getOperationLogList, OperationLog } from "@/api/modules/log";
import ProTable from "@/components/ProTable/index.vue";
import { ColumnProps, ProTableInstance } from "@/components/ProTable/interface";

const proTable = ref<ProTableInstance>();

const dataCallback = (data: any) => {
  const inner = data.data || data;
  return {
    list: inner.records || inner.list || [],
    total: inner.total || 0
  };
};

const getTableList = (params: any) => {
  const { pageNum, pageSize, ...rest } = params;
  return getOperationLogList({ page: pageNum, pageSize, ...rest });
};

type TagType = "success" | "info" | "warning" | "danger" | "primary";

const actionTypeMap: Record<string, TagType> = {
  新增菜品: "info",
  编辑菜品: "info",
  删除菜品: "danger",
  上下架菜品: "warning",
  核销订单: "success",
  开始备餐: "primary",
  备餐完成: "success",
  提交订单: "info",
  开通食堂账号: "success",
};

function actionType(action: string): TagType {
  return actionTypeMap[action] || "info";
}

const columns = reactive<ColumnProps<OperationLog>[]>([
  { type: "index", label: "#", width: 60 },
  { prop: "createTime", label: "操作时间", width: 170 },
  { prop: "module", label: "模块", width: 100 },
  { prop: "action", label: "操作", width: 120 },
  {
    prop: "operatorName",
    label: "操作人",
    width: 120,
    search: { el: "input", props: { placeholder: "搜索操作人" } }
  },
  { prop: "result", label: "结果", width: 80 },
  { prop: "costTime", label: "耗时", width: 80 },
]);
</script>

<style scoped>
.param-json {
  margin: 0;
  padding: 8px;
  background: #f5f7fa;
  border-radius: 4px;
  font-size: 12px;
  max-height: 300px;
  overflow-y: auto;
  white-space: pre-wrap;
  word-break: break-all;
}
.no-param {
  color: var(--el-text-color-placeholder);
}
</style>
