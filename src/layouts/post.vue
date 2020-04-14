|<template>
  <div id="post_template">
    <div id="focus_wrapper">
      <slot/>
    <img src="../assets/valtech_logo.png" alt="Logo" class="logo">
    </div>
  </div>
</template>

<style scoped>

#post_template {
  text-align: center;
  color: #2c3e50;
  position: absolute;
  width: 100%;
  height: 100%;
}

#focus_wrapper{
  background: #F6F6F6;
  width: 650px;
  margin: auto;
  height: 100%;
  position: relative;
}

#focus_wrapper .logo{
  height: 40px;
  position: relative;
  bottom: -100px;
  margin: auto;
}

</style>
