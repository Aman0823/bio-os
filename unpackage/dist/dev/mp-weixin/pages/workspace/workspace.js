"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      index: 0,
      array: ["按 访问时间 排序", "按 名称 排序", "按 创建时间 排序"],
      workflowList: [
        { name: "工作流1", time: "2024-08-09", bindTap: "workspace" },
        { name: "工作流2", time: "2024-08-09", bindTap: "workspace2" }
      ]
    };
  },
  methods: {
    bindPickerChange: function(e) {
      console.log("picker发送选择改变，携带值为", e.detail.value);
      this.index = e.detail.value;
    },
    onClickNew() {
      common_vendor.index.navigateTo({
        url: "/pages/newWorkspace/newWorkspace"
      });
      console.log("success, 选择创建方式");
    },
    workspace() {
      this.workflowList[0].time = (/* @__PURE__ */ new Date()).toLocaleString();
      console.log("success, 修改时间为: " + this.workflowList[0].time);
      console.log("Handling workspace tap");
    },
    workspace2() {
      this.workflowList[1].time = (/* @__PURE__ */ new Date()).toLocaleString();
      console.log("success, 修改时间为: " + this.workflowList[1].time);
      console.log("Handling workspace tap");
    },
    handleTap(bindTap) {
      if (bindTap === "workspace") {
        this.workspace();
      } else if (bindTap === "workspace2") {
        this.workspace2();
      }
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($data.array[$data.index]),
    b: common_vendor.o((...args) => $options.bindPickerChange && $options.bindPickerChange(...args)),
    c: $data.index,
    d: $data.array,
    e: common_assets._imports_0$1,
    f: common_vendor.f($data.workflowList, (item, index, i0) => {
      return {
        a: common_vendor.t(item.name),
        b: common_vendor.t(item.time),
        c: index,
        d: common_vendor.o(($event) => $options.handleTap(item.bindTap), index)
      };
    }),
    g: common_vendor.o((...args) => $options.onClickNew && $options.onClickNew(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
