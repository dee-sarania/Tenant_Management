<template>
  <div class="flex main">
    <div class="form-container">
      <div class="mt-10 flex justify-between items-center">
        <div class="w-full">
          <NuxtLink to="/admin/tenants/">
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
          <div class="flex justify-between items-center">
            <p class="dark:text-white text-4xl font-black">{{ data.name }}</p>
            <Button title="Edit" @onBtnClick="onBtnClick" />
          </div>
        </div>
      </div>
      <div class="mb-16 mt-8">
        <h3 class="font-black text-xl mb-5">Personal Information</h3>
        <div class="grid grid-cols-3 gap-x-8 gap-y-4">
          <div>
            <p class="">Date of Birth</p>
            <p class="text-xl font-bold">{{ dateFormat(data.dob) }}</p>
          </div>
          <div>
            <p>Phone Number</p>
            <p class="text-xl font-bold">{{ data.phone_number }}</p>
          </div>
          <div>
            <p>Emergency Phone Number</p>
            <p class="text-xl font-bold">{{ data.emergency_phone_number }}</p>
          </div>
          <div>
            <p>Email</p>
            <p class="text-xl font-bold">{{ data.email }}</p>
          </div>
          <div>
            <p>Address</p>
            <p class="text-xl font-bold">{{ data.address }}</p>
          </div>
        </div>
        <div class="mb-16 mt-8">
          <h3 class="font-black text-xl mb-5">Rental Information</h3>
          <div class="grid grid-cols-3 gap-x-8 gap-y-4">
            <div>
              <p>House No.</p>
              <p class="text-xl font-bold">{{ data.house_no }}</p>
            </div>
            <div>
              <p>Rent</p>
              <p class="text-xl font-bold">{{ data.rent }}</p>
            </div>
            <div>
              <p>Security Deposit</p>
              <p class="text-xl font-bold">{{ data.security_deposit }}</p>
            </div>
            <div>
              <p>Society Fee</p>
              <p class="text-xl font-bold">{{ data.society_fee }}</p>
            </div>
            <div>
              <p>Move-in Date</p>
              <p class="text-xl font-bold">{{ dateFormat(data.movin_date) }}</p>
            </div>
            <div>
              <p>Lease Start Date</p>
              <p class="text-xl font-bold">
                {{ dateFormat(data.lease_start_date) }}
              </p>
            </div>
            <div>
              <p>Lease End Date</p>
              <p class="text-xl font-bold">
                {{ dateFormat(data.lease_end_date) }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { collection, getDoc, doc, deleteDoc } from "firebase/firestore";
export default {
  name: "my-component",
  data() {
    return {
      limit: 20,
      offset: 0,
      activeID: "",
      activeName: "",
      count: 0,
      search: "",
      showCategoryPopup: false,
      showDeleteCategoryPopup: false,
      active: "all",
      data: {},
      id: this.$route.params.id,
    };
  },
  mounted() {
    this.GetAllTenants();
  },
  methods: {
    async GetAllTenants() {
      this.data = [];
      const _this = this;
      const db = useFirestore();
      try {
        const tenantDoc = await getDoc(doc(db, "tenants", this.id));
        if (tenantDoc.exists()) {
          const tenantData = tenantDoc.data();
          // Now you can do something with the additional data from the "tenants" collection
          _this.data = tenantData;
          _this.data.id = tenantDoc.id;
        } else {
          console.log("Tenant document not found for ID:", docu.id);
        }
      } catch (error) {
        console.error("Error getting tenant document:", error);
      }
    },
    async DeleteTenant() {
      const db = useFirestore();
      console.log(this.activeID);
      await deleteDoc(doc(db, "tenants", this.activeID));
      this.showDeleteCategoryPopup = false;
      this.GetAllTenants();
    },
    onBtnClick() {
      this.$router.push(`/admin/tenants/edit/${this.data.id}`);
    },
    dateFormat(date) {
      return moment(date).format("MMM D, YYYY");
    },
    onCancelConfirm() {
      this.showCategoryPopup = false;
    },
    onUpdate(id) {
      this.$router.push(`/admin/tenants/edit/${id}/`);
    },
    paginationClicked(data) {
      console.log(data);
      this.GetAllTenants(this.limit, data);
    },
    setSearchTerm(data) {
      this.search = data.value;
    },
    searchMember() {
      this.GetAllTenants();
    },
    clearSearchTerms() {
      this.search = "";
      this.GetAllTenants();
    },
    goTo(data) {
      console.log(data);
      this.$router.push(`/admin/tenants/edit/${data.data.id}`);
    },
    onDelete(id) {
      this.activeID = id;
      this.showDeleteCategoryPopup = true;
    },
  },
};
</script>
