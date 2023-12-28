import { createStore } from 'vuex';
import axios from 'axios';
import env from '../../env';

const storeData = {
    state: {
        isSidebarOpen: true,
        employees: [],
        token: "",
        refreshToken: "",
        isAuth: false
    },
    getters: {
        totalEmployees(state) {
            return state.employees.length;
        }
    },
    actions: {
        getEmployees({ commit, state }) {
            try {
                axios.get(`${env.ENDPOINT}/Employees`, {
                    headers: {
                        'Authorization': `Bearer ${state.token}`,
                    }
                })
                    .then((res) => {
                        let data = res.data.sort((a, b) => new Date(b.CreatedDate) - new Date(a.CreatedDate));
                        commit('SET_EMPLOYEES', data);
                        console.log("get employees");
                    }).catch((err) => {
                        alert(err.message);
                        console.log(err);
                    });
            } catch (error) {
                alert(error.message);
                console.log(error);
            }
        },
        login({ dispatch, commit }) {
            try {
                const data = new URLSearchParams();
                data.append('client_id', 'cukcuk-spring-boot');
                data.append('client_secret', 'glic1MZw7dU0HBsASwlMmEAJLEB1glpz');
                data.append('grant_type', 'password');
                data.append('username', 'user');
                data.append('password', 'user');


                axios.post('http://localhost:8081/realms/test/protocol/openid-connect/token'
                    , data.toString()
                    , {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    }
                ).then((res) => {
                    alert("login successful");
                    console.log(res);
                    commit('SET_TOKEN', res.data.access_token);
                    commit('SET_REFRESH_TOKEN', res.data.refresh_token);
                    dispatch("getEmployees");
                });
            } catch (error) {
                console.log(error);
            }
        },
        loginAsAdmin({ dispatch, commit }) {
            try {
                const data = new URLSearchParams();
                data.append('client_id', 'cukcuk-spring-boot');
                data.append('client_secret', 'glic1MZw7dU0HBsASwlMmEAJLEB1glpz');
                data.append('grant_type', 'password');
                data.append('username', 'admin');
                data.append('password', 'admin');


                axios.post('http://localhost:8081/realms/test/protocol/openid-connect/token'
                    , data.toString()
                    , {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    }
                ).then((res) => {
                    alert("login as admin successful");
                    console.log(res);
                    commit('SET_TOKEN', res.data.access_token);
                    commit('SET_REFRESH_TOKEN', res.data.refresh_token);
                    dispatch("getEmployees");
                });
            } catch (error) {
                console.log(error);
            }
        },
        logout({ state, commit }) {
            try {
                const data = new URLSearchParams();
                data.append('client_id', 'cukcuk-spring-boot');
                data.append('client_secret', 'glic1MZw7dU0HBsASwlMmEAJLEB1glpz');
                data.append('refresh_token', state.refreshToken);


                axios.post('http://localhost:8081/realms/test/protocol/openid-connect/logout'
                    , data.toString()
                    , {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    }
                ).then((res) => {
                    alert("log out");
                    console.log(res);
                    commit('SET_REFRESH_TOKEN', '');
                    commit('SET_EMPLOYEES', []);
                });
            } catch (error) {
                console.log(error);
            }
        }
    },
    mutations: {
        SET_SIDEBAR(state, isSidebarOpen) {
            state.isSidebarOpen = isSidebarOpen;
        },
        SET_EMPLOYEES(state, employees) {
            state.employees = employees;
        },
        DELETE_EMPLOYEE(state, deletedEmployeeId) {
            state.employees = state.employees.filter((employee) => {
                return employee.EmployeeId != deletedEmployeeId
            });
        },
        ADD_EMPLOYEE(state, employee) { //eslint-disable-line
            console.log(employee);
            state.employees.push(employee);
        },
        EDIT_EMPLOYEE(state, payload) { //eslint-disable-line
            let { data, index } = payload;
            state.employees[index] = data;
        },
        SET_TOKEN(state, token) {
            state.token = token;
        },
        SET_REFRESH_TOKEN(state, token) {
            state.refreshToken = token;
        },
        SET_AUTH(state, data) {
            state.isAuth = data;
        }
    }
}

const store = new createStore(storeData);

export default store;