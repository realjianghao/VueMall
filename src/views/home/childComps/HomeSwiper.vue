<template>
  <div>
    <swiper>
      <swiper-item v-for="(item, id) in banners" :key="id">
        <a :href="item.link">
          <img :src="item.image" alt="" @load="imgLoad">
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import {Swiper, SwiperItem} from "components/common/swiper";

export default {
  name: "HomeSwiper",
  props: {
    banners: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      isLoad: false
    }
  },
  components: {
    Swiper,
    SwiperItem
  },
  methods: {
    imgLoad() {
      if (this.isLoad) return
      this.isLoad = true
      this.$emit('imgLoad')
    }
  }
}
</script>

<style scoped>

</style>
