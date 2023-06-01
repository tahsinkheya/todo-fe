<template>
  <div className="h-[100vh] w-[100vw] bg-login bg-cover">
    <div>
      <div className="grid grid-cols-2">
        <div classname="col-span-1"></div>
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
            id="large-input"
            class="block w-[500px] p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />

          <label
            for="small-input"
            class="block mb-2 text-xl font-medium text-gray-900 dark:text-white mt-10"
            >Password</label
          >
          <input
            type="text"
            id="small-input"
            class="block w-[500px] p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          <button
            class="bg-transparent hover:bg-orange-500 mt-10 rounded-2xl text-orange-700 font-semibold hover:text-white py-2 px-4 border border-orange-500 hover:border-transparent w-[240px]"
          >
            Login
          </button>
          <p className="pt-5">
            Don't have an account?<span
              className="text-orange-800 hover:underline cursor-pointer"
            >
              Create your account now ↦</span
            >
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SignUp",
  data() {
    return {
      imageUrl:
        "https://s3.brilliant.com.bd/tahsin/kheyaPortfolio/T-removebg-preview.png", // Replace with your image URL
    };
  },
};
</script>
