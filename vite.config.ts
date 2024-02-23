import path from 'path'
import { defineConfig,UserConfig,ConfigEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import ElementPlus from 'unplugin-element-plus/vite'
import cesium from "vite-plugin-cesium";

// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  return {
    base: "./",
    plugins: [
      vue(),
      cesium(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
      ElementPlus({
        defaultLocale: 'zh-cn'
      })
    ],
    //配置别名 
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        'static': path.resolve('public/static'),
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "./src/styles/index.scss" as *;`,
        },
      },
    },
    //启动服务配置
    server: {
      open: true,
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
  }
})
