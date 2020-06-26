<template>
  <postlayout>
    <div id="main_activate">
      <p class="main_text">Your post has been successfully shared on LinkedIn</p>
      <p class="sub_text">Thank you!</p>
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

<style scoped>
p {
  color: black;
  font-size: 28px;
}

.main_text {
  font-weight: bold;
}
</style>
