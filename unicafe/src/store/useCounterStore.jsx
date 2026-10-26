import {create} from "zustand"

const useCounterStore = create(set => ({
    good: 0,
    neutral: 0,
    bad: 0,

    increment: (type) => set(state => ({
        [type]: state[type] + 1
    }))
}))

export default useCounterStore