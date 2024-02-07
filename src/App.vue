<template>
  <login v-if="!isLogged" @login="log"></login>
  <router-view></router-view>
</template>

<script>
import login from "./components/login.vue";
import store from "./store.js";
export default {
  name: "App",

  components: { login },
  data() {
    return {
      isLogged: false,
      userId: "",
    };
  },

  mounted() {
    this.isLogged = sessionStorage.getItem("isLogged") === "true";
    console.log(this.isLogged)
  },

  methods: {
    log(value) {
      this.userId = value;
      
      console.log(value);
      if (value == "") {
        return;
      }
      this.isLogged = true;
      sessionStorage.setItem("isLogged", this.isLogged);
      console.log(this.isLogged);
      //this.$router.push("/HomePage");
      console.log(this.userId);
      this.$router.push({
        path: "/HomePage", // <-- Make sure this matches the route name
        query: { userid: this.userId },
      });

      this.value=""
    },
  },
};
</script>

<style lang="scss" scoped></style>
