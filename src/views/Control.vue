<template>
  <div class="manage-device">
    Đây là trang quản lý thiết bị
    <div class="devices">
      <div v-for="device in devices" class="card lock" :key="device.id">
        <div v-if="checkDeviceOnline(device.id)" class="device-online"></div>
        <div class="lock-title">
          <div>{{ device.statusKey ? "ON" : "OFF" }}</div>
          <material-switch
            :id="device.id"
            class="lock-switch"
            :checked="device.statusKey"
            @change-switch="handleChangeSwitch"
            :disable="!checkDeviceOnline(device.id)"
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
import { mapState } from "vuex";
export default {
  name: "manage-device",
  async mounted() {
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
    };
  },
  components: { MaterialSwitch },
  methods: {
    handleChangeSwitch(id, value) {
      var device = this.devices.find((device) => device.id == id);
      device.statusKey = value;
      this.$socket.emit("control", {
        id,
        value,
      });
    },
    checkDeviceOnline(id) {
      var isOnline = this.deviceOnline.find(
        (item) => item.key.indexOf(id) != -1
      );
      if (isOnline != null && isOnline != undefined) return true;
      return false;
    },
  },
  computed: {
    ...mapState({
      deviceOnline: (state) => state.deviceStore.deviceOnline,
    }),
  },
  updated(){
    console.log("Update component");
  },
  watch: {
    deviceOnline(value) {
      console.log("Run watch");
      var newDataDevice = [];
      for (let device of this.devices) {
        let isContain = value.filter((item) =>
          item.key.startsWith(`device/${device.id}`)
        );
        if (isContain.length > 0) {
          device.statusKey = isContain[0].status.status;
        }
        newDataDevice.push(device);
      }
      this.devices = newDataDevice;
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
  flex-wrap: wrap;
  .lock + .lock {
    margin-left: 30px;
  }
  .lock {
    box-shadow: 0px 6px 18px rgba(100, 100, 100, 0.808239);
    width: 163px;
    height: 136px;
    border-radius: 25px;
    padding: 20px;
    position: relative;
    .device-online {
      position: absolute;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: green;
      right: 20px;
      bottom: 20px;
    }
    .lock-title {
      font-weight: bold;
      display: flex;
      justify-content: space-between;
    }
    i {
      flex: 1;
      display: flex;
      align-items: center;
    }
    .lock-content {
      flex: 1;
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
