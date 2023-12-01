<template>
  <div class="flex flex-col mb-6z relative">
    <label class="dark:text-white">{{ label }}</label>
    <input
      autocomplete="nope"
      type="text"
      v-model="inputValue"
      placeholder=""
      @input="input"
      @click="showDatePicker"
    />
    <svg
      class="calendar_icon"
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M12.75 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM7.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM8.25 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM9.75 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM10.5 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM12.75 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM14.25 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 13.5a.75.75 0 100-1.5.75.75 0 000 1.5z"
      ></path>
      <path
        clip-rule="evenodd"
        fill-rule="evenodd"
        d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z"
      ></path>
    </svg>
    <div v-if="isDatePickerVisible" class="calendar">
      <DatePicker v-model="date" @dayclick="onDayClick" />
    </div>
  </div>
</template>

<script>
import { Calendar, DatePicker } from "v-calendar";
import moment from "moment";
import "v-calendar/style.css";
export default {
  components: {
    Calendar,
    DatePicker,
  },
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
      date: new Date(),
      inputValue: moment().format("MMM, D YYYY"),
      isDatePickerVisible: false,
    };
  },
  methods: {
    input() {},
    onDayClick(day) {
      // const idx = this.days.findIndex((d) => d.id === day.id);
      // if (idx >= 0) {
      //   this.days.splice(idx, 1);
      // } else {
      //   this.days.push({
      //     id: day.id,
      //     date: day.date,
      //   });
      // }
      this.inputValue = moment(day.id, "YYYY-MM-DD").format("MMM, D YYYY");
      this.isDatePickerVisible = false;
      this.$emit("setValue", {
        name: this.name,
        value: moment(day.id).toISOString(),
      });
    },
    showDatePicker() {
      this.isDatePickerVisible = true;
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
  appearance: none;
  background-color: #fff;
  border: 2px solid #6c5f55;
  transition: all 0.3s ease;
  padding: 10px 14px;
  border-radius: 10px;
  color: #1a1f1f;
  margin-top: 4px;
  outline: none;
  font-size: 14px;
  cursor: pointer;
}
input:focus {
  transition: all 0.3s ease;
  box-shadow: 0 0 7px 1px #15c5cf4f;
}

.calendar_icon {
  position: absolute;
  width: 26px;
  height: 26px;
  color: #6c5f55;
  top: 25px;
  right: 15px;
  bottom: 0;
  margin: auto;
  pointer-events: none;
}

.calendar {
  position: absolute;
  z-index: 100;
  top: 50pxs;
}
</style>
