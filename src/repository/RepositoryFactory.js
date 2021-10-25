import TaskRepository  from "./TaskRepository.js";

const repositories = {
    'tasks': TaskRepository,
}

export default {
    get: name => repositories[name],
}