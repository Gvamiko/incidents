<template>
  <div class="px-4 sm:px-6 lg:px-8 py-8 list-container">
    <!-- Header -->
    <div class="px-4 sm:px-1 py-4 border-b border-gray-100 flex items-center justify-between gap-3">
      <div class="flex items-top justify-between">
        <div class="mb-4">
          <h1 class="text-3xl font-bold text-gray-900">
            ავარიულ გათიშვებისა და დაბალი ძაბვების აღიცხვის ჟურნალი
          </h1>
          <p class="text-sm text-gray-500 mt-1">
            ჯამში {{ filteredRows.length }} ჩანაწერი
          </p>
        </div>
      </div>

      <!-- Placeholder ღილაკები / future actions -->
      <div class="flex items-center gap-2">
        <button
            type="button"
            class="inline-flex items-center px-4 py-2.5 text-sm font-medium rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50"
        >
          ექსპორტი
        </button>
        <router-link
            :to="{ name: 'ShutdownFormCreate' }"
            class="inline-flex items-center px-4 py-2.5 text-sm font-medium rounded-xl text-white hover:bg-blue-700" style="background-color: #2563eb;"
        >
          დამატება
        </router-link>
      </div>
    </div>

    <!-- Table wrapper -->
    <div class="overflow-x-auto bg-white rounded-lg shadow-sm border border-gray-200">
      <!-- Filters inside table container -->
      <div class="p-6 border-b border-gray-100">
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center gap-2">
          <h2 class="text-lg font-semibold text-gray-800">
            ფილტრები
          </h2>
        </div>
        <button
            type="button"
            class="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-colors"
            @click="clearFilters"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
          </svg>
          გასუფთავება
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <!-- Search -->
        <div class="flex flex-col gap-2">
          <div class="relative">
            <input
                v-model="search"
                type="text"
                class="w-full h-12 rounded-lg border border-gray-300 pl-10 pr-4 text-sm text-gray-800
                       focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none
                       placeholder:text-gray-400 transition-all duration-200
                       hover:border-gray-400"
                placeholder="მისამართი, პირები, დაზიანება..."
            />
            <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
        </div>

        <!-- თარიღი დან -->
        <div class="flex flex-col gap-2">
          <input
              v-model="dateFrom"
              type="date"
              placeholder="თარიღი — დან"
              class="w-full h-12 rounded-lg border border-gray-300 px-4 text-sm text-gray-800
                     focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none
                     transition-all duration-200 hover:border-gray-400"
          />
        </div>

        <!-- თარიღი — მდე -->
        <div class="flex flex-col gap-2">
          <input
              v-model="dateTo"
              type="date"
              placeholder="თარიღი — მდე"
              class="w-full h-12 rounded-lg border border-gray-300 px-4 text-sm text-gray-800
                     focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none
                     transition-all duration-200 hover:border-gray-400"
          />
        </div>

        <!-- სტატუსი -->
        <div class="flex flex-col gap-2">
          <select
              v-model="statusFilter"
              class="w-full h-12 rounded-lg border border-gray-300 px-4 text-sm text-gray-800
                     bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none
                     transition-all duration-200 hover:border-gray-400 cursor-pointer"
          >
            <option value="all">ყველა სტატუსი</option>
            <option value="open">გახსნილი</option>
            <option value="in_progress">პროცესშია</option>
            <option value="waiting">მოლოდინში</option>
            <option value="closed">დახურული</option>
          </select>
        </div>
      </div>
      </div>
      <table class="min-w-full border-collapse text-sm">
        <thead>
        <tr class="bg-gray-100 text-gray-700">
          <th class="px-4 py-3 text-left font-semibold whitespace-nowrap border-b border-gray-300">
            #
          </th>
          <th class="px-4 py-3 text-left font-semibold whitespace-nowrap border-b border-gray-300">
            ინციდენტის თარიღი
          </th>
          <th class="px-4 py-3 text-left font-semibold whitespace-nowrap border-b border-gray-300">
            დაფიქსირების დრო
          </th>
          <th class="px-4 py-3 text-left font-semibold whitespace-nowrap border-b border-gray-300">
            მისამართი
          </th>
          <th class="px-4 py-3 text-left font-semibold whitespace-nowrap border-b border-gray-300">
            გამგზავნი/მიმღები
          </th>
<!--          <th class="px-4 py-3 text-left font-semibold whitespace-nowrap border-b border-gray-300">-->
<!--            მიმღები (სახელი, გვარი)-->
<!--          </th>-->
          <th class="px-4 py-3 text-left font-semibold whitespace-nowrap border-b border-gray-300">
            დაზიანების ტიპი
          </th>
<!--          <th class="px-4 py-3 text-left font-semibold whitespace-nowrap border-b border-gray-300">-->
<!--            მიღებული ზომები-->
<!--          </th>-->
          <th class="px-4 py-3 text-left font-semibold whitespace-nowrap border-b border-gray-300">
            აღმოფხვრის დრო
          </th>
          <th class="px-4 py-3 text-left font-semibold whitespace-nowrap border-b border-gray-300">
            პრობლემის სტატუსი
          </th>
<!--          <th class="px-4 py-3 text-left font-semibold whitespace-nowrap border-b border-gray-300">-->
<!--            შენიშვნა-->
<!--          </th>-->
          <!-- ახალი სვეტი: მოქმედებები -->
          <th class="px-4 py-3 text-left font-semibold whitespace-nowrap border-b border-gray-300">
            მოქმედებები
          </th>
        </tr>
        </thead>

        <tbody>
        <tr
            v-for="(row, index) in filteredRows"
            :key="row.id"
            class="hover:bg-blue-50/50 transition-colors border-b border-gray-100 last:border-b-0"
        >
          <td class="px-4 py-3 border-b border-gray-200 text-gray-500 align-top">
            {{ index + 1 }}
          </td>

          <!-- ინციდენტის თარიღი -->
          <td class="px-4 py-3 border-b border-gray-200 text-gray-800 whitespace-nowrap align-top">
            {{ formatDate(row.incident_date) }}
          </td>

          <!-- დაფიქსირების დრო -->
          <td class="px-4 py-3 border-b border-gray-200 text-gray-800 whitespace-nowrap align-top">
            {{ row.incident_time }}
          </td>

          <!-- მისამართი -->
          <td class="px-4 py-3 border-b border-gray-200 text-gray-800 align-top min-w-[180px]">
            <div class="line-clamp-2">
              {{ row.address }}
            </div>
          </td>

          <!-- გამგზავნი -->
          <td class="px-4 py-3 border-b border-gray-200 text-gray-800 whitespace-nowrap align-top">
            {{ row.sender_fullname }}
            <br>
            {{ row.receiver_fullname }}
          </td>

          <!-- მიმღები -->
<!--          <td class="px-4 py-3 border-b border-gray-200 text-gray-800 whitespace-nowrap align-top">-->
<!--            {{ row.receiver_fullname }}-->
<!--          </td>-->

          <!-- დაზიანების ტიპი -->
          <td class="px-4 py-3 border-b border-gray-200 text-gray-800 align-top min-w-[150px]">
            <div class="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 border border-amber-100">
              <span class="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
              <span class="text-sm font-medium text-amber-800">
                  {{ row.damage_type }}
                </span>
            </div>
          </td>

          <!-- მიღებული ზომები -->
<!--          <td class="px-3 sm:px-4 py-2.5 border-b border-gray-100 text-gray-700 align-top min-w-[220px]">-->
<!--            <div class="line-clamp-3">-->
<!--              {{ row.taken_actions || '—' }}-->
<!--            </div>-->
<!--          </td>-->

          <!-- აღმოფხვრის დრო -->
          <td class="px-4 py-3 border-b border-gray-200 text-gray-800 whitespace-nowrap align-top">
              <span v-if="row.fix_time">
                {{ formatDateTime(row.fix_time) }}
              </span>
            <span v-else class="text-gray-400 text-xs">
                არ არის მითითებული
              </span>
          </td>

          <!-- პრობლემის სტატუსი -->
          <td class="px-4 py-3 border-b border-gray-200 align-top">
              <span
                  class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
                  :class="statusBadgeClass(row.problem_status)"
              >
                <span
                    class="w-2 h-2 rounded-full mr-2"
                    :class="statusDotClass(row.problem_status)"
                ></span>
                {{ statusLabel(row.problem_status) }}
              </span>
          </td>

          <!-- შენიშვნა -->
<!--          <td class="px-3 sm:px-4 py-2.5 border-b border-gray-100 text-gray-700 align-top min-w-[200px]">-->
<!--            <div class="line-clamp-3">-->
<!--              {{ row.note || '—' }}-->
<!--            </div>-->
<!--          </td>-->

          <!-- ახალი TD: მოქმედებების ღილაკები -->
          <td class="px-4 py-3 border-b border-gray-200 text-gray-700 align-top">
            <div class="inline-flex items-center gap-1">
              <button
                  class="px-3 py-1.5 text-sm bg-blue-50 text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-100"
                  @click="openViewModal(row)"
              >
                დათვალიერება

              </button>
              <button
                  type="button"
                  class="inline-flex items-center px-3 py-1 text-sm font-medium rounded-full border border-red-200 text-red-600 hover:bg-red-50"
                  @click="deleteRow(row)"
              >
                წაშლა
              </button>
            </div>
          </td>
        </tr>

        <tr v-if="filteredRows.length === 0">
          <td
              colspan="12"
              class="px-4 py-8 text-center text-sm text-gray-400"
          >
            ინციდენტები ვერ მოიძებნა არჩეული ფილტრებით
          </td>
        </tr>
        </tbody>
      </table>
      <ViewModal
          v-if="viewModalOpen"
          :data="selectedRow"
          @close="viewModalOpen = false"
      />
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getShutdownData, saveShutdownData } from '../../utils/shutdownStorage'
import ViewModal from '../../components/Shutdown/ViewModal.vue'

const router = useRouter()

// --- ბაზა rows – localStorage-დან ---
const rows = ref([])

onMounted(() => {
  rows.value = getShutdownData()
})

const viewModalOpen = ref(false)
const selectedRow = ref({})

const openViewModal = (row) => {
  selectedRow.value = row
  viewModalOpen.value = true
}



// --- ფილტრები ---
const search = ref('')
const dateFrom = ref('')
const dateTo = ref('')
const statusFilter = ref('all')

const deleteRow = (row) => {
  if (!row || !row.id) return

  const ok = window.confirm('ნამდვილად გსურს ამ ჩანაწერის წაშლა?')
  if (!ok) return

  // ამოვშალოთ rows-ის მასივიდან
  rows.value = rows.value.filter(r => r.id !== row.id)

  // მოვათავსოთ განახლებული მონაცემები localStorage-ში
  saveShutdownData(rows.value)
}

// ფილტრირებული rows
const filteredRows = computed(() => {
  let data = rows.value || []

  // ტექსტური ძიება
  if (search.value.trim()) {
    const q = search.value.toLowerCase()
    data = data.filter((r) => {
      const fields = [
        r.address,
        r.sender_fullname,
        r.receiver_fullname,
        r.damage_type,
        r.note
      ]
      return fields.some((f) => f && String(f).toLowerCase().includes(q))
    })
  }

  // სტატუსი
  if (statusFilter.value !== 'all') {
    const s = statusFilter.value.toLowerCase()
    data = data.filter(
        (r) => r.problem_status && String(r.problem_status).toLowerCase() === s
    )
  }

  // თარიღი – დან
  if (dateFrom.value) {
    const from = new Date(dateFrom.value)
    data = data.filter((r) => {
      if (!r.incident_date) return false
      const d = new Date(r.incident_date)
      return !Number.isNaN(d.getTime()) && d >= from
    })
  }

  // თარიღი – მდე
  if (dateTo.value) {
    const to = new Date(dateTo.value)
    data = data.filter((r) => {
      if (!r.incident_date) return false
      const d = new Date(r.incident_date)
      return !Number.isNaN(d.getTime()) && d <= to
    })
  }

  return data
})

const clearFilters = () => {
  search.value = ''
  dateFrom.value = ''
  dateTo.value = ''
  statusFilter.value = 'all'
}

const formatDate = (value) => {
  if (!value) return ''
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return value
  return d.toLocaleDateString('ka-GE', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })
}

const formatDateTime = (value) => {
  if (!value) return ''
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return value
  return d.toLocaleString('ka-GE', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// სტატუსის ლეიბლები ქართულად
const statusLabel = (status) => {
  switch (String(status || '').toLowerCase()) {
    case 'open':
      return 'გახსნილი'
    case 'in_progress':
    case 'in-progress':
      return 'პროცესშია'
    case 'waiting':
      return 'მოლოდინში'
    case 'closed':
      return 'დახურული'
    default:
      return 'გახსნილი'
  }
}

const statusBadgeClass = (status) => {
  switch (String(status || '').toLowerCase()) {
    case 'open':
      return 'bg-red-50 text-red-700 border border-red-100'
    case 'in_progress':
    case 'in-progress':
      return 'bg-amber-50 text-amber-700 border border-amber-100'
    case 'waiting':
      return 'bg-slate-50 text-slate-700 border border-slate-200'
    case 'closed':
      return 'bg-emerald-50 text-emerald-700 border border-emerald-100'
    default:
      return 'bg-slate-50 text-slate-700 border border-slate-200'
  }
}

const statusDotClass = (status) => {
  switch (String(status || '').toLowerCase()) {
    case 'open':
      return 'bg-red-500'
    case 'in_progress':
    case 'in-progress':
      return 'bg-amber-500'
    case 'waiting':
      return 'bg-slate-400'
    case 'closed':
      return 'bg-emerald-500'
    default:
      return 'bg-slate-400'
  }
}

// დროებით პლეისჰოლდერი ფუნქციები ღილაკებისთვის
const viewRow = (row) => {
  console.log('View row', row)
  // აქ მერე ჩაანაცვლებ router.push-ით ან მოდალით
}



</script>

<style scoped>
.list-container {
  font-family: 'FiraGO', sans-serif;
}
</style>
