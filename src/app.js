import { createApp, reactive } from 'https://unpkg.com/petite-vue?module';
import Repository from './repository/RepositoryFactory.js';

const TaskRepository = Repository.get('tasks');


const state = reactive({
    tasks: [],
    task: {},
    search: '',
    filtered: [],
})

const fetchTasks = async () => {
    const { response } = await TaskRepository.get();
    state.tasks = [...response];
    //state.filtered = state.tasks
}

const addTask = () => {
    const d = new Date();
    const task = {
        id: `${state.tasks.length + 1}-${d.getMilliseconds()}`,
        name: `Task ${state.tasks.length + 1}-${d.getMilliseconds()}`,
        state: false
    }

    state.tasks.push({ ...task });
}

const removeTask = (id) => {
    const tasks = [...state.tasks].filter(i => i.id !== id);
    state.tasks = tasks;
}

const searchTask = () => {
    if (state.search.length) {
        state.filtered = [...state.tasks];

        const tasks = [...state.tasks].filter(t => t.name.toLowerCase().includes(state.search.toLowerCase()));
        state.tasks = tasks;
    } else {
        state.tasks = state.filtered;
    }
}

const init = () => {
    fetchTasks();
}

init();

createApp({
    state,
    addTask,
    removeTask,
    searchTask,
}).mount('#app');