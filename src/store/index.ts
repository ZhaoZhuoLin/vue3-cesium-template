import  {defineStore,createPinia} from "pinia"
// 引入持久化插件
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

export const Store = defineStore({
  id:"globalState",
  state: () => ({}),
  persist: {
    // 本地存储的名称
    key: 'globalState',
    //保存的位置
    storage: window.sessionStorage, //localstorage
  },
 })

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate)
export default pinia
