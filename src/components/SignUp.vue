<template>
  <div className="h-[100vh] w-[100vw] bg-login bg-cover">
    <div>
      <Alert :message="message" :type="type" :show="show" />
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div classname="col-span-1 hidden md:block"></div>
        <div
          className="pb-20 flex flex-col items-center justify-center h-[100vh] "
        >
          <!-- <img :src="imageUrl" className="w-[300px]" /> -->
          <p
            className="md:text-3xl text-xl font-poppins font-extrabold text-gradient-orange-red pb-5"
          >
            Sign Up
          </p>
          <label
            for="small-input"
            class="block mb-2 md:text-xl text-sm font-medium text-gray-900 dark:text-white"
            >First Name</label
          >

          <input
            type="text"
            id="large-input"
            v-model="fName"
            class="block md:w-[500px] w-[200px] md:h-[50px] h-[30px] p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          <label
            for="small-input"
            class="block mb-2 md:text-xl text-sm font-medium text-gray-900 dark:text-white mt-5"
            >Last Name</label
          >
          <input
            type="text"
            v-model="lName"
            id="large-input"
            class="block md:w-[500px] w-[200px] md:h-[50px] h-[30px] p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          <label
            for="small-input"
            class="block mb-2 md:text-xl text-smfont-medium text-gray-900 dark:text-white mt-5"
            >Username</label
          >

          <input
            type="text"
            v-model="username"
            id="large-input"
            class="block md:w-[500px] w-[200px] p-4 md:h-[50px] h-[30px] text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />

          <label
            for="small-input"
            class="block mb-2 md:text-xl text-sm font-medium text-gray-900 dark:text-white mt-5"
            >Password</label
          >
          <input
            v-model="password"
            type="text"
            id="small-input"
            class="block md:w-[500px] w-[200px] md:h-[50px] h-[30px] p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          <button
            class="bg-transparent hover:bg-orange-500 mt-10 rounded-2xl disabled:bg-slate-400 disabled:text-black disabled:border-black text-orange-700 font-semibold hover:text-white py-2 px-4 border border-orange-500 hover:border-transparent w-[240px]"
            :disabled="isButtonDisabled"
            @click="handleChange"
          >
            Signup
          </button>
          <p className="pt-5">
            Already have an account?
            <router-link
              to="/"
              class="text-orange-800 hover:underline cursor-pointer"
              >Sign in to your account now ↦</router-link
            >
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Alert from "../assets/common/Alert.vue";
import { signup } from "../api/todoApis";
export default {
  components: { Alert },
  name: "SignUp",
  data() {
    return {
      fName: "",
      lName: "",
      username: "",
      password: "",
      message: "",
      type: "",
      show: false,
    };
  },
  methods: {
    clearAll() {
      this.fName = "";
      this.lName = "";
      this.password = "";
      this.username = "";
    },
    handleChange() {
      let data = {
        last_name: this.lName,
        first_name: this.fName,
        password: this.password,
        username: this.username,
      };
      signup(data)
        .then((res) => {
          this.show = true;
          this.type = "success";
          this.clearAll();
          this.message = res.data.message;
          const interval = setInterval(() => {
            this.show = false;
            clearInterval();
          }, 4000);

          console.log(res);
        })
        .catch((err) => {
          this.show = true;
          this.type = "error";
          this.clearAll();

          this.message = err.response.data.message;
          const interval = setInterval(() => {
            this.show = false;

            clearInterval();
          }, 3000);

          console.log(err.response);
        });
    },
  },
  computed: {
    isButtonDisabled() {
      return !this.fName || !this.lName || !this.username || !this.password;
    },
  },
};
</script>
