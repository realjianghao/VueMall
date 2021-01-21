<template>
  <div ref="wrapper">
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scroll: null
    }
  },
  methods: {
    scrollTo(x, y, time = 300) {
      this.scroll.scrollTo(x, y, time)
    },
    refresh(){
      this.scroll && this.scroll.refresh()
    },
    finishPullUp(){
      this.scroll.finishPullUp()
    }
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      probeType: this.probeType,
      mouseWheel: true,
      pullUpLoad: this.pullUpLoad
    })
    this.scroll.on('scroll', position => {
      this.$emit('scroll', position)
    })
    this.scroll.on('pullingUp', ()=>{
      console.log('pullup');
      this.$emit('pullingUp')

    })


  }
}
</script>

<style scoped>

</style>
