<template>
  <div class="">
    <ConfettiExplosion :particleCount="200" v-if="visible" />

    <div className="bg-white w-full p-5 md:h-[400px]  overflow-y-auto h-auto">
      <h1
        class="flex items-center justify-center pb-4 text-3xl font-bold bg-gradient-to-r from-orange-500 to-red-500 text-transparent bg-clip-text"
      >
        Tasks
      </h1>

      <div class="w-full" v-for="p in tasks" :key="p.project_id">
        <div
          v-if="p.project_id === projId"
          class="rounded-lg bg-slate-300 grid grid-cols-3 gap-1 mb-3 p-5"
        >
          <div class="flex justify-center items-center">
            <img :src="imgUrl" className="h-[5vh] " />
          </div>
          <div class="col-span-2">
            <h1 class="font-bold font-serif text-xl">{{ p.title }}</h1>
            <h1>{{ p.description }}</h1>
            <button
              v-if="p.status === 'open'"
              @click="handleComplete(p.task_id)"
              class="bg-transparent mt-2 hover:bg-orange-500 text-orange-700 font-semibold hover:text-white py-2 px-4 border border-orange-500 hover:border-transparent rounded"
            >
              Complete
            </button>
            <span
              v-if="p.status === 'close'"
              class="mt-4 bg-green-700 font-semibold px-2 border border-green-500 text-white rounded-3xl"
              >completed</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import jwtDecode from "jwt-decode";
import { completeTasks, getAllTasks } from "../api/todoApis";
import ConfettiExplosion from "vue-confetti-explosion";

export default {
  components: { ConfettiExplosion },

  data() {
    return {
      tasks: [],
      visible: false,
      imgUrl: "https://s3.brilliant.com.bd/tahsin/todo%2520app/4345573.png",
    };
  },
  name: "ViewTasks",
  props: {
    projId: { type: Number },
    refetch: { type: Number },
    showAlert: { type: Function },
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    getMotivationalAlert() {
      const values = [
        "Awesome job on completing your task! Keep up the great work!",
        "Congratulations on finishing your task! You're doing an excellent job!",
        "Well done on completing your task! Your hard work is paying off!",
        "Fantastic work on finishing your task! You're making great progress!",
        "Bravo! You've successfully completed your task. Keep up the amazing effort!",
      ];
      return values[Math.floor(Math.random() * 5)];
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      const options = { day: "2-digit", month: "long", year: "numeric" };
      const formattedDate = date.toLocaleDateString("en-US", options);

      return formattedDate;
    },
    handleComplete(taskid) {
      completeTasks({ task_id: taskid })
        .then((res) => {
          this.showAlert(this.getMotivationalAlert(), "success");
          this.visible = true;
          const interval = setInterval(() => {
            this.visible = false;
            clearInterval();
          }, 3000);
          this.fetchData();
        })
        .then((err) => {
          console.log(err);
        });
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


