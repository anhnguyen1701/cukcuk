<template>
  <div class="toast" id="toast" v-show="isShow">
    <div class="toast-container">
      <div class="toast-left">
        <span class="material-symbols-outlined toast-icon"> info </span>
        <span class="toast-message">Thông tin...</span>
        <!-- <span class="toast-message">Đây là nội dung của Toast Mesage</span> -->
      </div>
      <div class="toast-right">
        <span
          id="toast_close_icon"
          class="material-symbols-outlined toast-close"
          @click="closeToast"
        >
          close
        </span>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: 'Toast',
  data() {
    return {
      isShow: false,
    };
  },
  methods: {
    showToast() {
      this.isShow = true;
    },
    closeToast() {
      this.isShow = false;
    },
  },
};
</script>

<style lang="css" scoped>
.toast {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 3;
}

.toast-container {
  padding: 16px;
  border-radius: 3px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* width: fit-content; */
  width: 300px;
  background-color: #fff;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.2);
}

.toast-left,
.toast-right {
  display: flex;
  align-items: center;
  gap: 8px;
}

.toast-icon {
  color: red;
  font-size: 26px;
}

.toast-close {
  color: red;
  cursor: pointer;
}
</style>
