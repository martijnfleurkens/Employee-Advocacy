<template>
  <newproposallayout>
    <div id="main_home">
      <h1>Prepare mail</h1>

      <form @submit.prevent="submit">
        <p class="form_element">
          <label for="form_subject">Mail subject</label>
          <input type="text" v-model="subject" required />
        </p>

        <p class="form_element">
          <label for="form_subject">Add text proposals</label>
          <!-- <textarea cols="37" rows="7" v-model="desc"></textarea> -->
          <vue-editor v-model="desc" required></vue-editor>
          <span>Variables: [url]</span>
        </p>

        <p class="form_element">
          <label for="form_subject">Mailadresses</label>
          <input type="text" v-model="adresses" required />
          <span>Split adresses by a comma(,)</span>
        </p>

        <input type="submit" class="btn blue" value="next" />
      </form>
    </div>
  </newproposallayout>
</template>

<script>
import newproposallayout from '../../layouts/newproposal.vue'
import { mapGetters } from 'vuex';
import axios from 'axios';
import { VueEditor } from "vue2-editor";
import setup from '../../../setup';

export default {
  name: 'main_activate',
  computed: mapGetters(['formDataObj']),
  components: {
    newproposallayout,
    VueEditor
  },
  data: function () {
    return {
        subject: '',
        desc: '',
        adresses: '',
        setup: setup
    }
  },
  methods:{
    submit(){
      var fd = this.formDataObj;

        fd.append('mail_subject', this.subject);
        fd.append('mail_text', this.desc);
        fd.append('mail_adresses', this.adresses);

        var post_options = {
            method: 'POST',
            url: this.setup['azure']['logic']['api'],
            data: fd,
            headers:{
              'token': localStorage.token
            },
            json: true
        };

        axios(post_options)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });

        //Redirect to the next page
        this.$router.push('/dashboard');

    }
  }
}
</script>

<style>
#main_activate {
}

#margin_box {
  padding-right: 600px;
}
</style>
