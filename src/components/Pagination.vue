<template>
  <nav aria-label="Page navigation" class="custom-pagination">
    <ul class="pagination justify-content-center">
      <li class="page-item" :class="{ disabled: pages.current_page === 1 }">
        <a
          class="page-link"
          href="#"
          aria-label="Previous"
          @click.prevent="updatePage(pages.current_page - 1)"
        >
          <span aria-hidden="true"><i class="fas fa-chevron-left"></i></span>
        </a>
      </li>
      <li
        class="page-item"
        v-for="page in pages.total_pages"
        :key="page"
        :class="{ active: page === pages.current_page }"
      >
        <a class="page-link" href="#" @click.prevent="updatePage(page)">
          {{ page }}
        </a>
      </li>
      <li class="page-item" :class="{ disabled: pages.current_page === pages.total_pages }">
        <a
          class="page-link"
          href="#"
          aria-label="Next"
          @click.prevent="updatePage(pages.current_page + 1)"
        >
          <span aria-hidden="true"><i class="fas fa-chevron-right"></i></span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script setup>
// 添加元件名稱
defineOptions({
  name: 'PaginationComponent'
})

const props = defineProps({
  pages: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['emit-pages'])

/**
 * 更新頁碼並發送事件
 * @param {Number} page - 新的頁碼
 */
const updatePage = (page) => {
  // 確保只能在有效頁碼範圍內翻頁
  if (page >= 1 && page <= props.pages.total_pages) {
    emit('emit-pages', page)
  }
}
</script>
