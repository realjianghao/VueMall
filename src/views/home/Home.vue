<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>

    <tab-control ref="topTabControl" :titles="['流行', '新款', '精选']" class="tab-control" @tabClick="tabClick"
                 v-show="isTabFixed"/>

    <scroll class='content' ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <home-swiper :banners="banners" @imgLoad="swiperImgLoad"/>
      <recommend-view :recommends="recommends"/>
      <feature-view/>
      <tab-control ref="tabControl" :titles="['流行', '新款', '精选']" @tabClick="tabClick"/>
      <goods-list :goodsList="showGoods"/>
    </scroll>

    <back-top @click.native="backTop" v-show="showBackTop"/>
  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";
import GoodsList from "components/content/goods/GoodsList";

import NavBar from "components/common/navbar/NavBar";
import Scroll from "components/common/scroll/Scroll";
import TabControl from "components/content/tabControl/TabControl";
import BackTop from "components/content/backTop/BackTop";

import {getHomeMultidata, getHomeGoods} from "@/network/home";

import {imgLoadMixin, backTopMixin} from "common/mixin";

export default {
  name: "Home",
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    Scroll,
    TabControl,
    GoodsList,
    BackTop
  },
  mixins: [imgLoadMixin, backTopMixin],
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []}
      },
      currentType: 'pop',
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0
    }
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  created() {
    this.checkViewport()
    this.getHomeMultidata()
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  mounted() {
    // this.checkViewport()
  },
  activated() {
    // console.log('activated');
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
    this.$refs.scroll.refresh()
  },
  deactivated() {
    // console.log('deactivated');
    this.saveY = this.$refs.scroll.getCurrentY()
  },
  methods: {
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      this.$refs.topTabControl.currentIndex = index
      this.$refs.tabControl.currentIndex = index
    },
    contentScroll(position) {
      this.showBackTop = (-position.y) > 1000
      this.isTabFixed = (-position.y) > this.tabOffsetTop
    },
    loadMore() {
      this.getHomeGoods(this.currentType)
    },
    swiperImgLoad() {
      this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop
    },

    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
      })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page++
        this.$refs.scroll.finishPullUp()
      })
    },
    checkViewport(){
      const width = document.documentElement.clientWidth
      const height = document.documentElement.clientHeight
      if(width !== 375 || height !== 667){
        // alert('建议切换移动端视图，选择iPhone6/7/8 375×667，并刷新')
        this.$toast.show('建议切换移动端视图，选择iPhone6/7/8 375×667，并刷新', 5000)
      }
    }
  }
}
</script>

<style scoped>

#home {
  height: 100vh;
  position: relative;
}

.home-nav {
  background-color: var(--color-tint);
  color: #fff;
}

.tab-control {
  position: relative;
  z-index: 9;
}

.content {
  overflow: hidden;

  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>
