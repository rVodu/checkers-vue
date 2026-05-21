import { useMainStore } from "@/store";
import { useTakeEnemy } from "@/composables/useTakeEnemy.js";

export function useMoveChecker(current) {
  const store = useMainStore();

  if (!store.currentChecker) return;

  const { cx, cy } = current;
  //если ячейка подсвечена, туда можно идти
  if (store.tableHighlight[cy][cx] === 1) {
    useTakeEnemy(current);

    //обновляем store
    store.$patch((state) => {
      //удаляем шашку с предыдущего места
      state.table[store.currentChecker.cy][store.currentChecker.cx] = 0;
      //устанавливаем шашку в новое место
      state.table[cy][cx] = store.currentChecker.figureType;
    });
    //обнуляем текущую шашку
    store.resetCurrentChecker();
    //сбрасываем подсветку
    store.resetTableHighlight();

    //меняем ход игрока
    store.changePlayer();
  }
}