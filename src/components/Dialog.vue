<template>
  <div class="dialog">
    <div class="dialog__main">
      <div class="dialog__main--content">
        <slot />
      </div>
      <div class="dialog__main--footer">
        <material-button class="modal-btn" @click="handleSaveClick"
          >Lưu</material-button
        >
        <material-button class="modal-btn" :color="'primary'"
          >Hủy</material-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import MaterialButton from "../components/MaterialButton.vue";
export default {
  components: { MaterialButton },
  methods: {
    handleSaveClick() {},
  },
};
</script>

<style lang="scss">
.ant-notification {
  z-index: 999999;
}
.dialog {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba($color: #000000, $alpha: 0.3);
  z-index: 99999;
  display: flex;
  align-items: center;
  justify-content: center;
  .dialog__main {
    min-width: 50%;
    padding: 30px;
    border-radius: 8px;
    background-color: aliceblue;
    height: fit-content;
    .dialog__main--content {
      margin-bottom: 30px;
    }
    .dialog__main--footer {
      display: flex;
      justify-content: center;
    }
    .modal-btn + .modal-btn {
      margin-left: 10px;
    }
  }
}
</style>
