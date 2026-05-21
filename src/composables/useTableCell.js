import { ref, reactive, computed } from "vue";
import { storeToRefs } from "pinia";
import { useMainStore } from "@/store";

export function useTableCell(props) {
    const store = useMainStore();

    const { currentChecker } = storeToRefs(store);

    const figureType = ref(props.data.figureType);
    const cx = ref(props.data.cx);
    const cy = ref(props.data.cy);

    const current = reactive({
        cx: cx.value,
        cy: cy.value,
        figureType: figureType.value,
    });

    const isActive = computed(
        () =>
            currentChecker.value &&
            currentChecker.value.cx === current.cx &&
            currentChecker.value.cy === current.cy
    );

    return {
        figureType,
        cx,
        cy,
        current,
        isActive,
    };
}