|<template>
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
</template>

<script>
  export default {
    props: ['desc','url','link_title','image'],
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

<style scoped>


#linkedin_container{
   max-width: 500px;
   display: inline-block;
   position: absolute;
   right: 50px;
   top: 10vh;
}

@media screen and (max-width: 1900px) {

    #linkedin_container{
        /* right: -450px; */
        /* max-width: 400px; */
    }

}

@media screen and (max-width: 1590px) {

    #linkedin_container{
        /* right: -320px; */
        /* max-width: 300px; */
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

</style>
