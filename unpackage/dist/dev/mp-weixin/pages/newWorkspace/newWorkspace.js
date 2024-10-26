"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      newList: [
        {
          imgUrl: "https://lf-cdn-tos.bytescm.com/obj/static/bioos-web-prod/static/image/new-workspce-blank.667f246f.png",
          title: "创建空白 Workspace",
          content: "填写名称、描述即可创建空白 Workspace",
          bindTap: "newMargin"
        },
        {
          imgUrl: "https://lf-cdn-tos.bytescm.com/obj/static/bioos-web-prod/static/image/new-workspce-digger.6cc5534b.png",
          title: "从公共 Workspace 内复制",
          content: "可从公共 Workspace 快速复制至 Workspace",
          bindTap: "newCopy"
        },
        {
          imgUrl: "https://lf-cdn-tos.bytescm.com/obj/static/bioos-web-prod/static/image/new-workspace-schema.a2587c3b.png",
          title: "导入 Workspace 文件",
          content: "通过导入压缩文件构建Workspace",
          bindTap: "newUpload"
        }
      ]
    };
  },
  methods: {}
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.newList, (item, index, i0) => {
      return {
        a: item.imgUrl,
        b: common_vendor.t(item.title),
        c: common_vendor.t(item.content),
        d: index,
        e: common_vendor.o(($event) => _ctx.handleTap(item.bindTap), index)
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
