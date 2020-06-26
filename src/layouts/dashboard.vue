|<template>
  <div class="dashboard">
    <dashboardMenu :desc="'test'"></dashboardMenu>
    <div class="dashboard__content">
      <slot />
    </div>
  </div>
</template>

<script>
  import dashboardMenu from '../components/menu';

  export default {
    name: '',
    components: {
      dashboardMenu
    }
  }
</script>

<style scoped lang="postcss">
.dashboard {
  &__content {
    background: #f3f6f9;
    border-radius: 50px 0 0 50px;
    padding: 50px;
    box-sizing: border-box;
    margin-left: 200px;
    position: absolute;
    z-index: 2;
    height: 100%;
    width: calc(100% - 200px);
  }
}
</style>
