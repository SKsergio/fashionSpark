import { createStore } from 'vuex';

// Definición de las interfaces para el estado
interface CurrentDesign {
  Genero: string;
  Category: string;
  Medidas: number[]; // Cambia el tipo de Medidas según sea necesario
}

interface Usuario {
  nombreUsuario: string;
  emailUsuario: string;
  contrasenaUsuario: string;
}

interface Plan {
  planId: string;
  amount: number;
}

interface State {
  currentDesign: CurrentDesign;
  prendas: Array<{ id: number; tipo: string; imagen: string }>;
  usuario: Usuario;
  plan: Plan;
}

// Creación del store
export default createStore<State>({
  state: {
    currentDesign: {
      Genero: '',
      Category: '',
      Medidas: [],
    },
    prendas: [
      {
        id: 1,
        tipo: "Camiseta",
        imagen: "https://img.freepik.com/vector-gratis/ilustracion-contorno-camiseta-dibujada-mano_23-2150927674.jpg"
      },
      {
        id: 2,
        tipo: "Vestido",
        imagen: "https://previews.123rf.com/images/jelisua88/jelisua882112/jelisua88211200098/178589280-vestido-de-mujer-dibujo-t%C3%A9cnico-vestido-rom%C3%A1ntico-de-lunares-aislado-en-un-fondo-blanco-ropa-de.jpg",
      },
      {
        id: 3,
        tipo: "Chaqueta",
        imagen: "https://caterpillarsv.com/cdn/shop/files/Ropa_0035_2310632_12887_Black-Stone_ad4e000f-e0bc-4c7f-8e0e-05f4530ed2e3_460x@2x.jpg?v=1709141599",
      },
      {
        id: 4,
        tipo: "CamisaMujer",
        imagen: "https://img.freepik.com/vector-gratis/ilustracion-contorno-camiseta-dibujada-mano_23-2150927674.jpg",
      },
    ],
    usuario: {
      nombreUsuario: '',
      emailUsuario: '',
      contrasenaUsuario: '',
    },
    plan: {
      planId: '',
      amount: 0,
    }
  },
  getters: {
    getCurrentDesign(state) {
      return state.currentDesign;
    },
    getClothes(state) {
      return state.prendas;
    },
    getUsuario(state) {
      return state.usuario;
    },
    getPlan(state) {
      return state.plan;
    }
  },
  mutations: {
    AddCurrentDesignCategory(state, category: string) {
      state.currentDesign.Category = category;
    },
    AddCurrentDesignGender(state, gender: string) {
      state.currentDesign.Genero = gender;
    },
    SetUsuario(state, usuario: Usuario) {
      state.usuario = usuario;
    },
    SetPlan(state, plan: Plan) {
      state.plan = plan;
    }
  },
  actions: {
    ActionCurrentDesignCategory(context, category: string) {
      context.commit('AddCurrentDesignCategory', category);
    },
    ActionCurrentDesignGender(context, gender: string) {
      context.commit('AddCurrentDesignGender', gender);
    },
    ActionSetUsuario(context, usuario: Usuario) {
      context.commit('SetUsuario', usuario);
    },
    ActionSetPlan(context, plan: Plan) {
      context.commit('SetPlan', plan);
    }
  },
  modules: {
  }
});
