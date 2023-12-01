<template>
  <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center">
    <div class="absolute inset-0 bg-gray-900 opacity-75"></div>
    <div
      class="bg-white rounded-xl px-6 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-headline"
    >
      <div>
        <div class="">
          <h1
            id="modal-headline"
            class="leading-6 text-2xl font-bold text-black"
          >
            {{ heading }}
          </h1>
          <h3 id="modal-headline" class="mt-4 leading-6 text-black">
            {{ title }}
          </h3>
          <div class="mt-2">
            <slot></slot>
          </div>
        </div>
      </div>
      <div class="mt-5 sm:mt-6 flex justify-end items-center">
        <Button
          :title="cancelLabel"
          @onBtnClick="onCancel"
          type="secondary"
          class="mr-4"
        />
        <Button :title="primaryActionLabel" @onBtnClick="onPrimaryAction" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    heading: {
      type: String,
      default: "Alert",
    },
    title: {
      type: String,
      required: true,
    },
    primaryActionLabel: {
      type: String,
      default: "Submit",
    },
    cancelLabel: {
      type: String,
      default: "Cancel",
    },
    show: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    onPrimaryAction() {
      // Call your API here
      this.$emit("primary-action");
    },
    onCancel() {
      this.$emit("on-cancel");
      this.$emit("update:show", false);
    },
  },
};
</script>
