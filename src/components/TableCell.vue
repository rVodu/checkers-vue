<template>
    <div class="table-cell" @click="moveChecker">
        <div v-if="figureType !== 0" class="table-cell__figure" :class="{
            'table-cell__figure--white': figureType === 1,
            'table-cell__figure--black': figureType === 2,
            'table-cell__figure--active': isActive
        }" @click.stop="findWays" />
    </div>
</template>

<script setup>
    import { storeToRefs } from "pinia";
    import { useMainStore } from "@/store";

    import { useTableCell } from "@/composables/useTableCell.js";
    import { useTableCellMoves } from "@/composables/useTableCellMoves.js";

    const emit = defineEmits([
        "showWay",
        "moveChecker",
    ]);

    const props = defineProps({
        data: {
            type: Object,
            default: () => ({}),
        },
    });

    const store = useMainStore();
    const { table } = storeToRefs(store);
    const {
        figureType,
        cx,
        cy,
        current,
        isActive,
    } = useTableCell(props);
    const {
        findWays: calculateWays,
    } = useTableCellMoves(
        table,
        figureType,
        cx,
        cy
    );

    function findWays() {
        const ways = calculateWays();

        emit("showWay", {
            ways,
            current,
        });
    }

    function moveChecker() {
        emit("moveChecker", current);
    }
</script>

<style lang="less">
@import "../styles/variables.less";

.table-cell {
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 100px;

    &__figure {
        box-sizing: border-box;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        border: 3px solid @gray;
        cursor: pointer;

        &--black {
            background-color: @black;

            &.table-cell__figure--active {
                box-shadow: 0 0 4px 2px @black;
            }
        }

        &--white {
            background-color: @white;

            &.table-cell__figure--active {
                box-shadow: 0 0 4px 2px @white;
            }
        }
    }
}
</style>