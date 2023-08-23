export interface UrlConfig {
    isDashboard: boolean;
    isDisable: boolean;
  }
  
  export const urlConfig: { [url: string]: UrlConfig } = {
    '/dashboard': { isDashboard: false, isDisable: false },
    '/industry/jobs': { isDashboard: false, isDisable: false },
    '/industry/reports': { isDashboard: false, isDisable: false },
    '/industry': { isDashboard: false, isDisable: false },
    '/registration': { isDashboard: false, isDisable: false },
    '/industry/jobs/add-job':{isDashboard: false, isDisable: false}
  };