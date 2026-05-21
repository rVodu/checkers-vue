<template>
  <div class="user-info">
    <h2 class="user-info__name">{{ name }}</h2>

    <div
      class="user-info__activity"
      :class="{ 'user-info__activity--active': isActive }"
    >
      Ваш ход
    </div>

    <p class="user-info__score">Score: {{ score }}</p>

    <div class="user-info__table">
      <div
        v-for="(item, index) in score"
        :key="index"
        class="user-info__figure"
        :class="{
          'user-info__figure--white': name === 'White',
          'user-info__figure--black': name === 'Black',
        }"
      ></div>
    </div>
  </div>
</template>

<script setup>
  import { computed } from "vue";

  const props = defineProps({
    user: {
      type: Object,
      default: () => {},
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  });

  const name = computed(() => props.user.name || "");
  const score = computed(() => props.user.score || 0);
</script>

<style lang="less">
    @import "../styles/variables.less";

    .user-info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 20px;
    &:first-child {
      align-items: flex-end;
      text-align: right;
      .user-info__table {
        flex-direction: row-reverse;
      }
    }
    &__table {
      display: flex;
      flex-wrap: wrap;
      width: 125px;
      gap: 5px;
    }

    &__figure {
      box-sizing: border-box;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      border: 3px solid @gray;

      &--black {
        background-color: @black;
      }

      &--white {
        background-color: @white;
      }
    }
    &__name,
    &__score {
      margin: 0 0 15px;
    }
    &__activity {
      margin: 0 0 15px;
      padding: 5px 10px;
      border-radius: 10px;
      background-color: @green;
      color: @white;
      font-size: 16px;
      font-weight: 700;
      visibility: hidden;
      &--active {
        visibility: visible;
      }
    }
  }
</style>