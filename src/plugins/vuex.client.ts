import { defineNuxtPlugin } from "nuxt3";
import { store } from "../store";

export default defineNuxtPlugin(({ app }) => {
  app.use(store);
});
