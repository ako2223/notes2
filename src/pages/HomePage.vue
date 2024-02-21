<template>
  <div id="app">
    <div class="task-menu">
      <h2>Task List</h2>
      <ul>
        <li v-for="(task, index) in tasks" :key="index" @click="selectTask(index)" :class="{ 'selected': selectedTaskIndex === index }">
          {{ task.text }}
        </li>
      </ul>
      <button @click="goToAddTaskPage">Add Task</button>
    </div>
    <TaskDetail :task="selectedTask" @editTask="editTask" @removeTask="removeTask" v-if="selectedTask" />
    <router-view @addTask="addTask"></router-view>
  </div>

</template>

<script>
import { EventBus } from '../router/eventBus';
import TaskDetail from '../components/TaskDetail.vue'

export default {
  name: 'App',
  components: {
    TaskDetail
  },
  data() {
    return {
      tasks: [],
      selectedTaskIndex: null
    }
  },
  computed: {
    selectedTask() {
      return this.selectedTaskIndex !== null ? this.tasks[this.selectedTaskIndex] : null;
    }
  },
  watch: {
    tasks: {
      handler() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
      },
      deep: true
    }
  },
  created() {
    EventBus.on('addTask', this.addTask);
  },
  methods: {
    selectTask(index) {
      this.selectedTaskIndex = index;
    },
    addTask(task) {
      console.log("Adding task", task);
      this.tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
    this.$router.push('/'); // Navigate back to the task list
    },
    editTask(newText, newDescription) {
      if (this.selectedTaskIndex !== null) {
        this.tasks[this.selectedTaskIndex].text = newText;
        this.tasks[this.selectedTaskIndex].description = newDescription;
      }
    },
    removeTask() {
      if (this.selectedTaskIndex !== null && confirm('Are you sure you want to remove this task?')) {
        this.tasks.splice(this.selectedTaskIndex, 1);
        this.selectedTaskIndex = null;
      }
    },
  goToAddTaskPage() {
    this.$router.push({ path: '/add' });
  },
  beforeDestroy() {
    EventBus.off('addTask', this.addTask); // Clean up to prevent memory leaks
  }
  },
  mounted() {
    const loadedTasks = localStorage.getItem('tasks');
    if (loadedTasks) {
      this.tasks = JSON.parse(loadedTasks);
    }
    if (this.tasks.length > 0) {
      this.selectTask(0);
    }
  }
}
</script>

<style>
.task-menu {
  width: 25%;
  float: left;
}

.selected {
  background-color: lightgray;
}
</style>
