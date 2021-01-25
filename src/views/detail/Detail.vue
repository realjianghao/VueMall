<template>
  <div id="detail">
    <detail-nav-bar ref="nav" class="detail-nav" @titleClick="titleClick"/>
    <scroll
      class="content"
      ref="scroll"
      :probeType="3"
      @scroll="contentScroll">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imgLoad="getThemeOffsetTops"/>
      <detail-param-info ref="param" :param-info="paramInfo" @imgLoad="getThemeOffsetTops"/>
      <detail-comment-info ref="comment" :comment-info="commentInfo"/>
      <goods-list ref="recommend" :goods-list="recommends"/>
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"/>
    <back-top @click.native="backTop" v-show="showBackTop"/>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/content/goods/GoodsList";
import BackTop from "components/content/backTop/BackTop";

import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailBottomBar from "./childComps/DetailBottomBar";

import {getDetail, Goods, Shop, GoodsParam, getRecommend} from "network/detail";

import {imgLoadMixin,backTopMixin} from "common/mixin";
import {debounce} from "common/utils";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    GoodsList,
    BackTop,
    Scroll
  },
  mixins: [imgLoadMixin, backTopMixin],
  data() {
    return {
      iid: null,
      topImages: null,
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeOffsetTops: null,
      getThemeOffsetTops: null
    }
  },
  created() {
    this.iid = this.$route.query.iid
    getDetail(this.iid).then(res => {
      const data = res.result
      this.topImages = data.itemInfo.topImages

      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
      this.shop = new Shop(data.shopInfo)
      this.detailInfo = data.detailInfo
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
      if (data.rate.list) {
        this.commentInfo = data.rate.list[0];
      }
    })

    getRecommend().then(res => {
      this.recommends = res.data.list
    })

    this.getThemeOffsetTops = debounce(()=>{
      this.themeOffsetTops = []
      this.themeOffsetTops.push(0)
      this.themeOffsetTops.push(this.$refs.param.$el.offsetTop)
      this.themeOffsetTops.push(this.$refs.comment.$el.offsetTop)
      this.themeOffsetTops.push(this.$refs.recommend.$el.offsetTop)
    }, 100)
  },
  methods: {
    titleClick(index){
      this.$refs.scroll.scrollTo(0, -this.themeOffsetTops[index], 200)
    },
    contentScroll(position){
      this.showBackTop = (-position.y) > 1000

      const y = -position.y
      for(let i = this.themeOffsetTops.length - 1;i >= 0; i--){
        if(y >= this.themeOffsetTops[i]){
          this.$refs.nav.currentIndex = i
          break
        }
      }
    },
    addToCart(){
      // 1.创建对象
      const goods = {}
      // 2.对象信息
      goods.iid = this.iid;
      goods.imgURL = this.topImages[0]
      goods.title = this.goods.title
      goods.desc = this.goods.desc;
      goods.newPrice = this.goods.realPrice;
      // 3.添加到Store中
      this.$store.commit('addToCart', goods)
    }
  }
}
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}

.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}

.content {
  height: calc(100% - 44px - 49px);
}
</style>
