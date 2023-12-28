import Keycloak from 'keycloak-js';

let initOptions = {
    url: 'http://localhost:8081',
    realm: 'test',
    clientId: 'cukcuk-spring-boot',
    onLoad: 'login-required',
    enableLogging: true,
    // checkLoginIframe: false,
    // redirectUri: location.origin,
};

let keycloak = new Keycloak(initOptions);

export default keycloak;