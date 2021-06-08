import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeComponent from '../views/Home.vue'
import CreateComponent from '../components/todo/Create.vue'
import EditComponent from '../components/todo/Edit.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeComponent
  },
  {
    path: '/create',
    name: 'Create',
    component: CreateComponent
  } ,
  {
    path: '/edit/:id',
    name: 'Edit',
    component: EditComponent
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
