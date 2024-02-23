import { defineStore } from "pinia";
import { userType } from "./types";
export const useUserStore = defineStore({
  id: "userStore",
  state: (): userType => ({
    //登录token
    token: null,
    //登录用户信息
    userInfo: {},
    // 角色
    roles: [],
  }),
  getters: {},
  actions: {
    // 登录
    login(userInfo) {
      const { username, password } = userInfo;
      return new Promise(async (resolve, reject) => {
        this.token = username;
        this.userInfo = userInfo;
        await this.getRoles();
        resolve(username);
      });
    },
    // 获取用户授权角色信息，实际应用中 可以通过token通过请求接口在这里获取用户信息
    getRoles() {
      return new Promise((resolve, reject) => {
        // 获取权限列表 默认就是超级管理员，因为没有进行接口请求 写死
        this.roles = ["admin"];
        localStorage.roles = JSON.stringify(this.roles);
        resolve(this.roles);
      });
    },
    // 获取用户信息 ，如实际应用中 可以通过token通过请求接口在这里获取用户信息
    getInfo(roles) {
      return new Promise((resolve, reject) => {
        this.roles = roles;
        resolve(roles);
      });
    },
    // 退出
    logout() {
      return new Promise((resolve, reject) => {
        this.token = null;
        this.userInfo = {};
        this.roles = [];
        resolve(null);
      });
    },
  },
  // 进行持久化存储
  persist: {
    // 本地存储的名称
    key: "userState",
    //保存的位置
    storage: window.localStorage, //localstorage
  },
});
