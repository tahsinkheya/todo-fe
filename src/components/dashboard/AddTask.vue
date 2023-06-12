<template>
  <!-- Main modal -->
  <div :class="{ block: show, hidden: !show }">
    <div
      tabIndex="-1"
      class="flex backdrop-brightness-50 justify-center items-center fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden inset-0 h-[calc(100%-0rem)]"
    >
      <div class="relative w-full max-w-2xl max-h-full">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <!-- Modal header -->
          <div
            class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600"
          >
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
              Add New Task
            </h3>
            <button
              type="button"
              @click="setShow"
              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="staticModal"
            >
              <svg
                class="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <!-- Modal body -->
          <div class="p-6 space-y-6">
            <label
              for="small-input"
              class="block mb-2 text-xl font-medium text-gray-900 dark:text-white"
              >Title</label
            >

            <input
              type="text"
              v-model="title"
              id="large-input"
              class="block md:w-[500px] w-[200px] md:h-[50px] h-[30px] p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <label
              for="small-input"
              class="block mb-2 text-xl font-medium text-gray-900 dark:text-white"
              >Description</label
            >

            <input
              type="text"
              v-model="desc"
              id="large-input"
              class="block md:w-[500px] w-[200px] md:h-[50px] h-[30px] p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />

            <label
              for="small-input"
              class="block mb-2 text-xl font-medium text-gray-900 dark:text-white"
              >Project</label
            >

            <select
              id="project"
              v-model="selected_proj"
              class="bg-gray-50 border w-[200px] md:w-[500px] md:h-[50px] h-[30px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="">Select an option</option>
              <option
                v-for="item in projects"
                :value="item.project_id"
                :key="item.project_id"
              >
                {{ item.name }}
              </option>
            </select>
          </div>
          <!-- Modal footer -->
          <div
            class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600"
          >
            <button
              data-modal-hide="staticModal"
              :disabled="isButtonDisabled"
              type="button"
              @click="handleClick"
              class="text-black bg-orange-300 disabled:bg-slate-300 hover:bg-orange-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-blue-800"
            >
              Confirm
            </button>
            <button
              @click="setShow"
              data-modal-hide="staticModal"
              type="button"
              class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { addTask, getAllProjects } from "../../api/todoApis";
import Alert from "../../assets/common/Alert.vue";
import jwtDecode from "jwt-decode";

export default {
  components: { Alert },
  name: "AddTask",
  props: {
    show: { type: Boolean },
    setShow: { type: Function },
    showAlert: { type: Function },
  },
  computed: {
    isButtonDisabled() {
      console.log(this.showModal);
      return !this.desc || !this.title || !this.selected_proj;
    },
  },
  data() {
    return {
      title: "",
      desc: "",
      message: "",
      type: "",
      showModal: false,
      selected_proj: "",
      projects: [],
      // Replace with your image URL
    };
  },
  methods: {
    handleClick() {
      addTask({
        title: this.title,
        description: this.desc,
        project_id: this.selected_proj,
        username: jwtDecode(localStorage.getItem("jwt_token")).username,
      })
        .then((res) => {
          this.showAlert(res.data.message, "success");
          this.title = "";
          this.pName = "";
          this.setShow();
          this.desc = "";
        })
        .catch((err) => {
          console.log(err);
          this.title = "";
          this.type = "error";
          this.desc = "";
          this.setShow();
          this.showAlert(err.response.data.message, "error");
        });
    },
  },
  watch: {
    show(newVal) {
      this.showModal = newVal;
    },
  },
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
};
</script>


