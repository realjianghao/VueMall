<template>
  <div class="cart-bottom-bar">
    <div class="check">
      <check-button v-model="isCheckAll"/>
      <div>全选</div>
    </div>
    <div class="price">
      合计:￥{{ totalPrice }}
    </div>
    <div class="calculate">
      去计算({{ checkedCount }})
    </div>
  </div>
</template>

<script>
import CheckButton from "./CheckButton";

export default {
  name: "CartBottom",
  components: {
    CheckButton
  },
  computed: {
    totalPrice() {
      return this.$store.state.cartList
        .filter(item => item.checked)
        .reduce((pre, cur) => pre + cur.price * cur.count, 0)
        .toFixed(2)
    },
    checkedCount() {
      return this.$store.state.cartList
        .filter(item => item.checked).length
    },
    isCheckAll: {
      get() {
        return this.$store.state.cartList.every(item => item.checked)
      },
      set(newValue) {
        if (newValue) {
          this.$store.commit('checkAll')
        } else {
          this.$store.commit('uncheckAll')
        }
      }
    }
  },
  methods: {}
}
</script>

<style scoped>
.cart-bottom-bar {
  height: 40px;

  display: flex;
  align-items: center;

  background-color: #eee;
  font-size: 14px;
}

.check {
  display: flex;
  align-items: center;

  margin-left: 10px;

  width: 60px;
}

.price {
  flex: 1;

  text-align: center;
}

.calculate {
  background-color: orangered;
  color: #fff;
  height: 100%;
  width: 80px;
  text-align: center;
  line-height: 40px;
}

</style>
