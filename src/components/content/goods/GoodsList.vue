<template>
  <grid-view>
    <goods-list-item v-for="(item, index) in goodsList" :goods="item" :key="index"/>
  </grid-view>
</template>

<script>
import GoodsListItem from "./GoodsListItem";

import GridView from "components/common/gridView/GridView";

export default {
  name: "GoodsList",
  components: {
    GoodsListItem,
    GridView
  },
  props: {
    goodsList: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>

</style>
