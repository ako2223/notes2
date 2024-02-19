<template>
  <div>
    <h1>Task List</h1>
    <input v-model="newTask" @keyup.enter="addTask" placeholder="Add a new task">
    <ul>
      <li v-for="(task, index) in tasks" :key="index">
        {{ task.text }}
        <button @click="removeTask(index)">Remove</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newTask: '',
      tasks: []
    };
  },
  methods: {
    addTask() {
      if (this.newTask.trim()) {
        this.tasks.push({ text: this.newTask });
        this.newTask = '';
      }
    },
    removeTask(index) {
      this.tasks.splice(index, 1);
    }
  }
};
</script>
