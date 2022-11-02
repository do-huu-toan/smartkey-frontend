<template>
  <div class="manage-device">
    Đây là trang quản lý thiết bị
    <div class="devices">
      <div v-for="device in devices" class="card lock" :key="device.id">
        <div class="lock-title">
          <div>{{ device.statusKey ? "ON" : "OFF" }}</div>
          <material-switch
            :id="device.id"
            class="lock-switch"
            :checked="statusKey"
            @change-switch="handleChangeSwitch"
          >
          </material-switch>
        </div>
        <i class="material-icons-round opacity-10 fs-5">lock</i>
        <div class="lock-content">
          {{ device.name }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import MaterialSwitch from "@/components/MaterialSwitch.vue";
import devicesApi from "@/api/device.js";
export default {
  name: "manage-device",
  async created() {
    const listDevices = await devicesApi.getDeviceByUserId();
    if (listDevices.length > 0) {
      for (let device of listDevices) {
        this.devices.push({
          ...device,
          statusKey: false,
        });
      }
    }
  },
  data() {
    return {
      devices: [],
      // statusKey: true,
    };
  },
  components: { MaterialSwitch },
  methods: {
    handleChangeSwitch(id, value) {
      var device = this.devices.find((device) => device.id == id);
      device.statusKey = value;
    },
  },
};
</script>
<style lang="scss">
.manage-device {
  padding: 40px;
}
.devices {
  margin-top: 20px;
  display: flex;
  .lock + .lock {
    margin-left: 30px;
  }
  .lock {
    box-shadow: 0px 6px 18px rgba(100, 100, 100, 0.808239);
    width: 163px;
    height: 136px;
    border-radius: 25px;
    padding: 20px;
    .lock-title {
      font-weight: bold;
      display: flex;
      justify-content: space-between;
    }
    i{
      flex:1;
      display: flex;
      align-items: center;
    }
    .lock-content{
      flex:1;
      display: flex;
      align-items: flex-end;
      font-weight: bold;
    }
  }
}
input.form-check-input.lock-switch:checked {
  background-color: green !important;
}
</style>
