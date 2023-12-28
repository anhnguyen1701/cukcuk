<template>
  <div
    class="content"
    :class="{
      'content-width-full': isSidebarOpen,
      'content-width-minimize': !isSidebarOpen,
    }"
  >
    <div class="content-nav">
      <span class="content-title">Quản lý nhân viên</span>
      <div class="content-nav-right">
        <button
          id="btn_add"
          type="button"
          class="btn"
          style="padding-left: 12px"
          @click="addEmployee()"
        >
          <span class="material-symbols-outlined btn-icon-add"> add </span>
          <span> Thêm mới </span>
        </button>
        <button
          type="button"
          class="btn-secondary btn-icon"
          id="toast_test"
          @click="login()"
        >
          <span class="material-symbols-outlined"> more_horiz </span>
        </button>
      </div>
    </div>

    <!-- table section -->
    <div class="table-container">
      <div class="table-nav">
        <div class="table-nav-left">
          <span class="table-nav-left-selected-item">
            Đã chọn <strong>{{ this.checkedList.length }}</strong>
          </span>

          <button type="button" class="btn-link" @click="unCheckAllItems">
            Bỏ chọn
          </button>
          <button
            id="btn_delete_all"
            type="button"
            class="btn-secondary"
            style="padding-left: 12px"
            @click="deleteEmployees"
          >
            <span class="material-symbols-outlined btn-icon-delete">
              delete
            </span>
            <span> Xóa tất cả </span>
          </button>
        </div>

        <div class="table-nav-right">
          <label class="text-field">
            <input
              class="text-field-input"
              type="text"
              placeholder="Tìm kiếm nhân viên"
              style="margin: 0"
            />
          </label>

          <button type="button" class="btn-secondary btn-icon">
            <span class="material-symbols-outlined"> filter_alt </span>
          </button>
          <button
            id="reload_btn"
            type="button"
            class="btn btn-icon"
            @click="getEmployees()"
          >
            <span class="material-symbols-outlined"> refresh </span>
          </button>
        </div>
      </div>

      <div class="table-main">
        <table id="table">
          <thead>
            <tr>
              <th style="width: 56px">
                <input
                  type="checkbox"
                  class="table-check-box"
                  ref="checkAll"
                  @click="checkAllItems($event)"
                />
              </th>
              <th class="txt-left">Mã nhân viên</th>
              <th class="txt-left">Họ tên</th>
              <th class="txt-left">Số điện thoại</th>
              <th class="txt-left">Email</th>
              <th class="txt-left">Địa chỉ</th>
              <th class="txt-center">Ngày sinh</th>
              <th class="txt-left">Giới tính</th>
              <th class="txt-right">Tiền lương</th>
              <th style="min-width: 113px"></th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(item, idx) in employees" :key="item.EmployeeId">
              <td>
                <input
                  type="checkbox"
                  class="table-check-box"
                  ref="checkbox"
                  :value="item.EmployeeId"
                  @click="checkedItem($event)"
                />
              </td>
              <td class="txt-left">{{ item.EmployeeCode }}</td>
              <td class="txt-left">{{ item.FullName }}</td>
              <td class="txt-left">{{ item.PhoneNumber }}</td>
              <td class="txt-left">{{ item.Email }}</td>
              <td class="txt-left">{{ item.Address }}</td>
              <td class="txt-center">
                {{ this.convertDOB(item.DateOfBirth) }}
              </td>
              <td class="txt-left">{{ item.Gender === 1 ? 'Nam' : 'Nữ' }}</td>
              <td class="txt-right">{{ this.convertSalary(item.Salary) }}</td>
              <td>
                <div class="table-tooltip">
                  <div class="table-tooltip-icon-edit">
                    <span
                      class="material-symbols-outlined"
                      @click="editEmployee(item, idx)"
                    >
                      edit
                    </span>
                  </div>
                  <div class="table-tooltip-icon-more">
                    <span class="material-symbols-outlined"> more_horiz </span>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="table-loading">
        <object data="./assets/loading.svg" type="image/svg+xml"></object>
      </div>

      <div class="table-footer">
        <div class="table-footer-total-item table-footer-left">
          <span
            >Tổng: <strong>{{ this.totalEmployees }}</strong></span
          >
        </div>
        <div class="table-footer-right">
          <div class="table-footer-total-page">
            <span>Số bản ghi/trang: 10</span>
            <span class="material-symbols-outlined"> expand_more </span>
          </div>
          <div class="table-footer-item-range">
            <span><strong>1</strong> - <strong>4</strong> bản ghi</span>
          </div>
          <div class="table-footer-icon">
            <span class="material-symbols-outlined"> arrow_back_ios </span>
            <span class="material-symbols-outlined"> arrow_forward_ios </span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Dialog ref="dialog"></Dialog>
  <Toast ref="toast"></Toast>
  <Modal ref="modal"></Modal>
</template>

<script>
import env from '../../env.js';
import axios from 'axios';

import Dialog from './Dialog.vue';
import Toast from './Toast.vue';
import Modal from './Modal.vue';

/* eslint-disable */
export default {
  name: 'Content',
  components: { Dialog, Toast, Modal },
  data() {
    return {
      checkedList: [],
    };
  },
  methods: {
    /**
     * Get all employee from api
     * Author: NLANH (06/12/2023)
     */
    getEmployees() {
      this.$store.dispatch('getEmployees');
    },

    /**
     * ADD employee
     * Author: NLANH (06/12/2023)
     */
    addEmployee() {
      // console.log(this.$refs.modal, this.$refs);
      this.$refs.modal.showModal('add');
    },

    /**
     * edit employee
     * Author: NLANH (06/12/2023)
     */
    editEmployee(employee, idx) {
      this.$refs.modal.showModal('edit', { data: employee, index: idx });
    },

    /**
     * Delete employee
     * Author: NLANH (06/12/2023)
     */
    deleteEmployees() {
      if (this.checkedList.length > 0) {
        this.$refs.dialog
          .showDialog('Thông báo', ['Bạn có chắc chắn muốn xóa'], 'question')
          .then((res) => {
            if (res) {
              this.checkedList.forEach((item) => {
                axios
                  .delete(`${env.ENDPOINT}/employees/${item}`, {
                    headers: {
                      Authorization: `Bearer ${this.$store.state.token}`,
                    },
                  })
                  .then((res) => {
                    this.$store.commit('DELETE_EMPLOYEE', item);
                  })
                  .then(() => {
                    this.checkedList = [];
                    this.$refs.toast.showToast();
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              });
            }
          });
      } else {
        this.$refs.dialog.showDialog(
          'Cảnh báo',
          ['Bạn chưa chọn bất kể item nào'],
          'warning'
        );
      }
    },

    /**
     * Convert datetime to date
     * Author: NLANH (06/12/2023)
     */
    convertDOB(dob) {
      try {
        let res = '';
        try {
          let date = new Date(dob);
          let d = date.getDate();
          let m = date.getMonth() + 1;
          let y = date.getFullYear();

          d = d < 10 ? `0${d}` : d;
          m = m < 10 ? `0${m}` : m;
          res = `${d}/${m}/${y}`;
        } catch (error) {
          console.log(error);
        }
        return res;
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Convert salary
     * Author: NLANH (06/12/2023)
     */
    convertSalary(salary) {
      try {
        if (salary == null) {
          return '';
        }
        return salary.toLocaleString('en', { useGrouping: true });
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Add all item to list prepare for delete
     * Author: NLANH (06/12/2023)
     */
    checkAllItems(e) {
      let lst = this.$refs.checkbox;
      this.checkedList = [];
      if (e.target.checked == true) {
        lst.forEach((item) => {
          this.checkedList.push(item.value);
          item.checked = true;
        });
      } else {
        lst.forEach((item) => {
          item.checked = false;
        });
      }
    },

    /**
     * add item to the list
     * Author: NLANH (06/12/2023)
     */
    checkedItem(e) {
      let index = this.checkedList.indexOf(e.target.value);
      if (e.target.checked) {
        if (index == -1) this.checkedList.push(e.target.value);
      } else {
        if (index > -1) this.checkedList.splice(index, 1);
      }
    },

    /**
     * Bỏ chọn tất cả item
     * Author: NLANH (06/12/2023)
     */
    unCheckAllItems(e) {
      let lst = this.$refs.checkbox;
      this.checkedList = [];
      lst.forEach((item) => {
        item.checked = false;
      });
      this.$refs.checkAll.checked = false;
    },

    login() {
      this.$store.dispatch('login');
    },
  },
  computed: {
    isSidebarOpen() {
      return this.$store.state.isSidebarOpen;
    },
    employees() {
      return this.$store.state.employees;
    },
    totalEmployees() {
      return this.$store.getters.totalEmployees;
    },
  },
  created() {
    // this.getEmployees();
  },
};
</script>

<style lang="css" scoped>
.content-width-full {
  width: calc(100vw - 200px);
}

.content-width-minimize {
  width: calc(100vw - 73px);
}

.content {
  background-color: var(--gray-1);
  /* width: calc(100vw - 200px); */
}

.content-nav {
  margin-bottom: 19px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.content-nav-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.content-title {
  font-size: 24px;
  font-weight: 700;
}

.table-container {
  background-color: #fff;
  max-width: 100%;
  box-sizing: border-box;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  font-size: 14px;
}

.table-main {
  /* display: none; */
  flex-grow: 1;
  max-height: calc(100vh - 267px);
  max-width: 100vw;
  overflow-y: auto;
  overflow-x: auto;
}

table {
  width: 100%;
  border-spacing: 0;
  border-collapse: collapse;
}

tbody {
  white-space: nowrap;
}

table {
  border: 1px solid #e0e0e0;
  border-top: none;
  border-radius: 4px;
}

tbody tr {
  border-bottom: 1px solid #e0e0e0;
}

/* tr {
  border-bottom: 1px solid #e0e0e0;
} */

thead {
  position: sticky;
  top: 0;
  background-color: #f5f5f5;
  box-shadow: inset 0 1px 0 #e0e0e0, inset 0 -1px 0 #e0e0e0;
  border-top-right-radius: 4px;
  border-top-left-radius: 4px;
}

th,
td {
  padding: 0 16px;
}

td {
  border: 1px solid #e0e0e0;
}

th {
  border-right: 1px solid #e0e0e0;
}

tr {
  height: 48px;
}

.table-tooltip {
  display: none;
  flex-direction: row;
  gap: 8px;
}

.table-tooltip-icon-edit,
.table-tooltip-icon-more {
  background-color: #fff;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
}

.table-tooltip-icon-edit:hover,
.table-tooltip-icon-more:hover {
  cursor: pointer;
}

tbody tr:hover {
  background-color: #f2f2f2;
}

tbody tr:hover .table-tooltip {
  display: flex;
}

.table-check-box {
  height: 24px;
  width: 24px;
  /* text-align: center; */
  /* display: flex; */
  /* justify-content: center; */
  /* align-items: center; */
}
.table-footer,
.table-footer-total-page,
.table-footer-icon,
.table-footer-right {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.table-footer {
  justify-content: space-between;
  height: 48px;
  padding: 0 16px;
  background-color: #f5f5f5;
  border: 1px solid #e0e0e0;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
}

.table-footer-total-page,
.table-footer-item-range {
  margin-right: 16px;
}

.table-nav {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  justify-content: space-between;
}

.table-nav-right {
  display: flex;
  align-items: center;
  gap: 12px;
  /* justify-content: flex-end; */
}

.table-nav-left {
  display: flex;
  gap: 12px;
  align-items: center;
}

.table-loading {
  display: none;
  /* display: flex; */
  height: calc(100vh - 267px);
  justify-content: center;
  align-items: center;
}
</style>
