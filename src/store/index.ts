import { createStore } from 'vuex'

export default createStore({
  state: {
    currentDesign:{
      Genero: '',
      Category:'',
      Medidas: [],
    }
  },
  getters: {
    getCurrentDesign(state){
      return state.currentDesign
    }
  },
  mutations: {
    AddCurrentDesignCategory(state, category){
      state.currentDesign.Category = category
    },
    AddCurrentDesignGender(state, Gender){
      state.currentDesign.Genero = Gender
    }
  },
  actions: {
    ActionCurrentDesignCategory(context, category){
      context.commit('AddCurrentDesignCategory', category)
    },
    ActionCurrentDesignGender(context, gender){
      context.commit('AddCurrentDesignGender', gender)
    }
  },
  modules: {
  }
})
