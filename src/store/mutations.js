export default {
  addToCart(state, goods) {
      goods.checked = true
      goods.count = 1
      state.cartList.push(goods)
  },
  addCount(state, goods){
    goods.count++
  },
  checkAll(state){
    state.cartList.forEach(item => item.checked = true)
  },
  uncheckAll(state){
    state.cartList.forEach(item => item.checked = false)
  }
}
