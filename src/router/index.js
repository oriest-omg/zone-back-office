import { createRouter, createWebHistory } from 'vue-router'
import Connexion from '../views/Connexion.vue'
import ListeVoitures from '../views/ListeVoitures.vue'
import ListeCommandes from '../views/CommandeView.vue'
import ListeModeles from '../views/ListeModeles'
import genPDF from '../views/pdf.vue'


const routes = [
  {
    path: '/',
    name: 'Connexion',
    component: Connexion
  },
  {
    path: '/ListeVoitures',
    name: 'ListeVoitures',
    component: ListeVoitures
  },
  {
    path: '/ListeCommandes',
    name: 'ListeCommandes',
    component: ListeCommandes
  },
  {
    path: '/ListeModeles',
    name: 'ListeModeles',
    component: ListeModeles
  },
  {
    path: '/genPDF/:idCommande',
    name: 'genPDF',
    component: genPDF
  }
  // {
  //   // path: '/about',
  //   // name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
