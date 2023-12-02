<template>
  <div class="flex main pb-20">
    <ModalPopup
      heading="Confirm"
      :title="`Are you sure you want to delete this category?`"
      primary-action-label="Yes, Delete"
      cancel-label="Cancel"
      :show.sync="showDeleteCategoryPopup"
      @on-cancel="
        showDeleteCategoryPopup = false;
        activeID = '';
      "
      @primary-action="DeleteTenant"
    ></ModalPopup>
    <div class="w-full mt-10">
      <div class="container flex justify-between items-center">
        <div class="">
          <p class="text-primary text-4xl font-black">Your Complaints</p>
        </div>
        <div>
          <Button title="+ Add New Complaint" @onBtnClick="onBtnClick" />
        </div>
      </div>
      <div class="container">
        <div class="flex justify-between items-center mt-16">
          <p class="text-primary text-xl mt-2 font-bold">
            {{ data.length }} Complaints
          </p>
        </div>
        <MyTable
          :columns="columns"
          :data="data"
          :limit="limit"
          :offset="offset"
          :count="count"
          @onRowClick="goTo"
          @onDelete="onDelete"
          @onUpdate="onUpdate"
          @pagination-clicked="paginationClicked"
        />
      </div>
    </div>
  </div>
</template>

<script>
import {
  collection,
  query,
  doc,
  startAfter,
  getDocs,
  getDoc,
  limit,
  deleteDoc,
} from "firebase/firestore";
import { useFirestore } from "vuefire";
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
      columns: [
        {
          label: "Name",
          field: "tenantData.name",
          class: "capitalize",
        },
        {
          label: "Title",
          field: "title",
        },
        {
          label: "Complaint",
          field: "complaint",
        },
        {
          label: "Submitted",
          field: "started_date",
          type: "datetime",
          dateOutputFormat: "MMM DD, YYYY",
          getRemaining: false,
        },
        {
          label: "Status",
          field: "status",
          class: "capitalize",
        },
      ],
      active: "all",
      data: [],
    };
  },
  mounted() {
    this.GetAllTenants(this.limit, this.offset);
  },
  methods: {
    async GetAllTenants(pageSize, offset) {
      this.data = [];
      const _this = this;
      const db = useFirestore();
      const citiesCollection = collection(db, "complaints");

      // Initial query to get the first page
      const initialQuery = query(citiesCollection, limit(pageSize));

      // Perform the initial query
      getDocs(initialQuery)
        .then((querySnapshot) => {
          console.log(querySnapshot);
          if (querySnapshot.empty) {
            return;
          }
          // Process the documents from the initial query
          querySnapshot.forEach(async (docu) => {
            let data = docu.data();
            data.id = docu.id;

            try {
              const tenantDoc = await getDoc(doc(db, "tenants", data.tenant));
              if (tenantDoc.exists()) {
                const tenantData = tenantDoc.data();
                // Now you can do something with the additional data from the "tenants" collection
                data.tenantData = tenantData;
              } else {
                console.log("Tenant document not found for ID:", docu.id);
              }
            } catch (error) {
              console.error("Error getting tenant document:", error);
            }

            _this.data.push(data);
          });

          // Get the last document from the initial query to use as a starting point for the next page
          const lastDocument =
            querySnapshot.docs[querySnapshot.docs.length - 1];

          // Use startAfter to get the next page
          const nextPageQuery = query(
            citiesCollection,
            startAfter(lastDocument),
            limit(pageSize)
          );

          // Perform the next page query
          return getDocs(nextPageQuery);
        })
        // .then((nextPageSnapshot) => {
        //   // Process the documents from the next page query
        //   nextPageSnapshot.forEach((doc) => {
        //     // Your logic to handle each document on the next page
        //     console.log(doc.id, " => ", doc.data());
        //   });
        // })
        .catch((error) => {
          console.error("Error getting documents: ", error);
        });

      //   this.offset = offset;
      //   const { data, error } = await useApi(
      //     `/v1/products/all/?limit=${limit}&offset=${offset * limit}&search=${
      //       this.search
      //     }`,
      //     {
      //       method: "get",
      //     }
      //   );
      //   if (error.value != null) {
      //     console.error(error);
      //   } else {
      //     this.data = data.value.results;
      //     this.count = data.value.count;
      //   }
    },
    async DeleteTenant() {
      const db = useFirestore();
      console.log(this.activeID);
      await deleteDoc(doc(db, "tenants", this.activeID));
      this.showDeleteCategoryPopup = false;
      this.GetAllTenants(this.limit, this.offset);
    },
    onBtnClick() {
      this.$router.push("/tenants/complaints/add");
    },
    refresh() {
      this.GetAllTenants(this.limit, this.offset);
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
      this.GetAllTenants(this.limit, this.offset);
    },
    clearSearchTerms() {
      this.search = "";
      this.GetAllTenants(this.limit, this.offset);
    },
    goTo(data) {
      console.log(data);
      // this.$router.push(`/admin/tenants/edit/${data.data.id}`);
    },
    onDelete(id) {
      this.activeID = id;
      this.showDeleteCategoryPopup = true;
    },
  },
};
</script>
