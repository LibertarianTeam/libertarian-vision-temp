import { ActionContext, Store as VuexStore, CommitOptions, DispatchOptions } from "vuex";
import { VisaoLibertariaResponse } from "@/services/visao-libertaria/types";

export type ActionResponse<D = any> = Promise<VisaoLibertariaResponse<D> | undefined>;

export type StoreType<S, M = any, A = any, G = any> = Omit<VuexStore<S>, "commit" | "getters" | "dispatch"> & {
  /* @ts-ignore */
  commit<K extends keyof M, P extends Parameters<M[K]>[1]>(
    key: K,
    payload?: P,
    options?: CommitOptions
    /* @ts-ignore */
  ): ReturnType<M[K]>;
} & {
  getters: {
    /* @ts-ignore */
    [K in keyof G]: ReturnType<G[K]>;
  };
} & {
  /* @ts-ignore */
  dispatch<K extends keyof A>(key: K, payload?: Parameters<A[K]>[1], options?: DispatchOptions): ReturnType<A[K]>;
};

export type AugmentedActionContext<S = any> = {
  state: S;
  rootState: RootStateModule;
  commit<K extends keyof RootMutationsModule>(
    key: K,
    payload?: Parameters<RootMutationsModule[K]>[1]
  ): ReturnType<RootMutationsModule[K]> & Omit<ActionContext<RootStateModule, RootStateModule>, "commit">;
} & {
  dispatch<K extends keyof RootActionsModule>(
    key: K,
    payload?: Parameters<RootActionsModule[K]>[1],
    options?: DispatchOptions
  ): ReturnType<RootActionsModule[K]> & Omit<ActionContext<RootStateModule, RootStateModule>, "dispatch">;
};

export interface RootState {
  hello: string;
}
export interface RootStateModule extends RootState {}

export type RootMutations = {
  setHello(state: RootStateModule, text: string): void;
};
export type RootMutationsModule = RootMutations;

export interface RootActions {
  handleRequestError({ commit }: AugmentedActionContext, payload: any): void;
}
export type RootActionsModule = RootActions;

export type RootGetters = {};
export type RootGettersModule = RootGetters;

export type RootStore = StoreType<RootStateModule, RootMutationsModule, RootActionsModule, RootGettersModule>;
