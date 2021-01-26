<template>
  <div @click="change">
    <div class="icon-selector" :class="{'selector-active': checked}" >
      <img src="~/assets/img/cart/tick.svg" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: "CheckButton",
  props: {
    checked: {
      type: Boolean,
      default: true
    }
  },
  model: {
    prop: 'checked',
    event: 'change'
  },
  methods: {
    change() {
      this.$emit('change', !this.checked)
    }
  }
}
</script>

<style scoped>
.icon-selector {
  position: relative;
  margin: 0;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid #ccc;
  cursor: pointer;
}

.selector-active {
  background-color: #ff8198;
  border-color: #ff8198;
}
</style>
