<template>
  <postlayout>
    <div id="main_post">
      <div id="center_wrapper">
              <div id="choose_desc_container">
                  <h2>Type of kies een beschrijving</h2>
                  <div v-for="desc_preview in desc_previews" :key="desc_preview" id="desc_preview_wrapper">
                  <div v-on:click="desc=desc_preview">{{ desc_preview }}</div>
                  </div>
                  <div id="textarea_wrapper">
                      <textarea v-model="desc"></textarea>
                      <p v-on:click="desc=''">X</p>
                  </div>
              </div>

              <!-- Preview -->
              <div id="linkedin_container">
                  <div class="preview">
                      <div class="padding_wrapper">
                          <div class="pf">in</div>
                          <p class="heading_pf">LinkedIn Preview</p>
                          <p class="desc" style="white-space: pre-line;" v-html="preview_text(desc)"></p>
                      </div>
                      <a v-bind:href="url" target="_blank">
                      <img v-bind:src=image>
                      <div class="padding_wrapper" id="image_desc">
                          <h3>{{link_title}}</h3>
                          <p>{{url}}</p>
                      </div>
                      </a>
                  </div>
              </div>
              <!-- END preview -->

          <button id="share_btn" class="btn center" v-on:click="send_post">Deel op LinkedIn</button>
          <p id="small_note">Dit gaat om een test en zal niet echt geplaatst worden</p>
      </div>
    </div>
  </postlayout>
</template>

<script>
import axios from 'axios';
import postlayout from '../../layouts/post';

export default {
  name: 'main_post',
  created() {
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
    }
  },
  components: {
    postlayout
  },
  data: function () {
    return {
        desc_previews: ['We zijn op zoek naar #projectmanagers! Onze kantoren in #Amersfoort, #Amsterdam en #Utrecht kunnen jouw hulp goed gebruiken. Solliciteer nu!'
                            ,'Op zoek naar een geweldige carrièremogelijkheid als projectmanager? Bij Valtech zoeken we jou! Kom langs voor een kop koffie om elkaar beter te leren kennen.'
                            ],
        desc: 'Op zoek naar een geweldige carrièremogelijkheid als projectmanager? Bij Valtech zoeken we jou! Kom langs voor een kop koffie om elkaar beter te leren kennen.',
        url: 'https://valtech.com',
        link_title: 'Soliciteer nu!',
        image: 'https://sem8.martijnfl.nl/wp-content/uploads/2020/03/Digitalprojectmanager2.jpg',
        access_token: localStorage.getItem('access_token'),
        user_id: localStorage.getItem('user_id'),
    }
  },
  methods:{
    //Convert text link to html link
    preview_text(x){
        return (x || "").replace(
            /([^\S]|^)(((https?:\/\/)|(www\.))(\S+))/gi,
            function(match, space, url){
                var hyperlink = url;
                if (!hyperlink.match('^https?:')) {
                    hyperlink = 'http://' + hyperlink;
                }
                return space + '<a href="' + hyperlink + '">' + url + '</a>';
            }
        );
    },
    send_post(){

        var t = this;

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
                "title": t.link_title,
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
            // url: 'http://localhost:7071/api/HttpTrigger1',
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

<style scoped>

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
  display: flex;
  align-items: center;
  justify-content: center;
}

#choose_desc_container{
    max-width: 300px;
    margin: 0px 50px;
    display: inline-block;
    text-align: left;
}

#choose_desc_container h2{
    text-align: center;
    font-size: 21px;
    margin-bottom: 30px;
}

#desc_preview_wrapper,
#choose_desc_container textarea{
    border: 1px dashed #a3a3a3;
    color: #707070;
    padding: 15px;
    text-align: left;
    margin-bottom: 10px;
    box-sizing: border-box;
    background-color: white;
}

#desc_preview_wrapper:hover{
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

#linkedin_container{
   max-width: 500px;
   display: inline-block;
   position: absolute;
   right: -600px;
   margin-top: 50px;
}

@media screen and (max-width: 1900px) {

    #linkedin_container{
        right: -450px;
        max-width: 400px;
    }

}

@media screen and (max-width: 1590px) {

    #linkedin_container{
        right: -320px;
        max-width: 300px;
    }

}

@media screen and (max-width: 1295px) {

    /* #linkedin_container{
        max-width: 400px;
        position: static;
        right: 0;
        margin-top: 50px;
    } */

}

#linkedin_container .preview{
   box-shadow: 1px 1px 6px -2px rgba(0,0,0,0.81);
   text-align: left;
   padding: 0px;
   background-color: white;
}

#linkedin_container .padding_wrapper{
    padding: 20px;
}

#linkedin_container #image_desc{
    background: #F3F6F8;
}

#linkedin_container a{
    text-decoration: none;
}

#linkedin_container #image_desc h3{
    color: #191919;
    padding: 0; margin: 0;
    font-size: 20px;
    margin-bottom: 5px;
}

#linkedin_container #image_desc p{
    color: #7D7F80;
    padding: 0; margin: 0;
    font-size: 16px;
}


#linkedin_container .pf{
    background-color: #F1F5F8;
    display: inline-block;
    border-radius: 50px;
    padding: 15px;
    font-size: 20px;
    font-weight: bold;

}

#linkedin_container .heading_pf{
    display: inline-block;
    margin-left: 10px;
    font-weight: bold;
}

#linkedin_container .desc{
    min-height: 40px;
    max-width: 100%;
    word-wrap: break-word;
    margin-bottom: 0px;
}

#linkedin_container img{
    width: 100%;
}

#share_btn{
    margin-top: 20px;
}

</style>
