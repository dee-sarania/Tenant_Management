<template>
  <div class="flex main">
    <div class="form-container">
      <div class="mt-10 flex justify-between items-center">
        <div class="">
          <NuxtLink to="/admin/complaints">
            <svg
              class="box-content -ml-4 w-6 h-6 p-4 mb-10 transition ease-in-out duration-400 hover:text-white cursor-pointer hover:bg-gray-700 rounded-full"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                clip-rule="evenodd"
                fill-rule="evenodd"
                d="M11.03 3.97a.75.75 0 010 1.06l-6.22 6.22H21a.75.75 0 010 1.5H4.81l6.22 6.22a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.06 0z"
              ></path>
            </svg>
          </NuxtLink>
          <p class="dark:text-white text-4xl font-black">Complaint</p>
          <p class="dark:text-gray-500 mt-2">
            Review complaints and update status
          </p>
        </div>
      </div>
      <div class="mb-16 mt-8">
        <div class="">
          <div
            v-if="
              data.tenantData != null && Object.keys(data.tenantData).length > 0
            "
          >
            <p class="">Tenant</p>
            <nuxt-link :to="`/admin/tenants/${data.tenant}`"
              ><p class="text-xl font-bold underline">
                {{ data.tenantData.name }}
              </p>
            </nuxt-link>
            <p class="">House No: {{ data.tenantData.house_no }}</p>
            <p class="">Phone: {{ data.tenantData.phone_number }}</p>
          </div>
          <div>
            <p class="mt-10">Title</p>
            <p class="text-xl font-bold">{{ data.title }}</p>
          </div>
          <div class="mt-10">
            <p class="">Cmplaint</p>
            <p class="text-xl font-bold">{{ data.complaint }}</p>
          </div>
        </div>
        <div v-if="data.status == 'created'" class="max-w-md mt-10">
          <Button
            title="Mark Resolved"
            :isLoading="isLoading"
            @onBtnClick="resolveComplaint"
          />
        </div>
        <div v-else class="max-w-md mt-10">
          <p class="text-green-500 font-bold">Complaint Resolved</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { v4 as uuidv4 } from "uuid";
import { collection, getDoc, doc, updateDoc } from "firebase/firestore";
export default {
  name: "my-component",
  data() {
    return {
      data: {},
      id: this.$route.params.id,
    };
  },
  mounted() {
    this.GetComplaint();
  },
  methods: {
    async GetComplaint() {
      this.data = [];
      const _this = this;
      const db = useFirestore();
      try {
        const complaintDoc = await getDoc(doc(db, "complaints", this.id));
        if (complaintDoc.exists()) {
          const complaintData = complaintDoc.data();
          // Now you can do something with the additional data from the "tenants" collection
          _this.data = complaintData;
          _this.data.id = complaintDoc.id;

          try {
            const tenantDoc = await getDoc(
              doc(db, "tenants", _this.data.tenant)
            );
            if (tenantDoc.exists()) {
              const tenantData = tenantDoc.data();
              // Now you can do something with the additional data from the "tenants" collection
              _this.data.tenantData = tenantData;
            } else {
              console.log("Tenant document not found for ID:", docu.id);
            }
          } catch (error) {
            console.error("Error getting tenant document:", error);
          }
        } else {
          console.log("Tenant document not found for ID:", this.id);
        }
      } catch (error) {
        console.error("Error getting tenant document:", error);
      }
    },
    async resolveComplaint() {
      const db = useFirestore();
      const document = doc(db, "complaints", this.id);
      await updateDoc(document, { status: "resolved" });
      const { $toast } = useNuxtApp();
      $toast.success("Complaint Resolved");
      this.$router.replace(`/tenants/complaints/`);
    },
  },
};
</script>
