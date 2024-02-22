<template>

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@300;400;600&family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Roboto:ital@0;1&display=swap" rel="stylesheet">
  <div id="app">
    <div class="task-menu">
      &nbsp;&nbsp;&nbsp;<button @click="goToAddTaskPage" class="add_btn">+</button>
      <h2>Task List</h2>
    
      <ul>
        <li v-for="(task, index) in tasks" :key="index" @click="selectTask(index)" :class="{ 'selected': selectedTaskIndex === index }">
          {{ task.text }}
        </li>
      </ul>
     
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
  font-family: 'Roboto', sans-serif;
  font-size: 18px;
  width: 25%;
  float: left;
  background: linear-gradient(145deg, #ffa726, #fb8c00);
  color: white;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
}

.selected {
  background-color: #ffd95b;
  color: #555;
}

.add_btn {
  background-color: #66bb6a;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 25px;
  border-radius: 50%;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
}

.add_btn:hover {
  transform: scale(1.1);
}

.task-detail {
  margin-left: 26%;
  background: #eeeeee;
  border: 1px solid #bdbdbd;
  font-family: 'Roboto', sans-serif;
  font-size: 20px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

input, textarea {
  width: 90%;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

#new-taskDescription {
  height: 150px;
}

button {
  background-color: #42a5f5;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #1e88e5;
}


</style>
