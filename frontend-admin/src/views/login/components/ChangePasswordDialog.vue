<template>
  <el-dialog
    :model-value="visible"
    title="首次登录 · 请修改密码"
    width="460px"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
    @update:model-value="$emit('update:visible', $event)"
  >
    <el-alert
      type="warning"
      :closable="false"
      show-icon
      style="margin-bottom: 20px"
    >
      <template #title>
        当前为初始密码，为保障账号安全，请立即修改密码。
      </template>
    </el-alert>

    <el-form ref="formRef" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="新密码" prop="newPassword">
        <el-input
          v-model="form.newPassword"
          type="password"
          placeholder="请输入新密码"
          show-password
          autocomplete="new-password"
        />
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmPassword">
        <el-input
          v-model="form.confirmPassword"
          type="password"
          placeholder="请再次输入新密码"
          show-password
          autocomplete="new-password"
        />
      </el-form-item>
    </el-form>

    <div class="pwd-hint">
      <span>密码要求：</span>
      <ul>
        <li :class="form.newPassword.length >= 8 ? 'passed' : ''">至少 8 个字符</li>
        <li :class="/[A-Z]/.test(form.newPassword) ? 'passed' : ''">包含大写字母</li>
        <li :class="/[a-z]/.test(form.newPassword) ? 'passed' : ''">包含小写字母</li>
        <li :class="/[0-9]/.test(form.newPassword) ? 'passed' : ''">包含数字</li>
      </ul>
    </div>

    <template #footer>
      <el-button :loading="loading" type="primary" @click="handleSubmit">确认修改</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ElMessage } from "element-plus";
import type { FormInstance, FormRules } from "element-plus";
import { reactive, ref } from "vue";

import { changePasswordApi } from "@/api/modules/login";

const props = defineProps<{ visible: boolean }>();
const emit = defineEmits<{
  (e: "update:visible", v: boolean): void;
  (e: "success"): void;
}>();

const formRef = ref<FormInstance>();
const loading = ref(false);

const form = reactive({
  newPassword: "",
  confirmPassword: ""
});

const validateConfirmPassword = (_rule: any, value: string, callback: any) => {
  if (!value) {
    callback(new Error("请再次输入新密码"));
    return;
  }
  if (value !== form.newPassword) {
    callback(new Error("两次输入的密码不一致"));
    return;
  }
  callback();
};

const validateNewPassword = (_rule: any, value: string, callback: any) => {
  if (!value) {
    callback(new Error("请输入新密码"));
    return;
  }
  if (value.length < 8) {
    callback(new Error("密码长度至少 8 位"));
    return;
  }
  if (!/[A-Z]/.test(value)) {
    callback(new Error("密码需包含至少一个大写字母"));
    return;
  }
  if (!/[a-z]/.test(value)) {
    callback(new Error("密码需包含至少一个小写字母"));
    return;
  }
  if (!/[0-9]/.test(value)) {
    callback(new Error("密码需包含至少一个数字"));
    return;
  }
  callback();
};

const rules: FormRules = {
  newPassword: [{ required: true, validator: validateNewPassword, trigger: "blur" }],
  confirmPassword: [{ required: true, validator: validateConfirmPassword, trigger: "blur" }]
};

async function handleSubmit() {
  const valid = await formRef.value?.validate().catch(() => false);
  if (!valid) return;
  loading.value = true;
  try {
    await changePasswordApi({ newPassword: form.newPassword });
    ElMessage.success("密码修改成功");
    emit("update:visible", false);
    emit("success");
  } catch {
    // error handled by interceptor
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped lang="scss">
.pwd-hint {
  padding: 10px 0 0 80px;
  font-size: 13px;
  color: var(--el-text-color-secondary);

  ul {
    margin: 4px 0 0;
    padding-left: 16px;
    list-style: disc;

    li {
      line-height: 1.8;
      &.passed {
        color: var(--el-color-success);
      }
    }
  }
}
</style>
