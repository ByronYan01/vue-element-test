import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import dts from 'vite-plugin-dts'
const pathSrc = path.resolve(__dirname, "src");
// https://vitejs.dev/config/
export default defineConfig(() => {
  const r = (p: string) => path.resolve(__dirname, p);
  return {
    plugins: [
      vue(),
      dts(),
      AutoImport({
        resolvers: [ElementPlusResolver(), IconsResolver()],
        dts: path.resolve(pathSrc, "auto-imports.d.ts"),
      }),
      Components({
        resolvers: [
          // Auto register icon components
          // 自动注册图标组件
          IconsResolver({
            enabledCollections: ["ep"],
          }),
          // Auto register Element Plus components
          // 自动导入 Element Plus 组件
          ElementPlusResolver(),
        ],

        dts: path.resolve(pathSrc, "components.d.ts"),
      }),
      Icons({
        autoInstall: true,
      }),
    ],
    resolve: {
      alias: [{ find: "@", replacement: r("./src") }],
    },
    css: {
      preprocessorOptions: {
        scss: {
          // 两种方式都可以
          // additionalData: '@import "@/assets/scss/global.scss";',
          // additionalData: '@use "@/assets/scss/global.scss" as *;'
        },
      },
    },
    build: {
      emptyOutDir: false, // 避免dist被清空
      lib: {
        entry: "./src/index.ts",
        name: "vue-element-test",
        fileName: "vue-element-test",
        // formats: ['es'],
      },
      rollupOptions: {
        // 把不想打包进你的包的包排除掉
        external: ["vue"],
        output: {
          // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
          globals: {
            vue: "Vue",
          },
        },
      },
    },
  };
});
