<template>
  <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" size="large">
    <el-form-item prop="username">
      <el-input v-model="loginForm.username" placeholder="请输入用户名 / 工号">
        <template #prefix>
          <el-icon class="el-input__icon">
            <user />
          </el-icon>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input v-model="loginForm.password" type="password" placeholder="请输入密码" show-password autocomplete="new-password">
        <template #prefix>
          <el-icon class="el-input__icon">
            <lock />
          </el-icon>
        </template>
      </el-input>
    </el-form-item>
  </el-form>
  <div class="login-btn">
    <el-button :icon="CircleClose" round size="large" @click="resetForm(loginFormRef)"> 重置 </el-button>
    <el-button :icon="UserFilled" round size="large" type="primary" :loading="loading" @click="login(loginFormRef)">
      登录
    </el-button>
  </div>

  <!-- 首次登录强制修改密码 -->
  <ChangePasswordDialog
    v-model:visible="changePwdVisible"
    @success="onPasswordChanged"
  />
</template>

<script setup lang="ts">
import { CircleClose, UserFilled } from "@element-plus/icons-vue";
import type { ElForm } from "element-plus";
import { ElNotification } from "element-plus";
import { onBeforeUnmount, onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";

import { Login } from "@/api/interface";
import { loginApi } from "@/api/modules/login";
import { HOME_URL } from "@/config";
import { initStaticMenu } from "@/routers/index";
import { useKeepAliveStore } from "@/stores/modules/keepAlive";
import { useTabsStore } from "@/stores/modules/tabs";
import { useUserStore } from "@/stores/modules/user";

import ChangePasswordDialog from "./ChangePasswordDialog.vue";

const router = useRouter();
const userStore = useUserStore();
const tabsStore = useTabsStore();
const keepAliveStore = useKeepAliveStore();

type FormInstance = InstanceType<typeof ElForm>;
const loginFormRef = ref<FormInstance>();

const loginRules = reactive({
  username: [{ required: true, message: "请输入用户名 / 工号", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }]
});

const loading = ref(false);
const loginForm = reactive<Login.ReqLoginForm>({
  username: "",
  password: ""
});

// 首次改密码弹窗
const changePwdVisible = ref(false);

// login
const login = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(async valid => {
    if (!valid) return;
    loading.value = true;
    try {
      const { data } = await loginApi({ ...loginForm });
      userStore.setToken(data.token);
      userStore.setUserInfo({
        name: data.username,
        role: data.role,
        username: data.username
      });

      // 初始化静态菜单
      initStaticMenu();

      // 清空 tabs、keepAlive 数据
      tabsStore.setTabs([]);
      keepAliveStore.setKeepAliveName([]);

      // 首次登录强制修改密码
      if (data.isInitialPassword === 1) {
        changePwdVisible.value = true;
        return;
      }

      // 跳转到首页
      router.push(HOME_URL);
      ElNotification({
        title: "登录成功",
        message: `欢迎回来，${data.username}`,
        type: "success",
        duration: 3000
      });
    } finally {
      loading.value = false;
    }
  });
};

// 密码修改成功后自动跳转首页
const onPasswordChanged = () => {
  router.push(HOME_URL);
};

// resetForm
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};

onMounted(() => {
  document.onkeydown = (e: KeyboardEvent) => {
    if (e.code === "Enter" || e.code === "enter" || e.code === "NumpadEnter") {
      if (loading.value) return;
      login(loginFormRef.value);
    }
  };
});

onBeforeUnmount(() => {
  document.onkeydown = null;
});
</script>

<style scoped lang="scss">
@use "../index";
</style>
