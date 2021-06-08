<template>
   <div>
        <h4 class="text-center mt-20">
         <small>
         <button class="btn btn-success" v-on:click="navigate()"> View All Todos </button>
         </small>
        </h4>
        <div class="col-md-12 form-wrapper mt-5">
          <h2 class="mb-5"> Edit Todo </h2>
          <form id="create-post-form" @submit.prevent="editTodo">
               <div class="form-group col-md-12">
                <label for="title"> Title </label>
                <input type="text" id="first_name" v-model="todo.title" name="title" class="form-control" placeholder="Enter title">
               </div>
               
              <div class="form-group col-md-12">
                  <label for="description"> Description </label>
                  <input type="text" id="description" v-model="todo.description" name="description" class="form-control" placeholder="Enter Description">
              </div>
               <div class="form-group col-md-12">
                  <label for="due_date"> Due Date </label>
                  <input type="date" id="due_date" v-model="todo.due_date" :min="todayDate" name="due_date" class="form-control" placeholder="Enter Due Date">
              </div>
              <div class="form-group col-md-12 pull-right">
                  <button class="btn btn-success" type="submit"> Edit Todo </button>
              </div>           </form>
        </div>
    </div>
</template>
<script>
import { server } from "../../helper";
import axios from "axios";
import router from "../../router";
import moment from "moment";
export default {
  data() {
    return {
      id: 0,
      todo: {},
      todayDate: moment().format('YYYY-MM-DD')
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.getTodo();
  },
  methods: {
    editTodo() {
      let todoData = {
        title: this.todo.title,
        description: this.todo.description,
        due_date: this.todo.due_date,
      };
      axios
        .put(
          `${server.baseURL}/todo/update?todoID=${this.id}`,
          todoData
        )
        .then(data => {
            console.log(data);
          router.push({ name: "Home" });
        });
    },
    getTodo() {
      axios
        .get(`${server.baseURL}/todo/todo/${this.id}`)
        .then(data => {
            this.todo = data.data;
            this.todo.due_date = moment(this.todo.due_date).format('YYYY-MM-DD');
        });
    },
    navigate() {
      router.go(-1);
    }
  }
};
</script>