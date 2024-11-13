import Vue from 'vue'
import VueRouter from 'vue-lang-router'
//import store from '../store'

import NProgress from 'nprogress'
import store from "../store"

import translations from '../lang/translations'
import localizedURLs from '../lang/localized-urls'

NProgress.configure({ showSpinner: false });

Vue.use(VueRouter, {
  defaultLanguage: 'fr',
  translations,
  localizedURLs,
});

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/home.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login.vue')
  },
  {
    path: '/register/:planKey?',
    name: 'register',
    component: () => import('../views/register.vue')
  },
  {
    path: '/mony',
    name: 'mony',
    component: () => import('../views/custom/mony.vue')
  },
  // {
  //   path: '/g1-vs-krup',
  //   name: 'g1-vs-krup',
  //   component: () => import('../views/custom/g1-vs-krup.vue')
  // },
  {
    path: '/faq',
    name: 'faq',
    component: () => import('../views/faq.vue')
  },
  {
    path: '/cgv',
    name: 'cgv',
    component: () => import('../views/cgv.vue')
  },
  {
    path: '/cgu',
    name: 'cgu',
    component: () => import('../views/cgu.vue')
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('../views/contact.vue')
  },
  {
    path: '/team',
    name: 'team',
    component: () => import('../views/custom/team.vue')
  },

  /**************************** CUSTOM ****************************/

  {
    path: '/wallet/:walletUid?',
    name: 'wallet',
    component: () => import('../views/custom/wallet.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/change-password',
    name: 'change-password',
    component: () => import('../views/account/change-password.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/reset-password',
    name: 'reset-password-init',
    component: () => import('../views/account/reset-password-init.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/reset-password/:userId/:pwdToken',
    name: 'reset-password-form',
    component: () => import('../views/account/reset-password-form.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/change-email',
    name: 'change-email',
    component: () => import('../views/account/change-email.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/delete-account',
    name: 'delete-account',
    component: () => import('../views/account/delete-account.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/cancel-subscription',
    name: 'cancel-subscription',
    component: () => import('../views/account/cancel-subscription.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/profil',
    name: 'profil',
    component: () => import('../views/custom/profil.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/config',
    name: 'config',
    component: () => import('../views/custom/config.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/market',
    name: 'market',
    component: () => import('../views/custom/market.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/publish-offer',
    name: 'publish-offer',
    component: () => import('../views/custom/form-offer.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/edit-offer/:offerId',
    name: 'edit-offer',
    component: () => import('../views/custom/form-offer.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/report-offer/:offerId',
    name: 'report-offer',
    component: () => import('../views/confirm/report-offer.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/offer/:offerId',
    name: 'offer',
    component: () => import('../views/custom/offer.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/propositions/buyer',
    name: 'propositions-buyer',
    component: () => import('../views/custom/proposition-buyer.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/propositions/seller',
    name: 'propositions-seller',
    component: () => import('../views/custom/proposition-seller.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/my-offers',
    name: 'my-offers',
    component: () => import('../views/custom/my-offers.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/private/:userId/:offerId',
    name: 'private',
    component: () => import('../views/custom/private.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/payment/thanks',
    name: 'payment-thanks',
    component: () => import('../views/confirm/payment.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/payment/:offerId',
    name: 'payment-offer',
    component: () => import('../views/custom/payment-offer.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/info/locked',
    name: 'info-locked',
    component: () => import('../views/custom/info-locked.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/info/payplan',
    name: 'info-payplan',
    component: () => import('../views/custom/info-payplan.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/info/plan-fst-offer',
    name: 'info-plan-fst-offer',
    component: () => import('../views/custom/info-plan-fst-offer.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/confirm-email/:userId/:emailToken',
    name: 'confirm-email',
    component: () => import('../views/confirm/confirm-email.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/confirm-register',
    name: 'confirm-register',
    component: () => import('../views/confirm/confirm-register.vue'),
    meta: { requiresAuth: false }
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


router.beforeResolve((to, from, next) => {
  // If this isn't an initial page load.
  if (to.name) {
    // Start the route progress bar.
    NProgress.start()
  }
  next()
})

router.afterEach(() => {
  // Complete the animation of the route progress bar.
  NProgress.done()
  setTimeout(()=>{
    window.scrollTo(0, 0)
  }, 200)
  
})

//avant chaque changement de route (url dans le navitateur)
router.beforeEach(async (to, from, next) => {
  if(to.meta != null //si cette route nécessite une authentification 
  && to.meta.requiresAuth == true){
    //vérifie que le user est connecté
    await store.dispatch('auth/checkAuth', null, { root: true })

    if(store.state.auth.isLogin) {//si le user est connecté
      if(to.meta != null //si cette route nécessite d'être admin
        && to.meta.requiresAdmin == true){
        if(store.getters['auth/isAdmin']) return next()//soit il est admin, et il peut y aller
        else return next('/login') //soit il est pas admin, il doit se logguer
      }else return next()
    }//si il n'est pas connecté, il doit se logguer
    else return next('/login')
  }else{//si la route n'a pas besoin d'authentification, il peut y aller
    return next()
  }
})


export default router
