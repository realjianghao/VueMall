import Vue from 'vue'
import Vuex from 'vuex'
import mutations from "@/store/mutations";
import getters from "@/store/getters";

const state = {
  cartList: []
}

const store = new Vuex.Store({
  state,
  mutations,
  getters
})

export default store
