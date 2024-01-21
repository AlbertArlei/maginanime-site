import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/homeView.vue'
import LoginView from '../views/loginView.vue'
import SignupView from '../views/signupView.vue'
import ProfileView from '../views/profileView.vue'
import MangaView from '../views/mangaView.vue'
import SearchView from '../views/searchView.vue'
import LibraryView from '../views/libraryView.vue'
import AboutView from '../views/aboutView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignupView
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView
    },
    {
      path: '/manga',
      name:'manga',
      component: MangaView
    },
    {
      path: '/search',
      name:'search',
      component: SearchView
    },
    {
      path: '/library',
      name: 'library',
      component: LibraryView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    }

  ]
})

export default router
