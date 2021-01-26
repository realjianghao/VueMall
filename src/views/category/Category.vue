<template>
  <div id="category">
    <nav-bar class="nav-bar">
      <div slot="center">商品分类</div>
    </nav-bar>

    <category-list :categories="categories" @selectCategory="selectCategory"/>

    <scroll class="scroll-content" ref="scroll">
      <category-content :subcategories="getSubcategories"/>
      <tab-control :titles="['综合', '新品', '销量']" @tabClick="tabClick"/>
      <category-content-detail :category-detail="getCategoryDetail"/>
    </scroll>


  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import Scroll from "@/components/common/scroll/Scroll";

import TabControl from "@/components/content/tabControl/TabControl";

import CategoryList from "./childComps/CategoryList";
import CategoryContent from "./childComps/CategoryContent";
import CategoryContentDetail from "./childComps/CategoryContentDetail";

import {getCategory, getCategoryDetail, getSubcategory} from "@/network/category";

import {imgLoadMixin} from "@/common/mixin";

export default {
  name: "Category",
  components: {
    NavBar,
    Scroll,
    TabControl,
    CategoryList,
    CategoryContent,
    CategoryContentDetail
  },
  mixins: [imgLoadMixin],
  data() {
    return {
      categories: [],
      categoryData: {},
      currentIndex: -1,
      detailType: 'pop'
    }
  },
  computed: {
    getSubcategories(){
      if(this.currentIndex === -1) return {}
      return this.categoryData[this.currentIndex].subcategories
    },
    getCategoryDetail(){
      if(this.currentIndex === -1) return []
      return this.categoryData[this.currentIndex].categoryDetail[this.detailType]
    }
  },
  methods: {
    _getCategory() {
      getCategory().then(res => {
        // 1.获取分类数据
        this.categories = res.data.category.list
        // 2.初始化每个类别的子数据
        for (let i = 0; i < this.categories.length; i++) {
          this.categoryData[i] = {
            subcategories: {},
            categoryDetail: {
              'pop': [],
              'new': [],
              'sell': []
            }
          }
        }
        // 3.请求第一个分类的数据
        this._getSubcategories(0)
      })
    },
    _getSubcategories(index) {
      this.currentIndex = index;
      const mailKey = this.categories[index].maitKey;
      getSubcategory(mailKey).then(res => {
        this.categoryData[index].subcategories = res.data
        this.categoryData = {...this.categoryData}
        this._getCategoryDetail('pop')
        this._getCategoryDetail('sell')
        this._getCategoryDetail('new')
      })
    },
    _getCategoryDetail(type) {
      // 1.获取请求的miniWallkey
      const miniWallkey = this.categories[this.currentIndex].miniWallkey;
      // 2.发送请求,传入miniWallkey和type
      getCategoryDetail(miniWallkey, type).then(res => {
        // 3.将获取的数据保存下来
        this.categoryData[this.currentIndex].categoryDetail[type] = res
        this.categoryData = {...this.categoryData}
      })
    },

    selectCategory(index) {
      this._getSubcategories(index)
    },

    tabClick(index) {
      this.detailType = {
        0: 'pop',
        1: 'new',
        2: 'sell'
      }[index]
    }
  },
  created() {
    this._getCategory()
  }
}
</script>

<style scoped>
#category {
  height: calc(100vh - 49px);

  position: relative;
}

.nav-bar {
  background-color: var(--color-tint);
  font-weight: 700;
  color: #fff;
}


.scroll-content {
  position: absolute;
  top: 44px;
  left: 100px;
  right: 0;
  bottom: 0;


  overflow: hidden;
}
</style>
