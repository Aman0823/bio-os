"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      isLogin: true,
      userId: "",
      password: "",
      rePassword: "",
      errorMessage: ""
    };
  },
  methods: {
    toggleForm() {
      this.isLogin = !this.isLogin;
      this.resetForm();
    },
    resetForm() {
      this.userId = "";
      this.password = "";
      this.rePassword = "";
      this.errorMessage = "";
    },
    login() {
      if (this.validateLogin()) {
        common_vendor.index.request({
          url: "http://localhost:5000/login",
          method: "POST",
          data: {
            userId: this.userId,
            password: this.password
          },
          success: (res) => {
            if (res.data.success) {
              console.log("登录成功！", res.data);
              common_vendor.index.redirectTo({
                url: "/pages/home/home"
              });
            } else {
              console.log("准备发送的登录数据:", {
                userId: this.userId,
                password: this.password
              });
              this.errorMessage = res.data.message || "登录失败，请重试";
              console.log(res.data);
            }
          },
          fail: (err) => {
            this.errorMessage = "请求失败，请检查网络";
            console.error(err);
          }
        });
      }
    },
    register() {
      if (this.validateRegister()) {
        common_vendor.index.request({
          url: "http://localhost:5000/register",
          // 替换为你的注册接口  
          method: "POST",
          header: {
            "Content-Type": "application/json"
          },
          data: {
            userId: this.userId,
            password: this.password
          },
          success: (res) => {
            if (res.data.success) {
              console.log("注册成功！", res.data);
              common_vendor.index.redirectTo({
                url: "/pages/home/home"
              });
            } else {
              console.log("准备发送的登录数据:", {
                userId: this.userId,
                password: this.password
              });
              this.errorMessage = res.data.message || "注册失败，请重试";
            }
          },
          fail: (err) => {
            this.errorMessage = "请求失败，请检查网络";
            console.error(err);
          }
        });
      }
    },
    validateLogin() {
      if (this.userId.length !== 10) {
        this.errorMessage = "用户ID必须为10位";
        return false;
      }
      if (this.password.length < 6 || this.password.length > 16 || !this.password) {
        this.errorMessage = "密码长度必须为6-16位且不能为空";
        return false;
      }
      this.errorMessage = "";
      return true;
    },
    validateRegister() {
      if (this.userId.length !== 10) {
        this.errorMessage = "用户ID必须为10位";
        return false;
      }
      if (this.password.length < 6 || this.password.length > 16 || !this.password) {
        this.errorMessage = "密码长度必须为6-16位且不能为空";
        return false;
      }
      if (this.password !== this.rePassword) {
        this.errorMessage = "两次输入的密码不一致";
        return false;
      }
      this.errorMessage = "";
      return true;
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.isLogin
  }, $data.isLogin ? {
    b: $data.userId,
    c: common_vendor.o(($event) => $data.userId = $event.detail.value),
    d: $data.password,
    e: common_vendor.o(($event) => $data.password = $event.detail.value),
    f: common_vendor.o((...args) => $options.login && $options.login(...args)),
    g: common_vendor.o((...args) => $options.toggleForm && $options.toggleForm(...args))
  } : {
    h: $data.userId,
    i: common_vendor.o(($event) => $data.userId = $event.detail.value),
    j: $data.password,
    k: common_vendor.o(($event) => $data.password = $event.detail.value),
    l: $data.rePassword,
    m: common_vendor.o(($event) => $data.rePassword = $event.detail.value),
    n: common_vendor.o((...args) => $options.register && $options.register(...args)),
    o: common_vendor.o((...args) => $options.toggleForm && $options.toggleForm(...args))
  }, {
    p: $data.errorMessage
  }, $data.errorMessage ? {
    q: common_vendor.t($data.errorMessage)
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
