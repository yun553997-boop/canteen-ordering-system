import { d as defineComponent, r as ref, a as reactive, c as computed, o as onMounted, z as getUserInfo, s as showToast, e as switchTab, C as showModal, R as chooseImage, b as getToken, T as uploadFile, _ as _export_sfc, f as createBlock, w as withCtx, i as index$g, h as openBlock, j as createVNode, S as ScrollView, k as createElementBlock, F as Fragment, l as renderList, n as normalizeClass, m as createTextVNode, t as toDisplayString, q as index$q, u as index$i, U as index$j, v as index$x, x as createCommentVNode, Q as withModifiers, N as Input, V as index$7 } from "./index-Db_-Zx2q.js";
import { b as getDishList, c as updateDish, d as addDish, e as changeDishStatus, f as deleteDish } from "./admin.Dnnlhti-.js";
import { C as CustomTabBar } from "./CustomTabBar.B_Z01zND.js";
import "./request.Dl4B2NlH.js";
const pageSize = 10;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  setup(__props, { expose: __expose }) {
    __expose();
    const categories = [
      { label: "全部", value: "" },
      { label: "早餐", value: "早餐" },
      { label: "午餐", value: "午餐" },
      { label: "晚餐", value: "晚餐" },
      { label: "夜宵", value: "夜宵" }
    ];
    const catLabels = categories.filter((c) => c.value).map((c) => c.label);
    const filterCategory = ref("");
    const dishes = ref([]);
    const page = ref(1);
    const hasMore = ref(true);
    const dialogShow = ref(false);
    const editingId = ref(null);
    const form = reactive({
      name: "",
      category: "",
      price: 0,
      dailyLimit: 0,
      description: "",
      imageUrl: "",
      status: "ON"
    });
    const priceYuan = ref(0);
    const catIndex = computed(() => categories.findIndex((c) => c.value === form.category));
    onMounted(() => {
      const info = getUserInfo();
      if ((info == null ? void 0 : info.role) !== "ADMIN_CANTEEN") {
        showToast({ title: "无权限访问", icon: "none" });
        setTimeout(() => switchTab({ url: "/pages/index/index" }), 800);
        return;
      }
      fetchDishes();
    });
    async function fetchDishes() {
      try {
        const data = await getDishList({
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
      dialogShow.value = true;
    }
    function onCatChange(e) {
      var _a;
      const idx = e.detail.value;
      form.category = ((_a = categories[idx + 1]) == null ? void 0 : _a.value) || "";
    }
    async function handleSave() {
      if (!form.name) {
        showToast({ title: "请输入菜品名称", icon: "none" });
        return;
      }
      if (!form.category) {
        showToast({ title: "请选择分类", icon: "none" });
        return;
      }
      form.price = Math.round(priceYuan.value * 100);
      try {
        if (editingId.value) {
          await updateDish({ ...form, id: editingId.value });
          showToast({ title: "编辑成功", icon: "success" });
        } else {
          await addDish(form);
          showToast({ title: "新增成功", icon: "success" });
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
        await changeDishStatus(dish.id, newStatus);
        dish.status = newStatus;
        showToast({ title: newStatus === "ON" ? "已上架" : "已下架", icon: "success" });
      } catch {
      }
    }
    async function handleDelete(dish) {
      const res = await new Promise((resolve) => {
        showModal({ title: "确认删除", content: `删除【${dish.name}】？`, success: (r) => resolve(r.confirm) });
      });
      if (!res)
        return;
      try {
        await deleteDish(dish.id);
        showToast({ title: "已删除", icon: "success" });
        page.value = 1;
        fetchDishes();
      } catch {
      }
    }
    function chooseImage$1() {
      chooseImage({
        count: 1,
        sizeType: ["compressed"],
        success: (res) => {
          var _a;
          const tempPath = (_a = res.tempFilePaths) == null ? void 0 : _a[0];
          if (!tempPath)
            return;
          const token = getToken();
          uploadFile({
            url: "/api/v1/common/upload",
            filePath: tempPath,
            name: "file",
            header: { "canteen-token": token || "" },
            success: (uploadRes) => {
              try {
                const data = JSON.parse(uploadRes.data);
                if (data.code === 200 && data.data) {
                  form.imageUrl = data.data;
                  showToast({ title: "上传成功", icon: "success" });
                } else {
                  showToast({ title: data.message || "上传失败", icon: "none" });
                }
              } catch {
                showToast({ title: "上传失败", icon: "none" });
              }
            },
            fail: () => showToast({ title: "上传失败", icon: "none" })
          });
        }
      });
    }
    const __returned__ = { categories, catLabels, filterCategory, dishes, page, pageSize, hasMore, dialogShow, editingId, form, priceYuan, catIndex, fetchDishes, loadMore, openDialog, onCatChange, handleSave, toggleStatus, handleDelete, chooseImage: chooseImage$1, CustomTabBar };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_v_uni_view = index$g;
  const _component_v_uni_scroll_view = ScrollView;
  const _component_v_uni_image = index$q;
  const _component_v_uni_text = index$i;
  const _component_v_uni_switch = index$j;
  const _component_v_uni_button = index$x;
  const _component_v_uni_input = Input;
  const _component_v_uni_picker = index$7;
  return openBlock(), createBlock(_component_v_uni_view, { class: "dish-page" }, {
    default: withCtx(() => [
      createVNode(_component_v_uni_scroll_view, {
        class: "category-bar",
        "scroll-x": ""
      }, {
        default: withCtx(() => [
          (openBlock(), createElementBlock(
            Fragment,
            null,
            renderList($setup.categories, (cat) => {
              return createVNode(_component_v_uni_view, {
                key: cat.value,
                class: normalizeClass(["cat-item", { active: $setup.filterCategory === cat.value }]),
                onClick: ($event) => {
                  $setup.filterCategory = cat.value;
                  $setup.page = 1;
                  $setup.fetchDishes();
                }
              }, {
                default: withCtx(() => [
                  createTextVNode(
                    toDisplayString(cat.label),
                    1
                    /* TEXT */
                  )
                ]),
                _: 2
                /* DYNAMIC */
              }, 1032, ["class", "onClick"]);
            }),
            64
            /* STABLE_FRAGMENT */
          ))
        ]),
        _: 1
        /* STABLE */
      }),
      createVNode(_component_v_uni_scroll_view, {
        class: "dish-list",
        "scroll-y": "",
        onScrolltolower: $setup.loadMore
      }, {
        default: withCtx(() => [
          (openBlock(true), createElementBlock(
            Fragment,
            null,
            renderList($setup.dishes, (dish) => {
              return openBlock(), createBlock(
                _component_v_uni_view,
                {
                  key: dish.id,
                  class: "dish-card"
                },
                {
                  default: withCtx(() => [
                    createVNode(_component_v_uni_image, {
                      class: "dish-img",
                      src: dish.imageUrl || "/static/logo.png",
                      mode: "aspectFill"
                    }, null, 8, ["src"]),
                    createVNode(
                      _component_v_uni_view,
                      { class: "dish-info" },
                      {
                        default: withCtx(() => [
                          createVNode(
                            _component_v_uni_text,
                            { class: "dish-name" },
                            {
                              default: withCtx(() => [
                                createTextVNode(
                                  toDisplayString(dish.name),
                                  1
                                  /* TEXT */
                                )
                              ]),
                              _: 2
                              /* DYNAMIC */
                            },
                            1024
                            /* DYNAMIC_SLOTS */
                          ),
                          createVNode(
                            _component_v_uni_text,
                            { class: "dish-cat" },
                            {
                              default: withCtx(() => [
                                createTextVNode(
                                  toDisplayString(dish.category),
                                  1
                                  /* TEXT */
                                )
                              ]),
                              _: 2
                              /* DYNAMIC */
                            },
                            1024
                            /* DYNAMIC_SLOTS */
                          ),
                          createVNode(
                            _component_v_uni_view,
                            { class: "dish-meta" },
                            {
                              default: withCtx(() => [
                                createVNode(
                                  _component_v_uni_text,
                                  { class: "dish-price" },
                                  {
                                    default: withCtx(() => [
                                      createTextVNode(
                                        "¥" + toDisplayString((dish.price / 100).toFixed(2)),
                                        1
                                        /* TEXT */
                                      )
                                    ]),
                                    _: 2
                                    /* DYNAMIC */
                                  },
                                  1024
                                  /* DYNAMIC_SLOTS */
                                ),
                                createVNode(
                                  _component_v_uni_text,
                                  { class: "dish-limit" },
                                  {
                                    default: withCtx(() => [
                                      createTextVNode(
                                        "限量: " + toDisplayString(dish.dailyLimit || "--"),
                                        1
                                        /* TEXT */
                                      )
                                    ]),
                                    _: 2
                                    /* DYNAMIC */
                                  },
                                  1024
                                  /* DYNAMIC_SLOTS */
                                )
                              ]),
                              _: 2
                              /* DYNAMIC */
                            },
                            1024
                            /* DYNAMIC_SLOTS */
                          )
                        ]),
                        _: 2
                        /* DYNAMIC */
                      },
                      1024
                      /* DYNAMIC_SLOTS */
                    ),
                    createVNode(
                      _component_v_uni_view,
                      { class: "dish-actions" },
                      {
                        default: withCtx(() => [
                          createVNode(_component_v_uni_switch, {
                            checked: dish.status === "ON",
                            color: "#FF6B35",
                            onChange: ($event) => $setup.toggleStatus(dish)
                          }, null, 8, ["checked", "onChange"]),
                          createVNode(_component_v_uni_button, {
                            class: "edit-btn",
                            size: "mini",
                            onClick: ($event) => $setup.openDialog(dish)
                          }, {
                            default: withCtx(() => [
                              createTextVNode("编辑")
                            ]),
                            _: 2
                            /* DYNAMIC */
                          }, 1032, ["onClick"]),
                          createVNode(_component_v_uni_button, {
                            class: "del-btn",
                            size: "mini",
                            onClick: ($event) => $setup.handleDelete(dish)
                          }, {
                            default: withCtx(() => [
                              createTextVNode("删除")
                            ]),
                            _: 2
                            /* DYNAMIC */
                          }, 1032, ["onClick"])
                        ]),
                        _: 2
                        /* DYNAMIC */
                      },
                      1024
                      /* DYNAMIC_SLOTS */
                    )
                  ]),
                  _: 2
                  /* DYNAMIC */
                },
                1024
                /* DYNAMIC_SLOTS */
              );
            }),
            128
            /* KEYED_FRAGMENT */
          )),
          $setup.dishes.length === 0 ? (openBlock(), createBlock(_component_v_uni_view, {
            key: 0,
            class: "empty-tip"
          }, {
            default: withCtx(() => [
              createTextVNode("暂无菜品")
            ]),
            _: 1
            /* STABLE */
          })) : createCommentVNode("v-if", true)
        ]),
        _: 1
        /* STABLE */
      }),
      createVNode(_component_v_uni_view, {
        class: "fab-btn",
        onClick: _cache[0] || (_cache[0] = ($event) => $setup.openDialog())
      }, {
        default: withCtx(() => [
          createVNode(_component_v_uni_text, { class: "fab-icon" }, {
            default: withCtx(() => [
              createTextVNode("+")
            ]),
            _: 1
            /* STABLE */
          })
        ]),
        _: 1
        /* STABLE */
      }),
      $setup.dialogShow ? (openBlock(), createBlock(_component_v_uni_view, {
        key: 0,
        class: "modal-mask",
        onClick: _cache[7] || (_cache[7] = ($event) => $setup.dialogShow = false)
      }, {
        default: withCtx(() => [
          createVNode(_component_v_uni_view, {
            class: "modal-box",
            onClick: _cache[6] || (_cache[6] = withModifiers(() => {
            }, ["stop"]))
          }, {
            default: withCtx(() => [
              createVNode(_component_v_uni_text, { class: "modal-title" }, {
                default: withCtx(() => [
                  createTextVNode(
                    toDisplayString($setup.editingId ? "编辑菜品" : "新增菜品"),
                    1
                    /* TEXT */
                  )
                ]),
                _: 1
                /* STABLE */
              }),
              createVNode(_component_v_uni_scroll_view, {
                "scroll-y": "",
                class: "modal-body"
              }, {
                default: withCtx(() => [
                  createVNode(_component_v_uni_view, { class: "form-item" }, {
                    default: withCtx(() => [
                      createVNode(_component_v_uni_text, { class: "form-label" }, {
                        default: withCtx(() => [
                          createTextVNode("名称")
                        ]),
                        _: 1
                        /* STABLE */
                      }),
                      createVNode(_component_v_uni_input, {
                        modelValue: $setup.form.name,
                        "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $setup.form.name = $event),
                        class: "form-input",
                        placeholder: "菜品名称",
                        maxlength: "50"
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  createVNode(_component_v_uni_view, { class: "form-item" }, {
                    default: withCtx(() => [
                      createVNode(_component_v_uni_text, { class: "form-label" }, {
                        default: withCtx(() => [
                          createTextVNode("分类")
                        ]),
                        _: 1
                        /* STABLE */
                      }),
                      createVNode(_component_v_uni_picker, {
                        value: $setup.catIndex,
                        range: $setup.catLabels,
                        onChange: $setup.onCatChange
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_v_uni_view, { class: "form-picker" }, {
                            default: withCtx(() => [
                              createTextVNode(
                                toDisplayString($setup.form.category || "请选择"),
                                1
                                /* TEXT */
                              )
                            ]),
                            _: 1
                            /* STABLE */
                          })
                        ]),
                        _: 1
                        /* STABLE */
                      }, 8, ["value", "range"])
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  createVNode(_component_v_uni_view, { class: "form-item" }, {
                    default: withCtx(() => [
                      createVNode(_component_v_uni_text, { class: "form-label" }, {
                        default: withCtx(() => [
                          createTextVNode("价格 (元)")
                        ]),
                        _: 1
                        /* STABLE */
                      }),
                      createVNode(_component_v_uni_input, {
                        modelValue: $setup.priceYuan,
                        "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $setup.priceYuan = $event),
                        modelModifiers: { number: true },
                        class: "form-input",
                        type: "digit",
                        placeholder: "0.00"
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  createVNode(_component_v_uni_view, { class: "form-item" }, {
                    default: withCtx(() => [
                      createVNode(_component_v_uni_text, { class: "form-label" }, {
                        default: withCtx(() => [
                          createTextVNode("每日限量")
                        ]),
                        _: 1
                        /* STABLE */
                      }),
                      createVNode(_component_v_uni_input, {
                        modelValue: $setup.form.dailyLimit,
                        "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $setup.form.dailyLimit = $event),
                        modelModifiers: { number: true },
                        class: "form-input",
                        type: "number",
                        placeholder: "0 表示不限量"
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  createVNode(_component_v_uni_view, { class: "form-item" }, {
                    default: withCtx(() => [
                      createVNode(_component_v_uni_text, { class: "form-label" }, {
                        default: withCtx(() => [
                          createTextVNode("描述")
                        ]),
                        _: 1
                        /* STABLE */
                      }),
                      createVNode(_component_v_uni_input, {
                        modelValue: $setup.form.description,
                        "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => $setup.form.description = $event),
                        class: "form-input",
                        placeholder: "菜品描述",
                        maxlength: "200"
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  createVNode(_component_v_uni_view, { class: "form-item" }, {
                    default: withCtx(() => [
                      createVNode(_component_v_uni_text, { class: "form-label" }, {
                        default: withCtx(() => [
                          createTextVNode("图片")
                        ]),
                        _: 1
                        /* STABLE */
                      }),
                      createVNode(_component_v_uni_button, {
                        class: "upload-btn",
                        size: "mini",
                        onClick: $setup.chooseImage
                      }, {
                        default: withCtx(() => [
                          createTextVNode("选择图片")
                        ]),
                        _: 1
                        /* STABLE */
                      }),
                      $setup.form.imageUrl ? (openBlock(), createBlock(_component_v_uni_image, {
                        key: 0,
                        src: $setup.form.imageUrl,
                        class: "preview-img",
                        mode: "aspectFill"
                      }, null, 8, ["src"])) : createCommentVNode("v-if", true)
                    ]),
                    _: 1
                    /* STABLE */
                  })
                ]),
                _: 1
                /* STABLE */
              }),
              createVNode(_component_v_uni_view, { class: "modal-btns" }, {
                default: withCtx(() => [
                  createVNode(_component_v_uni_button, {
                    class: "modal-btn cancel",
                    size: "mini",
                    onClick: _cache[5] || (_cache[5] = ($event) => $setup.dialogShow = false)
                  }, {
                    default: withCtx(() => [
                      createTextVNode("取消")
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  createVNode(_component_v_uni_button, {
                    class: "modal-btn confirm",
                    size: "mini",
                    onClick: $setup.handleSave
                  }, {
                    default: withCtx(() => [
                      createTextVNode("保存")
                    ]),
                    _: 1
                    /* STABLE */
                  })
                ]),
                _: 1
                /* STABLE */
              })
            ]),
            _: 1
            /* STABLE */
          })
        ]),
        _: 1
        /* STABLE */
      })) : createCommentVNode("v-if", true),
      createVNode($setup["CustomTabBar"])
    ]),
    _: 1
    /* STABLE */
  });
}
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-aa10a24e"], ["__file", "D:/Wed-dev/xiangmulianxi/canteen-ordering-system/frontend-user/src/pages/canteen/dish/index.vue"]]);
export {
  index as default
};
