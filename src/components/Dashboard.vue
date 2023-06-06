<template>
  <div class="h-[100vh] w-[100vw] bg-primary bg-cover p-5">
      <Alert :message="message" :type="type" :show="show" />

    <h1
      class="flex items-center justify-center pb-4 text-4xl font-bold bg-gradient-to-r from-orange-500 via-pink-500 to-red-500 text-transparent bg-clip-text"
    >
      Dashboard
    </h1>
    <div class="flex flex-col items-center justify-center">
      <div
        class="md:max-w-[1000px] flex flex-col items-center justify-center w-auto"
      >
        <div
          class="flex flex-col items-center justify-center bg-orange-300 md:w-[1000px] w-[100vw]"
        >
          <div class="p-10">
            <h1 class="text-2xl md:text-3xl font-poppins">
              Hello, {{ this.fname }}
            </h1>
            <br />
            <h1 class="text-2xl md:text-2xl font-sans block">
              {{ getDate() }}
            </h1>
          </div>
        </div>
        <div
          class="grid md:grid-cols-4 gap-3 gid-cols-2 items-center justify-center pt-4"
        >
          <div class="col-span-1 hidden md:block"></div>
          <div
            @click="addProject"
            class="border-4 border-orange-500 hover:border-orange-800 cursor-pointer rounded-2xl p-4 flex flex-col items-center justify-center hover:bg-orange-100"
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
            <p class="text-orange-500 text-2xl md:text-3xl pt-4">Add Project</p>
          </div>
          <div
            class="border-4 border-orange-500 hover:border-orange-800 rounded-2xl p-4 flex flex-col items-center justify-center hover:bg-orange-100"
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
            <p class="text-orange-500 text-2xl md:text-3xl pt-4">Add Tasks</p>
          </div>
          <div class="col-span-1 hidden md:block"></div>
        </div>
      </div>
      <Addproject
        :show="showAddProj"
        :setShow="setShow"
        :showAlert="showAlert"
      />
    </div>
  </div>
</template>


<script>
import jwtDecode from "jwt-decode";
import { getUserInfo } from "../api/todoApis";
import Addproject from "../components/dashboard/AddProject.vue";
import Alert from "../assets/common/Alert.vue";

export default {
  name: "Dashboard",
  components: { Alert, Addproject },
  data() {
    return {
      showAddProj: true,
      showAddTask: false,
      fname: "",
      pName: "",
      type: "",
      message: "",
      desc: "",
      show: false,
    };
  },

  methods: {
    setShow() {
      this.showAddProj = false;
    },
    showAlert(message, type) {
      this.type = type;
      this.message = message;
      this.show = true;
      const interval = setInterval(() => {
        this.show = false;
        clearInterval();
      }, 3000);
    },
    getDate() {
      const today = new Date();

      const year = today.getFullYear();
      const month = today.getMonth() + 1; // Note: Months are zero-based, so we add 1
      const day = today.getDate();
      const formattedDate = `${year}-${month < 10 ? "0" + month : month}-${
        day < 10 ? "0" + day : day
      }`;
      console.log(this.fname);
      return formattedDate;
    },
    addProject() {
      this.showAddProj = true;
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


