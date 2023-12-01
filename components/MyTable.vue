<template>
  <div>
    <div v-if="data.length > 0">
      <div class="mt-5 table-overflow">
        <table>
          <thead>
            <tr>
              <th
                v-for="column in columns"
                :key="`th-${column.field}`"
                class="text-white font-normal text-sm"
              >
                {{ column.label }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(p, index) in data"
              :key="index"
              @click="onRowClick($event, p, index)"
              class="cursor-pointer hover:bg-gray-100"
            >
              <td
                v-for="column in columns"
                :key="`td-${column.field}`"
                :class="`text-black ${column.class}`"
              >
                <div v-if="'slots' in column">
                  <slot> {{ column.slots }}</slot>
                </div>
                <div v-else-if="column.field == 'tracking'">
                  <div
                    v-if="
                      p.courier == null ||
                      p.awb == null ||
                      p.courier == '' ||
                      p.awb == ''
                    "
                    class="hover:bg-gray-300 inline-block px-4 font-bold py-1 rounded"
                    @click="addTrackingInfo(p)"
                  >
                    Add
                  </div>
                  <div v-else>
                    <p>{{ p.courier }}</p>
                    <p class="text-sm font-bold">{{ p.awb }}</p>
                    <div
                      class="hover:bg-gray-300 inline-block px-4 font-bold py-1 rounded"
                      @click="addTrackingInfo(p)"
                    >
                      Edit
                    </div>
                  </div>
                </div>
                <div v-else-if="column.field == 'history'">
                  <div v-if="Object.keys(p.history).length > 0">
                    <p class="font-bold">{{ p.history.title }}</p>
                    <p class="text-sm italic">{{ p.history.location }}</p>
                  </div>
                  <div v-else>-</div>
                </div>
                <div v-else-if="column.field == 'orderAction'"></div>
                <div v-else-if="column.type == 'boolean'">
                  <svg
                    v-if="getCellValue(p, column.field)"
                    class="text-green-600 w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="3"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  <svg
                    v-else-if="!getCellValue(p, column.field)"
                    class="text-red-600 w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="3"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                </div>
                <div v-else-if="column.type === 'datetime'">
                  <div v-if="'fields' in column">
                    {{
                      formatDateTime(
                        p[column.fields[0]],
                        column.dateInputFormat,
                        column.dateOutputFormat
                      )
                    }}
                    -
                    {{
                      formatDateTime(
                        p[column.fields[1]],
                        column.dateInputFormat,
                        column.dateOutputFormat
                      )
                    }}
                  </div>
                  <div v-else>
                    {{
                      formatDateTime(
                        getCellValue(p, column.field),
                        column.dateInputFormat,
                        column.dateOutputFormat
                      )
                    }}
                  </div>
                  <div v-if="column.getRemaining" class="text-sm mt-2">
                    <span
                      class="daysLeft"
                      :class="{
                        lessThan5: daysLeft(getCellValue(p, column.field)) < 4,
                      }"
                      >{{ daysLeft(getCellValue(p, column.field)) }} days
                      left</span
                    >
                  </div>
                </div>
                <div v-else-if="column.field == 'switch'" class="flex">
                  <label class="switch">
                    <input
                      type="checkbox"
                      :value="p.status"
                      @change="updateStatus(p)"
                      :checked="p.status == 'active' ? true : false"
                    />
                    <span class="slider round"></span>
                  </label>
                </div>
                <div v-else-if="column.field == 'action'" class="flex">
                  <div>
                    <!-- <svg
                      @click="goTo(p.slug)"
                      class="w-5 h-5 cursor-pointer mr-2 hover:bg-gray-300 rounded-full p-2 box-content"
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
                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                      ></path>
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      ></path>
                    </svg> -->
                  </div>
                  <div>
                    <svg
                      @click="$emit('onUpdate', p.id)"
                      class="w-5 h-5 cursor-pointer mr-2 hover:bg-gray-300 rounded-full p-2 box-content"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <svg
                      @click.stop="$emit('onDelete', p.id)"
                      class="w-5 h-5 text-red-600 cursor-pointer hover:bg-gray-300 rounded-full p-2 box-content"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      ></path>
                    </svg>
                  </div>
                </div>
                <div class="inline-flex" v-else>
                  <span v-if="column.prefix">{{ column.prefix }}</span>
                  <p
                    class="clamp2"
                    :class="{ 'w-24': column.field === 'product.product.name' }"
                  >
                    <span> {{ getCellValue(p, column.field) }}</span>
                    <br />
                    <span
                      class="text-sm bg-primary rounded-full text-white px-2"
                      v-if="
                        column.field === 'product.product.name' &&
                        p.items.length > 1
                      "
                      >+{{ p.items.length - 1 }} more</span
                    >
                  </p>
                  <span v-if="column.suffix">{{ column.suffix }}</span>
                  <div v-if="column.showLink" class="whitespace-nowrap">
                    <VTooltip>
                      <a
                        ><svg
                          class="w-6 h-6 ml-2"
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
                            d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                          ></path></svg
                      ></a>

                      <template #popper>
                        <div v-for="item in p.items" :key="item">
                          {{ item.product.name }}
                        </div>
                      </template>
                    </VTooltip>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <Pagination
        v-if="limit <= count"
        :count="count"
        :limit="limit"
        :offset="offset"
        @onClicked="onClicked"
      />
    </div>
    <div
      v-else
      class="flex justify-center items-center h-28 mt-4 border border-dashed border-gray-600 rounded-xl"
    >
      <span class="dark:text-gray-500">{{ noData }}</span>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  props: {
    columns: {
      type: Array,
    },
    data: {
      type: Array,
    },
    limit: {
      type: Number,
    },
    offset: {
      type: Number,
    },
    count: {
      type: Number,
    },
    noData: {
      type: String,
      default: "No Data",
    },
  },
  data() {
    return {};
  },
  methods: {
    onRowClick(event, data, index) {
      console.log(event);
      console.log(event.target.className);
      if (
        event.target.className !== "slider round" &&
        event.target.tagName !== "INPUT"
      ) {
        this.$emit("onRowClick", {
          data,
          index,
        });
      }
    },
    onClicked(p) {
      this.$emit("paginationClicked", p);
    },
    formatDateTime(datetime, dateInputFormat, dateOutputFormat) {
      if (dateInputFormat) {
        return moment(datetime, dateInputFormat).format(dateOutputFormat);
      } else {
        return moment(datetime).format(dateOutputFormat);
      }
    },
    getCellValue(rowData, field) {
      const isNested = field.includes(".");
      const fields = field.split(".");

      if (isNested) {
        return fields.reduce(
          (obj, key) => (obj ? obj[key] : undefined),
          rowData
        );
      } else {
        return rowData[field];
      }
    },
    async updateStatus(p) {
      const { data, error } = await useApi(
        `/v1/products/update-product-crud/${p.id}/`,
        {
          method: "patch",
          body: {
            status: p.status == "active" ? "inactive" : "active",
          },
        }
      );
      if (error.value != null) {
        console.error(error);
      } else {
        console.log("rsult", data.value.status);
        p.status = data.value.status;
      }
    },
    daysLeft(date) {
      // Parse the dates into Moment.js objects
      const startDate = moment();
      const endDate = moment(date);

      // Calculate the difference between the dates
      const difference = endDate.diff(startDate, "days");

      // Calculate the number of days left
      return Math.max(difference, 0); // Ensure the result is non-negative
    },
    goTo(slug) {
      window.open(`https://butaaxom.com/product/${slug}`, "_blank");
    },
    showOrderDetails(p) {
      this.$emit("showOrderDetails", p);
    },
    addTrackingInfo(p) {
      this.$emit("addTrackingInfo", p);
    },
    UpdateHistory(p) {
      this.$emit("updateHistory", p);
    },
  },
};
</script>
<style scoped>
table {
  border-collapse: collapse;
  width: 100%;
  background-color: white;
}

.clamp2 {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

table th,
td {
  text-align: left;
  padding: 16px;
  max-width: 200px;
}
table tbody tr {
  border: 1px solid #d6d6d6;
}
table thead {
  border-radius: 10px;
  background-color: #6c5f55;
  color: black;
}
table th:first-child {
  border-radius: 10px 0 0 0;
}
table tr:last-child {
  border-bottom: 1px solid #9e9e9e;
}

table th:last-child {
  border-radius: 0 10px 0 0;
}

.daysLeft {
  background: #009688;
  display: inline;
  border-radius: 100px;
  padding: 4px 10px;
}
.daysLeft.lessThan5 {
  background: #e91e63;
}

.table-overflow {
  border-radius: 10px;
  overflow-x: auto;
}
</style>
