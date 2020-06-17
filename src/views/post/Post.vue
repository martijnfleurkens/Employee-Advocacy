<template>
<div id="post_wrapper">
  <postlayout>
    <div id="main_post">
      <div id="center_wrapper">
              <div id="choose_desc_container">
                  <p>Choose a description</p>
                      <!-- Language labels -->
                      <div class="radio_wrapper">
                        <input type="radio" name="language" id="en" checked v-on:change="select_language('en')">
                        <label for="en">EN</label><br>

                        <input type="radio" name="language" id="nl" v-on:change="select_language('nl')">
                        <label for="nl">NL</label><br>
                      </div>
                      <!-- END Language labels -->

                    <!-- Descriptions -->
                    <div v-for="desc_preview in desc_previews" :key="desc_preview" id="desc_preview" v-on:click="change_desc(desc_preview)">
                      {{ desc_preview }}
                    </div>
                    <!-- <div v-on:click="change_desc('')" id="desc_preview"></div> -->
                    <!-- END Descriptions -->

                  <!-- <p>Edit the text or make it your own</p> -->
                  <p>Edit the description or write your own</p>
                  <div id="desc_edit">
                      <textarea v-model="desc"></textarea>
                      <!-- <p v-on:click="desc=''">X</p> -->
                  </div>
              </div>



          <button id="share_btn" class="btn center" v-on:click="send_post" v-html="button_text"></button>
          <p id="small_note"></p>
      </div>
    </div>
  </postlayout>
    <!-- Preview -->
    <postexample :desc="desc" :url="url" :image="image" :linkTitle="linkTitle"></postexample>
    <!-- END preview -->
  </div>
</template>

<script>
import axios from 'axios';
import postlayout from '../../layouts/post';
import postexample from '../../components/post_example';
// import qs from 'qs';

export default {
  name: 'main_post',
  async created() {

    var id = this.$route.params.id;
    localStorage.setItem('post_id',id);

    //Check if linkedin is linked
    var access_token = localStorage.getItem('access_token');
    var expire_date = localStorage.getItem('expire_date');
    var user_id = localStorage.getItem('user_id');

    var now = new Date();

    if (typeof access_token == "undefined" || access_token == null ||
        typeof expire_date == "undefined" || expire_date == null ||
        typeof user_id == "undefined" || user_id == null ||
        expire_date < now)
    {
        this.$router.push('/activate');
    } else {

      axios.defaults.headers.common.authorization = null;
      var rq_post_options = {
        method: 'POST',
        headers: {'header':{
          'authorization': null
        }},
        url: 'https://prod-16.westeurope.logic.azure.com:443/workflows/74c7afaf5f4247f6970f27df9da8dd0c/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=tbLWes7w7a9YPDokj6gCySMztvzc9a6RomZiCGmSGJ8',
        // data: qs.stringify({"id":id}),
        data: {"id":id}
      };

      try {
        const response = await axios(rq_post_options);
        console.log(response);

        var db_data = response.data.Documents[0]
        this.db_desc_previews = db_data['desc'];
        this.url = db_data['url'];
        this.linkTitle = db_data['linkTitle'];
        this.image = "https://imgadvocacytool.blob.core.windows.net/shares/" + db_data['id'];

      } catch(e) { console.error(e); }
    }
  },
  components: {
    postlayout,
    postexample
  },
  data: function () {
    return {
        // desc_previews: [],
        db_desc_previews: {},
        desc: '',
        url: '',
        linkTitle: '',
        image: '',
        access_token: localStorage.getItem('access_token'),
        user_id: localStorage.getItem('user_id'),
        button_text: 'Share on LinkedIn',
        language: 'en'
    }
  },
  computed: {
    desc_previews: function(){
      var t = this;
      var return_val = [];
      var descobj = t.db_desc_previews

      Object.keys(t.db_desc_previews).map(function(objectKey) {
          if (t.language == descobj[objectKey]['language']){
          return_val.push(descobj[objectKey]['content']);
        }
      });

      return return_val;
    }
  },
  methods:{
    change_desc(desc_preview){
        this.desc=desc_preview;
    },
    select_language(value){
      this.language = value;
    },
    send_post(){

        var t = this;
        t.button_text = '<div class="loader"></div>';

        //Share
        var l_post_data = {
            "content": {
                "contentEntities": [
                    {
                        // "description":"Hans",
                        "entityLocation": t.url,
                        "thumbnails": [
                            {   "imageSpecificContent":{
                                    "width":1200,
                                    "height":628
                                },
                                "resolvedUrl": t.image
                            }
                        ]
                    }
                ],
                "title": t.linkTitle,
                // "landingPageUrl": "https://www.linkedin.com/",
                // "description":"Hans hans",
            },
            "distribution": {
                "linkedInDistributionTarget": {}
            },
            "owner": "urn:li:person:" + t.user_id,
            // "subject": "Test Share via an API Subject",
            "text": {
                "text": t.desc
            }
        };


        var post_data = {
            'post': JSON.stringify(l_post_data),
            'auth_header': 'Bearer ' + t.access_token,
        };

        var post_options = {
            method: 'POST',
            url: 'https://advocacytool.azurewebsites.net/api/Share_post?code=1N93LnYxYW1otksXUHAu0bdS2IKcrq7AMl6DjLCEfkmZxCl5OGA/KQ==',
            data: JSON.stringify(post_data),
            json: true
        };
        // console.log(JSON.stringify(post_data));

        axios(post_options)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });


        //Redirect to post
        this.$router.push('/thank_you');
    },
  }
}
</script>

<style>

#small_note{
    font-size: 12px;
    color: rgb(107, 107, 107);
    font-style: oblique;
}

#main_post {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 80%;
  text-align: center;
  /* display: flex; */
  align-items: center;
  justify-content: center;
}

#choose_desc_container{
    max-width: 300px;
    margin: 0px 50px;
    display: inline-block;
    text-align: left;
}

#choose_desc_container p{
    text-align: center;
    font-size: 16px;
    font-weight: bold;
    margin-top: 45px;
    margin-bottom: 15px;
}

#desc_preview{
    border: 1px dashed #a3a3a3;
    color: #707070;
    padding: 15px;
    text-align: left;
    margin-bottom: 10px;
    box-sizing: border-box;
    background-color: white;
    user-select: none;
}

#choose_desc_container textarea{
    box-sizing: border-box;
    margin-bottom: 10px;
    padding: 15px;
}

#desc_preview:hover{
    border: 1px solid #a3a3a3;
    cursor: pointer;
}

#choose_desc_container p{
    text-align: left;
}

#choose_desc_container #textarea_wrapper{
    position: relative;
}

#choose_desc_container #textarea_wrapper p{
    position: absolute;
    right: 10px;
    top: -7px;
    font-weight: bold;
    cursor: pointer;
}

#choose_desc_container textarea{
    width: 100%;
    min-height: 140px;
    max-width: 100%;
}


#share_btn{
    margin-top: 20px;
}

#post_wrapper .radio_wrapper{
  margin-bottom: 10px;
}

</style>
