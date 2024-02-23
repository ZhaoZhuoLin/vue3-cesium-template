module.exports = {
  "root": true,
  "env": {
    "browser": true,
    "es2021": true,
    "node": true
  },
  //指定优先解析语法
  "parser": "vue-eslint-parser",
  //低于parse的语法解析配置
  "parserOptions": {
    "parser": "@typescript-eslint/parser",
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  //继承已有的规则
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:vue/vue3-essential"
  ],
  "overrides": [{
    "env": {
      "node": true
    },
    "files": [
      ".eslintrc.{js,cjs}"
    ],
    "parserOptions": {
      "sourceType": "script"
    }
  }],
  "plugins": [
    "@typescript-eslint",
    "vue"
  ],
  "rules": {
    //eslint (http://eslint.cn/docs/rules)
    "no-var": "error", // 要求使用 let 或 const 而不是 var
    "no-multiple-empty-lines": ["error", {
      max: 1
    }], // 不允许多个空行
    "prefer-const": "off", // 使用 let 关键字声明但在初始分配后从未重新分配的变量，要求使用 const
    "no-use-before-define": "off", // 禁止在 函数/类/变量 定义之前使用它们
    // typeScript (https://typescript-eslint.io/rules)
    "@typescript-eslint/no-unused-vars": "error", // 禁止定义未使用的变量
    "@typescript-eslint/no-empty-function": "error", // 禁止空函数

    // vue (https://eslint.vuejs.org/rules)
    "vue/custom-event-name-casing": "error", // 为自定义事件名称强制使用特定大小写
    "vue/multi-word-component-names": "off"
  }
}
