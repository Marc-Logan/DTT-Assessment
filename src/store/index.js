import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    email: "",
    name: "",
    token: "",
    houses: [],
  },
  mutations: {
    setEmail(state, email) {
      state.email = email;
    },
    setName(state, name) {
      state.name = name;
    },
    setToken(state, token) {
      state.token = token;
    },
    setHouses(state, houses) {
      state.houses = houses;
    },
  },
  actions: {
    updateEmail({ commit }, email) {
      commit("setEmail", email);
    },
    updateName({ commit }, name) {
      commit("setName", name);
    },
    updateToken({ commit }, token) {
      commit("setToken", token);
    },
    fetchHouses({ commit }) {
      const config = {
        method: "get",
        maxBodyLength: Infinity,
        url: "https://api.intern.d-tt.nl/api/houses",
        headers: {
          "X-Api-Key": "JUI10aqcwlBo4uHNzeGntCh97p6FA8PO",
        },
      };

      axios(config)
        .then((response) => {
          const houses = response.data;
          commit("setHouses", houses);
          console.log("Fetched Houses:", houses);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  getters: {
    getEmail: (state) => state.email,
    getName: (state) => state.name,
    getToken: (state) => state.token,
    getHouses: (state) => state.houses,
  },
});
