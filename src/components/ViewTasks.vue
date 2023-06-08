<template>
  <div class="">
    <div className="bg-white w-full p-5 md:h-[400px]  overflow-y-auto h-auto">
      <h1
        class="flex items-center justify-center pb-4 text-3xl font-bold bg-gradient-to-r from-orange-500 to-red-500 text-transparent bg-clip-text"
      >
        Tasks
      </h1>

      <div class="w-full pb-3" v-for="p in tasks" :key="p.project_id">
        <div
          v-if="p.project_id === projId"
          class="rounded-lg p-5 bg-slate-300 flex flex-col justify-center items-center"
        >
          <img :src="imgUrl" className="w-[40px]" />

          <h1 class="font-bold font-serif text-xl">{{ p.title }}</h1>
          <h1>{{ p.description }}</h1>
          <button
            v-if="p.status === 'open'"
            class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          >
            Complete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import jwtDecode from "jwt-decode";
import { getAllProjects, getAllTasks } from "../api/todoApis";
export default {
  data() {
    return {
      tasks: [],
      imgUrl: "https://s3.brilliant.com.bd/tahsin/todo%2520app/4345573.png",
    };
  },
  name: "ViewTasks",
  props: {
    projId: { type: Number },
    refetch: { type: Number },
  },
  mounted() {
    fetchData();
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString);
      const options = { day: "2-digit", month: "long", year: "numeric" };
      const formattedDate = date.toLocaleDateString("en-US", options);

      return formattedDate;
    },
  },
  fetchData() {
    getAllTasks({
      username: jwtDecode(localStorage.getItem("jwt_token")).username,
    })
      .then((res) => {
        this.tasks = res.data.data;
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>


