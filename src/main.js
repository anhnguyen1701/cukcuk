import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import keycloak from './keycloak'


keycloak.init({ onLoad: 'check-sso' })
    .then((auth) => {
        if (auth) {
            store.commit('SET_TOKEN', keycloak.token);
            store.commit('SET_REFRESH_TOKEN', keycloak.refreshToken);
            store.dispatch('getEmployees');
            console.log('Login successful');
        } else {
            console.log('Not authenticated');
        }
        store.commit('SET_AUTH', keycloak.authenticated);
    })
    .catch((err) => { console.log(err); })

setInterval(() => {
    console.log('auth status:', keycloak.authenticated);
}, 1000);

const app = createApp(App)
app.use(store);
app.mount('#app');
