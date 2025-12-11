<template>
  <div class="px-4 sm:px-6 lg:px-8 py-8">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900">ავარიული გათიშვების სტატისტიკა</h1>
      <p class="mt-2 text-gray-600">ძაბვისა და ელექტროენერგიის ინციდენტების მონიტორინგი</p>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div class="flex items-center">
          <div class="p-2 bg-red-100 rounded-lg">
            <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">სულ ინციდენტები</p>
            <p class="text-2xl font-semibold text-gray-900">{{ totalIncidents }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div class="flex items-center">
          <div class="p-2 bg-yellow-100 rounded-lg">
            <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">დაბალი ძაბვა</p>
            <p class="text-2xl font-semibold text-gray-900">{{ lowVoltageCount }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div class="flex items-center">
          <div class="p-2 bg-orange-100 rounded-lg">
            <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">სრული გათიშვა</p>
            <p class="text-2xl font-semibold text-gray-900">{{ fullOutageCount }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div class="flex items-center">
          <div class="p-2 bg-green-100 rounded-lg">
            <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">გადაწყვეტილი</p>
            <p class="text-2xl font-semibold text-gray-900">{{ resolvedCount }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Charts Section -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      <!-- Incident Types Chart -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">ინციდენტების ტიპები</h3>
        <div class="h-64">
          <PieChart 
            v-if="incidentTypesData && incidentTypesData.datasets"
            :data="incidentTypesData" 
            :options="pieChartOptions"
          />
          <div v-else class="flex items-center justify-center h-full text-gray-500">
            მონაცემები იტვირთება...
          </div>
        </div>
      </div>

      <!-- Monthly Trend Chart -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">თვიური სტატისტიკა</h3>
        <div class="h-64">
          <LineChart 
            v-if="monthlyTrendData && monthlyTrendData.datasets"
            :data="monthlyTrendData" 
            :options="lineChartOptions"
          />
          <div v-else class="flex items-center justify-center h-full text-gray-500">
            მონაცემები იტვირთება...
          </div>
        </div>
      </div>
    </div>

    <!-- Charts Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      <!-- Status Distribution Chart -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">სტატუსების განაწილება</h3>
        <div class="h-64">
          <BarChart 
            v-if="statusDistributionData && statusDistributionData.datasets"
            :data="statusDistributionData" 
            :options="barChartOptions"
          />
          <div v-else class="flex items-center justify-center h-full text-gray-500">
            მონაცემები იტვირთება...
          </div>
        </div>
      </div>

      <!-- Regional Distribution Chart -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">რეგიონების მიხედვით</h3>
        <div class="h-64">
          <BarChart 
            v-if="regionalData && regionalData.datasets"
            :data="regionalData" 
            :options="regionalChartOptions"
          />
          <div v-else class="flex items-center justify-center h-full text-gray-500">
            მონაცემები იტვირთება...
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { getShutdownData } from '../utils/shutdownStorage'
import { Line as LineChart, Bar as BarChart, Pie as PieChart } from 'vue-chartjs'

// Demo data and real data from localStorage
const incidents = ref([])

onMounted(() => {
  // Get data from localStorage (includes demo data if empty)
  incidents.value = getShutdownData()
  console.log('Loaded incidents:', incidents.value)
})

// Computed statistics
const totalIncidents = computed(() => incidents.value.length)

const lowVoltageCount = computed(() => 
  incidents.value.filter(i => i.damage_type === 'დაბალი ძაბვა').length
)

const fullOutageCount = computed(() => 
  incidents.value.filter(i => i.damage_type === 'სრული გათიშვა').length
)

const resolvedCount = computed(() => 
  incidents.value.filter(i => i.problem_status === 'closed').length
)

// Chart data
const incidentTypesData = computed(() => {
  if (!incidents.value.length) return null
  
  return {
    labels: ['დაბალი ძაბვა', 'სრული გათიშვა', 'ხაზის დაზიანება', 'ტრანსფორმატორი', 'სხვა'],
    datasets: [{
      data: [
        incidents.value.filter(i => i.damage_type === 'დაბალი ძაბვა').length,
        incidents.value.filter(i => i.damage_type === 'სრული გათიშვა').length,
        incidents.value.filter(i => i.damage_type === 'ხაზის დაზიანება').length,
        incidents.value.filter(i => i.damage_type === 'ტრანსფორმატორის პრობლემა').length,
        incidents.value.filter(i => i.damage_type === 'სხვა').length
      ],
      backgroundColor: [
        '#FF6B8A',
        '#4ECDC4', 
        '#45B7D1',
        '#96CEB4',
        '#FFEAA7'
      ],
      borderColor: [
        '#FF6B8A',
        '#4ECDC4',
        '#45B7D1',
        '#96CEB4',
        '#FFEAA7'
      ],
      borderWidth: 2
    }]
  }
})

const monthlyTrendData = computed(() => {
  if (!incidents.value.length) return null
  
  return {
    labels: ['ოქტ', 'ნოე', 'დეკ'],
    datasets: [{
      label: 'ინციდენტების რაოდენობა',
      data: [8, 12, 6], // Demo data
      borderColor: '#6C5CE7',
      backgroundColor: 'rgba(108, 92, 231, 0.1)',
      tension: 0.4,
      fill: true
    }]
  }
})

const statusDistributionData = computed(() => {
  if (!incidents.value.length) return null
  
  return {
    labels: ['მოლოდინში', 'პროცესშია', 'გადაწყვეტილი'],
    datasets: [{
      label: 'ინციდენტების რაოდენობა',
      data: [
        incidents.value.filter(i => i.problem_status === 'waiting').length,
        incidents.value.filter(i => i.problem_status === 'in_progress').length,
        incidents.value.filter(i => i.problem_status === 'closed').length
      ],
      backgroundColor: [
        '#FFB8B8',
        '#87CEEB', 
        '#98FB98'
      ],
      borderColor: [
        '#FF6B6B',
        '#4A90E2',
        '#50C878'
      ],
      borderWidth: 2
    }]
  }
})

const regionalData = computed(() => {
  if (!incidents.value.length) return null
  
  // Count incidents by city/region
  const regionCounts = {}
  incidents.value.forEach(incident => {
    const city = incident.city || 'სხვა'
    regionCounts[city] = (regionCounts[city] || 0) + 1
  })
  
  const cities = Object.keys(regionCounts)
  const counts = Object.values(regionCounts)
  
  return {
    labels: cities,
    datasets: [{
      label: 'ინციდენტების რაოდენობა',
      data: counts,
      backgroundColor: [
        '#FF6B8A',
        '#4ECDC4', 
        '#45B7D1',
        '#96CEB4',
        '#FFEAA7',
        '#DDA0DD',
        '#F0E68C',
        '#FFB347'
      ],
      borderColor: [
        '#FF6B8A',
        '#4ECDC4', 
        '#45B7D1',
        '#96CEB4',
        '#FFEAA7',
        '#DDA0DD',
        '#F0E68C',
        '#FFB347'
      ],
      borderWidth: 2
    }]
  }
})

// Chart options
const pieChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom'
    }
  }
}

const lineChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        stepSize: 1
      }
    }
  }
}

const barChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        stepSize: 1
      }
    }
  }
}

const regionalChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        stepSize: 1
      }
    },
    x: {
      ticks: {
        maxRotation: 45,
        minRotation: 45
      }
    }
  }
}
</script>

<style scoped>
.home-container {
  font-family: 'FiraGO', sans-serif;
}
</style>