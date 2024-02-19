<template>
    <div class="task-detail" v-if="task">
      <h1>{{ task.text }}</h1>
      <p>{{ task.description }}</p>
      <button @click="editMode = true">Edit</button>
      <button @click="removeTask">Remove Task</button>
      <div v-if="editMode">
        <input v-model="editedText" placeholder="New task name">
        <textarea v-model="editedDescription" placeholder="New task description"></textarea>
        <button @click="saveChanges">Save</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      task: Object
    },
    data() {
      return {
        editMode: false,
        editedText: '',
        editedDescription: ''
      };
    },
    watch: {
      task: {
        immediate: true,
        handler(newVal) {
          if (newVal) {
            this.editedText = newVal.text;
            this.editedDescription = newVal.description;
          }
        }
      }
    },
    methods: {
      saveChanges() {
        this.$emit('editTask', this.editedText, this.editedDescription);
        this.editMode = false;
      },
      removeTask() {
        if (confirm('Are you sure you want to remove this task?')) {
          this.$emit('removeTask');
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .task-detail {
    margin-left: 30%; /* Adjust this to create some space between menu and detail */
  }
  
  input, textarea {
    display: block;
    margin-bottom: 10px;
  }
  </style>