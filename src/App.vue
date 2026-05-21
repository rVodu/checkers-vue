<template>
  <div class="app">
    <div class="app__container">
      <UserInfo
        :user="userStore.userWhite"
        :isActive="currentPlayer === 1"
        class="app__user"
      />
      <CheckersTable class="app__table" />
      <UserInfo
        :user="userStore.userBlack"
        :isActive="currentPlayer === 2"
        class="app__user"
      />
    </div>
  </div>
</template>

<script setup>
  import { computed } from "vue";
  import CheckersTable from "@/components/CheckersTable.vue";
  import UserInfo from "@/components/UserInfo.vue";
  import { useUserStore } from "@/store/user";
  import { useMainStore } from "@/store";
  
  const store = useMainStore();
  const currentPlayer = computed(() => store.currentPlayer);
  const userStore = useUserStore();
</script>

<style lang="less">
  @import "./styles/variables.less";
  .app {
    display: flex;
    flex-direction: column;
    align-items: center;
    &__container {
      display: flex;
    }
  }
</style>