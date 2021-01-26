<template>
  <div class="category-list">
    <scroll class="content">
      <div class="category-list-item"
           v-for="(item, index) in categories"
           :key="index"
           :class="{active: index === currentIndex}"
           @click="selectCategory(index)">{{ item.title }}
      </div>
    </scroll>
  </div>
</template>

<script>
import Scroll from "@/components/common/scroll/Scroll";

export default {
  name: "CategoryList",
  components: {
    Scroll
  },
  props: {
    categories: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      currentIndex: 0
    }
  },
  methods: {
    selectCategory(index){
      this.currentIndex = index
      this.$emit('selectCategory', index)
    }
  }
}
</script>

<style scoped>
.category-list {
  height: calc(100% - 44px);
  width: 100px;
  background-color: #f6f6f6;

}

.content {
  height: 100%;
  overflow: hidden;
}

.category-list-item{
  height: 45px;
  line-height: 45px;
  text-align: center;
  font-size: 14px;
}

.active {
  font-weight: 700;
  color: var(--color-high-text);
  background-color: #fff;
  border-left: 3px solid var(--color-high-text);
}
</style>
