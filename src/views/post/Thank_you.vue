<template>
  <postlayout>
    <div id="main_activate">
        <!-- <h1>Je bericht is geplaatst<br>
            Dankjewel!</h1> -->
            <h1>Dankjewel voor het meedoen aan deze test!</h1>
            <p>Deze week zal je een korte enquete van ongeveer 1 minuut ontvangen. Graag zou ik je willen vragen om deze in te vullen</p>
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
