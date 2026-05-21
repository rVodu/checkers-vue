import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore("user", () => {
  class User {
    score = 0;

    constructor(name) {
      this.name = name;
    }

    increaseScore() {
      this.score++;
    }
  }

  const userBlack = ref(new User("Black"));

  const userWhite = ref(new User("White"));

  return {
    userBlack,
    userWhite,
  };
});