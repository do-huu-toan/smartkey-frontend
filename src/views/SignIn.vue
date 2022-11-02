<template>
  <div
    class="page-header align-items-start min-vh-100"
    style="
      background-image: url('https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80');
    "
  >
    <span class="mask bg-gradient-dark opacity-6"></span>
    <div class="container my-auto">
      <div class="row">
        <div class="col-lg-4 col-md-8 col-12 mx-auto">
          <div class="card z-index-0 fadeIn3 fadeInBottom">
            <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
              <div
                class="bg-gradient-success shadow-success border-radius-lg py-3 pe-1"
              >
                <h4 class="text-white font-weight-bolder text-center mt-2 mb-0">
                  Đăng nhập
                </h4>
                <div class="row mt-3">
                  <div class="col-2 text-center ms-auto">
                    <a class="btn btn-link px-3" href="javascript:;">
                      <i class="fab fa-facebook text-white text-lg"></i>
                    </a>
                  </div>
                  <div class="col-2 text-center px-1">
                    <a class="btn btn-link px-3" href="javascript:;">
                      <i class="fab fa-github text-white text-lg"></i>
                    </a>
                  </div>
                  <div class="col-2 text-center me-auto">
                    <a class="btn btn-link px-3" href="javascript:;">
                      <i class="fab fa-google text-white text-lg"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div class="card-body">
              <div class="mb-3">
                <material-input
                  id="email"
                  type="text"
                  label="Tên đăng nhập"
                  name="email"
                  :value="username"
                  @change-input="(value) => (username = value)"
                />
              </div>
              <div class="mb-3">
                <material-input
                  id="password"
                  type="password"
                  label="Mật khẩu"
                  name="password"
                  :value="password"
                  @change-input="(value) => (password = value)"
                />
              </div>
              <material-switch id="rememberMe" name="rememberMe"
                >Remember me</material-switch
              >
              <div class="text-center">
                <material-button
                  @click="handleLoginClick"
                  class="my-4 mb-2"
                  variant="gradient"
                  color="success"
                  fullWidth
                  >Đăng nhập</material-button
                >
              </div>
              <p class="mt-4 text-sm text-center">
                Bạn chưa có tài khoản?
                <router-link
                  :to="{ name: 'SignUp' }"
                  class="text-success text-gradient font-weight-bold"
                  >Đăng ký</router-link
                >
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MaterialInput from "@/components/MaterialInput.vue";
import MaterialSwitch from "@/components/MaterialSwitch.vue";
import MaterialButton from "@/components/MaterialButton.vue";
import { mapMutations, mapActions } from "vuex";
import accountApi from "../api/account";
import utils from '../utils';
export default {
  name: "sign-in",
  components: {
    MaterialInput,
    MaterialSwitch,
    MaterialButton,
  },
  created(){
    utils.logOut();
  },
  data() {
    return {
      username: "",
      password: "",
    };
  },
  beforeMount() {
    this.toggleEveryDisplay();
    this.toggleHideConfig();
  },
  beforeUnmount() {
    this.toggleEveryDisplay();
    this.toggleHideConfig();
  },
  methods: {
    async handleLoginClick() {
      if (this.username && this.password) {
        const data = await accountApi.login({
          username: this.username,
          password: this.password,
        });
        if (data) {
          this.setToken(data.accessToken);
          this.$router.push({ name: "/" });
        }
      }
    },
    ...mapMutations(["toggleEveryDisplay", "toggleHideConfig"]),
    ...mapActions(["setToken"]),
  },
};
</script>
