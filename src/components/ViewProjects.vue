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
          :class="{
            'rounded-lg p-5 bg-slate-300': p.project_id !== projId,
            'rounded-lg p-5 bg-orange-100': p.project_id === projId,
          }"
          class="flex flex-col justify-center items-center cursor-pointer"
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
      projId: 0,
      imgUrl: "https://s3.brilliant.com.bd/tahsin/todo%2520app/5956592.png",
    };
  },
  props: {
    setProjId: { type: Function },
    refetch: { type: Number },
  },
  name: "ViewProjects",

  methods: {
    formatDate(dateString) {
      const date = new Date(dateString);
      const options = { day: "2-digit", month: "long", year: "numeric" };
      const formattedDate = date.toLocaleDateString("en-US", options);

      return formattedDate;
    },
    onClick(id) {
      this.projId = id;
      this.setProjId(id);
    },
    fetchData() {
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
  },
  mounted() {
    this.fetchData();
  },
  watch: {
    refetch: {
      immediate: true,
      handler(newRefetch, oldRefetch) {
        if (newRefetch !== oldRefetch) {
          this.fetchData();
        }
      },
    },
  },
};
</script>


