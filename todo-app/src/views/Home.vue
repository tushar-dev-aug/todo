<template>
    <div class="container-fluid">
      <div class="text-center">
        <h1>Todo App</h1>
       <p> Built with Nest.js, Vue.js and MongoDB</p>
       <div v-if="todos.length === 0">
            <h2 class="mt-5"> No todo found at the moment, Please create your todo. </h2>
        </div>
      </div>

        <div v-if="todos.length !== 0" class="table-wrapper mt-5">
            <table class="table table-bordered">
              <thead class="table-primary">
                <tr>
                  <th scope="col">Title</th>
                  <th scope="col">Description</th>
                  <th scope="col">Due Date</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="todo in todos" :key="todo._id">
                  <td>{{ todo.title }}</td>
                  <td>{{ todo.description }}</td>
                  <td>{{ dateFormat(todo.due_date, 'DD MMM YYYY') }}</td>
                  <td>
                    <div class="d-flex justify-content-center align-items-center">
                                <div class="btn-group" style="margin-bottom: 20px;">
                                  <router-link :to="{name: 'Edit', params: {id: todo._id}}" class="btn btn-sm btn-outline-secondary">Edit Todo </router-link>
                                  <button class="btn btn-sm btn-outline-secondary" v-on:click="deleteTodo(todo._id)">Delete Todo</button>
                                </div>
                              </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
    </div>
</template>
<script>
import { server } from "../helper";
import axios from "axios";
import moment from 'moment';
export default {
  data() {
    return {
      todos: []
    };
  },
  created() {
    this.fetchTodos();
  },
  methods: {
    fetchTodos() {
      axios
        .get(`${server.baseURL}/todo/todos`)
        .then(data => (this.todos = data.data));
    },
    deleteTodo(id) {
      axios
        .delete(`${server.baseURL}/todo/delete?todoID=${id}`)
        .then(data => {
          console.log(data);
          let index = this.todos.findIndex(item => item._id === id);
          this.todos.splice(index, 1);
          // window.location.reload();
        });
    },
    dateFormat(date, format) {
      if (format) {
        return moment(date).format(format);
      }
    }
  }
};
</script>

<style scoped>
  .table-wrapper {
    width: 70%;
    margin: 0 auto;
  }
</style>