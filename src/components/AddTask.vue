<template>
  <div class="postit-add-task">
    <h2 class="postit-heading">Add New Task</h2>
    <form @submit.prevent="submitTask" class="postit-form">
      <div class="form-group">
        <label for="postitTaskName" class="postit-label">Task Name:</label>
        <input id="postitTaskName" v-model="taskName" required class="postit-input">
      </div>
      <div class="form-group">
        <label for="postitTaskDescription" class="postit-label">Description:</label>
        <textarea id="postitTaskDescription" v-model="taskDescription" class="postit-textarea"></textarea>
      </div>
      <button type="submit" class="postit-submit-btn">Add Task</button>
    </form>
    <button @click="goToHomePage()" class="postit-cancel-btn">Cancel</button>
  </div>
</template>

<style scoped>
.postit-add-task {
background-color: #ffeb3b; /* Classic Post-it note yellow */
box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Subtle shadow for a lifted look */
padding: 20px;
border-radius: 8px; /* Slightly rounded corners for a softer look */
max-width: 400px; /* Ensures the element is not too wide */
margin: 20px auto; /* Centers the element on the page */
}

.postit-heading {
color: #333; /* Dark text for contrast */
text-align: center;
}

.postit-form .form-group {
margin-bottom: 15px;
}

.postit-label {
display: block;
margin-bottom: 5px;
}

.postit-input,
.postit-textarea {
width: 100%;
padding: 8px;
border: 1px solid #ccc; /* Subtle border */
border-radius: 4px; /* Matching rounded corners */
box-sizing: border-box; /* Ensures padding does not add to the width */
}

.postit-textarea {
height: 100px; /* Larger height for description area */
}

.postit-submit-btn,
.postit-cancel-btn {
display: block;
width: 100%;
padding: 10px;
margin-top: 10px;
color: white;
border: none;
border-radius: 4px;
cursor: pointer;
}

.postit-submit-btn {
background-color: #4CAF50; /* Green for submission */
}

.postit-cancel-btn {
background-color: #f44336; /* Red for cancellation */
}

.postit-submit-btn:hover,
.postit-cancel-btn:hover {
opacity: 0.9; /* Slight interaction effect */
}
</style>
