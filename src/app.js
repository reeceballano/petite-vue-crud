import { createApp, reactive } from 'https://unpkg.com/petite-vue?module'

const state = reactive({
    tasks: [
        { id: 1, name: 'Task 1', status: false },
        { id: 2, name: 'Task 2', status: false },
        { id: 3, name: 'Task 3', status: true },
    ],

    task: {},
    search: '',
})

const addTask = () => {
    const d = new Date();
    const task = {
        id: `${state.tasks.length + 1}-${d.getMilliseconds()}`,
        name: `Task ${state.tasks.length + 1}-${d.getMilliseconds()}`,
        state: false
    }

    state.tasks.push({ ...task });
}

const refTasks = [...state.tasks];

const removeTask = (id) => {
    const tasks = [...state.tasks].filter(i => i.id !== id);
    state.tasks = tasks;
}

const searchTask = () => {
    if (state.search.length) {
        const tasks = [...state.tasks].filter(t => t.name.toLowerCase().includes(state.search.toLowerCase()));
        state.tasks = [...tasks];
    } else {
        state.tasks = refTasks;
    }
}

createApp({
    state,
    addTask,
    removeTask,
    searchTask,
}).mount('#app');