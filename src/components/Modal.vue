<template>
  <div class="modal" id="modal" v-show="isShow">
    <div class="modal-container">
      <div class="modal-header">
        <span class="modal-title">Thông tin nhân viên</span>
        <span
          class="material-symbols-outlined modal-close"
          id="close_modal_icon"
          @click="closeModal"
        >
          close
        </span>
      </div>
      <form id="form" class="modal-form c-row">
        <div class="c-col col-group">
          <div class="c-row row-group-1">
            <div class="c-col col-1">
              <div class="c-row row-1">
                <label class="text-field">
                  <span class="modal-form-label">Mã nhân viên</span>
                  <input
                    name="manhanvien"
                    id="form_manhanvien_input"
                    class="text-field-input"
                    type="text"
                    v-model="item.EmployeeCode"
                  />
                  <span
                    class="text-field-message-error"
                    v-if="errorObj.hasOwnProperty('EmployeeCode')"
                    >{{ errorObj.EmployeeCode }}</span
                  >
                </label>
                <label class="text-field">
                  <span class="modal-form-label">Tên nhân viên</span>
                  <input
                    name="tennhanvien"
                    id="form_tennhanvien_input"
                    class="text-field-input"
                    type="text"
                    v-model="item.FullName"
                  />
                  <span
                    class="text-field-message-error"
                    v-if="errorObj.hasOwnProperty('FullName')"
                  >
                    {{ errorObj.FullName }}</span
                  >
                </label>
              </div>
              <div class="c-row row-3">
                <label class="text-field">
                  <span class="modal-form-label">Số CMND</span>
                  <input class="text-field-input" type="text" />
                </label>
                <label class="text-field">
                  <span class="modal-form-label">Ngày cấp</span>
                  <input class="text-field-input" type="date" />
                </label>
              </div>
              <label class="dropdown">
                <span> Phòng ban </span>
                <select name="phongban" class="dropdown-select">
                  <option>Công nghệ</option>
                  <option>Kê toán</option>
                </select>
              </label>
            </div>
            <div class="c-col col-2">
              <div class="c-row row-2">
                <label class="text-field">
                  <span class="modal-form-label">Ngày sinh</span>
                  <input
                    name="DateOfBirth"
                    class="text-field-input"
                    type="date"
                    v-model="item.DateOfBirth"
                  />
                </label>
                <div class="radio-btn">
                  <span class="radio-title">Giới tính</span>
                  <div class="radio-select">
                    <div class="radio-select-item">
                      <input
                        type="radio"
                        name="Gender"
                        class="radio-select-item-input"
                        value="1"
                        v-model="item.Gender"
                      />
                      <label for="">Nam</label>
                    </div>
                    <div class="radio-select-item">
                      <input
                        type="radio"
                        name="Gender"
                        class="radio-select-item-input"
                        value="2"
                        v-model="item.Gender"
                      />
                      <label for="">Nữ</label>
                    </div>
                    <div class="radio-select-item">
                      <input
                        type="radio"
                        name="Gender"
                        class="radio-select-item-input"
                        value="0"
                        v-model="item.Gender"
                      />
                      <label for="">Khác</label>
                    </div>
                  </div>
                </div>
              </div>
              <label class="text-field">
                <span class="modal-form-label">Nơi cấp</span>
                <input class="text-field-input" type="text" />
              </label>
              <label class="dropdown">
                <span> Vị trí </span>
                <select name="vitri" class="dropdown-select">
                  <option>Nhân viên</option>
                  <option>Giám đốc</option>
                </select>
              </label>
            </div>
          </div>

          <div class="c-row row-4">
            <label class="text-field">
              <span class="modal-form-label">Email</span>
              <input
                name="email"
                class="text-field-input"
                type="text"
                v-model="item.Email"
              />
              <span
                class="text-field-message-error"
                v-if="errorObj.hasOwnProperty('Email')"
              >
                {{ errorObj.Email }}</span
              >
            </label>
            <label class="text-field">
              <span class="modal-form-label">Số điện thoại</span>
              <input
                name="sodienthoai"
                class="text-field-input"
                type="text"
                v-model="item.PhoneNumber"
              />
              <span
                class="text-field-message-error"
                v-if="errorObj.hasOwnProperty('PhoneNumber')"
              >
                {{ errorObj.PhoneNumber }}</span
              >
            </label>
            <label class="text-field">
              <span class="modal-form-label">Địa chỉ</span>
              <input
                name="Address"
                class="text-field-input"
                type="text"
                v-model="item.Address"
              />
            </label>
          </div>

          <div class="c-row row-5">
            <label class="text-field">
              <span class="modal-form-label">Mức lương</span>
              <input
                name="mucluong"
                class="text-field-input"
                type="text"
                v-model="item.Salary"
              />
              <span
                class="text-field-message-error"
                v-if="errorObj.hasOwnProperty('Salary')"
              >
                {{ errorObj.Salary }}</span
              >
            </label>
            <label class="text-field">
              <span class="modal-form-label">Ngày gia nhập công ty</span>
              <input
                class="text-field-input"
                type="date"
                v-model="item.JoinDate"
              />
            </label>
            <label class="dropdown">
              <span> Tình trạng công việc </span>
              <select name="tinhtrangcongviec" class="dropdown-select">
                <option>Đang làm</option>
                <option>Nghỉ làm</option>
              </select>
            </label>
          </div>

          <div class="c-row row-6">
            <button
              id="btn_cancel_modal"
              class="btn-secondary"
              type="button"
              @click="closeModal"
            >
              Hủy
            </button>
            <button
              id="form_btn_add"
              class="btn"
              type="submit"
              @click.prevent="addEmployee"
              v-if="this.type === 'add'"
            >
              Cất
            </button>
            <button
              id="form_btn_add"
              class="btn"
              type="submit"
              @click.prevent="editEmployee"
              v-if="this.type === 'edit'"
            >
              Lưu
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
  <Dialog ref="dialog"></Dialog>
</template>

<script>
import axios from 'axios';
import env from '../../env';

import Dialog from './Dialog.vue';

/* eslint-disable */
export default {
  name: 'Modal',
  components: { Dialog },
  data() {
    return {
      isShow: false,

      item: {},
      type: '',
      errorList: [],
      errorObj: {},

      originItem: {},
      itemIndex: -1,
    };
  },
  methods: {
    showModal(type, payload) {
      this.type = type;
      this.isShow = true;
      this.errorObj = {};
      this.errorList = [];
      this.item = {};

      if (this.type == 'edit') {
        this.item = payload.data;
        this.originItem = { ...payload.data };
        this.itemIndex = payload.index;
      }
    },
    closeModal() {
      this.isShow = false;
    },
    addEmployee(e) {
      try {
        if (this.validateEmployee()) {
          axios
            .post(`${env.ENDPOINT}/employees`, this.item, {
              headers: {
                Authorization: `Bearer ${this.$store.state.token}`,
              },
            })
            .then((res) => {
              console.log(res);
              this.$store.commit('ADD_EMPLOYEE', res.data);
              this.$refs.dialog
                .showDialog('Thông báo', ['Thêm'], '', res.status)
                .then((res) => {
                  this.closeModal();
                });
            })
            .catch((err) => {
              console.log(err);
              this.$refs.dialog.showDialog('Thông báo', [err.message], 'error');
            });
        } else {
          //show dialog with error
          this.$refs.dialog.showDialog('Thông báo', this.errorList, 'error');
        }
      } catch (error) {
        this.$refs.dialog.showDialog('Thông báo', [error.message], 'error');
        console.log(error);
      }
    },
    editEmployee(e) {
      try {
        // validate
        const isEqual =
          JSON.stringify(this.item) == JSON.stringify(this.originItem);
        if (isEqual) {
          this.$refs.dialog.showDialog(
            'Thông báo',
            ['Bạn chưa thay đổi bất kỳ dữ liệu nào'],
            'info'
          );
        } else {
          if (this.validateEmployee()) {
            axios
              .put(
                `${env.ENDPOINT}/employees/${this.item.EmployeeId}`,
                this.item,
                {
                  headers: {
                    Authorization: `Bearer ${this.$store.state.token}`,
                  },
                }
              )
              .then((res) => {
                this.$store.commit('EDIT_EMPLOYEE', {
                  data: this.item,
                  index: this.itemIndex,
                });
                this.$refs.dialog
                  .showDialog('Thông báo', ['Sửa'], '', res.status)
                  .then((res) => {
                    this.closeModal();
                  });
              })
              .catch((err) => {
                console.log(err);
                this.$refs.dialog.showDialog(
                  'Thông báo',
                  [err.message],
                  'error'
                );
              });
          } else {
            this.$refs.dialog.showDialog('Thông báo', this.errorList, 'error');
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
    validateEmployee() {
      try {
        let {
          EmployeeCode,
          FullName,
          DateOfBirth,
          Gender,
          PhoneNumber,
          IdentityNumber,
          IdentityDate,
          Email,
          IdentityPlace,
          Salary,
          DepartmentName,
          Address,
        } = this.item;
        this.errorObj = {};
        this.errorList = [];

        if (!this.isValidString(EmployeeCode)) {
          // this.errorObj.EmployeeCode = [];
          // this.errorObj.EmployeeCode.push('Không được để trống Mã nhân viên');
          this.errorObj.EmployeeCode = 'Không được để trống Mã nhân viên';
          this.errorList.push('Không được để trống Mã nhân viên');
        }

        if (!this.isValidString(FullName)) {
          // this.errorObj.FullName = [];
          // this.errorObj.FullName.push('Không được để trống Họ và tên');
          this.errorObj.FullName = 'Không được để trống Họ và tên';
          this.errorList.push('Không được để trống Họ và tên');
        }

        // if (this.isValidString(Email)) {
        //   // // this.errorObj.Email = [];
        //   // // this.errorObj.Email.push('Không được để trống Email');
        //   // this.errorObj.Email = 'Không được để trống Email';
        //   // this.errorList.push('Không được để trống Email');
        // }

        if (this.isValidString(Email) && !this.isValidEmail(Email)) {
          // this.errorObj.Email = [];
          // this.errorObj.Email.push('Email không hợp lệ');

          this.errorObj.email = 'Email không hợp lệ';
          this.errorList.push('Email không hợp lệ');
        }

        if (
          this.isValidString(PhoneNumber) &&
          !this.isValidPhoneNumber(PhoneNumber)
        ) {
          this.errorObj.PhoneNumber = 'Số điện thoại không hợp lệ';
          this.errorList.push('Số điện thoại không hợp lệ');
        }

        if (this.isValidString(Salary) && !this.isValidSalary(Salary)) {
          this.errorObj.Salary = 'Tiền lương không hợp lệ';
          this.errorList.push('Tiền lương không hợp lệ');
        }

        return this.errorList.length == 0;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    isValidString(test) {
      if (test == null) return false;
      else if (test == undefined) return false;
      else if (test == '') return false;
      return true;
    },
    isValidEmail(email) {
      let atIndex = email.indexOf('@');
      if (atIndex === -1 || atIndex !== email.lastIndexOf('@')) {
        return false;
      }

      let dotIndex = email.lastIndexOf('.');
      if (
        dotIndex === -1 ||
        dotIndex < atIndex + 2 ||
        dotIndex === email.length - 1
      ) {
        return false;
      }

      return true;
    },
    isValidPhoneNumber(phone) {
      let regex = /^\d{10}$/;
      return regex.test(phone);
    },
    isValidSalary(salary) {
      let regex = /^[0-9]+$/;
      return regex.test(salary);
    },
  },
  created() {},
};
</script>

<style lang="css">
.modal {
  z-index: 1;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-container {
  position: relative;
  background-color: #fff;
  padding: 32px;
  width: 60%;
  min-width: 850px;
  top: 10%;
  margin: auto;
  border-radius: 4px;
  overflow: auto;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 32px;
}

.modal-title {
  display: block;
  font-size: 24px;
  font-weight: 700;
}

.modal-close {
  color: red;
  cursor: pointer;
}

.modal-form-label {
  font-weight: 500;
}

.c-col {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.c-row {
  display: flex;
  flex-direction: row;
}

.row-1,
.row-2,
.row-3,
.row-4,
.row-5,
.row-6 {
  gap: 12px;
}

.row-group-1 {
  gap: 16px;
}

.row-6 {
  justify-content: end;
}

.col-group,
.col-1,
.col-2 {
  gap: 12px;
}

.row-6 {
  margin-top: 20px;
}
</style>
