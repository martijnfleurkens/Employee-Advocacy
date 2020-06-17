|<template>
  <div class="linkedin_preview">
    <div class="linkedin_preview__content_wrapper">
      <div class="linkedin_preview__pf">
        in
      </div>
      <p class="linkedin_preview__pf_text">
        LinkedIn Preview
      </p>
      <p class="linkedin_preview__desc"
         v-html="preview_text(desc)"
      />
    </div>
    <a :href="url"
       target="_blank"
       class="linkedin_preview__url"
    >
      <img :src="image" class="linkedin_preview__image">
      <div class="linkedin_preview__footer linkedin_preview__content_wrapper">
        <h3 class="linkedin_preview__footer_title">{{ linkTitle }}</h3>
        <p class="linkedin_preview__footer_url">{{ url }}</p>
      </div>
    </a>
  </div>
</template>

<script>
  export default {
    props: {
      'desc': {
        type: String,
        default: null
      },
      'url':{
        type: String,
        default: null
      },
      'linkTitle':{
        type: String,
        default: null
      },
      'image':{
        type: String,
        default: null
      }
     },
    methods: {
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
      }
    }
  }
</script>

<style scoped lang="postcss">

.linkedin_preview{
   max-width: 500px;
   display: inline-block;
   position: absolute;
   right: 50px;
   top: 10vh;
   box-shadow: 1px 1px 6px -2px rgba(0,0,0,0.81);
   text-align: left;
   padding: 0px;
   background-color: white;

  &__content_wrapper{
    padding: 20px;
  }

  &__footer{
      background: #F3F6F8;
  }

  &__url{
    text-decoration: none;
  }

  &__footer_title{
    color: #191919;
    padding: 0; margin: 0;
    font-size: 20px;
    margin-bottom: 5px;
  }

  &__footer_url{
    color: #7D7F80;
    padding: 0; margin: 0;
    font-size: 16px;
  }

  &__pf{
      background-color: #F1F5F8;
      display: inline-block;
      border-radius: 50px;
      padding: 15px;
      font-size: 20px;
      font-weight: bold;
  }

  &__pf_text{
    display: inline-block;
    margin-left: 10px;
    font-weight: bold;
  }

  &__desc{
    min-height: 40px;
    max-width: 100%;
    word-wrap: break-word;
    margin-bottom: 0px;
    white-space: pre-line;
  }

  &__image{
    width: 100%;
  }

}

@media screen and (max-width: 1150px) {

    .linkedin_preview{
        max-width: 350px
    }

}


</style>
