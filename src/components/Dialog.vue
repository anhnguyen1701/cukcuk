<template>
  <div class="dialog" id="dialog" v-show="isShow">
    <div class="dialog-container">
      <div class="dialog-row-1">
        <span id="dialog_title" class="dialog-title">{{ title }}</span>
        <span
          id="dialog_btn_close"
          class="material-symbols-outlined dialog-close"
          @click="closeDialog"
        >
          close
        </span>
      </div>
      <div class="dialog-body">
        <span
          class="material-symbols-outlined fill dialog-icon"
          :class="{
            'logo-warning': type == 'warning',
            'logo-error': type == 'error',
            'logo-info': type == 'info',
            'logo-success': type == 'success',
            'logo-question': type == 'question',
          }"
        >
        </span>
        <div id="dialog_description" class="dialog-body-right">
          <span
            class="dialog-description"
            v-for="(item, index) in descriptions"
            :key="index"
            >{{ item }}</span
          >
        </div>
      </div>
      <div class="dialog-btn">
        <button
          id="dialog_btn_2"
          type="button"
          class="btn-secondary"
          v-if="type == 'question'"
          @click="cancel"
        >
          Cancel
        </button>
        <button id="dialog_btn_1" type="button" class="btn" @click="confirm">
          OK
        </button>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: 'Dialog',
  data() {
    return {
      isShow: false,

      title: undefined,
      descriptions: undefined,
      type: undefined,

      resolvePromise: undefined,
    };
  },
  methods: {
    showDialog(
      title = 'Tiêu đề',
      descriptions = ['Mô tả'],
      type = 'info',
      status
    ) {
      this.title = title;
      this.descriptions = descriptions;
      this.type = type; // 0: info, 1: error, 2: warning, 3: success, 4: question
      this.isShow = true;

      if (status == 200 || status == 201 || status == 204) {
        this.descriptions[0] += ' thành công!';
        this.type = 'success';
      } else if (
        status == 400 ||
        status == 401 ||
        status == 403 ||
        status == 404
      ) {
        this.descriptions[0] += ' thất bại.';
        this.type = 'info';
      } else if (
        status == 500 ||
        status == 501 ||
        status == 502 ||
        status == 503 ||
        status == 504
      ) {
        this.descriptions[0] = 'Lỗi máy chủ.';
        this.type = 'error';
      }

      return new Promise((resolve, reject) => {
        this.resolvePromise = resolve;
      });
    },
    closeDialog() {
      this.isShow = false;
    },
    confirm() {
      this.isShow = false;
      this.resolvePromise(true);
    },
    cancel() {
      this.isShow = false;
      this.resolvePromise(false);
    },
  },
};
</script>

<style scoped>
.dialog {
  z-index: 2;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
}

.dialog-container {
  display: flex;
  flex-direction: column;
  width: 400px;
  border: 1px solid #e6e6e6;
  padding: 24px;
  gap: 24px;
  border-radius: 3px;
  height: fit-content;
  background-color: #fff;
  margin-left: auto;
  margin-right: auto;
  top: 20%;
  position: relative;
}

.dialog-body {
  display: flex;
  align-items: center;
  gap: 12px;
}

.dialog-icon {
  font-size: 30px;
  font-weight: 500;
}

.dialog-title {
  font-size: 20px;
  font-weight: 700;
}

.dialog-description {
  font-size: 14px;
  font-weight: 400;
}

.dialog-btn {
  display: flex;
  gap: 8px;
  justify-content: end;
}

.dialog-row-1 {
  display: flex;
  justify-content: space-between;
}

.dialog-close {
  color: red;
  cursor: pointer;
}

.dialog-body-right {
  display: flex;
  flex-direction: column;
}

.logo-error::after {
  color: #f44336;
  content: '\e000';
}
.logo-warning::after {
  color: #ffc107;
  content: '\e002';
}

.logo-info::after {
  color: #2196f3;
  content: '\e88e';
}

.logo-success::after {
  color: #4caf50;
  content: '\e86c';
}

.logo-question::after {
  color: #f32121;
  content: '\e887';
}
</style>
