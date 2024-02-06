<script setup lange="ts">
import { ref, watch, reactive,watchEffect  } from "vue";
const age = ref(18);

function ageAdd() {
  age.value += 1;
}

watch(age, (newVal, oldValue) => {
  console.log(newVal);
});

const x = ref(0);
const y = ref(0);
watch(
  () => x.value + y.value,
  (sum) => {
    console.log(sum);
  }
);

const obj = reactive({
  name: "123",
  age: 18,
  money:100,
});

watch(
  obj,
  (newVal, oldValue) => {
    console.log(newVal);
  },
  { deep: true }
);

const updateAge = () => {
  obj.age+=1;
};


watchEffect(async ()=>{
    console.log("age增加,金额增加")
     obj.money = obj.age*10000
})
let buttonAge = ref()
console.log(buttonAge) 
</script>
<template>
  <div>
    <h1>监听ref</h1>
    你的年龄:{{ age }}
    <button @click="ageAdd">长大啦</button>
    <br />
    <h1>监听getter函数</h1>
    x: <input type="text" v-model="x" /> y: <input type="text" v-model="y" />
    <h1>监听对象深层次</h1>
    名称 {{ obj.name }} 年龄 {{ obj.age }} 成绩{{obj.money}}
    <button ref="buttonAge" @click="updateAge">修改年龄</button>
  </div>
</template>
<style scoped></style>
