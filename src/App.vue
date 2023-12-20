<script setup lang="ts">
// import inputEdit from "./components/input-edit.vue";
import { ref } from "vue";
// const edit = () => {
//   console.log("edit----");
// };
// const cancel = () => {
//   console.log("cancel----");
// };
// const sure = ({ val, cb }: { val: string; cb: () => void }) => {
//   console.log("sure----", val);
//   console.log("sure----", val === "111");
//   defaultVal.value = val;
//   cb();
// };
// const rules = [
//   {
//     required: true,
//     message: "Please input Activity name",
//     trigger: ["blur", "change"],
//   },
//   {
//     min: 3,
//     max: 5,
//     message: "Length should be 3 to 5",
//     trigger: ["blur", "change"],
//   },
// ];
let defaultVal = ref<string>("11111111");
</script>

<template>
  <div>{{ defaultVal }}</div>
  <!-- <inputEdit
    :defaultVal="defaultVal"
    :rules="rules"
    @edit="edit"
    @sure="sure"
    @cancel="cancel"
  /> -->
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
