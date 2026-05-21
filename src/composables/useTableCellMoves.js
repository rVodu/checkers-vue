export function useTableCellMoves(table, figureType, cx, cy) {

    function onTable(way) {
        const { cx, cy } = way;

        return cx >= 0 && cx < 8 && cy >= 0 && cy < 8;
    }

    function editWay(way) {
        const { cx, cy, position } = way;

        const options = {
            topLeft: (x, y) => ({ cx: x - 1, cy: y - 1 }),
            topRight: (x, y) => ({ cx: x + 1, cy: y - 1 }),
            bottomLeft: (x, y) => ({ cx: x - 1, cy: y + 1 }),
            bottomRight: (x, y) => ({ cx: x + 1, cy: y + 1 }),
        };

        return Object.assign({ position }, options[position](cx, cy));
    }

    function moveCalculate(ways) {
        const availableWays = {
            1: ["topLeft", "topRight"],
            2: ["bottomLeft", "bottomRight"],
        };

        const availableArr = [];

        ways.forEach((way) => {
            const { cx, cy, position } = way;

            const tableCell = table.value[cy][cx];

            const isAllowed =
                availableWays[figureType.value].includes(position);

            if (tableCell === 0 && !isAllowed) return;

            else if (tableCell === 0 && isAllowed) {
                return availableArr.push(way);
            }

            else if (
                tableCell &&
                tableCell !== figureType.value
            ) {
                return availableArr.push(editWay(way));
            }
        });

        return availableArr;
    }

    function canMove(way) {
        const { cx, cy } = way;

        return (
            onTable(way) &&
            table.value[cy][cx] === 0
        );
    }

    function findWays() {
        let ways = [
            {
                position: "topLeft",
                cx: cx.value - 1,
                cy: cy.value - 1,
            },
            {
                position: "topRight",
                cx: cx.value + 1,
                cy: cy.value - 1,
            },
            {
                position: "bottomLeft",
                cx: cx.value - 1,
                cy: cy.value + 1,
            },
            {
                position: "bottomRight",
                cx: cx.value + 1,
                cy: cy.value + 1,
            },
        ].filter((item) => onTable(item));

        ways = moveCalculate(ways)
            .filter((item) => canMove(item));

        return ways;
    }

    return {
        findWays,
    };
}