// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  timeout: 2500,
  API_URL: 'https://api.inncyst.com',
  API_VERSION: 'api',
  LS_CONFIG_ENCRYPT: true,
  MSG_TIMEOUT: 2000,
  API_TIMEOUT: 300000,
  ERROR_REDIRECT: true,
  WHATSAPP_NUMBER: 8918882380,
  auth: {
    domain: 'dev-inncyst.us.auth0.com',
    clientId: 'T30L4gAR1jqpRZMgDOk0CcuGQRpnlh12',
    scope: 'openid profile email read:users',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
