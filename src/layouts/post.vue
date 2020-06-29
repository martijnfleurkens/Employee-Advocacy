|<template>
  <div id="post_template" class="main_background">
    <div id="focus_wrapper" class="main_content_wrapper">
      <slot />
      <div class="footer">
        <img src="../assets/valtech_logo.png" alt="Logo" class="logo" />
      </div>
    </div>
  </div>
</template>

<style>
#post_template {
  text-align: center;
}

#focus_wrapper {
  max-width: 500px;
  margin: auto;
  max-height: 100%;
  overflow-x: auto;
}

#focus_wrapper .footer {
  position: absolute;
  width: 100%;
  bottom: 10px;
  left: 0;
  z-index: 0;
}

#focus_wrapper .logo {
  height: 40px;
  margin: auto;
}

@media screen and (max-width: 1700px) {
  #post_wrapper #focus_wrapper {
    margin-right: 600px;
  }

  #focus_wrapper .logo {
    float: right;
  }
}

@media screen and (max-height: 780px) {
  #focus_wrapper .logo {
    float: right;
  }
}

@media screen and (max-width: 1150px) {
  #post_wrapper #focus_wrapper {
    margin-right: 450px;
  }
}
</style>
