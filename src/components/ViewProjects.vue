<template>
  <div class="">
    <div className="bg-white w-full p-5 md:h-[400px]  overflow-y-auto h-auto">
      <h1
        class="flex items-center justify-center pb-4 text-3xl font-bold bg-gradient-to-r from-orange-500 to-red-500 text-transparent bg-clip-text"
      >
        Projects
      </h1>

      <div class="w-full pb-3" v-for="p in projects" :key="p.project_id">
        <div
          @click="onClick(p.project_id)"
          class="rounded-lg p-5 cursor-pointer bg-slate-300 flex flex-col justify-center items-center"
        >
          <img :src="imgUrl" className="w-[40px]" />

          <h1 class="font-bold font-serif text-xl">{{ p.name }}</h1>
          <h1>{{ p.description }}</h1>
          <h1>Added on: {{ formatDate(p.created_at) }}</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import jwtDecode from "jwt-decode";
import { getAllProjects } from "../api/todoApis";
export default {
  data() {
    return {
      projects: [],
      imgUrl: "https://s3.brilliant.com.bd/tahsin/todo%2520app/5956592.png",
    };
  },
  props: {
    setProjId: { type: Function },
  },
  name: "ViewProjects",

  mounted() {
    getAllProjects({
      username: jwtDecode(localStorage.getItem("jwt_token")).username,
    })
      .then((res) => {
        this.projects = res.data.data;
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString);
      const options = { day: "2-digit", month: "long", year: "numeric" };
      const formattedDate = date.toLocaleDateString("en-US", options);

      return formattedDate;
    },
    onClick(id) {
      this.setProjId(id);
    },
  },
};
</script>


