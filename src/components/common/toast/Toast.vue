<template>
  <div class="toast" v-show="isShow">{{ message }}</div>
</template>

<script>
export default {
  name: "Toast",
  data(){
    return {
      message: '',
      isShow: false
    }
  },
  methods: {
    show(message, duration){
      this.isShow = true
      this.message = message
      setTimeout(()=>{
        this.isShow = false
        this.message = ''
      }, duration)
    }
  }
}
</script>

<style scoped>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  background-color: rgba(0, 0, 0, .75);
  color: #fff;
  z-index: 999;

  white-space: nowrap;

  padding: 8px 10px;
}
</style>
