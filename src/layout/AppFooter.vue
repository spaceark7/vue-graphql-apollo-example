<script setup lang="ts">
import { useLayout } from '@/layout/composables/layout'
import { computed } from 'vue'

const { layoutConfig } = useLayout()

const logoUrl = computed(() => {
  return `layout/images/${layoutConfig.darkTheme.value ? 'logo-white' : 'logo-dark'}.svg`
})
</script>

<template>
  <div class="layout-footer">
    <img src="../assets/logo.svg" alt="Logo" height="20" class="mr-2" />
    <span class="font-medium ml-2">
      This is a demo app to demonstrate the use of Graphql Apollo with Vue 3 and Vite.
    </span>
  </div>
</template>
<style lang="scss" scoped></style>
