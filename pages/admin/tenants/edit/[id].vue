<template>
  <div class="flex main">
    <div class="form-container">
      <div class="mt-10 flex justify-between items-center">
        <div class="">
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
          <p class="dark:text-white text-4xl font-black">Edit Tenant</p>
          <p class="dark:text-gray-500 mt-2">
            Fill up all the required information to edit tenant
          </p>
        </div>
      </div>
      <div class="mb-16 mt-8">
        <h3 class="font-black text-xl mb-5">Personal Information</h3>
        <div class="grid grid-cols-3 gap-x-8 gap-y-4">
          <TextInput
            class="col-span-2"
            label="Full Name"
            name="name"
            :initial="data.name"
            :rules="name_rules"
            :submit="submit"
            @setValue="setValue"
          />

          <DatePickerField
            label="Date of Birth"
            name="dob"
            :initial="data.dob"
            @setValue="setValue"
          />
          <TextInput
            label="Phone Number"
            name="phone_number"
            :initial="data.phone_number"
            :rules="phone_number_rules"
            :submit="submit"
            @setValue="setValue"
          />
          <TextInput
            label="Emergency Contact Number"
            name="emergency_phone_number"
            :initial="data.emergency_phone_number"
            :rules="phone_number_rules"
            :submit="submit"
            @setValue="setValue"
          />
          <TextInput
            label="Email"
            name="email"
            :initial="data.email"
            :submit="submit"
            @setValue="setValue"
          />
          <Textarea
            class="col-span-3 mt-5"
            label="Previous address"
            name="address"
            :initial="data.address"
            @setValue="setValue"
          />
        </div>
        <div class="mb-16 mt-8">
          <h3 class="font-black text-xl mb-5">Rental Information</h3>
          <div class="grid grid-cols-3 gap-x-8 gap-y-4">
            <TextInput
              label="House No."
              name="house_no"
              :initial="data.house_no"
              type="text"
              :submit="submit"
              @setValue="setValue"
            />
            <TextInput
              label="Monthly rent amount"
              name="rent"
              :initial="data.rent"
              type="number"
              placeholder="0"
              :submit="submit"
              @setValue="setValue"
            />
            <TextInput
              label="Security deposit"
              name="security_deposit"
              :initial="data.security_deposit"
              type="number"
              placeholder="0"
              :submit="submit"
              @setValue="setValue"
            />
            <TextInput
              label="Society Fee"
              name="society_fee"
              :initial="data.society_fee"
              type="number"
              placeholder="0"
              :submit="submit"
              @setValue="setValue"
            />
            <DatePickerField
              label="Move-in Date"
              name="movin_date"
              :initial="data.movin_date"
              @setValue="setValue"
            />
            <DatePickerField
              label="Lease Start Date"
              name="lease_start_date"
              :initial="data.lease_start_date"
              @setValue="setValue"
            />
            <DatePickerField
              label="Lease End Date"
              name="lease_end_date"
              :initial="data.lease_end_date"
              @setValue="setValue"
            />
          </div>
        </div>
        <div class="mb-16 mt-8">
          <h3 class="font-black text-xl mb-5">Documents</h3>

          <div class="grid grid-cols-3 gap-x-8 gap-y-4">
            <div>
              <p class="pb-2">Document 1</p>
              <div v-if="data.document1">
                <img
                  @click="openFull(data.document1)"
                  class="w-full h-72 object-cover mb-2 cursor-pointer"
                  :src="data.document1"
                />
              </div>
              <input
                type="file"
                @change="uploadDocument($event, 'document1')"
              />
            </div>
            <div>
              <p class="pb-2">Document 2</p>
              <div v-if="data.document2">
                <img
                  @click="openFull(data.document2)"
                  class="w-full h-72 object-cover mb-2 cursor-pointer"
                  :src="data.document2"
                />
              </div>
              <input
                type="file"
                @change="uploadDocument($event, 'document2')"
              />
            </div>
            <div>
              <p class="pb-2">Document 3</p>
              <div v-if="data.document3">
                <img
                  @click="openFull(data.document3)"
                  class="w-full h-72 object-cover mb-2 cursor-pointer"
                  :src="data.document3"
                />
              </div>
              <input
                type="file"
                @change="uploadDocument($event, 'document3')"
              />
            </div>
          </div>
        </div>
        <div class="max-w-md mt-10">
          <Button
            title="Update Tenant"
            :isLoading="isLoading"
            @onBtnClick="updateTenant"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { v4 as uuidv4 } from "uuid";
import { updateDoc, getDoc, doc, deleteDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";
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
      formData: {
        house_no: "",
        lease_end_date: new Date(),
        phone_number: "",
        email: "",
        rent: 0,
        name: "",
        emergency_phone_number: "",
        society_fee: 0,
        dob: new Date(),
        lease_start_date: new Date(),
        security_deposit: 0,
        movin_date: new Date(),
        address: "",
        document1: "",
        document2: "",
        document3: "",
      },
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
        } else {
          console.log("Tenant document not found for ID:", docu.id);
        }
      } catch (error) {
        console.error("Error getting tenant document:", error);
      }
    },
    async updateTenant() {
      const db = useFirestore();
      const document = doc(db, "tenants", this.id);
      await updateDoc(document, this.data);
      const { $toast } = useNuxtApp();
      $toast.success("Tenant updated");
      this.$router.replace(`/admin/tenants/${this.id}`);
    },
    setValue(data) {
      this.data[data.name] = data.value;
    },
    onBtnClick() {
      this.$router.push("/admin/tenants/add");
    },
    refresh() {
      this.GetAllTenants();
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
    uploadDocument(event, data) {
      const _this = this;
      const storage = getStorage();
      const storageRef = ref(storage, uuidv4());

      const file = event.target.files[0];
      uploadBytes(storageRef, file).then((snapshot) => {
        const { $toast } = useNuxtApp();
        _this.data[
          data
        ] = `https://firebasestorage.googleapis.com/v0/b/${snapshot.metadata.bucket}/o/${snapshot.metadata.fullPath}?alt=media`;
        $toast.success("Document uploaded");
        console.log(snapshot);
      });
    },
    openFull(data) {
      window.open(
        data,
        "_blank" // <- This is what makes it open in a new window.
      );
    },
  },
};
</script>
