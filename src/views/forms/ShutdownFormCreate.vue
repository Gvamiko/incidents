<template>
  <div class="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 form-container">
    <!-- Header -->
    <div class="mb-6 flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">
          ავარიული გათიშვა
        </h1>
        <p class="text-sm text-gray-500 mt-1">
          ინციდენტის დაფიქსირების ფორმა
        </p>
      </div>

      <button
          type="button"
          class="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700"
          @click="goBack"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
        </svg>
        დაბრუნება ჟურნალში
      </button>
    </div>

    <!-- Form -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200">
    <form class="p-6 space-y-6" @submit.prevent="handleSubmit">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- დაფიქსირების დრო (ავტომატური, readonly) -->
        <div class="flex flex-col gap-2">
          <label class="text-sm font-semibold text-gray-700">
            დაფიქსირების დრო (ავტომატურად)
          </label>
          <input
              v-model="form.incident_time"
              type="text"
              readonly
              class="w-full h-12 rounded-lg border border-gray-300 px-4 text-sm text-gray-800 bg-gray-50
                     focus:outline-none cursor-not-allowed"
          />
        </div>
        <!-- ინციდენტის თარიღი -->
        <!-- ინციდენტის თარიღი და დრო -->
        <div class="flex flex-col gap-2">
          <label class="text-sm font-semibold text-gray-700">
            ინციდენტის თარიღი და დრო
          </label>
          <input
              v-model="form.incident_date"
              type="datetime-local"
              required
              class="w-full h-12 rounded-lg border border-gray-300 px-4 text-sm text-gray-800
                     focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none
                     transition-all duration-200 hover:border-gray-400"
          />
        </div>


        <!-- მისამართი -->
        <div class="flex flex-col gap-2 md:col-span-2">
          <label class="text-sm font-semibold text-gray-700">
            მისამართი
          </label>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <!-- ქალაქი -->
            <div class="flex flex-col gap-1">
              <Multiselect
                  v-model="form.city"
                  :options="cities"
                  :searchable="true"
                  :close-on-select="true"
                  placeholder="აირჩიე ქალაქი"
                  no-options-text="ქალაქი ვერ მოიძებნა"
                  no-results-text="შედეგები ვერ მოიძებნა"
                  :classes="{
                    container: 'multiselect-container',
                    containerOpen: 'multiselect-container-open',
                    wrapper: 'multiselect-wrapper',
                    singleLabel: 'multiselect-single-label',
                    search: 'multiselect-search',
                    placeholder: 'multiselect-placeholder',
                    caret: 'multiselect-caret',
                    clear: 'multiselect-clear',
                    dropdown: 'multiselect-dropdown',
                    dropdownTop: 'multiselect-dropdown-top',
                    option: 'multiselect-option',
                    optionSelected: 'multiselect-option-selected',
                    optionHighlighted: 'multiselect-option-highlighted',
                    noOptions: 'multiselect-no-options',
                    noResults: 'multiselect-no-results'
                  }"
              />
            </div>
            
            <!-- ქუჩა -->
            <div class="flex flex-col gap-1">
              <Multiselect
                  v-model="form.street"
                  :options="filteredStreets"
                  :searchable="true"
                  :close-on-select="true"
                  placeholder="აირჩიე ქუჩა"
                  no-options-text="ქუჩა ვერ მოიძებნა"
                  no-results-text="შედეგები ვერ მოიძებნა"
                  :classes="selectClasses"
              />
            </div>
            
            <!-- ობიექტი -->
            <div class="flex flex-col gap-1">
              <Multiselect
                  v-model="form.object"
                  :options="filteredObjects"
                  :searchable="true"
                  :close-on-select="true"
                  placeholder="აირჩიე ობიექტი"
                  no-options-text="ობიექტი ვერ მოიძებნა"
                  no-results-text="შედეგები ვერ მოიძებნა"
                  :classes="selectClasses"
              />
            </div>
          </div>
        </div>

        <!-- გამგზავნი -->
        <div class="flex flex-col gap-2">
          <label class="text-sm font-semibold text-gray-700">
            გამგზავნი (სახელი, გვარი)
          </label>
          <input
              v-model="form.sender_fullname"
              type="text"
              required
              placeholder="სახელი გვარი"
              class="w-full h-12 rounded-lg border border-gray-300 px-4 text-sm text-gray-800
                     focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none
                     transition-all duration-200 hover:border-gray-400"
          />
        </div>

        <!-- მიმღები -->
        <div class="flex flex-col gap-2">
          <label class="text-sm font-semibold text-gray-700">
            მიმღები (სახელი, გვარი)
          </label>
          <input
              v-model="form.receiver_fullname"
              type="text"
              required
              placeholder="სახელი გვარი"
              class="w-full h-12 rounded-lg border border-gray-300 px-4 text-sm text-gray-800
                     focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none
                     transition-all duration-200 hover:border-gray-400"
          />
        </div>

        <!-- დაზიანების ტიპი (დროპდაუნი) -->
        <div class="flex flex-col gap-2">
          <label class="text-sm font-semibold text-gray-700">
            დაზიანების ტიპი
          </label>
          <Multiselect
              v-model="form.damage_type"
              :options="damageTypes"
              :searchable="true"
              :close-on-select="true"
              placeholder="აირჩიე დაზიანების ტიპი"
              no-options-text="ტიპი ვერ მოიძებნა"
              no-results-text="შედეგები ვერ მოიძებნა"
              :classes="selectClasses"
          />
        </div>

        <!-- პრობლემის სტატუსი (დროპდაუნი) -->
        <div class="flex flex-col gap-2">
          <label class="text-sm font-semibold text-gray-700">
            პრობლემის სტატუსი
          </label>
          <Multiselect
              v-model="form.problem_status"
              :options="statusOptions.map(s => ({label: s.label, value: s.value}))"
              :searchable="false"
              :close-on-select="true"
              value-prop="value"
              label="label"
              placeholder="აირჩიე სტატუსი"
              no-options-text="სტატუსი ვერ მოიძებნა"
              :classes="selectClasses"
          />
        </div>

        <!-- მიღებული ზომები -->
        <div class="flex flex-col gap-2 md:col-span-2">
          <label class="text-sm font-semibold text-gray-700">
            მიღებული ზომები
          </label>
          <textarea
              v-model="form.taken_actions"
              rows="4"
              class="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-800
                     focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none
                     transition-all duration-200 hover:border-gray-400 resize-vertical"
              placeholder="რა ზომები იქნა მიღებული პრობლემის მოსაგვარებლად..."
          ></textarea>
        </div>

        <!-- აღმოფხვრის დრო -->
        <div class="flex flex-col gap-2">
          <label class="text-sm font-semibold text-gray-700">
            აღმოფხვრის დრო (არასავალდებულო)
          </label>
          <input
              v-model="form.fix_time"
              type="datetime-local"
              class="w-full h-12 rounded-lg border border-gray-300 px-4 text-sm text-gray-800
                     focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none
                     transition-all duration-200 hover:border-gray-400"
          />
        </div>

        <!-- შენიშვნა -->
        <div class="flex flex-col gap-2 md:col-span-2">
          <label class="text-sm font-semibold text-gray-700">
            შენიშვნა
          </label>
          <textarea
              v-model="form.note"
              rows="4"
              class="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-800
                     focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none
                     transition-all duration-200 hover:border-gray-400 resize-vertical"
              placeholder="დამატებითი ინფორმაცია..."
          ></textarea>
        </div>
      </div>

      <!-- Buttons -->
      <div class="flex items-center justify-end gap-2 pt-4 border-t border-gray-100">
        <button
            type="button"
            class="inline-flex items-center px-4 py-2.5 text-sm font-medium rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50"
            @click="goBack"
        >
          გაუქმება
        </button>
        <button
            type="submit"
            class="inline-flex items-center px-4 py-2.5 text-sm font-medium rounded-xl text-white hover:bg-blue-700" style="background-color: #2563eb;"
        >
          შენახვა
        </button>
      </div>
    </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { getShutdownData, saveShutdownData } from '../../utils/shutdownStorage'
import Multiselect from '@vueform/multiselect'

const router = useRouter()

// ფორმის state
const form = ref({
  incident_date: '',
  incident_time: '',
  address: '',
  city: '',
  street: '',
  object: '',
  sender_fullname: '',
  receiver_fullname: '',
  damage_type: '',
  taken_actions: '',
  fix_time: '',
  problem_status: 'waiting', // default: მოლოდინშია
  note: ''
})

// ქალაქების სია
const cities = [
  'ბათუმი',
  'ქობულეთი', 
  'ოზურგეთი',
  'ხელვაჩაური',
  'შუახევი',
  'კედა',
  'ხულო',
  'აჭარისწყალი'
]

// ქუჩების სია
const allStreets = [
  'ბარათაშვილის ქუჩა',
  'გოგებაშვილის ქუჩა', 
  'აღმაშენებლის პროსპექტი',
  'ნინოშვილის ქუჩა',
  'ვაჟა-ფშაველას ქუჩა',
  'მელიქიშვილის ქუჩა',
  'რუსთაველის ქუჩა',
  'ცენტრალური ქუჩა',
  'სანაპირო ქუჩა',
  'ალექსიძის ქუჩა',
  'გურამიშვილის ქუჩა',
  'ახალი ქუჩა'
]

// ობიექტების სია  
const allObjects = [
  'საცხოვრებელი სახლი',
  'სკოლა',
  'ბაგა', 
  'საავადმყოფო',
  'მაღაზია',
  'ოფისი',
  'ქარხანა',
  'ატელიე',
  'კაფე/რესტორანი',
  'ბანკი',
  'ფარმაცია',
  'სპორტული კომპლექსი',
  'საზოგადოებრივი ცენტრი',
  'სხვა'
]

const filteredStreets = computed(() => allStreets)
const filteredObjects = computed(() => allObjects)

// Multiselect classes for consistent styling
const selectClasses = {
  container: 'multiselect-container',
  containerOpen: 'multiselect-container-open',
  wrapper: 'multiselect-wrapper',
  singleLabel: 'multiselect-single-label',
  search: 'multiselect-search',
  placeholder: 'multiselect-placeholder',
  caret: 'multiselect-caret',
  clear: 'multiselect-clear',
  dropdown: 'multiselect-dropdown',
  dropdownTop: 'multiselect-dropdown-top',
  option: 'multiselect-option',
  optionSelected: 'multiselect-option-selected',
  optionHighlighted: 'multiselect-option-highlighted',
  noOptions: 'multiselect-no-options',
  noResults: 'multiselect-no-results'
}

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

<style scoped>
.form-container {
  font-family: 'FiraGO', sans-serif;
}
</style>

<style src="@vueform/multiselect/themes/default.css"></style>

<style>
.multiselect-container {
  position: relative;
  margin: 0 auto;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  box-sizing: border-box;
  cursor: pointer;
  outline: none;
  border-radius: 0.5rem;
  border: 1px solid #d1d5db;
  background: #fff;
  font-size: 0.875rem;
  min-height: 3rem;
  transition: all 0.2s ease;
}

.multiselect-container:hover {
  border-color: #9ca3af;
}

.multiselect-container.multiselect-container-open {
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
}

.multiselect-wrapper {
  position: relative;
  width: 100%;
  margin: 0;
  padding: 0 1rem;
  box-sizing: border-box;
  display: flex;
  align-items: center;
}

.multiselect-single-label {
  display: flex;
  align-items: center;
  height: 100%;
  max-width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  pointer-events: none;
  background: transparent;
  line-height: 1.375;
  padding-left: 1rem;
  padding-right: 2rem;
  box-sizing: border-box;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #374151;
}

.multiselect-search {
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  outline: none;
  text-decoration: none;
  border: 0;
  appearance: none;
  font-size: inherit;
  font-family: inherit;
  box-sizing: border-box;
  background: transparent;
  color: #374151;
  padding: 0 1rem;
}

.multiselect-placeholder {
  display: flex;
  align-items: center;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  pointer-events: none;
  background: transparent;
  line-height: 1.375;
  padding-left: 1rem;
  padding-right: 2rem;
  box-sizing: border-box;
  color: #9ca3af;
}

.multiselect-caret {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  width: 1rem;
  height: 1rem;
  color: #6b7280;
  pointer-events: none;
}

.multiselect-dropdown {
  position: absolute;
  left: 0;
  right: 0;
  top: 100%;
  background: #fff;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  z-index: 999;
  margin-top: 0.25rem;
  max-height: 15rem;
  overflow-y: auto;
}

.multiselect-option {
  padding: 0.75rem 1rem;
  cursor: pointer;
  display: block;
  color: #374151;
  text-decoration: none;
  border-bottom: 1px solid #f3f4f6;
  transition: background-color 0.2s ease;
}

.multiselect-option:last-child {
  border-bottom: 0;
}

.multiselect-option:hover,
.multiselect-option.multiselect-option-highlighted {
  background-color: #f3f4f6;
}

.multiselect-option.multiselect-option-selected {
  background-color: #dbeafe;
  color: #1d4ed8;
  font-weight: 600;
}

.multiselect-no-options,
.multiselect-no-results {
  padding: 0.75rem 1rem;
  color: #6b7280;
  text-align: center;
  font-style: italic;
}
</style>

