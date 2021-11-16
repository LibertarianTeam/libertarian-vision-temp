import { createStore, ActionTree, GetterTree, ModuleTree, MutationTree } from "vuex";
import { RootStateModule, RootState, RootActions, RootMutations, RootGetters } from "@/store/types";

const state: RootState = {
  hello: "hi",
};

const getters: GetterTree<RootStateModule, RootStateModule> & RootGetters = {};

const mutations: MutationTree<RootStateModule> & RootMutations = {
  setHello(state, text) {
    state.hello = text;
  },
};

const actions: ActionTree<RootStateModule, RootStateModule> & RootActions = {
  async handleRequestError({ commit }, error) {},
};

const modules: ModuleTree<RootStateModule> = {};

export const store = createStore<any>({ state, mutations, actions, getters, modules });
