import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import alias from '@rollup/plugin-alias';
import path from 'path'


export default defineConfig(({command, mode}) => {
  if (command === "build") {
    return {
      base: './',
      plugins: [vue(), alias()],
      resolve: {
        alias: [
          {find: '@', replacement: path.resolve('src')},
          {find: 'api', replacement: path.resolve("src/api")},
          {find: 'views', replacement: path.resolve("src/views")},
          {find: 'utils', replacement: path.resolve("src/utils")},
          {find: 'router', replacement: path.resolve("src/router")},
          {find: 'store', replacement: path.resolve("src/store")},
          {find: 'components', replacement: path.resolve("src/views")}
        ]
      },
      outDir: 'dist',
      css: {
        preprocessorOptions: {
          sass: {
            modifyVars: {},
            javascriptEnabled: true
          }
        }
      }
    }
  } else {
    return {
      base: './',
      plugins: [vue(), alias()],
      resolve: {
        alias: [
          {find: '@', replacement: path.resolve('src')},
          {find: 'api', replacement: path.resolve("src/api")},
          {find: 'views', replacement: path.resolve("src/views")},
          {find: 'utils', replacement: path.resolve("src/utils")},
          {find: 'router', replacement: path.resolve("src/router")},
          {find: 'store', replacement: path.resolve("src/store")},
          {find: 'components', replacement: path.resolve("src/views")},
          {find: 'assets', replacement: path.resolve("src/assets")}
        ]
      },
      outDir: 'dist',
      server: {
        proxy: {
          "/api": {
            target: "http://localhost:8080/",
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, '')
          },
        }
      },
      css: {
        preprocessorOptions: {
          sass: {
            modifyVars: {},
            javascriptEnabled: true
          }
        }
      }
    }
  }
})
