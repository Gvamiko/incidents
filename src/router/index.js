import { createRouter, createWebHistory } from 'vue-router'

// Lazy-loaded views
const HomeView = () => import('../views/HomeView.vue')
// const AuthView = () => import('../views/AuthView.vue')

const ShutdownFormList = () => import('../views/forms/ShutdownFormList.vue')
// const ElectricIssueForm = () => import('../views/incidents/ElectricIssueForm.vue')
// const NetworkProblemForm = () => import('../views/incidents/NetworkProblemForm.vue')
const ShutdownFormCreate = () => import('../views/forms/ShutdownFormCreate.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    {
      path: '/',
      name: 'Home',
      component: HomeView,
      meta: { title: 'მთავარი' }
    },

    // {
    //   path: '/auth',
    //   name: 'Auth',
    //   component: AuthView,
    //   meta: { title: 'ავტორიზაცია', public: true }
    // },

    // 🌊 წყლის გაჟონვის ფორმა
    {
      path: '/forms/Shutdown',
      name: 'ShutdownFormList',
      component: ShutdownFormList,
      meta: { title: 'წყლის გაჟონვის ფორმა' }
    },

    // ახალი ჩანაწერის დამატება
    {
      path: '/shutdown/new',
      name: 'ShutdownFormCreate',
      component: ShutdownFormCreate,
      meta: { title: 'ახალი ავარიული გათიშვა' }
    },



    // ⚡ ელექტროენერგიის პრობლემის ფორმა
    // {
    //   path: '/forms/electric-issue',
    //   name: 'ElectricIssueForm',
    //   component: ElectricIssueForm,
    //   meta: { title: 'ელექტრო პრობლემის ფორმა' }
    // },

    // 🌐 ქსელის პრობლემის ფორმა
    // {
    //   path: '/forms/network-problem',
    //   name: 'NetworkProblemForm',
    //   component: NetworkProblemForm,
    //   meta: { title: 'ქსელის პრობლემის ფორმა' }
    // },

    // 404
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: {
        template: `
          <div class="p-10 text-center">
            <h1 class="text-2xl font-semibold mb-2">გვერდი ვერ მოიძებნა</h1>
            <p class="text-gray-500">მოთხოვნილი ბმული არ არსებობს</p>
          </div>`
      },
      meta: { title: '404' }
    }
  ]
})

router.afterEach((to) => {
  document.title = to.meta?.title
      ? `${to.meta.title} | ინციდენტების სისტემა`
      : 'ინციდენტების სისტემა'
})

export default router
