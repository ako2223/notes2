<template>
  <div id="app">
    <div class="task-menu">
      <h2>Task List</h2>
      <ul>
        <li v-for="(task, index) in tasks" :key="index" @click="selectTask(index)" :class="{ 'selected': selectedTaskIndex === index }">
          {{ task.text }}
        </li>
      </ul>
      <button @click="addTask">Add Task</button>
    </div>
    <TaskDetail :task="selectedTask" @editTask="editTask" @removeTask="removeTask" v-if="selectedTask" />
  </div>
</template>

<script>
import TaskList from '../components/FirstComponent.vue'
import TaskDetail from '../components/TaskDetail.vue'

export default {
  name: 'App',
  components: {
    TaskList,
    TaskDetail
  },
  data() {
    return {
      tasks: [
        { text: 'Task 1', description: 'Description of Task 1' },
        { text: 'Task 2', description: 'Description of Task 2' },
        // Add more tasks as needed
      ],
      selectedTaskIndex: null
    }
  },
  computed: {
    selectedTask() {
      return this.selectedTaskIndex !== null ? this.tasks[this.selectedTaskIndex] : null;
    }
  },
  methods: {
    selectTask(index) {
      this.selectedTaskIndex = index;
    },
    addTask() {
  const newTaskText = prompt("Enter the new task name:");
  if (newTaskText !== null) {
    const newTaskDescription = prompt("Enter the description for the task:");
    this.tasks.push({ text: newTaskText, description: newTaskDescription || '' });
  }
},
    editTask(newText, newDescription) {
      if (this.selectedTaskIndex !== null) {
        this.tasks[this.selectedTaskIndex].text = newText;
        this.tasks[this.selectedTaskIndex].description = newDescription;
      }
    },
    removeTask() {
      if (this.selectedTaskIndex !== null) {
        if (confirm('Are you sure you want to remove this task?')) {
          this.tasks.splice(this.selectedTaskIndex, 1);
          this.selectedTaskIndex = null;
        }
      }
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
