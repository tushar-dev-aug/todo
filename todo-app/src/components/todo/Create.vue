<template>
   <div>
        <div class="col-md-12 form-wrapper mt-5">
          <h2 class="mb-5"> Create Todo </h2>
          <form id="create-post-form" @submit.prevent="createTodo">
               <div class="form-group col-md-12">
                <label for="title"> Title </label>
                <input type="text" id="first_name" v-model="title" name="title" class="form-control" placeholder="Enter title">
               </div>
              <div class="form-group col-md-12">
                  <label for="description"> Description </label>
                  <input type="text" id="description" v-model="description" name="description" class="form-control" placeholder="Enter Description">
              </div>
              <div class="form-group col-md-12">
                  <label for="description"> Due Date </label>
                  <input type="date" id="description" v-model="due_date" :min="todayDate" name="due_date" class="form-control" placeholder="Enter Due Date">
              </div>
              <div class="form-group col-md-12 pull-right">
                  <button class="btn btn-success" type="submit"> Create Todo </button>
              </div>           </form>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import { server } from "../../helper";
import router from "../../router";
import moment from 'moment';
export default {
  data() {
    return {
      title: "",
      description: "",
      due_date: "",
      todayDate: moment().format('YYYY-MM-DD')
    };
  },
  methods: {
    createTodo() {
      let todoData = {
        title: this.title,
        description: this.description,
        due_date: this.due_date
      };
      this.__submitToServer(todoData);
    },
    __submitToServer(data) {
        console.log(server.baseURL, 'base url');
      axios.post(`${server.baseURL}/todo/create`, data).then(data => {
          console.log(data);
        router.push({ name: "Home" });
      });
    }
  }
  
};
</script>