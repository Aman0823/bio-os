"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      index1: 0,
      index2: 0,
      array1: ["全部", "安全消息", "产品消息", "财务消息", "运维消息", "活动消息", "数据汇总"],
      array2: ["全部消息", "未读", "已读"],
      messageList: [
        { kind: "消息提醒", dot: 1, content: "说明文字" },
        { kind: "消息提醒", dot: 1, content: "说明文字" },
        { kind: "消息提醒", dot: 0, content: "说明文字" },
        { kind: "消息提醒", dot: 0, content: "说明文字" },
        { kind: "消息提醒", dot: 0, content: "说明文字" },
        { kind: "消息提醒", dot: 0, content: "说明文字" }
      ]
    };
  },
  methods: {
    bindPickerChange1: function(e) {
      console.log("picker发送选择改变，携带值为", e.detail.value);
      this.index1 = e.detail.value;
    },
    bindPickerChange2: function(e) {
      console.log("picker发送选择改变，携带值为", e.detail.value);
      this.index2 = e.detail.value;
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($data.array1[$data.index1]),
    b: common_vendor.o((...args) => $options.bindPickerChange1 && $options.bindPickerChange1(...args)),
    c: $data.index1,
    d: $data.array1,
    e: common_assets._imports_0$1,
    f: common_vendor.t($data.array2[$data.index2]),
    g: common_vendor.o((...args) => $options.bindPickerChange2 && $options.bindPickerChange2(...args)),
    h: $data.index2,
    i: $data.array2,
    j: common_assets._imports_0$1,
    k: common_vendor.f($data.messageList, (item, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t(item.kind),
        b: item.dot
      }, item.dot ? {} : {}, {
        c: common_vendor.t(item.content),
        d: index
      });
    }),
    l: common_assets._imports_1$1
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
