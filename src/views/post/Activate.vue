<template>
  <postlayout>
    <div id="main_activate">
        <h1>Connect with linkedin to view the message</h1>
        <button @click="authenticate('linkedin')" class="btn"><span class="icon_linkedin"></span> Connect with LinkedIn</button>
        <p id="sub_text">Don't worry, no message is being posted yet</p>

        <div class="readmore">
          <input type="checkbox" id="showmore"/>
          <label for="showmore">What's going to happen with this LinkedIn connection?</label>
          <p>
           This link with LinkedIn will only be used to post when you do this yourself.
          </p>
        </div>

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
        console.log(response);

        //Get data from response
        var expires_in = response['data']['expires_in'];
        var access_token = response['data']['access_token'];
        var user_id = response['data']['user_id'];

        //Set expiring date
        var current_date = new Date(new Date().getTime() + expires_in*1000);

        // Set local storage
        localStorage.setItem('access_token', access_token);
        localStorage.setItem('expire_date', current_date);
        localStorage.setItem('user_id', user_id);

        //Redirect to post
        var post_id = localStorage.getItem('post_id');
        t.$router.push('/post/' + post_id);
      });
    },
  },
}


</script>

<style scoped>
#main_activate {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding-top: 30vh;
  padding-bottom: 30vh;
}

#main_activate .btn{
  background-color: #0077B5;
}

#main_activate .btn:hover{
  background-color: black;
}

.readmore{
  margin-top: 30px;
}

#sub_text{
  margin-top: 6px;
  color: #7D8892;
}
</style>
