<template>
  <newproposallayout>
    <div id="main_home">
      <h1>Make proposal</h1>

      <form @submit.prevent="nextPage">

        <p class="form_element">
          <label for="form_subject">Subject</label>
          <input type="text" v-model="subject" required>
        </p>

        <p class="form_element">
          <label for="form_subject">Article link</label>
          <input type="text" v-model="url" required>
        </p>

        <p class="form_element">
          <label for="form_subject">Article title</label>
          <input type="text" v-model="linkTitle" required>
        </p>

        <p class="form_element">
          <label for="form_subject">Choose an image</label>
          <input type="file" v-on:change="updatePreview" required>
        </p>

        <div class="form_element">
          <label>Add text proposals</label>
            <div v-for="(desc, index) of desc_previews" v-bind:key="desc.index" class="textarea_wrapper">
              <textarea cols="37" rows="7" v-model="desc.text" v-on:focus="preview_desc_func(index)" v-on:keyup="preview_desc_func(index)" required></textarea>
              <button v-on:click="removeTextarea(index)" class="cross">X</button>

                <!-- Language labels -->
                <div class="radio_wrapper">
                  <input type="radio" v-bind:name=" 'language_' + index" value="en" v-bind:id=" 'en_' + index" v-model="desc.language" checked>
                  <label v-bind:for=" 'en_' + index">EN</label><br>

                  <input type="radio" v-bind:name=" 'language_' + index"  value="nl" v-bind:id=" 'nl_' + index" v-model="desc.language">
                  <label v-bind:for=" 'nl_' + index">NL</label><br>
                </div>
                <!-- END Language labels -->
            </div>
          <P v-on:click="addTextarea" id="add_btntext">+ Add proposal</P>
        </div>

        <input type="submit" class="btn blue" value="next">

      </form>

    </div>
      <postexample :desc="preview_desc" :url="url" :image="image" :linkTitle="linkTitle"></postexample>
  </newproposallayout>
</template>

<script>
import newproposallayout from '../../layouts/newproposal.vue'
import postexample from '../../components/post_example';

import { mapMutations } from 'vuex';

export default {
  name: 'main_activate',
  components: {
    newproposallayout,
    postexample
  },
  data: function () {
    return {
        desc_previews: [
          { text: "", language:"" }
        ],
        subject: '',
        preview_desc: '',
        url: '',
        linkTitle: '',
        image: require('../../assets/preview.png'),
        image_data: '',
        access_token: localStorage.getItem('access_token'),
        user_id: localStorage.getItem('user_id'),
    }
  },
  methods:{
    ...mapMutations([
      'ADD_FORMDATA'
    ]),
    addTextarea(){
      this.desc_previews.push({text:""});
    },
    removeTextarea(index){
      this.$delete(this.desc_previews, index);
    },
    preview_desc_func(index){
      this.preview_desc = this.desc_previews[index]['text'];
    },
    updatePreview(e){
      //Preview
      var reader, files = e.target.files;

      if (files.length === 0){
        console.log('empty');
      } else {
        reader = new FileReader();
        reader.onload = (e) => {
          this.image = e.target.result;
        }

        reader.readAsDataURL(files[0])

        //Save data
        this.image_data = event.target.files[0];
      }
    },
    nextPage(){
      const fd = new FormData();
      fd.append('image', this.image_data, this.image_data.name);
      fd.append('subject', this.subject);
      fd.append('url', this.url);
      fd.append('linkTitle', this.linkTitle);

      var db_desc = '';
      var db_language = '';
      var first = true;
      this.desc_previews.forEach(desc => {
        if (!first){
           db_desc += '<39587_split>';
           db_language += '<39587_split>';
        }
        first=false;

        db_desc += desc['text'];
        db_language += desc['language'];

      });
      fd.append('desc', db_desc);
      fd.append('language', db_language);

      this.ADD_FORMDATA(fd);

      //Redirect to the next page
      this.$router.push('new_mail');
    }
  }
}
</script>

<style>
#margin_box{
  padding-right: 600px;
}

.textarea_wrapper{
  position: relative;
  display: table;
}

.cross{
  background: transparent;
  border: none;
  font-weight: bold;
  font-size: 23px;
  position: absolute;
  top: 0;
  right: -30px;
}

.cross:hover{
  cursor: pointer;
  color: #00C8FF;
}

#add_btntext{
  margin-top: 0px;
  font-weight: bold;
  font-size: 16px;
}

#add_btntext:hover{
  cursor: pointer;
  color: #00C8FF;
}
</style>
