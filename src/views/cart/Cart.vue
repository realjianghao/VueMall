<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{ this.$store.getters.cartLength }})</div>
    </nav-bar>
    <cart-list/>
    <cart-bottom/>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";

import CartList from "./childComps/CartList";
import CartBottom from "./childComps/CartBottom";

export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
    CartBottom
  }
}
</script>

<style scoped>
.cart {
  height: calc(100vh - 49px);
}

.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
}
</style>
