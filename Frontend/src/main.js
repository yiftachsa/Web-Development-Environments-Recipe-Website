import Vue from "vue";
import App from "./App.vue";
import VueAxios from "vue-axios";
import axios from "axios";

import routes from "./routes";
import VueRouter from "vue-router";
Vue.use(VueRouter);
const router = new VueRouter({
  routes,
});

import VueCookie from "vue-cookies";
Vue.use(VueCookie);

import Vuelidate from "vuelidate";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import {
  FormGroupPlugin,
  InputGroupPlugin,
  FormPlugin,
  CarouselPlugin,
  FormInputPlugin,
  ButtonPlugin,
  CardPlugin,
  NavbarPlugin,
  FormSelectPlugin,
  AlertPlugin,
  ProgressPlugin,
  ToastPlugin,
  LayoutPlugin,
  BootstrapVueIcons,
  ImagePlugin,
  AvatarPlugin,
} from "bootstrap-vue";
[
  FormGroupPlugin,
  InputGroupPlugin,
  FormPlugin,
  CarouselPlugin,
  FormInputPlugin,
  ButtonPlugin,
  CardPlugin,
  NavbarPlugin,
  ProgressPlugin,
  FormSelectPlugin,
  AlertPlugin,
  ToastPlugin,
  LayoutPlugin,
  BootstrapVueIcons,
  ImagePlugin,
  AvatarPlugin,
].forEach((x) => Vue.use(x));
Vue.use(Vuelidate);

axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    return response;
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

axios.defaults.withCredentials = true;
Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

const shared_data = {
  username: localStorage.username,
  photo: localStorage.photo,
  login(username,photo) {
    this.username = JSON.stringify(username);
    this.photo = JSON.stringify(photo);
    localStorage.setItem("username",JSON.stringify(username));
    localStorage.setItem("photo",JSON.stringify(photo));
  },

  logout() {
    this.ClearStorage();
    this.recipesCookingProgress = {};
  },
  recipesCookingProgress: {},
  updateProgress(recipeId, progressInfo) {
    if (this.recipesCookingProgress[recipeId]) {
      this.recipesCookingProgress[recipeId][progressInfo.stepNumber] =
        progressInfo.isChecked;
    } else {
      this.recipesCookingProgress[recipeId] = {};
      this.recipesCookingProgress[recipeId][progressInfo.stepNumber] =
        progressInfo.isChecked;
    }
    
    sessionStorage.setItem("CookingProgress",JSON.stringify(this.recipesCookingProgress));
  },
  
  getProgress(recipeId) {
    if(sessionStorage.getItem("CookingProgress")!=undefined)
    {
      this.recipesCookingProgress = JSON.parse(sessionStorage.getItem("CookingProgress"));
    }
    return this.recipesCookingProgress[recipeId];
  },
  recipesCookingProgressInteger:{},
  updateIntegerProgress(recipeId, progressStep)
  {
    if (!this.recipesCookingProgressInteger[recipeId]) {
      this.recipesCookingProgressInteger[recipeId] = progressStep;
    }else{
      this.recipesCookingProgressInteger[recipeId] = progressStep;
    }
    if($cookies.get("session"))
    {
      sessionStorage.setItem(recipeId+"Progress",JSON.stringify(progressStep));

    }

  },
  getProgressInteger(recipeId) {
     return sessionStorage.getItem(recipeId+"Progress");

  },
  isAlreadyProgress(recipeId) {
    if (this.recipesCookingProgress[recipeId]){
      return true;
    }
    if(sessionStorage.getItem(recipeId+"Progress")!= undefined)
    {
      return true;
    }
    return false;
  },
  recipesCookingNumberOfInstructions: {},
  getNumberOfInstruction(recipeId){
    return sessionStorage.getItem(recipeId+"Instruction");


  },
  updateNumberOfInstructions(recipeId, count) {
    if (!this.recipesCookingNumberOfInstructions[recipeId]) {
      this.recipesCookingNumberOfInstructions[recipeId] = count;
      sessionStorage.setItem(recipeId+"Instruction",JSON.stringify(count));

    } 
  },
  saveSearchRecipes(recipes)
  {
    sessionStorage.setItem("lastSearchRecipes",JSON.stringify(recipes));
  },
  getLastSearchRecipes()
  {
    return sessionStorage.getItem("lastSearchRecipes");
  },
  
  //  baseUrl: "https://assignment-3-2-merav-yiftach.herokuapp.com",
  baseUrl: "http://localhost:3000",
  // previews: {},
  // insertPreview(recipeId, preview) {
  //   this.previews[recipeId] = preview;
  // },
  // getPreLoadedPreview(recipeId){
  //   return this.$root.store.previews[recipeId];
  // }
  query: sessionStorage.lastQuery,
  saveLastQuery(QueryObj){
    sessionStorage.setItem("lastQuery",JSON.stringify(QueryObj));
    this.query = JSON.stringify(QueryObj);
  },
  ClearStorage(){
    sessionStorage.removeItem("lastQuery");
    this.query=undefined;
    sessionStorage.clear();
    localStorage.clear();

  },

  saveMyMeal(myMeal)
  {
    sessionStorage.setItem("myMeal",JSON.stringify(myMeal));
  },

  getMyMeal()
  {
    return JSON.parse(sessionStorage.getItem("myMeal"));

  },

  recipes: {},
  insertRecipe(recipeId, recipe) {
    this.recipes[recipeId] = recipe;
  },
  getPreLoadedRecipe(recipeId) {
    return this.recipes[recipeId];
  },
  extractRecipe(response) {
    let { summary, instructions, yeild, ingredients } = response.data;

    let {
      recipeId,
      photo,
      title,
      time,
      likes,
      veganVegetarian,
      glutenFree,
    } = response.data.preview;

    let recipe = {
      recipeId,
      photo,
      title,
      time,
      summary,
      likes,
      veganVegetarian,
      glutenFree,
      instructions,
      ingredients,
      photo,
      title,
      yeild,
    };
    return recipe;
  },
};
// Vue.prototype.$root.store = shared_data;

new Vue({
  router,
  data() {
    return {
      store: shared_data,
    };
  },
  methods: {
    toast(title, content, variant = null, append = false) {
      this.$bvToast.toast(`${content}`, {
        title: `${title}`,
        toaster: "b-toaster-top-center",
        variant: variant,
        solid: true,
        appendToast: append,
        autoHideDelay: 3000,
      });
    },
  },
  render: (h) => h(App),
}).$mount("#app");