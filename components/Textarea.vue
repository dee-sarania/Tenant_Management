<template>
  <div class="flex flex-col mb-6">
    <label class="dark:text-white">{{ label }}</label>
    <textarea
      autocomplete="nope"
      type="text"
      v-model="inputValue"
      placeholder=""
      @input="input"
    />
  </div>
</template>
<script>
export default {
  props: {
    label: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      inputValue: "",
    };
  },
  methods: {
    input() {
      this.$emit("setValue", {
        name: this.name,
        value: this.inputValue,
      });
    },
  },
};
</script>
<style scoped>
textarea {
  border: none;
  -webkit-appearance: none;
  -ms-appearance: none;
  -moz-appearance: none;
  appearance: none;
  appearance: none;
  background-color: #fff;
  border: 2px solid #1a1f1f;
  transition: all 0.3s ease;
  padding: 11px 14px;
  border-radius: 10px;
  color: #1a1f1f;
  margin-top: 10px;
  outline: none;
  font-size: 14px;
  min-height: 150px;
}

textarea:focus {
  transition: all 0.3s ease;
  box-shadow: 0 0 0px 1px #4caf50;
}
</style>
