<template>
  <div class="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Header -->
    <div class="mb-6 flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">
          ავარიული გათიშვა
        </h1>
        <p class="text-xs text-gray-500 mt-1">
          ინციდენტის დაფიქსირების ფორმა
        </p>
      </div>

      <button
          type="button"
          class="text-xs text-gray-500 hover:text-gray-700"
          @click="goBack"
      >
        დაბრუნება ჟურნალში
      </button>
    </div>

    <!-- Form -->
    <form class="space-y-6" @submit.prevent="handleSubmit">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- დაფიქსირების დრო (ავტომატური, readonly) -->
        <div class="flex flex-col gap-1">
          <label class="text-[11px] font-medium text-gray-600">
            დაფიქსირების დრო (ავტომატურად)
          </label>
          <input
              v-model="form.incident_time"
              type="text"
              readonly
              class="w-full h-9 rounded-lg border border-gray-300 px-3 text-xs text-gray-800 bg-gray-50
                   focus:outline-none"
          />
        </div>
        <!-- ინციდენტის თარიღი -->
        <!-- ინციდენტის თარიღი და დრო -->
        <div class="flex flex-col gap-1">
          <label class="text-[11px] font-medium text-gray-600">
            ინციდენტის თარიღი და დრო
          </label>

          <input
              v-model="form.incident_date"
              type="datetime-local"
              required
              class="w-full h-9 rounded-lg border border-gray-300 px-3 text-xs text-gray-800
           focus:ring-1 focus:ring-sky-500 focus:border-sky-500 focus:outline-none"
          />
        </div>


        <!-- მისამართი -->
        <div class="flex flex-col gap-1 md:col-span-2">
          <label class="text-[11px] font-medium text-gray-600">
            მისამართი
          </label>
          <input
          v-model="form.address"
          type="text"
          required
          class="w-full h-9 rounded-lg border border-gray-300 px-3 text-xs text-gray-800
        focus:ring-1 focus:ring-sky-500 focus:border-sky-500 focus:outline-none"
          placeholder="ქალაქი, ქუჩა, ობიექტი..."
          />
        </div>

        <!-- გამგზავნი -->
        <div class="flex flex-col gap-1">
          <label class="text-[11px] font-medium text-gray-600">
            გამგზავნი (სახელი, გვარი)
          </label>
          <input
              v-model="form.sender_fullname"
              type="text"
              required
              class="w-full h-9 rounded-lg border border-gray-300 px-3 text-xs text-gray-800
                   focus:ring-1 focus:ring-sky-500 focus:border-sky-500 focus:outline-none"
          />
        </div>

        <!-- მიმღები -->
        <div class="flex flex-col gap-1">
          <label class="text-[11px] font-medium text-gray-600">
            მიმღები (სახელი, გვარი)
          </label>
          <input
              v-model="form.receiver_fullname"
              type="text"
              required
              class="w-full h-9 rounded-lg border border-gray-300 px-3 text-xs text-gray-800
                   focus:ring-1 focus:ring-sky-500 focus:border-sky-500 focus:outline-none"
          />
        </div>

        <!-- დაზიანების ტიპი (დროპდაუნი) -->
        <div class="flex flex-col gap-1">
          <label class="text-[11px] font-medium text-gray-600">
            დაზიანების ტიპი
          </label>
          <select
              v-model="form.damage_type"
              required
              class="w-full h-9 rounded-lg border border-gray-300 px-3 text-xs text-gray-800
                   bg-white focus:ring-1 focus:ring-sky-500 focus:border-sky-500 focus:outline-none"
          >
            <option value="" disabled>აირჩიე დაზიანების ტიპი...</option>
            <option
                v-for="type in damageTypes"
                :key="type"
                :value="type"
            >
              {{ type }}
            </option>
          </select>
        </div>

        <!-- პრობლემის სტატუსი (დროპდაუნი) -->
        <div class="flex flex-col gap-1">
          <label class="text-[11px] font-medium text-gray-600">
            პრობლემის სტატუსი
          </label>
          <select
              v-model="form.problem_status"
              required
              class="w-full h-9 rounded-lg border border-gray-300 px-3 text-xs text-gray-800
                   bg-white focus:ring-1 focus:ring-sky-500 focus:border-sky-500 focus:outline-none"
          >
            <option
                v-for="s in statusOptions"
                :key="s.value"
                :value="s.value"
            >
              {{ s.label }}
            </option>
          </select>
        </div>

        <!-- მიღებული ზომები -->
        <div class="flex flex-col gap-1 md:col-span-2">
          <label class="text-[11px] font-medium text-gray-600">
            მიღებული ზომები
          </label>
          <textarea
              v-model="form.taken_actions"
              rows="3"
              class="w-full rounded-lg border border-gray-300 px-3 py-2 text-xs text-gray-800
                   focus:ring-1 focus:ring-sky-500 focus:border-sky-500 focus:outline-none"
              placeholder="რა ზომები იქნა მიღებული პრობლემის მოსაგვარებლად..."
          ></textarea>
        </div>

        <!-- აღმოფხვრის დრო -->
        <div class="flex flex-col gap-1">
          <label class="text-[11px] font-medium text-gray-600">
            აღმოფხვრის დრო (არასავალდებულო)
          </label>
          <input
              v-model="form.fix_time"
              type="datetime-local"
              class="w-full h-9 rounded-lg border border-gray-300 px-3 text-xs text-gray-800
                   focus:ring-1 focus:ring-sky-500 focus:border-sky-500 focus:outline-none"
          />
        </div>

        <!-- შენიშვნა -->
        <div class="flex flex-col gap-1 md:col-span-2">
          <label class="text-[11px] font-medium text-gray-600">
            შენიშვნა
          </label>
          <textarea
              v-model="form.note"
              rows="3"
              class="w-full rounded-lg border border-gray-300 px-3 py-2 text-xs text-gray-800
                   focus:ring-1 focus:ring-sky-500 focus:border-sky-500 focus:outline-none"
              placeholder="დამატებითი ინფორმაცია..."
          ></textarea>
        </div>
      </div>

      <!-- Buttons -->
      <div class="flex items-center justify-end gap-2 pt-4 border-t border-gray-100">
        <button
            type="button"
            class="inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50"
            @click="goBack"
        >
          გაუქმება
        </button>
        <button
            type="submit"
            class="inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-xl bg-sky-600 text-white hover:bg-sky-700"
        >
          შენახვა
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getShutdownData, saveShutdownData } from '../../utils/shutdownStorage'

const router = useRouter()

// ფორმის state
const form = ref({
  incident_date: '',
  incident_time: '',
  address: '',
  sender_fullname: '',
  receiver_fullname: '',
  damage_type: '',
  taken_actions: '',
  fix_time: '',
  problem_status: 'waiting', // default: მოლოდინშია
  note: ''
})

// დაზიანების ტიპები (შემდეგ შეცვლი)
const damageTypes = [
  'დაბალი ძაბვა',
  'სრული გათიშვა',
  'ხაზის დაზიანება',
  'ტრანსფორმატორის პრობლემა',
  'სხვა'
]

// პრობლემის სტატუსის ვარიანტები
const statusOptions = [
  { value: 'waiting',     label: 'მოლოდინშია' },
  { value: 'in_progress', label: 'პროცესშია' },
  { value: 'closed',      label: 'დასრულებულია' }
]

// ფორმა რომ გაიხსნება – ავტომატურად ვავსებთ თარიღს და დაფიქსირების დროს
onMounted(() => {
  const now = new Date()

  // თარიღი input[type="date"]-თვის — YYYY-MM-DD
  form.value.incident_date = now.toISOString().substring(0, 10)

  // დაფიქსირების დრო — დღე თვე წელი + საათი:წუთი
  form.value.incident_time = now.toLocaleString('ka-GE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
})

const handleSubmit = () => {
  // პოპაპი დადასტურებისთვის
  const confirmed = confirm('დარწმუნებული ხარ რომ გსურს დამატება?')
  if (!confirmed) {
    return
  }

  const existing = getShutdownData() || []

  const newId = existing.length
      ? Math.max(...existing.map(r => r.id || 0)) + 1
      : 1

  const newRow = {
    id: newId,
    ...form.value
  }

  existing.push(newRow)
  saveShutdownData(existing)

  // უკან სია/ჟურნალზე
  router.push({ name: 'ShutdownFormList' })
}

const goBack = () => {
  router.push({ name: 'ShutdownFormList' })
}
</script>

