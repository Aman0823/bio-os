"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      List: [
        { iconurl: "/static/workspace.png", title: "Workspace", bindTap: "workspace", num: 0 },
        { iconurl: "/static/工作流.png", title: "工作流", bindTap: "workflow", num: 0 },
        { iconurl: "/static/notebook.png", title: "NoteBook", bindTap: "notebook", num: 0 }
      ],
      workflowList: [
        { name: "workspace1", time: "2024-08-09", bindTap: "workspace" },
        { name: "workspace2", time: "2024-08-09", bindTap: "workspace2" }
      ]
    };
  },
  methods: {
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
    a: common_assets._imports_0,
    b: common_vendor.f($data.List, (item, index, i0) => {
      return {
        a: item.iconurl,
        b: common_vendor.t(item.title),
        c: common_vendor.t(item.num),
        d: index,
        e: common_vendor.o(($event) => $options.handleTap(item.bindTap), index)
      };
    }),
    c: common_vendor.f($data.workflowList, (item, index, i0) => {
      return {
        a: common_vendor.t(item.name),
        b: common_vendor.t(item.time),
        c: index,
        d: common_vendor.o(($event) => $options.handleTap(item.bindTap), index)
      };
    }),
    d: common_vendor.o((...args) => $options.onClickNew && $options.onClickNew(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
