<template>
  <div id="app">
    <div id="focus_wrapper">
    <router-view></router-view>
    <img src="./assets/valtech_logo.png" alt="Logo" class="logo">
    </div>
  </div>
</template>

<script>

export default {
  name: 'App',
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
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

html, 
body {
    height: 100%;
    margin: 0px;
}


.btn{
  font-size: 16px;
    background-color: black;
    color: white;
    border: none;
    padding: 15px 60px;
    cursor: pointer;
    transition: 0.5s all ease-in-out;
    font-weight: bold; 
}

.btn:hover{
    background-color: #00C8FF;
    transition: 0.3s all ease-in-out;
}

.btn.center{
  display: table;
  margin: auto;
}
</style>
