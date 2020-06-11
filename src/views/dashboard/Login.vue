<template>
  <div id="login_wrapper">
    <div id="login_container">
      <h1>Login</h1>
      <p class="sub_title">Advocacy tool</p>
      <form @submit.prevent="submit">
        <input type="text" placeholder="E-mailadress" v-model="username" required>
        <input type="password" placeholder="Password" v-model="password" required>
        <input type="submit" class="btn">
      </form>
      <p class="error">{{error_msg}}</p>
      <img src="../../assets/valtech_logo.png" alt="Logo" class="logo">
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
   data: function () {
    return {
        username: '',
        password: '',
        error_msg: ''
    }
  },
  methods:{
    submit: function() {
      console.log('test');
      var post_options = {
            method: 'POST',
            url: 'https://advocacytool.azurewebsites.net/api/Login?code=weVIxxRn/GXgB43UyxHK2bY2X4RGZGtdNlfb0R/d5w6jHJbt5miv4w==',
            data: {
              "username": this.username,
              "password": this.password
            },
            json: true
        };

        var current = this;

        axios(post_options)
        .then(function (response) {
            if (typeof response.data.token != 'undefined'){
              console.log(response);
              console.log(response.data.token);
              localStorage.setItem('token', response.data.token);
              current.$store.commit("setAuthentication", true);
              current.$router.replace({ name: "dashboard" });
            }
        })
        .catch(function (error) {
            console.log(error);
            current.error_msg = error.response.data;
        });
    }
  }
}
</script>

<style scoped>

#login_wrapper{
  display: flex;
  align-items: center;
  justify-content: center;
}

#login_container{
  padding: 20px;
  margin-top: 25vh;
  min-width: 400px;
  position: relative;

 -webkit-box-shadow: 1px 1px 9px 10px rgba(250,250,250,1);
 -moz-box-shadow: 1px 1px 9px 10px rgba(250,250,250,1);
 box-shadow: 1px 1px 9px 10px rgba(250,250,250,1);
}

#login_container h1{
  font-weight: 900;
  margin-bottom: 0px;
}

#login_container .sub_title{
  color: #929292;
  margin-top: 0px;
  font-size: 18px;
}

#login_container input{
  width: 100%;
  display: block;
  box-sizing: border-box;
  padding: 10px 5px;
  border: none;
  border-bottom: 1px solid black;
  margin-bottom: 30px;
  font-size: 14px;
}

#login_container .logo{
  margin: auto;
  position: absolute;
  bottom: -60px;
  width: 140px;
  margin: 0 calc(50% - 70px);
}

#login_container .error{
  color: red;
}

</style>
