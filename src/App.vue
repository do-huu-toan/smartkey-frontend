<!--
=========================================================
* Vue Material Dashboard 2 - v3.0.0
=========================================================

* Product Page: https://creative-tim.com/product/vue-material-dashboard-2
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
-->
<template>
  <sidenav
    :custom_class="color"
    :class="[isRTL ? 'fixed-end' : 'fixed-start']"
    v-if="showSidenav"
  />
  <main
    class="main-content position-relative max-height-vh-100 h-100 overflow-x-hidden"
  >
    <!-- nav -->
    <navbar
      :class="[isNavFixed ? navbarFixed : '', isAbsolute ? absolute : '']"
      :color="isAbsolute ? 'text-white opacity-8' : ''"
      :minNav="navbarMinimize"
      v-if="showNavbar"
    />
    <router-view />
    <configurator
      :toggle="toggleConfigurator"
      :class="[showConfig ? 'show' : '', hideConfigButton ? 'd-none' : '']"
    />
  </main>
</template>
<script>
import Sidenav from "./examples/Sidenav";
import Configurator from "@/examples/Configurator.vue";
import Navbar from "@/examples/Navbars/Navbar.vue";
import { mapActions, mapMutations, mapState } from "vuex";

export default {
  name: "App",
  components: {
    Sidenav,
    Configurator,
    Navbar,
  },
  created(){
    this.loadDateForUser()
  },
  methods: {
    ...mapMutations(["toggleConfigurator", "navbarMinimize"]),
    ...mapActions(["loadDateForUser"]),
    ...mapActions(["setDeviceOnline"]),
    ...mapActions(["setStatusDeviceOnlineByKey"]),
  },
  sockets: {
    connect: function () {
      console.log("socket connected");
    },
    eventDeviceOnline: function(val){
      this.setDeviceOnline(val);
    },
    statusDeviceChange: function(data){
      console.log(data);
      this.setStatusDeviceOnlineByKey(data)
    }
  },
  computed: {
    ...mapState([
      "isRTL",
      "color",
      "isAbsolute",
      "isNavFixed",
      "navbarFixed",
      "absolute",
      "showSidenav",
      "showNavbar",
      "showFooter",
      "showConfig",
      "hideConfigButton",
    ]),
    ...mapState({
      token: state => state.userStore.token
    }),
  },
  watch: {
    token: function(){
      this.loadDateForUser()
    }
  },
  beforeMount() {
    this.$store.state.isTransparent = "bg-transparent";

    const sidenav = document.getElementsByClassName("g-sidenav-show")[0];

    if (window.innerWidth > 1200) {
      sidenav.classList.add("g-sidenav-pinned");
    }
  }
  
};
</script>
