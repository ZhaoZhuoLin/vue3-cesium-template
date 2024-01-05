import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  //配置别名
  resolve:{
    alias:{
      '@': path.resolve(__dirname, './src'),
      'static':path.resolve('public/static'),
    }
  },
  //启动服务配置
  server:{ 
    open:true,
    cors: true,
     // 代理跨域（模拟示例）
     proxy: {
      // "/api": {
      //   target: "", // easymock
      //   changeOrigin: true,
      //   rewrite: path => path.replace(/^\/api/, "")
      // }
    }
  }
})
