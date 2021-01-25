const mutations = {
  addToCart(state, goods) {
    const oldGoods = state.cartList.find(item => item.iid === goods.iid)
    if(oldGoods){
      oldGoods.count++
    }else{
      goods.count = 1
      state.cartList.push(goods)
    }
  }
}

export default mutations
