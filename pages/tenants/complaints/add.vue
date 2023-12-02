<template>
  <div class="flex main">
    <div class="form-container">
      <div class="mt-10 flex justify-between items-center">
        <div class="">
          <NuxtLink to="/tenants/complaints">
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
          <p class="dark:text-white text-4xl font-black">Add Complaint</p>
          <p class="dark:text-gray-500 mt-2">
            Fill up all the required information to add a new complaint
          </p>
        </div>
      </div>
      <div class="mb-16 mt-8">
        <div class="grid grid-cols-2 gap-x-8 gap-y-4">
          <TextInput
            class="col-span-2"
            label="Title"
            name="title"
            :submit="submit"
            @setValue="setValue"
          />
          <Textarea
            class="col-span-2 mt-5"
            label="Complaint"
            name="complaint"
            @setValue="setValue"
          />
        </div>
        <div class="max-w-md mt-10">
          <Button
            title="Submit Complaint"
            :isLoading="isLoading"
            @onBtnClick="createComplaint"
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
        status: "created",
        complaint: "",
        submitted_at: new Date(),
        tenant: localStorage.getItem("tenant"),
        title: "",
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
    async createComplaint() {
      this.isLoading = true;
      const db = useFirestore();
      try {
        await setDoc(doc(db, "complaints", uuidv4()), this.formData);
        this.isLoading = false;
        const { $toast } = useNuxtApp();
        $toast.success("Complaint added");
        this.$router.replace("/tenants/complaints");
      } catch (e) {
        this.isLoading = false;
      }
    },
  },
};
</script>
