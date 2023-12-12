<template>
  <Paginator
    :rows="rows"
    :total-records="totalRecords"
    :rows-per-page-options="rowsOptions"
    :first="first"
    @page="onPageChange"
    @update:rows="onRowChange"
    :template="
      showRowsPerPageOptions
        ? 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown CurrentPageReport'
        : 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport'
    "
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const rowsOptions = ref([10, 20, 50, 100])
defineProps({
  totalRecords: {
    type: Number,
    required: true
  },
  rows: {
    type: Number,
    required: true
  },
  first: {
    type: Number,
    required: true
  },
  showRowsPerPageOptions: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['onPageChange', 'onRowChange'])

const onPageChange = (event: any) => {
  emit('onPageChange', event)
}

const onRowChange = (event: any) => {
  emit('onRowChange', event)
}
</script>

<style scoped></style>
