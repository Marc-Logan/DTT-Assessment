import { createRouter, createWebHistory } from 'vue-router'
import House from '../views/House.vue'
import About from '../views/About.vue'
import HouseDetails from '../views/HouseDetails.vue'
import AddHouse from '../views/AddHouse.vue'
import SignUp from '../components/SignUp.vue'
import Login from '../components/Login.vue'
import EditHouse from '../views/EditHouse.vue'

const routes = [
  {
    path: '/',
    name: 'House',
    component: House
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/houses/:id',
    name: 'HouseDetails',
    component: HouseDetails
  },
  {
    path: '/add-house',
    name: 'AddHouse',
    component: AddHouse
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/edit-house/:id',
    name: 'EditHouse',
    component: EditHouse
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router