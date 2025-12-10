<template>
  <div
      class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm"
      @click.self="close"
  >
    <div class="w-full max-w-5xl bg-white rounded-2xl shadow-2xl border border-slate-100">
      <!-- Header -->
      <div class="flex items-start justify-between px-6 py-4 border-b border-slate-100">
        <div>
          <h2 class="text-lg font-semibold text-slate-900">
            ავარიული გათიშვის ჩანაწერი
          </h2>
          <p class="mt-1 text-xs text-slate-500">
            თარიღი:
            <span class="font-medium text-slate-700">
              {{ data.incident_date || '—' }}
            </span>
            · დრო:
            <span class="font-medium text-slate-700">
              {{ data.incident_time || '—' }}
            </span>
          </p>
        </div>

        <div class="flex items-center gap-3">
          <!-- Status badge -->
          <span
              class="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full border"
              :class="statusInfo.color"
          >
            <span class="inline-block w-1.5 h-1.5 rounded-full bg-current opacity-80"></span>
            {{ statusInfo.label }}
          </span>

          <button
              type="button"
              @click="close"
              class="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors"
          >
            ✕
          </button>
        </div>
      </div>

      <!-- Content -->
      <div class="px-6 py-5 space-y-5 text-sm">
        <!-- Row 1: Address + Damage type -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="md:col-span-2">
            <h3 class="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              მისამართი
            </h3>
            <p class="mt-1 text-sm text-slate-800 bg-slate-50 rounded-xl px-3 py-2 border border-slate-100">
              {{ data.address || '—' }}
            </p>
          </div>

          <div>
            <h3 class="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              დაზიანების ტიპი
            </h3>
            <p class="mt-1 text-sm text-slate-800 bg-slate-50 rounded-xl px-3 py-2 border border-slate-100">
              {{ data.damage_type || '—' }}
            </p>
          </div>
        </div>

        <!-- Row 2: Sender / Receiver -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 class="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              ინფორმაციის გამგზავნი
            </h3>
            <p class="mt-1 text-sm text-slate-800 bg-slate-50 rounded-xl px-3 py-2 border border-slate-100">
              {{ data.sender_fullname || '—' }}
            </p>
          </div>
          <div>
            <h3 class="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              ინფორმაციის მიმღები
            </h3>
            <p class="mt-1 text-sm text-slate-800 bg-slate-50 rounded-xl px-3 py-2 border border-slate-100">
              {{ data.receiver_fullname || '—' }}
            </p>
          </div>
        </div>

        <!-- Row 3: Actions / Fix time / Note -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="md:col-span-2">
            <h3 class="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              გატარებული ღონისძიებები
            </h3>
            <p class="mt-1 text-sm text-slate-800 bg-slate-50 rounded-xl px-3 py-3 border border-slate-100 min-h-[72px] whitespace-pre-line">
              {{ data.taken_actions || '—' }}
            </p>
          </div>

          <div class="space-y-4">
            <div>
              <h3 class="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                გამოსწორების დრო
              </h3>
              <p class="mt-1 text-sm text-slate-800 bg-slate-50 rounded-xl px-3 py-2 border border-slate-100">
                {{ data.fix_time || '—' }}
              </p>
            </div>

            <div>
              <h3 class="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                შენიშვნა
              </h3>
              <p class="mt-1 text-xs text-slate-700 bg-slate-50 rounded-xl px-3 py-2 border border-slate-100 min-h-[40px] whitespace-pre-line">
                {{ data.note || '—' }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-100 bg-slate-50/50 rounded-b-2xl">
        <button
            type="button"
            @click="close"
            class="inline-flex items-center px-4 py-2 text-sm font-medium rounded-xl border border-slate-200 text-slate-700 bg-white hover:bg-slate-50 hover:border-slate-300 transition-colors"
        >
          დახურვა
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  data: { type: Object, required: true }
})

const emit = defineEmits(['close'])

const close = () => emit('close')

// სტატუსის label + ფერი
const statusInfo = computed(() => {
  switch (props.data.problem_status) {
    case 'waiting':
      return {
        label: 'მოლოდინშია',
        color: 'bg-amber-50 text-amber-700 border-amber-200'
      }
    case 'in_progress':
      return {
        label: 'პროცესშია',
        color: 'bg-sky-50 text-sky-700 border-sky-200'
      }
    case 'closed':
      return {
        label: 'დასრულებულია',
        color: 'bg-emerald-50 text-emerald-700 border-emerald-200'
      }
    default:
      return {
        label: props.data.problem_status || 'უცნობი',
        color: 'bg-slate-50 text-slate-700 border-slate-200'
      }
  }
})
</script>

<style scoped>
/* დამატებითი custom სტილი არ გვჭირდება, ყველაფერი Tailwind-ითაა */
</style>
