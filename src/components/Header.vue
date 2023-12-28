<template>
  <div class="header">
    <div class="header-left">
      <span class="material-symbols-outlined header-icon"> apps </span>
      <div class="header-logo header-icon"></div>
      <!-- <span class="header-logo-text">KẾ TOÁN</span> -->
    </div>
    <div class="header-right">
      <span class="material-symbols-outlined header-icon"> search </span>
      <span class="material-symbols-outlined header-icon"> settings </span>
      <span class="material-symbols-outlined header-icon"> notifications </span>
      <span class="material-symbols-outlined header-icon"> help </span>
      <span class="material-symbols-outlined header-icon"> inbox </span>
      <span class="header-account"></span>
      <button type="button" class="btn" @click="login()" :disabled="isLoggedIn">
        <span v-if="isLoggedIn">Logged in</span>
        <span v-else>Login</span>
      </button>
      <button type="button" class="btn" @click="logout()">
        <span> Logout</span>
      </button>
    </div>
  </div>
</template>

<script>
import keycloak from '../keycloak.js';

/* eslint-disable */
export default {
  name: 'Header',
  computed: {
    isLoggedIn() {
      return keycloak.authenticated;
    },
  },
  methods: {
    login() {
      console.log(keycloak.authenticated);
      keycloak.login();
    },
    loginAdmin() {
      this.$store.dispatch('loginAsAdmin');
    },
    logout() {
      keycloak.logout();
      alert('log out');
    },
  },
};
</script>

<style lang="css">
.header {
  display: flex;
  padding: 8px 16px;
  align-items: center;
  justify-content: space-between;
}

.header-left,
.header-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.header-icon {
  font-size: 24px;
  line-height: 24px;
  cursor: pointer;
}

.header-icon-1 {
  background: url('../assets/Sprites.svg') no-repeat -1157px -32px;
  width: 16px;
  height: 16px;
}

.header-logo {
  background: url('../assets/Logo.svg') no-repeat;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  width: 96px;
  height: 32px;
}

.header-logo-text {
  /* font-weight: 600; */
  font-size: 24px;
}

.header-account {
  height: 32px;
  width: 32px;
  border: 1px solid var(--gray-1);
  border-radius: 50%;

  background: url('../assets/icon/avatar-default.png') no-repeat;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}
</style>
