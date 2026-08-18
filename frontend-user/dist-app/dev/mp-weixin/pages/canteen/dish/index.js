"use strict";
const common_vendor = require("../../../common/vendor.js");
const api_admin = require("../../../api/admin.js");
const utils_storage = require("../../../utils/storage.js");
const utils_url = require("../../../utils/url.js");
if (!Math) {
  CustomTabBar();
}
const CustomTabBar = () => "../../../components/CustomTabBar.js";
const pageSize = 10;
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const CATEGORY_MAP = {
      BREAKFAST: "早餐",
      LUNCH: "午餐",
      DINNER: "晚餐"
    };
    function catLabel(val) {
      return CATEGORY_MAP[val] || val;
    }
    const categories = [
      { label: "全部", value: "" },
      { label: "早餐", value: "BREAKFAST" },
      { label: "午餐", value: "LUNCH" },
      { label: "晚餐", value: "DINNER" }
    ];
    const filterCategory = common_vendor.ref("");
    const dishes = common_vendor.ref([]);
    const page = common_vendor.ref(1);
    const hasMore = common_vendor.ref(true);
    const dialogShow = common_vendor.ref(false);
    const editingId = common_vendor.ref(null);
    const showCatPicker = common_vendor.ref(false);
    const form = common_vendor.reactive({
      name: "",
      category: "",
      price: 0,
      dailyLimit: 0,
      description: "",
      imageUrl: "",
      status: "ON"
    });
    const priceYuan = common_vendor.ref(0);
    const errors = common_vendor.reactive({
      name: "",
      category: "",
      price: "",
      dailyLimit: ""
    });
    function clearErrors() {
      errors.name = "";
      errors.category = "";
      errors.price = "";
      errors.dailyLimit = "";
    }
    function validateForm() {
      clearErrors();
      let valid = true;
      if (!form.name || !form.name.trim()) {
        errors.name = "请输入菜品名称";
        valid = false;
      }
      if (!form.category) {
        errors.category = "请选择分类";
        valid = false;
      }
      if (!priceYuan.value || priceYuan.value <= 0) {
        errors.price = "请输入有效价格";
        valid = false;
      }
      if (form.dailyLimit == null || form.dailyLimit < 0) {
        errors.dailyLimit = "请输入每日限量";
        valid = false;
      }
      return valid;
    }
    common_vendor.onMounted(() => {
      const info = utils_storage.getUserInfo();
      if ((info == null ? void 0 : info.role) !== "ADMIN_CANTEEN") {
        common_vendor.index.showToast({ title: "无权限访问", icon: "none" });
        setTimeout(() => common_vendor.index.reLaunch({ url: "/pages/index/index" }), 800);
        return;
      }
      fetchDishes();
    });
    async function fetchDishes() {
      try {
        const data = await api_admin.getDishList({
          page: page.value,
          pageSize,
          category: filterCategory.value || void 0
        });
        const records = (data == null ? void 0 : data.records) || [];
        dishes.value = page.value === 1 ? records : [...dishes.value, ...records];
        hasMore.value = records.length >= pageSize;
      } catch {
        dishes.value = [];
      }
    }
    function loadMore() {
      if (!hasMore.value)
        return;
      page.value++;
      fetchDishes();
    }
    function openDialog(dish) {
      if (dish) {
        editingId.value = dish.id;
        Object.assign(form, dish);
        priceYuan.value = (dish.price || 0) / 100;
      } else {
        editingId.value = null;
        Object.assign(form, { name: "", category: "", price: 0, dailyLimit: 0, description: "", imageUrl: "", status: "ON" });
        priceYuan.value = 0;
      }
      clearErrors();
      dialogShow.value = true;
    }
    async function handleSave() {
      if (!validateForm())
        return;
      form.price = Math.round(priceYuan.value * 100);
      try {
        if (editingId.value) {
          await api_admin.updateDish({ ...form, id: editingId.value });
          common_vendor.index.showToast({ title: "编辑成功", icon: "success" });
        } else {
          await api_admin.addDish(form);
          common_vendor.index.showToast({ title: "新增成功", icon: "success" });
        }
        dialogShow.value = false;
        page.value = 1;
        fetchDishes();
      } catch {
      }
    }
    async function toggleStatus(dish) {
      const newStatus = dish.status === "ON" ? "OFF" : "ON";
      try {
        await api_admin.changeDishStatus(dish.id, newStatus);
        dish.status = newStatus;
        common_vendor.index.showToast({ title: newStatus === "ON" ? "已上架" : "已下架", icon: "success" });
      } catch {
      }
    }
    async function handleDelete(dish) {
      const res = await new Promise((resolve) => {
        common_vendor.index.showModal({ title: "确认删除", content: `删除【${dish.name}】？`, success: (r) => resolve(r.confirm) });
      });
      if (!res)
        return;
      try {
        await api_admin.deleteDish(dish.id);
        common_vendor.index.showToast({ title: "已删除", icon: "success" });
        page.value = 1;
        fetchDishes();
      } catch {
      }
    }
    function chooseImage() {
      common_vendor.index.chooseImage({
        count: 1,
        sizeType: ["compressed"],
        success: (res) => {
          var _a;
          const tempPath = (_a = res.tempFilePaths) == null ? void 0 : _a[0];
          if (!tempPath)
            return;
          const token = utils_storage.getToken();
          const uploadUrl = "http://192.168.126.220:8000/api/v1/common/upload";
          common_vendor.index.uploadFile({
            url: uploadUrl,
            filePath: tempPath,
            name: "file",
            header: { "canteen-token": token || "" },
            success: (uploadRes) => {
              try {
                const data = JSON.parse(uploadRes.data);
                if (data.code === 200 && data.data) {
                  form.imageUrl = data.data.url || data.data;
                  common_vendor.index.showToast({ title: "上传成功", icon: "success" });
                } else {
                  common_vendor.index.showToast({ title: data.message || "上传失败", icon: "none" });
                }
              } catch {
                common_vendor.index.showToast({ title: "上传失败", icon: "none" });
              }
            },
            fail: () => common_vendor.index.showToast({ title: "上传失败", icon: "none" })
          });
        }
      });
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(categories, (cat, k0, i0) => {
          return {
            a: common_vendor.t(cat.label),
            b: cat.value,
            c: filterCategory.value === cat.value ? 1 : "",
            d: common_vendor.o(($event) => {
              filterCategory.value = cat.value;
              page.value = 1;
              fetchDishes();
            }, cat.value)
          };
        }),
        b: common_vendor.f(dishes.value, (dish, k0, i0) => {
          return {
            a: common_vendor.unref(utils_url.resolveImageUrl)(dish.imageUrl) || "/static/logo.png",
            b: common_vendor.t(dish.name),
            c: common_vendor.t(catLabel(dish.category)),
            d: common_vendor.t((dish.price / 100).toFixed(2)),
            e: common_vendor.t(dish.dailyLimit || "--"),
            f: dish.status === "ON",
            g: common_vendor.o(($event) => toggleStatus(dish), dish.id),
            h: common_vendor.o(($event) => openDialog(dish), dish.id),
            i: common_vendor.o(($event) => handleDelete(dish), dish.id),
            j: dish.id
          };
        }),
        c: dishes.value.length === 0
      }, dishes.value.length === 0 ? {} : {}, {
        d: common_vendor.o(loadMore, "37"),
        e: common_vendor.o(($event) => openDialog(), "15"),
        f: dialogShow.value
      }, dialogShow.value ? common_vendor.e({
        g: common_vendor.t(editingId.value ? "编辑菜品" : "新增菜品"),
        h: errors.name ? 1 : "",
        i: common_vendor.o([($event) => form.name = $event.detail.value, ($event) => errors.name = ""], "3b"),
        j: form.name,
        k: errors.name
      }, errors.name ? {
        l: common_vendor.t(errors.name)
      } : {}, {
        m: errors.name ? 1 : "",
        n: common_vendor.t(catLabel(form.category) || "请选择分类"),
        o: !form.category ? 1 : "",
        p: errors.category ? 1 : "",
        q: common_vendor.o(($event) => showCatPicker.value = true, "09"),
        r: errors.category
      }, errors.category ? {
        s: common_vendor.t(errors.category)
      } : {}, {
        t: errors.category ? 1 : "",
        v: errors.price ? 1 : "",
        w: common_vendor.o([common_vendor.m(($event) => priceYuan.value = $event.detail.value, {
          number: true
        }), ($event) => errors.price = ""], "ab"),
        x: priceYuan.value,
        y: errors.price
      }, errors.price ? {
        z: common_vendor.t(errors.price)
      } : {}, {
        A: errors.price ? 1 : "",
        B: errors.dailyLimit ? 1 : "",
        C: common_vendor.o([common_vendor.m(($event) => form.dailyLimit = $event.detail.value, {
          number: true
        }), ($event) => errors.dailyLimit = ""], "bb"),
        D: form.dailyLimit,
        E: errors.dailyLimit
      }, errors.dailyLimit ? {
        F: common_vendor.t(errors.dailyLimit)
      } : {}, {
        G: errors.dailyLimit ? 1 : "",
        H: form.description,
        I: common_vendor.o(($event) => form.description = $event.detail.value, "ff"),
        J: common_vendor.o(chooseImage, "f4"),
        K: form.imageUrl
      }, form.imageUrl ? {
        L: common_vendor.unref(utils_url.resolveImageUrl)(form.imageUrl)
      } : {}, {
        M: showCatPicker.value
      }, showCatPicker.value ? {
        N: common_vendor.f(categories.filter((c) => c.value), (cat, k0, i0) => {
          return common_vendor.e({
            a: common_vendor.t(cat.label),
            b: form.category === cat.value
          }, form.category === cat.value ? {} : {}, {
            c: cat.value,
            d: form.category === cat.value ? 1 : "",
            e: common_vendor.o(($event) => {
              form.category = cat.value;
              showCatPicker.value = false;
            }, cat.value)
          });
        }),
        O: common_vendor.o(($event) => showCatPicker.value = false, "c0"),
        P: common_vendor.o(() => {
        }, "4c"),
        Q: common_vendor.o(($event) => showCatPicker.value = false, "58")
      } : {}, {
        R: common_vendor.o(($event) => dialogShow.value = false, "a3"),
        S: common_vendor.o(handleSave, "c2"),
        T: common_vendor.o(() => {
        }, "c7"),
        U: common_vendor.o(($event) => dialogShow.value = false, "13")
      }) : {});
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-aa10a24e"]]);
wx.createPage(MiniProgramPage);
