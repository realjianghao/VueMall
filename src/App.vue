<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view></router-view>
    </keep-alive>

    <main-tab-bar></main-tab-bar>
    <icon/>
    <svg-icon/>
  </div>
</template>

<script>
import MainTabBar from "@/components/content/mainTabBar/MainTabBar";
import Icon from "@/components/content/icon/Icon";
import SvgIcon from "@/components/content/icon/Svg";
export default {
  name: 'App',
  components: {
    MainTabBar,
    Icon,
    SvgIcon
  }
}
</script>

<style>
@import "./assets/css/base.css";
</style>
