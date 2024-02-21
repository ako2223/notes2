<!-- AddTask.vue -->
<template>
    <div class="add-task">
      <h2>Add New Task</h2>
      <form @submit.prevent="submitTask">
        <div>
          <label for="taskName">Task Name:</label>
          <input id="taskName" v-model="taskName" required>
        </div>
        <div>
          <label for="taskDescription">Description:</label>
          <textarea id="taskDescription" v-model="taskDescription"></textarea>
        </div>
        <button type="submit">Add Task</button>
      </form>
    </div>
  </template>
  
  <script>
  import { EventBus } from '../router/eventBus';

  export default {
    data() {
      return {
        taskName: '',
        taskDescription: ''
      };
    },
    methods: {
      submitTask() {
        console.log("Emitting addTask with", { text: this.taskName, description: this.taskDescription });
        EventBus.emit('addTask', { text: this.taskName, description: this.taskDescription });
        this.taskName = '';
        this.taskDescription = '';
        this.$router.push('/');
      },
      goToHomePage() {
    this.$router.push({ path: '/' });
  }
    }
  }
  </script>
  
  <style>
  /* Add styles as needed */
  </style>
  