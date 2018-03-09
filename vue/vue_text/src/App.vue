<template>
  <div id="app">
    <router-view></router-view>
    <router-link to="table/1">表格</router-link>
    <router-link to="/form">表单</router-link>
    {{message}}
    <div v-html="testHtml"></div>
    <button v-bind:disabled="isButtonDisabled">Button</button></br>
    <input v-model="inputValue"></input>
    值：{{inputValue}}</br>
    <p><select v-model="selected">
      <option disabled value="">请选择</option>
      <option>A</option>
      <option>B</option>
      <option>C</option>
    </select>
    <span>Selected: {{ selected }}</span>
    </p>
    <p><h1 v-if="ok">Yes</h1>
    <div v-if="Math.random() > 0.5">Now you see me</div>
    <div v-else>Now you don't</div></p>

    <p>
      <ul id="example-1">
        <li v-for="item in items">
          {{ item.message }}
        </li></ul>
    </p>
    <h1 v-show="ok">Hello!</h1>
    <div id="example-1">
      <button v-on:click="counter += 1">增加1</button>
      <p>这个按钮被点击了 {{ counter }} 次</p>
    </div>
    <div>
    <button v-on:click="greet">Greet</button></div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      message: 'Hello, Vue',
      testHtml: '<h1>测试插入html</h1>',
      isButtonDisabled: true,
      inputValue: '',
      selected: '',
      ok: true,
      items: [
        {message: 'Foo'},
        {message: 'Bar'}
      ],
      isActive: true,
      hasError: false,
      counter: 0
    }
  },
  methods: {
    greet: function (event) {
      alert(this.message + '!')
      if (event) {
        alert(event.target.tagName)
      }
    },
    greet2: function () {
      this.$Message.success('Hello, IVIEW')
    }
  }
}
</script>
