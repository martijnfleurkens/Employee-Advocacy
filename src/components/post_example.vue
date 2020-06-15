|<template>
  <!-- persoonlijk zou ik werken met een css methodiek zoals b.v. BEM. Deze css notatie is niet fout maar je moet je maar eens inlezen in BEM -->
  <div id="linkedin_container">
    <div class="preview">
        <div class="padding_wrapper">
            <div class="pf">in</div>
            <p class="heading_pf">LinkedIn Preview</p>
            <!-- Waarom inline style? Probeer dit altijd met css op te lossen. Dat is een beter structuur en houdt de code schoner -->
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
    // Wat je nu mist bij deze type is de type definition. Het is duidelijker als je dit definieert. Je zou dan zoiets als dit krijgen:
    // props: {
    //   desc: {
    //     type: String,
    //     default: null,
    //   },
    // }
    // Lees dit maar eens: https://vuejs.org/v2/style-guide/#Prop-definitions-essential


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

@media screen and (max-width: 1150px) {

    #linkedin_container{
        max-width: 350px
    }

}

@media screen and (max-width: 1590px) {

    /* Als dit niet gebruikt wordt zou ik dit altijd verwijderen */
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
