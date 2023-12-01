<template>
  <div class="nuxt-button relative" @click="buttonClick">
    <!-- <div class="glow"></div> -->
    <div
      class="flex items-center justify-around rounded-xl cursor-pointer"
      :class="{
        'py-4 px-4': size === 'regular',
        'py-2 px-4': size === 'small',
        'bg-primary': type === 'primary',
        'bg-transparent': type === 'secondary',
      }"
    >
      <span
        :class="{
          'text-primary': isLoading,
          'text-white': type === 'primary',
          'text-black': type === 'secondary',
        }"
        class="font-bold"
        >{{ title }}</span
      >
      <Spinner
        v-show="isLoading"
        class="absolute right-0 top-0 left-0 mx-auto flex justify-center bottom-0"
      />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: false,
      default: "regular",
    },
    type: {
      type: String,
      required: false,
      default: "primary",
    },
    isLoading: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  methods: {
    buttonClick() {
      this.$emit("onBtnClick");
    },
  },
};
</script>
<style scoped>
.nuxt-button .glow {
  position: absolute;
  top: 0;
  left: 0px;
  right: 0;
  margin: auto;
  top: 0;
  width: 90px;
  height: 90px;
  opacity: 0;
  transition: all 0.8s ease;
  pointer-events: none;
  z-index: -1;
  border-radius: 9999px;
  background-image: linear-gradient(45deg, #00dc82, #36e4da, #0047e1);
  filter: blur(60px);
}

.nuxt-button:hover .glow {
  opacity: 0.6;
}
</style>
