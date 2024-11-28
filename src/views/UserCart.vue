<template>
  <Loading :active="isLoading" />
  <div class="container">
    <h2 class="my-4">購物車</h2>
    <table class="table">
      <thead>
        <tr>
          <th>商品圖片</th>
          <th>商品名稱</th>
          <th>數量</th>
          <th>單價</th>
          <th>小計</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in cart" :key="item.id">
          <td>
            <img :src="item.product.imageUrl" alt="商品圖片" style="width: 100px" />
          </td>
          <td>{{ item.product.title }}</td>
          <td>
            <input
              type="number"
              class="form-control"
              v-model.number="item.qty"
              @change="updateCartQuantity(item.id, item.qty)"
            />
          </td>
          <td>{{ item.product.price }} 元</td>
          <td>{{ item.qty * item.product.price }} 元</td>
          <td>
            <button class="btn btn-danger btn-sm" @click="removeItem(item.id)">移除</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="text-end h4">總計：{{ cartTotal }} 元</div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useStore } from '@/stores'

export default {
  setup() {
    const store = useStore()
    const isLoading = ref(true)
    const cart = computed(() => store.cart)
    const cartTotal = computed(() =>
      cart.value.reduce((total, item) => total + item.qty * item.product.price, 0)
    )

    const updateCartQuantity = async (cartId, qty) => {
      if (qty <= 0) return
      try {
        await store.updateCartItem(cartId, qty)
      } catch (error) {
        alert('更新數量失敗')
      }
    }

    const removeItem = async (cartId) => {
      try {
        await store.removeCartItem(cartId)
        alert('成功移除商品')
      } catch (error) {
        alert('移除商品失敗')
      }
    }

    onMounted(async () => {
      await store.getCart()
      isLoading.value = false
    })

    return {
      isLoading,
      cart,
      cartTotal,
      updateCartQuantity,
      removeItem
    }
  }
}
</script>
