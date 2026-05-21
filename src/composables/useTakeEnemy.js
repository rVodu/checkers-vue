import { useMainStore } from "@/store";
import { useUserStore } from "@/store/user";

export function useTakeEnemy(cell) {
  const store = useMainStore();
  const userStore = useUserStore();

  const { cx, cy, figureType } = store.currentChecker;
  const { cx: ccx, cy: ccy } = cell;
  let enemy = {};

  const ways = {
    topLeft: () => cx > ccx && cy > ccy,
    topRight: () => cx < ccx && cy > ccy,
    bottomLeft: () => cx > ccx && cy < ccy,
    bottomRight: () => cx < ccx && cy < ccy,
  };

  const options = {
    topLeft: () => ({ cx: ccx + 1, cy: ccy + 1 }),
    topRight: () => ({ cx: ccx - 1, cy: ccy + 1 }),
    bottomLeft: () => ({ cx: ccx + 1, cy: ccy - 1 }),
    bottomRight: () => ({ cx: ccx - 1, cy: ccy - 1 }),
  };

  Object.entries(ways).forEach(([key, value]) => {
    if (value()) {
      enemy = options[key]();
      return;
    }
  });

  if (
    enemy.cx !== cx &&
    enemy.cy !== cy &&
    store.table[enemy.cy][enemy.cx] !== figureType
  ) {
    store.$patch((state) => {
      state.table[enemy.cy][enemy.cx] = 0;
    });

    if (figureType === 1) {
      userStore.userWhite.increaseScore();
    } else {
      userStore.userBlack.increaseScore();
    }
  }
}