<template>
  <!-- Sticky top navigation -->
  <nav class="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-200">
    <div class="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
      <div class="h-16 flex items-center justify-between">
        <div class="h-16 flex items-center justify-between">
          <!-- Left: Logo -->
          <div class="flex items-center gap-3">
            <router-link to="/" class="flex items-center gap-2">
              <div class="hidden sm:block">
                <img src="../assets/img/water.png" alt="logo" class="w-55">
              </div>
            </router-link>
          </div>

          <!-- Center: Primary nav (desktop) -->
          <div class="hidden md:flex items-center gap-1">
            <router-link
                to="/"
                class="px-3 py-2 rounded-xl text-sm font-medium transition"
            >
              მთავარი
            </router-link>

            <!-- ინციდენტის ფორმები DROPDOWN -->
            <div class="relative ml-1"
                 @mouseenter="openForms = true"
                 @mouseleave="openForms = false">
              <button
                  type="button"
                  @click="openForms = !openForms"
                  class="inline-flex items-center gap-1 px-3 py-2 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
              >
                ინციდენტის ფორმები
                <span class="text-xs" :class="openForms ? 'rotate-180' : ''">▾</span>
              </button>

              <!-- Dropdown menu -->
              <div
                  v-if="openForms"
                  class="absolute  w-64 rounded-2xl border border-gray-200 bg-white shadow-lg z-[60]"
              >
                <router-link
                    to="/forms/Shutdown"
                    class="block px-4 py-2.5 text-sm hover:bg-gray-50"
                >
                  ძაბვა
                </router-link>

                <router-link
                    to="/forms/electric-issue"
                    class="block px-4 py-2.5 text-sm hover:bg-gray-50"
                >
                  ელექტროანერგიის პრობლემა
                </router-link>

                <router-link
                    to="/forms/network-problem"
                    class="block px-4 py-2.5 text-sm hover:bg-gray-50"
                >
                  ქსელის პრობლემა
                </router-link>

              </div>
            </div>
          </div>
        </div>

        <!-- Right: User / My Page -->
        <div class="relative" data-profile-area>
          <button
              @click="profileOpen = !profileOpen"
              class="flex items-center space-x-2 text-gray-600 hover:text-gray-800 focus:outline-none"
          >
            <span class="w-9 h-9 rounded-full bg-sky-600 text-white flex items-center justify-center text-sm font-semibold uppercase">
              {{ userInitials }}
            </span>

            <span class="text-sm font-medium hidden sm:block">{{ userName }}</span>

            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
              <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.114l3.71-3.884a.75.75 0 1 1 1.08 1.04ლ-4.24 4.44a.75.75 0 0 1-1.08 0ლ-4.24-4.44a.75.75 0 0 1 .02-1.06Z" clip-rule="evenodd" />
            </svg>
          </button>

          <!-- Dropdown -->
          <transition name="fade" mode="out-in">
            <div
                v-if="profileOpen"
                class="absolute right-0 mt-2 w-56 rounded-2xl border border-gray-200 bg-white shadow-lg z-[60]"
            >
              <div class="p-3 border-b border-gray-100">
                <p class="text-sm font-semibold">{{ userName }}</p>
                <p class="text-xs text-gray-500 truncate">{{ userPosition }}</p>
              </div>
              <div class="p-1">
                <!--                <router-link to="/profile" class="block px-3 py-2 text-sm rounded-xl hover:bg-gray-50">პროფილი</router-link>-->
                <!--                <router-link to="/settings" class="block px-3 py-2 text-sm rounded-xl hover:bg-gray-50">პარამეტრები</router-link>-->
                <div class="my-1 h-px bg-gray-100" />
                <button @click="onSignOut" class="w-full text-left px-3 py-2 text-sm rounded-xl hover:bg-gray-50">
                  გამოსვლა
                </button>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'

const profileOpen = ref(false)
const openForms = ref(false)

const userName = 'გიგი დოლმაზაშვილი'
const userPosition = 'მხარდაჭერის სამსახურის უფროსი'

const userInitials = computed(() => {
  const parts = userName.trim().split(' ').filter(Boolean)
  return parts.map(p => p[0]).join('').toUpperCase()
})

const route = useRoute()
function isActive(path) {
  return route.path === path || (route.path.startsWith(path) && path !== '/')
}

function onSignOut() {
  if (confirm('გინდა რომ გამოხვიდე ანგარიშიდან?')) {
    localStorage.removeItem('auth_token')
    profileOpen.value = false
    window.location.href = '/auth'
  }
}

function onClickOutside(e) {
  const target = e.target
  if (!(target.closest && target.closest('[data-profile-area]'))) {
    profileOpen.value = false
  }
}
function onEsc(e) {
  if (e.key === 'Escape') {
    profileOpen.value = false
    openForms.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', onClickOutside)
  document.addEventListener('keydown', onEsc)
})
onBeforeUnmount(() => {
  document.removeEventListener('click', onClickOutside)
  document.removeEventListener('keydown', onEsc)
})
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity .12s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.slide-enter-active, .slide-leave-active { transition: transform .18s.ease, opacity .18s ease; }
.slide-enter-from { transform: translateY(-4px); opacity: 0; }
.slide-leave-to { transform: translateY(-4px); opacity: 0; }
</style>
