<script setup lang="ts">
import { ElInput } from "element-plus";
import type { FormRules, FormInstance } from "element-plus";
import { ref, reactive, watch, computed } from "vue";
import "element-plus/es/components/input/style/css";
interface RuleForm {
  val?: string;
}
const props = withDefaults(
  defineProps<{
    defaultVal: string;
    initState: boolean;
    rules: Array<Object>;
  }>(),
  {
    defaultVal: () => "",
    initState: () => false,
    rules: () => [],
  }
);
const ruleFormRef = ref<FormInstance>();
const formRule = reactive<FormRules<RuleForm>>({ val: props.rules });
const emit = defineEmits(["edit", "sure", "cancel"]);
const inputVal = computed(() => props.defaultVal);
// const inputVal = ref<string>(props.defaultVal);
const isEdit = ref<boolean>(props.initState);
const eidtFuc = () => {
  isEdit.value = true;
  emit("edit");
};
const sureFuc = () => {
  ruleFormRef.value?.validate((valid) => {
    if (valid) {
      emit("sure", {
        val: ruleForm.val,
        cb: () => {
          isEdit.value = false;
        },
      });
    }
  });
};
const cancelFuc = () => {
  isEdit.value = false;
  emit("cancel");
};
const ruleForm = reactive<RuleForm>({});
watch(
  isEdit,
  (newVal) => {
    console.log("watch isEdit====", newVal);
    if (newVal) {
      ruleForm.val = inputVal.value;
      console.log("ruleForm===", ruleForm);
    }
  },
  {
    deep: true,
  }
);
</script>
<template>
  <div class="input-edit">
    <div v-if="!isEdit" class="show-wrap">
      <div class="show-val">{{ inputVal }}</div>
      <i-ep-Edit class="operate-icon" @click="eidtFuc"></i-ep-Edit>
    </div>
    <div v-else class="edit-wrap">
      <el-form
        class="rule-form"
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="formRule"
        label-width="0"
        @submit.native.prevent
      >
        <el-form-item label="" prop="val">
          <el-input v-model="ruleForm.val" />
        </el-form-item>
      </el-form>
      <i-ep-Select class="operate-icon" @click="sureFuc"></i-ep-Select>
      <i-ep-CloseBold class="operate-icon" @click="cancelFuc"></i-ep-CloseBold>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.input-edit {
  width: 100%;
  .show-wrap {
    width: 100%;
    display: flex;
    align-items: center;
    .show-val {
      max-width: calc(100% - 40px);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .edit-wrap {
    width: 100%;
    display: flex;
    align-items: center;
    .rule-form {
      max-width: calc(100% - 40px);

      ::v-deep .el-form-item {
        margin-bottom: 0;
      }
    }
  }
  .operate-icon {
    margin-left: 6px;
    cursor: pointer;
  }
}
</style>
