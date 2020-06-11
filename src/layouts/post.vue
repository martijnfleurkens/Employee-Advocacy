|<template>
  <div id="post_template">
      <div id="focus_wrapper">
        <slot/>
        <div class="footer">
          <img src="../assets/valtech_logo.png" alt="Logo" class="logo">
        </div>
      </div>
  </div>
</template>

<style>

#post_template {
  text-align: center;
  color: #2c3e50;
  position: absolute;
  width: 100%;
  height: 100%;
  margin: auto;
}

#focus_wrapper{
  background: #F6F6F6;
  max-width: 650px;
  margin: auto;
  height: 100%;
  /* margin-right: 600px; */
}

#focus_wrapper .footer{
  position: absolute;
  width: 100%;
  bottom: 10px;
  left: 0;
  z-index: 0;
}

#focus_wrapper .logo{
  height: 40px;
  margin: auto;
}



/* If post {*/

@media screen and (max-width: 1900px) {

  #post_wrapper #focus_wrapper{
    margin-right: 600px;
  }

  #focus_wrapper .logo{
    float: right;
  }

}

@media screen and (max-height: 780px) {
  #focus_wrapper .logo{
      float: right;
    }
}

@media screen and (max-width: 1150px) {

    #post_wrapper #focus_wrapper{
        margin-right: 450px
    }

}
/*} END If post*/

</style>
