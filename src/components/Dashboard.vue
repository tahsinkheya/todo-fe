<template >
  <div class="w-[100vw] bg-primary bg-cover min-h-[100vh]">
    <Alert :message="message" :type="type" :show="show" />

    <div class="flex flex-col items-center justify-center">
      <div
        class="md:max-w-[1000px] flex flex-col items-center justify-center w-auto"
      >
        <div
          class="flex flex-col items-center justify-center p-10 pt-0 pb-0 border-1 border-orange-300 md:w-[1000px] w-[100vw]"
        >
          <img :src="imgUrl" className="w-[400px]" />
          <div class="flex flex-col items-center justify-center">
            <h1 class="text-2xl md:text-2xl font-sans block italic">
              {{ getDate() }}
            </h1>
            <h1 class="text-3xl md:text-3xl font-poppins pt-2">
              {{ greetUser() }},
              <span class="text-3xl font-extrabold text-orange-500">
                {{ this.fname }}</span
              >
            </h1>

            <div class="grid grid-cols-2 gap-2 pt-3">
              <span
                class="bg-green-100 text-green-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded mr-2 border-green-800 border"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  class="w-5 h-5 mr-1"
                >
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                {{ completed }} completed </span
              ><span
                class="bg-orange-100 text-orange-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded border-orange-800 border"
              >
                <svg
                  aria-hidden="true"
                  class="w-5 h-5 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                {{ numTask }} in progress
              </span>
            </div>
          </div>
        </div>
        <div
          class="grid md:grid-cols-4 gap-3 gid-cols-2 pb-6 items-center justify-center pt-4"
        >
          <div class="col-span-1 hidden md:block"></div>
          <div
            @click="addProject"
            class="border-4 border-orange-500 hover:border-orange-800 cursor-pointer rounded-3xl p-2 flex flex-col items-center justify-center hover:bg-orange-100"
          >
            <svg
              class="w-10 h-10 hover:text-orange-800 text-orange-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
            <p class="text-orange-500 text-xl md:text-xl font-bold pt-2">
              Add Project
            </p>
          </div>
          <div
            @click="addTask"
            class="border-4 border-orange-500 hover:border-orange-800 cursor-pointer rounded-3xl p-2 flex flex-col items-center justify-center hover:bg-orange-100"
          >
            <svg
              class="w-10 h-10 hover:text-orange-800 text-orange-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
            <p class="text-orange-500 text-xl md:text-xl font-bold pt-2">
              Add Tasks
            </p>
          </div>
          <div class="col-span-1 hidden md:block"></div>
        </div>
        <Addproject
          :show="showAddProj"
          :setShow="setShow"
          :showAlert="showAlert"
        />
        <AddTask
          :show="showAddTask"
          :setShow="setShowTask"
          :showAlert="showAlert"
        />
        <div class="grid grid-cols-1 md:gap-2 md:grid-cols-2 w-full">
          <ViewProjects
            :setProjId="(id) => setProjId(id)"
            :refetch="projRefresh"
          />

          <ViewTasks
            :projId="projId"
            :refetch="tasksRefresh"
            :showAlert="showAlert"
          />
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import jwtDecode from "jwt-decode";
import { getAllTasks, getUserInfo } from "../api/todoApis";
import Addproject from "../components/dashboard/AddProject.vue";
import AddTask from "../components/dashboard/AddTask.vue";
import Alert from "../assets/common/Alert.vue";
import ViewProjects from "../components/ViewProjects.vue";
import ViewTasks from "../components/ViewTasks.vue";
export default {
  name: "Dashboard",
  components: { ViewTasks, Alert, Addproject, AddTask, ViewProjects },
  data() {
    return {
      showAddProj: false,
      showAddTask: false,
      fname: "",
      pName: "",
      type: "",
      message: "",
      desc: "",
      tasksRefresh: 0,
      projRefresh: 0,
      show: false,
      numTask: 0,
      completed: 0,
      projId: 0,
      tasks: [],
      imgUrl:
        "https://s3.brilliant.com.bd/tahsin/todo%2520app/Statistics-removebg-preview.png",
    };
  },

  methods: {
    greetUser() {
      const currentHour = new Date().getHours();
      let retVal = "";
      if (currentHour >= 5 && currentHour < 12) {
        retVal = "Good morning";
      } else if (currentHour >= 12 && currentHour < 18) {
        retVal = "Good afternoon";
      } else {
        retVal = "Good evening";
      }
      return retVal;
    },
    setShow() {
      this.showAddProj = false;
      this.projRefresh = Math.random();
    },
    setProjId(id) {
      this.projId = id;
    },
    setShowTask() {
      this.showAddTask = false;
      this.tasksRefresh = Math.random();
    },
    showAlert(message, type) {
      this.type = type;
      this.message = message;
      this.show = true;
      const interval = setInterval(() => {
        this.show = false;
        clearInterval();
      }, 5000);
    },
    getDate() {
      const daysOfWeek = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      const monthsOfYear = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      const currentDate = new Date();
      const dayOfWeek = daysOfWeek[currentDate.getDay()];
      const month = monthsOfYear[currentDate.getMonth()];
      const dayOfMonth = currentDate.getDate();

      let daySuffix;
      if (dayOfMonth === 1 || dayOfMonth === 21 || dayOfMonth === 31) {
        daySuffix = "st";
      } else if (dayOfMonth === 2 || dayOfMonth === 22) {
        daySuffix = "nd";
      } else if (dayOfMonth === 3 || dayOfMonth === 23) {
        daySuffix = "rd";
      } else {
        daySuffix = "th";
      }

      const formattedDate = `${dayOfWeek}, ${month} ${dayOfMonth}${daySuffix}`;
      return formattedDate;
    },
    addProject() {
      this.showAddProj = true;
    },
    addTask() {
      this.showAddTask = true;
    },
    fetchTaskData() {
      getAllTasks({
        username: jwtDecode(localStorage.getItem("jwt_token")).username,
      })
        .then((res) => {
          this.tasks = res.data.data;
          let countInProgress = 0;
          for (let i = 0; i < this.tasks.length; i++) {
            console.log(this.tasks[i].status);
            if (this.tasks[i].status === "open") {
              countInProgress += 1;
            }
          }
          this.numTask = countInProgress;
          this.completed = res.data.data.length - countInProgress;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  watch: {
    tasksRefresh: {
      immediate: true,
      handler(newnum, olnum) {
        if (newnum !== olnum) {
          this.fetchTaskData();
        }
      },
    },
  },

  mounted() {
    getUserInfo({
      username: jwtDecode(localStorage.getItem("jwt_token")).username,
    })
      .then((res) => {
        this.fname = res.data.data["first_name"];
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>


