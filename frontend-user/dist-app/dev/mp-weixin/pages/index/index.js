"use strict";
const common_vendor = require("../../common/vendor.js");
const api_user = require("../../api/user.js");
const api_wallet = require("../../api/wallet.js");
const utils_storage = require("../../utils/storage.js");
const utils_url = require("../../utils/url.js");
if (!Math) {
  CustomTabBar();
}
const CustomTabBar = () => "../../components/CustomTabBar.js";
const defaultImg = "/static/logo.png";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const mealTypes = [
      { label: "早餐", value: "BREAKFAST" },
      { label: "午餐", value: "LUNCH" },
      { label: "晚餐", value: "DINNER" }
    ];
    const currentMeal = common_vendor.ref("LUNCH");
    const dishes = common_vendor.ref([]);
    const cart = common_vendor.reactive([]);
    const bottomOffset = common_vendor.ref(50);
    const cartTotalCount = common_vendor.computed(() => cart.reduce((s, i) => s + i.quantity, 0));
    const cartTotalPrice = common_vendor.computed(() => cart.reduce((s, i) => s + i.dish.price * i.quantity, 0));
    const showPayPanel = common_vendor.ref(false);
    const walletBalance = common_vendor.ref(0);
    function getQuantity(dishId) {
      var _a;
      return ((_a = cart.find((c) => c.dish.id === dishId)) == null ? void 0 : _a.quantity) || 0;
    }
    function addToCart(dish) {
      if (dish.stock <= 0)
        return;
      const exist = cart.find((c) => c.dish.id === dish.id);
      if (exist) {
        if (exist.quantity < dish.stock)
          exist.quantity++;
      } else {
        cart.push({ dish, quantity: 1 });
      }
    }
    function removeFromCart(dish) {
      const idx = cart.findIndex((c) => c.dish.id === dish.id);
      if (idx === -1)
        return;
      if (cart[idx].quantity > 1) {
        cart[idx].quantity--;
      } else {
        cart.splice(idx, 1);
      }
    }
    function clearCart() {
      cart.splice(0, cart.length);
    }
    async function fetchDishes() {
      try {
        const data = await api_user.getUserDishes(currentMeal.value);
        dishes.value = data || [];
      } catch {
        dishes.value = [];
      }
    }
    async function switchMeal(meal) {
      if (currentMeal.value === meal)
        return;
      currentMeal.value = meal;
      clearCart();
      await fetchDishes();
    }
    async function submitOrder() {
      const token = utils_storage.getToken();
      if (!token) {
        common_vendor.index.showToast({ title: "请先登录", icon: "none" });
        setTimeout(() => {
          common_vendor.index.reLaunch({ url: "/pages/login/index" });
        }, 800);
        return;
      }
      if (cart.length === 0) {
        common_vendor.index.showToast({ title: "请选择菜品", icon: "none" });
        return;
      }
      try {
        const data = await api_wallet.getWalletBalance();
        walletBalance.value = data.balance ?? 0;
      } catch {
        walletBalance.value = 0;
      }
      showPayPanel.value = true;
    }
    async function confirmPay() {
      const payload = {
        mealType: currentMeal.value,
        items: cart.map((c) => ({
          dishId: c.dish.id,
          quantity: c.quantity
        }))
      };
      try {
        await api_user.submitOrder(payload);
        showPayPanel.value = false;
        common_vendor.index.showToast({ title: "订餐成功", icon: "success" });
        clearCart();
      } catch {
        showPayPanel.value = false;
      }
    }
    function goRecharge() {
      showPayPanel.value = false;
      common_vendor.index.navigateTo({ url: "/pages/wallet/index" });
    }
    common_vendor.onMounted(() => {
      var _a;
      const info = common_vendor.index.getSystemInfoSync();
      bottomOffset.value = (((_a = info.safeAreaInsets) == null ? void 0 : _a.bottom) || 0) + 50;
      fetchDishes();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(mealTypes, (meal, k0, i0) => {
          return {
            a: common_vendor.t(meal.label),
            b: meal.value,
            c: currentMeal.value === meal.value ? 1 : "",
            d: common_vendor.o(($event) => switchMeal(meal.value), meal.value)
          };
        }),
        b: common_vendor.f(dishes.value, (dish, k0, i0) => {
          return common_vendor.e({
            a: common_vendor.unref(utils_url.resolveImageUrl)(dish.imageUrl) || defaultImg,
            b: common_vendor.t(dish.name),
            c: common_vendor.t(dish.description),
            d: common_vendor.t((dish.price / 100).toFixed(2)),
            e: common_vendor.t(dish.stock),
            f: dish.stock === 0
          }, dish.stock === 0 ? {} : common_vendor.e({
            g: getQuantity(dish.id) > 0
          }, getQuantity(dish.id) > 0 ? {
            h: common_vendor.o(($event) => removeFromCart(dish), dish.id)
          } : {}, {
            i: getQuantity(dish.id) > 0
          }, getQuantity(dish.id) > 0 ? {
            j: common_vendor.t(getQuantity(dish.id))
          } : {}, {
            k: getQuantity(dish.id) >= dish.stock,
            l: common_vendor.o(($event) => addToCart(dish), dish.id)
          }), {
            m: dish.id
          });
        }),
        c: dishes.value.length === 0
      }, dishes.value.length === 0 ? {} : {}, {
        d: bottomOffset.value + 60 + "px",
        e: cartTotalCount.value > 0
      }, cartTotalCount.value > 0 ? {
        f: common_vendor.t(cartTotalCount.value),
        g: common_vendor.t((cartTotalPrice.value / 100).toFixed(2)),
        h: common_vendor.o(submitOrder, "c2"),
        i: bottomOffset.value + "px"
      } : {}, {
        j: showPayPanel.value
      }, showPayPanel.value ? common_vendor.e({
        k: common_vendor.t((cartTotalPrice.value / 100).toFixed(2)),
        l: common_vendor.t((walletBalance.value / 100).toFixed(2)),
        m: walletBalance.value >= cartTotalPrice.value
      }, walletBalance.value >= cartTotalPrice.value ? {
        n: common_vendor.o(confirmPay, "a1")
      } : {
        o: common_vendor.o(goRecharge, "8a")
      }, {
        p: common_vendor.o(() => {
        }, "2a"),
        q: common_vendor.o(($event) => showPayPanel.value = false, "a6")
      }) : {});
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-83a5a03c"]]);
wx.createPage(MiniProgramPage);
