import Main from "./pages/MainPage";
import NotFound from "./pages/NotFoundPage";

const routes = [
  {
    path: "/",
    name: "main",
    component: Main,
  },
  {
    path: "/register",
    name: "register",
    component: () => import("./pages/RegisterPage"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./pages/LoginPage"),
  },
  {
    path: "/search",
    name: "search",
    component: () => import("./pages/SearchPage"),
  },
  {
    path: "/about",
    name: "about",
    component: () => import("./pages/AboutPage"),
  },
  {
    path: "/recipe/:recipeId",
    name: "recipe",
    component: () => import("./pages/RecipeViewPage"),
  },
  {
    path: "/user/:recipeId",
    name: "user_recipe",
    component: () => import("./pages/MyRecipePage"),
  },
  {
    path: "/user/favorite",
    name: "favorite",
    component: () => import("./pages/FavoritePage"),
  },
  {
    path: "/user/personalRecipes",
    name: "personal-recipes",
    component: () => import("./pages/PersonalRecipesPage"),
  },
  {
    path: "/user/familyRecipes",
    name: "family-recipes",
    component: () => import("./pages/FamilyPage"),
  },
  {
    path: "/recipe/prepareRecipe/recipeId/:recipeId/type/:type",
    name: "prepare-recipe",
    component: () => import("./pages/PrepareRecipePage"),
  },
  {
    path: "*",
    name: "notFound",
    component: NotFound,
  },
  {
    path: "/user/my-meal",
    name: "my-meal",
    component: () => import("./pages/MyMealPage"),
  },
];

export default routes;
