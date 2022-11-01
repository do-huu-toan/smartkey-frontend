<template>
  <div class="form-check form-switch d-flex">
    <input
      :id="id"
      class="form-check-input"
      :class="$attrs.class"
      type="checkbox"
      :name="name"
      v-model="value"
      @change="handleChange"
      :checked="checked"
    />
    <label class="form-check-label ms-3" :class="labelClass" :for="id">
      <slot />
    </label>
  </div>
</template>

<script>
export default {
  name: "MaterialSwitch",
  data() {
    return {
      value: this.checked,
    };
  },
  props: {
    name: {
      type: String,
      required: false,
    },
    id: {
      type: String,
      required: true,
    },
    labelClass: {
      type: String,
      default: "",
    },
    checked: Boolean
  },
  methods: {
    handleChange() {
      this.$emit("change-switch", this.id, this.value);
    },
  },
};
</script>
