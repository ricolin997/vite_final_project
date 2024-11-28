<template>
  <UserNavBar />
  <div class="container-fluid mt-3 position-relative">
    <router-view />
  </div>
  <Toast :autoDismissTime="5000" />
</template>

<script>
import UserNavBar from '@/components/UserNavBar.vue'
import Toast from '../components/Toast.vue'
import { provide } from 'vue'
import emitter from '@/methods/emitter'

export default {
  components: {
    Toast,
    UserNavBar
  },
  setup() {
    provide('emitter', emitter)

    return {}
  }
}
</script>
