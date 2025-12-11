<template>
  <div class="px-6 py-8 max-w-4xl mx-auto">

    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold text-gray-900">ჩანაწერის დათვალიერება</h1>

      <router-link
          to="/shutdown"
          class="px-3 py-1.5 rounded-lg text-sm bg-gray-100 hover:bg-gray-200"
      >
        უკან დაბრუნება
      </router-link>
    </div>

    <div v-if="row" class="grid grid-cols-2 gap-4 bg-white p-6 rounded-xl shadow">
      <div>
        <label class="text-gray-500">თარიღი:</label>
        <input type="text" :value="row.incident_date" disabled class="view-input">
      </div>

      <div>
        <label class="text-gray-500">დრო:</label>
        <input type="text" :value="row.incident_time" disabled class="view-input">
      </div>

      <div>
        <label class="text-gray-500">მისამართი:</label>
        <input type="text" :value="row.address" disabled class="view-input">
      </div>

      <div>
        <label class="text-gray-500">გამგზავნი:</label>
        <input type="text" :value="row.sender_fullname" disabled class="view-input">
      </div>

      <div>
        <label class="text-gray-500">მიმღები:</label>
        <input type="text" :value="row.receiver_fullname" disabled class="view-input">
      </div>

      <div>
        <label class="text-gray-500">დაზიანების ტიპი:</label>
        <input type="text" :value="row.damage_type" disabled class="view-input">
      </div>

      <div class="col-span-2">
        <label class="text-gray-500">მოქმედება:</label>
        <textarea :value="row.taken_actions" disabled class="view-input h-24"></textarea>
      </div>

      <div class="col-span-2">
        <label class="text-gray-500">შენიშვნა:</label>
        <textarea :value="row.note" disabled class="view-input h-24"></textarea>
      </div>

    </div>

    <div v-else class="text-center text-gray-500 text-lg pt-10">
      ჩანაწერი ვერ მოიძებნა
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getShutdownData } from '../../utils/shutdownStorage.js'

const route = useRoute()
const row = ref(null)

onMounted(() => {
  const id = route.params.id
  const rows = getShutdownData()

  if (rows[id]) {
    row.value = rows[id]
  }
})
</script>

<style>
.view-input {
  @apply w-full h-10 px-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-700;
}
</style>
