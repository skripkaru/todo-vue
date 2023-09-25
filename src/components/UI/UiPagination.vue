<script>
export default {
  name: "UiPagination",
  props: {
    page: {
      type: Number
    },
    totalPages: {
      type: Number
    }
  }
}
</script>

<template>
  <div class="pagination">
    <button
      class="pagination__btn"
      v-for="pageNumber in totalPages"
      :key="pageNumber"
      :class="{
          'active-page': page === pageNumber
        }"
      @click="$emit('change-page', pageNumber)"
    >
      {{ pageNumber }}
    </button>
  </div>
</template>

<style scoped>
.pagination {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 0 auto;
}

.pagination__btn {
  min-width: 32px;
  min-height: 32px;
  padding: 8px;
  border: 1px solid #ccc;
  background-color: transparent;
}

.active-page {
  border-color: teal;
}
</style>