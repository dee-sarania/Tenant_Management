<template>
  <div class="w-56 h-screen dashboard bg-primary">
    <div class="px-10 py-10">
      <img class="w-36 object-contain invert" src="/logo.png" />
      <h1 class="text-white font-bold pl-1">Dashboard</h1>
    </div>
    <div class="dashboard-links">
      <NuxtLink to="/admin/tenants">
        <div class="link" :class="{ active: $route.path.includes('members') }">
          <svg
            class="text-white w-6 h-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M10 9a3 3 0 100-6 3 3 0 000 6zM6 8a2 2 0 11-4 0 2 2 0 014 0zM1.49 15.326a.78.78 0 01-.358-.442 3 3 0 014.308-3.516 6.484 6.484 0 00-1.905 3.959c-.023.222-.014.442.025.654a4.97 4.97 0 01-2.07-.655zM16.44 15.98a4.97 4.97 0 002.07-.654.78.78 0 00.357-.442 3 3 0 00-4.308-3.517 6.484 6.484 0 011.907 3.96 2.32 2.32 0 01-.026.654zM18 8a2 2 0 11-4 0 2 2 0 014 0zM5.304 16.19a.844.844 0 01-.277-.71 5 5 0 019.947 0 .843.843 0 01-.277.71A6.975 6.975 0 0110 18a6.974 6.974 0 01-4.696-1.81z"
            ></path>
          </svg>
          <p class="text-white px-3 font-semibold">Tenants</p>
        </div>
      </NuxtLink>
      <NuxtLink to="/admin/complaints">
        <div class="link" :class="{ active: $route.path.includes('packages') }">
          <svg
            class="text-white w-6 h-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              clip-rule="evenodd"
              fill-rule="evenodd"
              d="M4.606 12.97a.75.75 0 01-.134 1.051 2.494 2.494 0 00-.93 2.437 2.494 2.494 0 002.437-.93.75.75 0 111.186.918 3.995 3.995 0 01-4.482 1.332.75.75 0 01-.461-.461 3.994 3.994 0 011.332-4.482.75.75 0 011.052.134z"
            ></path>
            <path
              clip-rule="evenodd"
              fill-rule="evenodd"
              d="M5.752 12A13.07 13.07 0 008 14.248v4.002c0 .414.336.75.75.75a5 5 0 004.797-6.414 12.984 12.984 0 005.45-10.848.75.75 0 00-.735-.735 12.984 12.984 0 00-10.849 5.45A5 5 0 001 11.25c.001.414.337.75.751.75h4.002zM13 9a2 2 0 100-4 2 2 0 000 4z"
            ></path>
          </svg>
          <p class="text-white px-3 font-semibold">Complaints</p>
        </div>
      </NuxtLink>
    </div>
    <div class="absolute bottom-0 dashboard-links">
      <div class="flex items-center link">
        <svg
          class="text-white w-6 h-6"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            clip-rule="evenodd"
            fill-rule="evenodd"
            d="M10 2a.75.75 0 01.75.75v7.5a.75.75 0 01-1.5 0v-7.5A.75.75 0 0110 2zM5.404 4.343a.75.75 0 010 1.06 6.5 6.5 0 109.192 0 .75.75 0 111.06-1.06 8 8 0 11-11.313 0 .75.75 0 011.06 0z"
          ></path>
        </svg>
        <p class="text-white px-3 font-semibold">Log out</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  overflow-y: auto;
}

.dashboard-links .link {
  display: flex;
  align-items: center;
  margin: 8px 18px;
  padding: 14px 14px;
  border-radius: 10px;
  cursor: pointer;
}
.dashboard-links p {
  font-size: 14px;
}
.dashboard-links .link:hover {
  background-color: #16181c;
}
.dashboard-links .link.active {
  background-color: #252a31;
}
.dashboard-links .link.active p,
.dashboard-links .link.active svg {
  color: #36bcba;
}
</style>
