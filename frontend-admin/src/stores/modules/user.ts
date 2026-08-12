import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore(
  "geeker-user",
  () => {
    const token = ref<string>("");
    const setToken = (newToken: string) => {
      token.value = newToken;
    };

    const userInfo = ref<{ name: string; role?: string; username?: string }>({ name: "" });
    const setUserInfo = (info: { name: string; role?: string; username?: string }) => {
      userInfo.value = info;
    };

    return {
      token,
      userInfo,
      setToken,
      setUserInfo
    };
  },
  {
    persist: {
      key: "geeker-user",
      storage: localStorage
    }
  }
);
