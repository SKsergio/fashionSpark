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
        id: 1,
        tipo: "Camiseta",
        icono:"https://img.freepik.com/vector-gratis/ilustracion-contorno-camiseta-dibujada-mano_23-2150927674.jpg"
      },
      {
        id: 2,
        tipo: "Vestido",
        imagen:
        "https://previews.123rf.com/images/jelisua88/jelisua882112/jelisua88211200098/178589280-vestido-de-mujer-dibujo-t%C3%A9cnico-vestido-rom%C3%A1ntico-de-lunares-aislado-en-un-fondo-blanco-ropa-de.jpg",
      },
      {
        id: 3,
        tipo: "Chaqueta",
        imagen:
          "https://caterpillarsv.com/cdn/shop/files/Ropa_0035_2310632_12887_Black-Stone_ad4e000f-e0bc-4c7f-8e0e-05f4530ed2e3_460x@2x.jpg?v=1709141599",
      },
      {
        id: 4,
        tipo: "CamisaMujer",
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
