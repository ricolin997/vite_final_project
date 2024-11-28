<template>
  <Loading :active="isLoading"></Loading>
  <div class="container">
    <div class="row mt-4">
      <div class="col-md-7">
        <table class="table align-middle">
          <thead>
            <tr>
              <th>圖片</th>
              <th>商品名稱</th>
              <th>價格</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in products" :key="item.id">
              <td style="width: 200px">
                <div
                  style="height: 100px; background-size: cover; background-position: center"
                  :style="{ backgroundImage: `url(${item.imageUrl})` }"
                ></div>
              </td>
              <td>
                <a href="#" class="text-dark">{{ item.title }}</a>
              </td>
              <td>
                <div class="h5" v-if="!item.price">{{ item.origin_price }} 元</div>
                <del class="h6" v-if="item.price">原價 {{ item.origin_price }} 元</del>
                <div class="h5" v-if="item.price">現在只要 {{ item.price }} 元</div>
              </td>
              <td>
                <div class="btn-group btn-group-sm">
                  <button type="button" class="btn btn-outline-secondary">查看更多</button>
                  <button type="button" class="btn btn-outline-danger" @click="addToCart(item.id)">
                    加到購物車
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref, computed } from 'vue'
import { useStore } from '@/stores'

export default {
  setup() {
    const store = useStore()
    const isLoading = ref(true) // 用來顯示加載狀態
    const products = computed(() => store.userProducts) // 取得 store 中的產品資料

    // 在組件加載時調用 getUserProducts
    onMounted(async () => {
      await store.getUserProducts() // 獲取產品資料
      isLoading.value = false // 加載完成後隱藏加載動畫
    })

    //加入購物車
    const addToCart = async (productId) => {
      try {
        await store.addToCart(productId, 1) // 預設數量為1
        alert('成功加入購物車')
      } catch (error) {
        alert('加入購物車失敗')
      }
    }

    return {
      isLoading,
      products,
      addToCart
    }
  }
}
</script>
