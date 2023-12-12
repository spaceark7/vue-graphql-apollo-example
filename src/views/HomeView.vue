<template>
  <div class="card" ref="topRef">
    <span class="p-input-icon-left">
      <i class="pi pi-search" />
      <InputText v-model="keywords" placeholder="Search" />
    </span>
    <DataView v-if="loading" :value="new Array(10)" dataKey="id">
      <template #list>
        <div class="grid grid-nogutter">
          <div v-for="i in 6" :key="i" class="col-12">
            <div
              class="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4"
              :class="{ 'border-top-1 surface-border': i !== 0 }"
            >
              <Skeleton
                class="w-9 sm:w-16rem xl:w-10rem shadow-2 h-6rem block xl:block mx-auto border-round"
              />
              <div
                class="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4"
              >
                <div class="flex flex-column align-items-center sm:align-items-start gap-3">
                  <Skeleton class="w-8rem border-round h-2rem" />
                  <Skeleton class="w-6rem border-round h-1rem" />
                  <div class="flex align-items-center gap-3">
                    <Skeleton class="w-6rem border-round h-1rem" />
                    <Skeleton class="w-3rem border-round h-1rem" />
                  </div>
                </div>
                <div
                  class="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2"
                >
                  <Skeleton class="w-4rem border-round h-2rem" />
                  <Skeleton shape="circle" class="w-3rem h-3rem" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </DataView>
    <DataView
      v-else
      :value="result?.characters?.results"
      :rows="rows"
      paginator
      paginatorTemplate=""
      dataKey="id"
      :layout="'grid'"
    >
      <template #grid="slotProps">
        <div class="grid grid-nogutter">
          <div v-for="(item, index) in slotProps.items" :key="index" class="col-12 md:col-6">
            <div class="card m-3 border-1 surface-border">
              <div class="flex gap-4">
                <img
                  :src="item.image"
                  :alt="item.name"
                  class="w-4 shadow-2 mx-0 border-round-md"
                  :style="{
                    aspectRatio: '1 / 1'
                  }"
                />
                <div class="w-8">
                  <div class="text-2xl font-bold mb-2">{{ item.name }}</div>
                  <div class="flex flex-1 text-sm mb-1">
                    <span class="font-semibold mr-2 w-4 text-gray-500">Status</span>
                    <span class="font-semibold w-8">: {{ item.status }}</span>
                  </div>
                  <div class="flex flex-1 text-sm mb-1">
                    <span class="font-semibold text-gray-500 mr-2 w-4">Gender</span>
                    <span class="font-semibold w-8">: {{ item.gender }}</span>
                  </div>
                  <div class="flex flex-1 text-sm mb-1">
                    <span class="font-semibold text-gray-500 mr-2 w-4">Species</span>
                    <span class="font-semibold w-8">: {{ item.species }}</span>
                  </div>
                  <div class="flex flex-1 text-sm mb-1">
                    <span class="font-semibold text-gray-500 mr-2 w-4">Type</span>
                    <span class="font-semibold w-8">: {{ item.type || '-' }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </DataView>
    <CustomizedPagination
      v-if="!loading"
      :totalRecords="result?.characters?.info?.count"
      :rows="rows"
      :first="first"
      :showRowsPerPageOptions="false"
      @onPageChange="onPageChange"
      @onRowChange="onRowChange"
    />
  </div>
</template>

<script setup lang="ts">
import { useQuery } from '@vue/apollo-composable'
import { GET_ALL_CHARACTERS } from '@/service/character'
import CustomizedPagination from '@/components/CustomizedPagination.vue'
import { ref, watch } from 'vue'

//* reactivity
const rows = ref<number>(20)
const page = ref<number>(0)
const first = ref<number>(0)
const topRef = ref()
const keywords = ref<string>('')
const timeoutId = ref<number>()

//* Hooks/Methods
const { result, loading, fetchMore } = useQuery(GET_ALL_CHARACTERS, {
  page: page.value + 1,
  filter: {
    name: keywords.value
  }
})

const onPageChange = (event: any) => {
  first.value = event.first
  page.value = event.page
  topRef.value?.scrollIntoView({ behavior: 'smooth' })

  fetchMore({
    variables: {
      page: event.page + 1,
      filter: {
        name: keywords.value
      }
    },
    updateQuery: (prev, { fetchMoreResult }) => {
      return fetchMoreResult
    }
  })
}

const onRowChange = (event: any) => {
  rows.value = event
}

const onSearch = (event: any) => {
  clearTimeout(timeoutId.value)
  page.value = 0
  first.value = 0
  keywords.value = event.target.value
  timeoutId.value = setTimeout(() => {
    fetchMore({
      variables: {
        page: 1,
        filter: {
          name: keywords.value
        }
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        return fetchMoreResult
      }
    })
  }, 500)
}

watch(keywords, () => {
  page.value = 0
  first.value = 0
  onSearch({ target: { value: keywords.value } })
})
</script>

<style scoped></style>
