<template>
  <div>Thiết bị của tôi</div>
  <div class="card my-4">
    <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
      <div
        class="bg-gradient-success shadow-success border-radius-lg pt-4 pb-3"
      >
        <h6 class="text-white text-capitalize ps-3">Danh sách các thiết bị</h6>
      </div>
    </div>
    <div class="card-body px-0 pb-2">
      <div class="table-responsive p-0">
        <table class="table align-items-center mb-0">
          <thead>
            <tr>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                Thiết bị
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
              >
                Mã kết nối
              </th>
              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                Hành động
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="device in devices" :key="device.id">
              <td>
                <div class="d-flex px-2 py-1">
                  <div class="d-flex flex-column justify-content-center">
                    <h6 class="mb-0 text-sm">{{ device.name }}</h6>
                  </div>
                </div>
              </td>
              <td>
                <p class="text-xs text-secondary mb-0">{{ device.id }}</p>
              </td>
              <td class="align-middle text-center text-sm">
                <material-button :color="'primary'"> Xóa </material-button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <a-button shape="round" :size="'large'" @click="handleAddDeviceClick">
    Thêm mới thiết bị
  </a-button>
  <a-modal
    class="modal-custom-style"
    title="Nhập tên thiết bị mới"
    v-model:visible="isShowModal"
    :confirm-loading="confirmLoading"
    @ok="handleModalSubmit"
  >
    <a-input v-model:value="deviceName" placeholder="Nhập tên thiết bị" />
  </a-modal>
</template>
<script>
import MaterialButton from "../components/MaterialButton.vue";
import devicesApi from "@/api/device";
import {
  Modal as AModal,
  Input as AInput,
  Button as AButton,
} from "ant-design-vue";
export default {
  components: { MaterialButton, AModal, AInput, AButton },
  async created() {
    this.devices = await devicesApi.getDeviceByUserId();
  },
  data() {
    return {
      devices: [],
      isShowModal: false,
      confirmLoading: false,
      deviceName: "",
    };
  },
  methods: {
    handleAddDeviceClick() {
      this.isShowModal = true;
    },
    async handleModalSubmit() {
      this.isShowModal = false;
      this.confirmLoading = true;
      await devicesApi.addNewDevice({
        name: this.deviceName,
      });
      this.confirmLoading = false;
    },
  },
};
</script>

<style lang="scss">
.modal-custom-style {
  .ant-modal-content {
    border-radius: 8px;
  }
  .ant-modal-header {
    border-radius: 8px;
  }
}
</style>
