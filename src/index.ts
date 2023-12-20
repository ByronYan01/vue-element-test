import type { App } from "vue";
import inputEdit from "./components/input-edit.vue";

export { inputEdit }; //实现按需引入

const components = [inputEdit];

const install = function (app: App) {
  components.forEach((component) => {
    app.component(component.name, component);
  });
};

export default { install }; // 实现批量引入
