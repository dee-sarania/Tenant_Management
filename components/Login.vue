<template>
  <div class="login">
    <div class="min-h-screen flex items-center justify-center background-img">
      <div class="max-w-md -mt-16 w-full py-12 px-6 bg-white rounded-3xl">
        <img class="mx-auto h-10 object-contain" src="/logo.png" alt />
        <p class="mt-8 text-xl leading-5 text-center text-black font-bold">
          Admin Dashboard
        </p>
        <div class="mt-5">
          <div class="error-section" v-if="isErrorOrSuccess == 'error'">
            <p>Login failed. {{ error_message }}</p>
          </div>
          <div
            class="success-section"
            v-else-if="isErrorOrSuccess == 'success'"
          >
            <p>Login Successful. Redirecting..</p>
          </div>
          <div>
            <input
              type="hidden"
              name="_token"
              value="eXhL4xl74nkM68RuFn26zdcLjSf4vz3FDyiuBSxH"
            />
            <input type="hidden" name="remember" value="true" />
            <div class="rounded-md shadow-sm">
              <div class="pb-4">
                <input
                  aria-label="Phone Number"
                  name="phoneNumber"
                  type="tel"
                  required
                  v-model="email"
                  class="border-gray-300 placeholder-gray-500 appearance-none rounded-lg relative block w-full px-4 py-6 bg-gray-300 text-gray-900 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 text-lg sm:leading-5"
                  placeholder="Phone Number"
                  value
                />
              </div>
              <div class="-mt-px relative">
                <input
                  aria-label="Password"
                  name="password"
                  :type="visible ? 'text' : 'password'"
                  required
                  v-model="password"
                  class="border-gray-300 placeholder-gray-500 appearance-none rounded-lg relative block w-full px-4 py-6 bg-gray-300 text-gray-900 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 text-lg sm:leading-5"
                  placeholder="Password"
                />
                <svg
                  v-if="visible"
                  @click="visible = false"
                  class="absolute bottom-0 h-5 mr-3 my-auto right-0 top-0 w-5 cursor-pointer dark:text-gray-300 z-10"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
                  <path
                    fill-rule="evenodd"
                    d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <svg
                  v-else
                  @click="visible = true"
                  class="absolute bottom-0 h-5 mr-3 my-auto right-0 top-0 w-5 cursor-pointer dark:text-gray-300 z-10"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                    clip-rule="evenodd"
                  ></path>
                  <path
                    d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z"
                  ></path>
                </svg>
              </div>
            </div>

            <div class="mt-4">
              <button
                @click="authenticate"
                type="button"
                class="relative block w-full py-6 px-4 border border-transparent rounded-lg text-white font-bold bg-primary hover:bg-secondary-500 focus:bg-secondary-800 focus:outline-none focus:shadow-outline sm:leading-5"
              >
                <span class="absolute left-0 inset-y pl-3">
                  <svg
                    class="h-5 w-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </span>
                Log in
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
export default {
  data() {
    return {
      email: "",
      password: "",
      visible: false,
      isErrorOrSuccess: "",
      error_message: "",
    };
  },
  mounted() {
    console.log("mounted");
    const counter = useCookie("counter");
  },

  methods: {
    async authenticate() {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log("sucess");
          this.$router.replace("/admin/tenants");
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    },
    async authenticateRest() {
      console.log("auth");
      var payload = {
        phone_number: this.phoneNumber,
        password: this.password,
      };

      const { data } = await useApi("/v1/login/admin/", {
        method: "post",
        body: payload,
      });

      if (data.value.status === 200) {
        const bearer = useCookie("bearer");
        bearer.value = `Bearer ${data.value.access}`;

        const { data: data2 } = await useApi("/v1/users/details/", {
          method: "get",
          headers: {
            Authorization: `Bearer ${data.value.access}`,
          },
        });
        const user = useCookie("user");
        user.value = JSON.stringify(data2.value);

        this.$router.push("/analytics");

        // this.$auth.setRefreshToken("local", res.data.refresh);
        // this.$axios.setHeader("Authorization", `Bearer ${res.data.access}`);
        // this.$store.commit("SET_ACCESS", res.data.access);
        // this.$auth.ctx.app.$axios.setHeader(
        //   "Authorization",
        //   `Bearer ${res.data.access}`
        // );
        // const user = await $fetch(
        //   `${config.public.baseURL}/v1/users/details/`
        // ).then((resp) => {
        //   this.$auth.setUser(resp.data);
        //   this.isErrorOrSuccess = "success";
        //   this.error_message = "";
        //   if (!("agency" in resp.data) || resp.data.agency.length == 0) {
        //     this.$router.push("/createagency");
        //   } else {
        //     this.$router.push("/dashboard");
        //   }
        // });
      } else {
        this.isErrorOrSuccess = "error";
      }

      // try {
      //   let res = await this.$auth.loginWith("local", { data: payload });
      //   if (res.data.status === 200) {
      //     this.$auth.setToken("local", "Bearer " + res.data.access);
      //     this.$auth.setRefreshToken("local", res.data.refresh);
      //     this.$axios.setHeader("Authorization", `Bearer ${res.data.access}`);
      //     this.$store.commit("SET_ACCESS", res.data.access);
      //     this.$auth.ctx.app.$axios.setHeader(
      //       "Authorization",
      //       `Bearer ${res.data.access}`
      //     );
      //     this.$axios.get(`/api/v1/users/details/`).then((resp) => {
      //       this.$auth.setUser(resp.data);
      //       this.isErrorOrSuccess = "success";
      //       this.error_message = "";
      //       if (!("agency" in resp.data) || resp.data.agency.length == 0) {
      //         this.$router.push("/createagency");
      //       } else {
      //         this.$router.push("/dashboard");
      //       }
      //     });
      //   } else {
      //     this.isErrorOrSuccess = "error";
      //   }
      // } catch (err) {
      //   console.log(err);
      //   this.isErrorOrSuccess = "error";
      //   // this.error_message = err.response.data.message[0];
      // }
    },

    // authenticate: function () {
    //   this.$router.push("/dashboard");
    // },
  },
};
</script>

<style scoped>
/* Sample `apply` at-rules with Tailwind CSS
.container {
@apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/

.links {
  padding-top: 15px;
}

.login {
  background-size: cover;
  width: 100%;
  height: 100%;
}

.background-img {
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-image: url("https://images.unsplash.com/photo-1682686578615-39549501dd08?w=1920&auto=format&fit=crop&q=100&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxzZWFyY2h8OHx8c3Vuc2V0fGVufDB8fDB8fHww");
}
</style>
