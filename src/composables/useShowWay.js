import { useMainStore } from "@/store";

export function useShowWay(data) {
  const { ways, current } = data;
  const store = useMainStore();

  //проверка на соответствие цвета выбранной фигуры и текущего игрока
  if (store.currentPlayer !== current.figureType) return;

  //создаем временный пустой массив
  const tempArr = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ];

  //добавляем подсветку для возможных путей
  ways.forEach((way) => {
    tempArr[way.cy][way.cx] = 1;
  });

  //обновляем store
  store.$patch({
    tableHighlight: tempArr,
    currentChecker: current,
  });
}