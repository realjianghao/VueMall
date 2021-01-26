export default {
  addToCart({state, commit}, goods) {
    return new Promise(resolve => {
      const oldGoods = state.cartList.find(item => item.iid === goods.iid)
      if (oldGoods) {
        commit('addCount', oldGoods)
        resolve('商品数量+1')
      } else {
        commit('addToCart', goods)
        resolve('商品已成功添加到购物车')
      }
    })

  }
}
