|<template>
  <!-- Als een id niet perse nodig is zou ik een class gebruiken. Stel dat je dit component ooit gaat hergebruiken levert dat geen problemen op -->
  <div class="newproposal_layout">
    <div class="margin_box">
      <div class="content_wrapper">
        <slot />
      </div>
      <footer>
        <img src="../assets/valtech_logo.png" alt="Logo" class="logo" />
      </footer>
    </div>
  </div>
</template>

<style>
.newproposal_layout {
  position: absolute;
  height: 100%;
  width: 100%;
  background: #f3f6f9;
}

.margin_box {
  max-width: 1600px;
  margin: auto;
  padding: 5vh;
  height: 100%;
  position: relative;
  box-sizing: border-box;
}

.newproposal_layout input[type="text"],
textarea {
  border: 1px solid black;
  padding: 5px 10px;
}

input[type="submit"] {
}

.content_wrapper {
  background: white;
  height: 80%;
  padding: 60px 80px;
  overflow: auto;
  margin-right: 550px;
  box-shadow: 1px 1px 4px -2px rgba(0, 0, 0, 0.81);
}

.form_element label {
  display: block;
  font-weight: 600;
  margin-bottom: 5px;
}

.form_element span {
  color: gray;
  font-style: italic;
  display: block;
}

.form_element textarea {
  border: 1px solid black;
}

footer {
  position: absolute;
  bottom: 20px;
}

footer .logo {
  height: 40px;
  margin: auto;
  display: block;
}
</style>
