import {debounce} from "common/utils";

export const imgLoadMixin = {
  data() {
    return {
      imgLoadListener: null
    }
  },
  mounted() {
    // console.log('mounted');
    this.imgLoadListener = debounce(() => {
      // console.log('debounce');
      this.$refs && this.$refs.scroll && this.$refs.scroll.refresh && this.$refs.scroll.refresh()
    }, 100)
    this.$bus.$on('imgLoad', this.imgLoadListener)
  },
  activated() {
    // console.log('activated');
    this.$bus.$on('imgLoad', this.imgLoadListener)
  },
  deactivated() {
    // console.log('deactivated');
    this.$bus.$off('imgLoad', this.imgLoadListener)
  },
  destroyed() {
    this.$bus.$off('imgLoad', this.imgLoadListener)
  }
}

export const backTopMixin = {
  data() {
    return {
      showBackTop: false
    }
  },
  methods: {
    backTop() {
      this.$refs.scroll.scrollTo(0, 0, 300)
    }
  }
}
