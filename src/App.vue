<template>
  <main>
    <!-- heading -->
    <header>
      <img src="./assets/pinia-logo.svg" alt="pinia logo"/>
      <h1>Pinia Task</h1>
    </header>

    <!-- new task form -->
    <div class="new-task-form">
      <TaskForm />
    </div>

    <!-- loading -->
    <div class="loading" v-if="taskStore.isLoading">Loading tasks...</div>

    <!-- filter -->
    <div class="filter">
      <button @click="filter = 'all'">All tasks</button>
      <button @click="filter = 'favs'">Favs tasks</button>
    </div>

    <!-- task list -->
    <div class="task-list" v-if="filter === 'all'">
      <p>You have {{ taskStore.totalCount }} tasks left to do</p>
      <div v-for="task in taskStore.tasks">
        <TaskDetail :task="task"/>
      </div>
    </div>
    <div class="task-list" v-if="filter === 'favs'">
      <p>You have {{ taskStore.favCount }} favs tasks left to do</p>
      <div v-for="task in taskStore.favs">
        <TaskDetail :task="task"/>
      </div>
    </div>
  </main>
</template>

<script>
  import { ref } from "vue"
  import TaskDetail from "./components/TaskDetail.vue"
  import TaskForm from "./components/TaskForm.vue"
  import {useTaskStore} from './stores/TaskStore'

  export default {
    components:{ TaskDetail, TaskForm },
    setup(){
      const taskStore = useTaskStore()

      // fetch tasks
      taskStore.getTask()

      const filter = ref('all')

      return { taskStore, filter }
    }  
  }
</script>
