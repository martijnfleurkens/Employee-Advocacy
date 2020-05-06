<template>
  <postlayout>
    <div id="main_activate">
        <h1>Your post has been successfully shared on LinkedIn<br><br>
            Thank you!</h1>
    </div>
  </postlayout>
</template>

<script>
import postlayout from '../../layouts/post';

export default {
  name: 'main_activate',
  components: {
    postlayout
  },
  methods:{

  }
}
</script>

<style>
#main_activate {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding-top: 30vh;
  padding-bottom: 30vh;
  max-width: 450px;
  margin: auto;
}
</style>
