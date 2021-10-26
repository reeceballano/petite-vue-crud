import Repository from '../repository/RepositoryFactory.js';

const TaskRepository = Repository.get('tasks');

export const state = {
    tasks: [],
    task: {},
    search: '',
}

export const fetchTasks = async () => {
    const { response } = await TaskRepository.get();
    state.tasks = response;
}