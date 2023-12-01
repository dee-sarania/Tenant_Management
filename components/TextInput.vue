<template>
  <div class="flex flex-col">
    <label class="text-primary">{{ label }}</label>
    <div class="relative flex items-center">
      <input
        autocomplete="nope"
        :type="type"
        v-model="inputValue"
        :placeholder="placeholder"
        @input="input"
        :class="{ error: status == 'error', 'mt-1': label != '' }"
      />
      <Spinner v-show="isLoading" class="absolute right-8 top-8 bottom-0" />
      <div
        v-if="hasOptions"
        class="absolute bottom-0 h-full"
        style="top: 9px; right: 6px"
      >
        <select
          v-model="selected_option"
          @change="input"
          class="border border-gray-500 py-2 px-2"
          style="border-radius: 5px"
        >
          <option :value="p" v-for="p in options" :key="p">{{ p }}</option>
        </select>
      </div>
      <!-- <svg
        v-if="status == 'success'"
        class="w-8 h-8 ml-5 text-green-500 absolute right-3 top-6 bottom-0"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg> -->
    </div>
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
    type: {
      type: String,
      required: false,
      default: "text",
    },
    initial: {
      type: String,
      required: false,
      default: "",
    },
    placeholder: {
      type: String,
      required: false,
      default: "",
    },
    isLoading: {
      type: Boolean,
      required: false,
      default: false,
    },
    rules: {
      type: Object,
      required: false,
      default: {},
    },
    submit: {
      type: Boolean,
      required: false,
      default: false,
    },
    index: {
      type: String,
      required: false,
      default: false,
    },
    hasOptions: {
      type: Boolean,
      required: false,
      default: false,
    },
    options: {
      type: Array,
      required: false,
      default: [],
    },
    optionName: {
      type: String,
      required: false,
      default: "",
    },
    defaultOption: {
      type: String,
      required: false,
      default: "",
    },
  },
  data() {
    return {
      inputValue: this.initial,
      selected_option: "",
    };
  },
  mounted() {
    if (this.options.length > 0) {
      this.selected_option = this.options[0];
    } else {
      this.selected_option = this.defaultOption;
    }
  },
  watch: {
    initial(val) {
      this.inputValue = val;
    },
    defaultOption(val) {
      this.selected_option = val;
    },
  },
  computed: {
    status() {
      let finalValue = "none";
      for (var i in this.rules) {
        if (this.submit && i == "required" && this.rules["required"]) {
          this.inputValue.length > 0
            ? (finalValue = "success")
            : (finalValue = "error");
          if (finalValue == "error") return finalValue;
        }

        if (i == "fixed" && this.inputValue.length > 0) {
          this.inputValue.length == this.rules["fixed"]
            ? (finalValue = "success")
            : (finalValue = "error");
          if (finalValue == "error") return finalValue;
        } else if (i == "max" && this.inputValue.length > 0) {
          this.inputValue.length <= this.rules["max"]
            ? (finalValue = "success")
            : (finalValue = "error");
          if (finalValue == "error") return finalValue;
        }
        if (
          i == "onlyNumbers" &&
          this.rules["onlyNumbers"] &&
          this.inputValue.length > 0
        ) {
          !isNaN(this.inputValue)
            ? (finalValue = "success")
            : (finalValue = "error");
          if (finalValue == "error") return finalValue;
        } else if (
          i == "onlyAlphabet" &&
          this.rules["onlyAlphabet"] &&
          this.inputValue.length > 0
        ) {
          isNaN(this.inputValue)
            ? (finalValue = "success")
            : (finalValue = "error");
          if (finalValue == "error") return finalValue;
        }
      }
      return finalValue;
    },
  },
  methods: {
    input() {
      if (this.hasOptions) {
        this.$emit("setValue", {
          name: this.name,
          value: this.inputValue,
          index: this.index,
          selected: this.selected_option,
          optionName: this.optionName,
        });
      } else {
        this.$emit("setValue", {
          name: this.name,
          value: this.inputValue,
          index: this.index,
        });
      }
    },
  },
};
</script>
<style scoped>
input {
  border: none;
  -webkit-appearance: none;
  -ms-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-color: #ffffff;
  border: 2px solid #6c5f55;
  transition: all 0.3s ease;
  padding: 11px 14px;
  border-radius: 10px;
  color: black;
  outline: none;
  font-size: 14px;
  width: 100%;
}
input.success {
  transition: all 0.3s ease;
  box-shadow: 0 0 0px 1px #4caf50;
}
input.error {
  transition: all 0.3s ease;
  box-shadow: 0 0 0px 1px #e91e63;
}
input:focus {
  transition: all 0.3s ease;
  box-shadow: 0 0 0px 1px #03a9f4;
}
input::placeholder {
  font-size: 14px;
}
</style>
