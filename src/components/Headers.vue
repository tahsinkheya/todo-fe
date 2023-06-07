<template>
  <div className="h-[100vh] w-[100vw] bg-login bg-cover relative">
    <div>
      <Alert :message="message" :type="type" :show="show" />

      <div className="grid grid-cols-1 md:grid-cols-2">
        <div classname="col-span-1 hidden md:block"></div>
        <div
          className="pb-20 flex flex-col items-center justify-center h-[100vh] "
        >
          <!-- <img :src="imageUrl" className="w-[300px]" /> -->
          <p
            className="text-3xl font-poppins font-extrabold text-gradient-orange-red pb-5"
          >
            My TODO Tracker
          </p>
          <label
            for="small-input"
            class="block mb-2 text-xl font-medium text-gray-900 dark:text-white"
            >Username</label
          >

          <input
            type="text"
            v-model="username"
            id="large-input"
            class="block md:w-[500px] w-[200px] md:h-[50px] h-[30px] p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />

          <label
            for="small-input"
            class="block mb-2 text-xl font-medium text-gray-900 dark:text-white mt-10"
            >Password</label
          >
          <input
            type="password"
            v-model="password"
            id="small-input"
            class="block md:w-[500px] w-[200px] md:h-[50px] h-[30px] p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          <button
            class="bg-transparent hover:bg-orange-500 mt-10 rounded-2xl disabled:bg-slate-400 disabled:text-black disabled:border-black text-orange-700 font-semibold hover:text-white py-2 px-4 border border-orange-500 hover:border-transparent w-[240px]"
            :disabled="isButtonDisabled"
            @click="handleChange"
          >
            Login
          </button>
          <p className="pt-5">
            Don't have an account?
            <router-link
              to="/signup"
              class="text-orange-800 hover:underline cursor-pointer"
              >Create your account now ↦</router-link
            >
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { login } from "../api/todoApis";
import Alert from "../assets/common/Alert.vue";

export default {
  components: { Alert },

  name: "Headers",
  data() {
    return {
      password: "",
      username: "",
      show: false,
      message: "",
      type: "",
      imageUrl:
        "https://s3.brilliant.com.bd/tahsin/kheyaPortfolio/T-removebg-preview.png", // Replace with your image URL
    };
  },
  mounted() {
    let token = localStorage.getItem("jwt_token");
    if (token) {
      this.$router.push("/dashboard");
    }
  },
  methods: {
    handleChange() {
      login({ username: this.username, password: this.password })
        .then((res) => {
          this.show = true;
          this.type = "success";
          this.clearAll();
          this.message = res.data.message;
          const interval = setInterval(() => {
            this.show = false;
            clearInterval();
          }, 5000);
          localStorage.setItem("jwt_token", res.data.auth_token);
          this.$router.push("/dashboard");
        })
        .catch((err) => {
          this.show = true;
          this.type = "error";
          this.clearAll();

          this.message = err.response.data.message;
          const interval = setInterval(() => {
            this.show = false;

            clearInterval();
          }, 5000);

          console.log(err.response);
        });
    },
    clearAll() {
      this.username = "";
      this.password = "";
    },
  },
  computed: {
    isButtonDisabled() {
      return !this.password || !this.username;
    },
  },
};
</script>
