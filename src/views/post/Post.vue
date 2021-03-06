<template>
  <div id="post_wrapper">
    <postlayout>
      <div id="main_post">
        <div id="center_wrapper">
          <div id="choose_desc_container">
            <div class="padding_container">
              <p>Choose a description</p>
              <!-- Language labels -->
              <div class="radio_wrapper">
                <input
                  type="radio"
                  name="language"
                  id="en"
                  checked
                  v-on:change="select_language('en')"
                />
                <label for="en">EN</label>
                <br />

                <input type="radio" name="language" id="nl" v-on:change="select_language('nl')" />
                <label for="nl">NL</label>
                <br />
              </div>
              <!-- END Language labels -->

              <!-- Descriptions -->
              <label
                v-for="(desc_preview, index) in desc_previews"
                :key="index"
                class="desc_preview"
                v-on:click="change_desc(desc_preview)"
                :for="'desc_preview__radio_'+index"
              >
                <input type="radio" name="test" :id="'desc_preview__radio_' + index" />
                <span class="radio_knob"></span>
                {{ desc_preview }}
              </label>
              <!-- END Descriptions -->
            </div>

            <div class="padding_container">
              <p>Edit the description or write your own</p>
              <div id="desc_edit">
                <textarea v-model="desc"></textarea>
              </div>
            </div>
          </div>

          <div class="padding_container">
            <button id="share_btn" class="btn center" v-on:click="post" v-html="button_text"></button>
            <p id="small_note"></p>
          </div>
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
import setup from '../../../setup';

export default {
  name: 'main_post',
  components: {
    postlayout,
    postexample
  },
  async created() {
    var id = this.$route.params.id;

    axios.defaults.headers.common.authorization = null;
    var rq_post_options = {
      method: 'POST',
      headers: {'header':{
        'authorization': null
      }},
      url: this.setup['azure']['logic']['get_proposal'],
      data: {"id":id},
    };

    try {
      const response = await axios(rq_post_options);
      console.log(response);

      var db_data = response.data.Documents[0]
      this.db_desc_previews = db_data['desc'];
      this.url = db_data['url'];
      this.linkTitle = db_data['link_title'];
      this.image = this.setup['azure']['blobUrl'] + db_data['id'];

    } catch(e) {
      console.error(e);
    }
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
        button_text: '<i class="icon_linkedin"> </i> Share on LinkedIn',
        language: 'en',
        setup: setup
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
    post: async function() {
          var id = this.$route.params.id;
          var t = this;
          localStorage.setItem('post_id',id);

          var now = new Date();

          //Check if linkedin is linked
          var access_token = localStorage.getItem('access_token');
          var expire_date = localStorage.getItem('expire_date');
          var user_id = localStorage.getItem('user_id');

            if (typeof access_token == "undefined" || access_token == null ||
              typeof expire_date == "undefined" || expire_date == null ||
              typeof user_id == "undefined" || user_id == null ||
              expire_date < now)
          {
            this.authenticate('linkedin');
          } else {
            //Set token
            t.access_token = access_token;

            this.send_post();
          }
    },
    authenticate: async function(provider) {
      var t = this;
      t.button_text = '<div class="loader"></div>';

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

        //Set token
        t.access_token = access_token;

        //Redirect to post
        t.send_post();
      });
    },
    send_post(){

        var t = this;
        t.button_text = '<div class="loader"></div>';

        //Share
        var l_post_data = {
            "content": {
                "contentEntities": [
                    {
                        // "description":"-",
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
                // "description":"-",
            },
            "distribution": {
                "linkedInDistributionTarget": {}
            },
            "owner": "urn:li:person:" + t.user_id,
            // "subject": "-",
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
            url: this.setup['azure']['functions']['baseUrl'] + this.setup['azure']['functions']['share_post'],
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
    send_post_demo(){
      //Redirect to post
      this.$router.push('/thank_you');
    }
  }
}
</script>

<style lang="postcss">
#small_note {
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

#choose_desc_container {
  text-align: left;
}

#focus_wrapper .padding_container {
  padding: 25px 80px;
  border-bottom: 3px solid #f1f5f8;
}

#choose_desc_container p {
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  margin-top: 25px;
  margin-bottom: 15px;
}

.desc_preview {
  border: 1px dashed #a3a3a3;
  color: #707070;
  padding: 15px;
  text-align: left;
  margin-bottom: 10px;
  box-sizing: border-box;
  background-color: white;
  display: block;
  user-select: none;
}

.desc_preview > input {
  display: none;
}

#choose_desc_container textarea {
  box-sizing: border-box;
  margin-bottom: 10px;
  padding: 15px;
}

.desc_preview:hover {
  border: 1px solid #a3a3a3;
  cursor: pointer;
}

#choose_desc_container p {
  text-align: left;
}

#choose_desc_container #textarea_wrapper {
  position: relative;
}

#choose_desc_container #textarea_wrapper p {
  position: absolute;
  right: 10px;
  top: -7px;
  font-weight: bold;
  cursor: pointer;
}

#choose_desc_container textarea {
  width: 100%;
  min-height: 140px;
  max-width: 100%;
}

#share_btn {
  margin-top: 20px;
  background: #0076b5;

  &:hover {
    background: black;
  }
}

#post_wrapper .radio_wrapper {
  margin-bottom: 10px;
}

.radio_knob {
  width: 13px;
  height: 13px;
  border: 2px solid black;
  border-radius: 100px;
  position: absolute;
  margin-left: -55px;
}

input:checked ~ .radio_knob:after {
  content: " ";
  background: black;
  width: 9px;
  height: 9px;
  display: block;
  border-radius: 100px;
  margin-top: 1.8px;
  margin-left: 2.4px;
}

@media screen and (max-height: 1010px) {
  #focus_wrapper .padding_container {
    padding: 15px 80px;
  }

  #choose_desc_container p {
    margin-top: 15px;
  }
}
</style>
