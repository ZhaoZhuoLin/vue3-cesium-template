/*
 * @Author: FlyZhao 46128378+zhaoZhuolin@users.noreply.github.com
 * @Date: 2024-01-05 14:38:17
 * @LastEditors: FlyZhao 46128378+zhaoZhuolin@users.noreply.github.com
 * @LastEditTime: 2024-01-23 16:54:35
 * @FilePath: \vite-vue-cesium-template\vite.config.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import ElementPlus from 'unplugin-element-plus/vite'
import cesium from "vite-plugin-cesium";

// https://vitejs.dev/config/
export default defineConfig({
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
