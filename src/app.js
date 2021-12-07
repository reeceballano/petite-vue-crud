import { createApp, reactive } from 'https://unpkg.com/petite-vue?module';
import Repository from './repository/RepositoryFactory.js';

const TaskRepository = Repository.get('tasks');


const state = reactive({
    tasks: [],
    task: {
        id: '',
        name: '',
        status: false,
    },
    search: '',
    filtered: [],
    showEdit: false,
})

const fetchTasks = async () => {
    const { response } = await TaskRepository.get();
    let newResponse = [...response];

    newResponse.map(item => {
        item.editing = false
    })

    state.tasks = newResponse;
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

const preUpdateTask = (task) => {
    const { id, name, status } = task;
    const tasks = [...state.tasks].find(i => i.id === id);
    
    if(tasks) {
        task.editing = true;
        state.showEdit = true;
        state.task = task;
        setTimeout(() => {
            const editInput = document.querySelector('.edit-input');
            editInput.focus();
        },10);
    }

}

const updateTask = (task) => {
    const { id, name, status } = task;
    const tasks = [...state.tasks].find(i => i.id === id);
    
    if(tasks) {
        task.editing = false;
        state.showEdit = false;
    }
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
    updateTask,
    preUpdateTask
}).mount('#app');