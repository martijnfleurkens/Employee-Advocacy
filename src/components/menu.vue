<template>
  <div class="dashboard_menu">
    <img src="../assets/valtech_logo-white.png" alt="Logo" class="dashboard_menu__logo" />

    <div class="dashboard_menu__links">
      <router-link to="/dashboard/home">Home</router-link>
      <router-link to="/dashboard/new_proposal">New proposal</router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
      'desc': {
        type: String,
        default: null
      },
  }
}
</script>

<style lang="postcss">
.dashboard_menu {
  background: #000000;
  width: 250px;
  position: absolute;
  height: 100%;
  z-index: 1;
  box-sizing: border-box;
  padding: 50px;
  padding-right: 100px;

  &__logo {
    width: 100%;
    max-width: 100px;
    margin: auto;
  }

  &__links {
    margin-top: 50px;
    text-align: center;

    & a {
      color: white;
      text-decoration: none;
      display: block;
      margin: 20px 0px;

      &:hover {
        color: #00c8ff;
      }
    }
  }
}
</style>
