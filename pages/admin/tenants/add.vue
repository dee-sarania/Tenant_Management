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
          <p class="dark:text-white text-4xl font-black">Add a Tenant</p>
          <p class="dark:text-gray-500 mt-2">
            Fill up all the required information to add a new tenant
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
            :rules="name_rules"
            :submit="submit"
            @setValue="setValue"
          />

          <DatePickerField
            label="Date of Birth"
            name="dob"
            @setValue="setValue"
          />
          <TextInput
            label="Phone Number"
            name="phone_number"
            :rules="phone_number_rules"
            :submit="submit"
            @setValue="setValue"
          />
          <TextInput
            label="Emergency Contact Number"
            name="emergency_phone_number"
            :rules="phone_number_rules"
            :submit="submit"
            @setValue="setValue"
          />
          <TextInput
            label="Email"
            name="email"
            :submit="submit"
            @setValue="setValue"
          />
          <Textarea
            class="col-span-3 mt-5"
            label="Previous address"
            name="address"
            @setValue="setValue"
          />
        </div>
        <div class="mb-16 mt-8">
          <h3 class="font-black text-xl mb-5">Rental Information</h3>
          <div class="grid grid-cols-3 gap-x-8 gap-y-4">
            <TextInput
              label="House No."
              name="house_no"
              type="text"
              :submit="submit"
              @setValue="setValue"
            />
            <TextInput
              label="Monthly rent amount"
              name="rent"
              type="number"
              placeholder="0"
              :submit="submit"
              @setValue="setValue"
            />
            <TextInput
              label="Security deposit"
              name="security_deposit"
              type="number"
              placeholder="0"
              :submit="submit"
              @setValue="setValue"
            />
            <TextInput
              label="Society Fee"
              name="society_fee"
              type="number"
              placeholder="0"
              :submit="submit"
              @setValue="setValue"
            />
            <DatePickerField
              label="Move-in Date"
              name="movin_date"
              @setValue="setValue"
            />
            <DatePickerField
              label="Lease Start Date"
              name="lease_start_date"
              @setValue="setValue"
            />
            <DatePickerField
              label="Lease End Date"
              name="lease_end_date"
              @setValue="setValue"
            />
          </div>
        </div>
        <div class="max-w-md mt-10">
          <Button
            title="Create Tenant"
            :isLoading="isLoading"
            @onBtnClick="createTenant"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { v4 as uuidv4 } from "uuid";
import { doc, setDoc } from "firebase/firestore";
export default {
  name: "my-component",
  data() {
    return {
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
        starting_date: new Date(),
        movin_date: new Date(),
        address: "",
      },
      submit: false,
      isLoading: false,
      phone_number_rules: {
        required: true,
        fixed: 10,
        onlyNumbers: true,
      },
      name_rules: {
        required: true,
        onlyAlphabet: true,
      },
      age_rules: {
        required: true,
        max: 2,
        onlyNumbers: true,
      },
      packages: [],
      existingUserId: null,
      isMemberExisting: false,
      isLoading: false,
      genderOptions: [
        {
          label: "Male",
          value: "male",
        },
        {
          label: "Female",
          value: "female",
        },
      ],
      selectedPackage: {},
    };
  },
  mounted() {},
  methods: {
    setValue(data) {
      this.formData[data.name] = data.value;
    },
    async createTenant() {
      this.isLoading = true;
      const db = useFirestore();
      try {
        await setDoc(doc(db, "tenants", uuidv4()), this.formData);
        this.isLoading = false;
        const { $toast } = useNuxtApp();
        $toast.success("Tenant added");
        this.$router.replace("/admin/tenants");
      } catch (e) {
        this.isLoading = false;
      }
    },
  },
};
</script>
