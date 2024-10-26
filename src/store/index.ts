import { createStore } from 'vuex'

export default createStore({
  state: {
    currentDesign:{
      Genero: '',
      Category:'',
      Medidas: [],
    },
    prendas:[
      {
        id: 2,
        tipo: "Vestido",
        link: "vestido",
        imagen:
        "https://previews.123rf.com/images/jelisua88/jelisua882112/jelisua88211200098/178589280-vestido-de-mujer-dibujo-t%C3%A9cnico-vestido-rom%C3%A1ntico-de-lunares-aislado-en-un-fondo-blanco-ropa-de.jpg",
      },
      {
        id: 3,
        tipo: "Chaqueta",
        link: "sueter",
        imagen:
          "https://w7.pngwing.com/pngs/831/589/png-transparent-t-shirt-sleeve-jacket-logo-t-shirt-tshirt-white-logo.png",
      },
      {
        id: 4,
        tipo: "Camisa de Mujer",
        imagen:
          "https://img.freepik.com/vector-gratis/ilustracion-contorno-camiseta-dibujada-mano_23-2150927674.jpg",
      },
    ]
  },
  getters: {
    getCurrentDesign(state){
      return state.currentDesign
    },
    getClothes(state){
        return state.prendas
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
