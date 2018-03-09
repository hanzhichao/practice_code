<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button v-on:click="greet">Greet</button></div>
<!--     <ol>
      <li v-for="site in sites">
        {{ site.name }}
      </li>
    </ol> -->
  </div>
</template>
 
<script>
export default {
  name: 'hello',
  data () {
    return {
      sites: [
        { name: 'Runoob' },
        { name: 'Google' },
        { name: 'Taobao' }
        ],
      msg: '欢迎来到菜鸟教程！'
    }
  },
  methods: {
    greet: function (event) {
      alert(this.msg)
    },
    getDate: function () {
      this.$http({
        methods: 'GET',
        url: 'http://127.0.0.1:8000/api/apps/'
      }).then(function (response) {
        this.data = response.data
      }, function (error) {
        console.log(error)
      })
    }
  }
}
</script>