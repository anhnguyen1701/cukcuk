<template>
  <aside id="sidebar-full" class="sidebar" v-if="isSidebarOpen">
    <div class="sidebar-full-top">
      <a to="/" class="sidebar-link">
        <div class="sidebar-logo home"></div>
        <span class="text">Trang chủ</span>
      </a>
      <a to="/report" class="sidebar-link">
        <div class="sidebar-logo report"></div>
        <span class="text">Báo cáo</span>
      </a>
      <a to="/customer" class="sidebar-link">
        <div class="sidebar-logo customer"></div>
        <span class="text">Khách hàng</span>
      </a>
      <a to="/employee" class="sidebar-link">
        <div class="sidebar-logo employee"></div>
        <span class="text">Nhân viên</span>
      </a>
      <a to="/setting" class="sidebar-link">
        <div class="sidebar-logo setting"></div>
        <span class="text">Cài đặt</span>
      </a>
    </div>
    <a id="sidebar-minimize-btn" class="sidebar-link" @click="toggleSidebar">
      <div class="sidebar-logo collapse"></div>
      <span class="text">Thu gọn</span>
    </a>
  </aside>
  <aside id="sidebar-minimize" class="sidebar" v-if="!isSidebarOpen">
    <div class="sidebar-minimize-top">
      <a to="/" class="sidebar-link-2">
        <div class="sidebar-logo home"></div>
      </a>
      <a to="/report" class="sidebar-link-2">
        <div class="sidebar-logo report"></div>
      </a>
      <a to="/customer" class="sidebar-link-2">
        <div class="sidebar-logo customer"></div>
      </a>
      <a to="/employee" class="sidebar-link-2">
        <div class="sidebar-logo employee"></div>
      </a>
      <a to="/setting" class="sidebar-link-2">
        <div class="sidebar-logo setting"></div>
      </a>
    </div>
    <a
      id="sidebar-minimize-btn-2"
      class="sidebar-link-2"
      @click="toggleSidebar"
    >
      <div class="sidebar-logo collapse-2"></div>
    </a>
  </aside>
</template>

<script>
/* eslint-disable */
export default {
  name: 'Sidebar',
  data() {
    return {
      isSidebarOpen: true,
    };
  },
  methods: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
      this.$store.commit('SET_SIDEBAR', this.isSidebarOpen);
    },
  },
};
</script>

<style lang="css" scoped>
.sidebar {
  background-color: var(--sidebar);
  color: white;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding-top: 20px;
  position: relative;
}

.sidebar-link {
  color: white;
  display: flex;
  font-weight: 500;
  gap: 12px;
  font-size: 14px;
  cursor: pointer;
  align-items: center;

  height: 44px;
  margin: 0 12px;
  border-radius: 4px;
  padding-left: 16px;
}

.sidebar-link:hover,
.sidebar-link-2:hover {
  background-color: var(--sidebar-hover);
}

.sidebar-link-2 {
  color: white;
  display: flex;
  font-weight: 500;
  gap: 12px;
  font-size: 14px;
  cursor: pointer;
  align-items: center;

  height: 44px;
  margin: 0 12px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sidebar-logo {
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  width: 24px;
  height: 24px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* .collapse-div {
    width: 176px;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    }

    .collapse-div::before {
    content: '';
    width: 200px;
    height: 1px;
    background-color: #213553;
    position: absolute;
    top: 0;
    left: -12px;
    } */

.home,
.report,
.customer,
.employee,
.setting,
.collapse,
.collapse-2 {
  filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(172deg)
    brightness(107%) contrast(102%);
}

.home {
  background-image: url('../assets/icon/dashboard.svg');
}

.report {
  background-image: url('../assets/icon/report.svg');
}

.customer {
  background-image: url('../assets/icon/customer.svg');
}

.employee {
  background-image: url('../assets/icon/employee.svg');
}

.setting {
  background-image: url('../assets/icon/setting.svg');
}

.collapse {
  background-image: url('../assets/icon/btn-prev-page.svg');
}

.collapse-2 {
  background-image: url('../assets/icon/btn-next-page.svg');
}

#sidebar-minimize {
  display: flex;
  width: 73px;
  justify-content: space-between;
}

#sidebar-minimize-btn-2 {
  position: relative;
}

#sidebar-minimize-btn-2::before {
  content: '';
  width: 73px;
  height: 1px;
  background-color: #213553;
  position: absolute;
  top: 0;
  left: -12px;
}

#sidebar-full {
  display: flex;
  justify-content: space-between;
  width: 200px;
}

#sidebar-minimize-btn {
  position: relative;
}

#sidebar-minimize-btn::before {
  content: '';
  width: 200px;
  height: 1px;
  background-color: #213553;
  position: absolute;
  top: 0;
  left: -12px;
}
</style>
