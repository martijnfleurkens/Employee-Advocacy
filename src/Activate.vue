<template>
  <div id="main_activate">
      <button @click="authenticate('linkedin')" class="btn">Linkedin Koppelen</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'main_activate',
  components: {
    
  },
  data: function () {
    return {
        access_token: '',
    }
  },
  methods:{
    authenticate: function(provider) {
      var t = this;
      this.$auth.authenticate(provider).then( function ( response ) {
        // Execute application logic after successful social authentication

        //Get data from response
        var expires_in = response['data']['expires_in'];
        var access_token = response['data']['access_token'];

        //Set expiring date
        var current_date = new Date(new Date().getTime() + expires_in*1000);

        // Set local storage
        localStorage.setItem('access_token', access_token);
        localStorage.setItem('expire_date', current_date);
        t.access_token = access_token;
        
        //retrieve user_id
        t.get_user();
      });
    },
    get_user(){
        var t = this;

        //Get user informatio
        var l_headers = [
            'Authorization: Bearer ' + t.access_token + '',
        ];

        var post_data = {
            'headers': l_headers,
        };
        
         
        var post_options_1 = {
            method: 'POST',
            url: 'https://server.martijnfl.nl/test/get_user_info.php',
            data: JSON.stringify(post_data),
            json: true
        };


          axios(post_options_1)
          .then(function (response) {
              // console.log(response);
              localStorage.setItem('user_id', response.data.id);

              //Redirect to post
              t.$router.push('/');
          })
          .catch(function (error) {
              console.log(error);
          });
        
    },
  },
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
}
</style>
