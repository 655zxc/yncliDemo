export const LOG = {
  LEVEL: process.env.VUE_APP_LOG_LEVEL
    ? Number(process.env.VUE_APP_LOG_LEVEL)
    : 1 // 0: NONE, 1: Error, 2: Warn, 3: Info, 4: Log
};
export const APPS = {
  LANGUAGE: "" // empty means use default language. English language code is en.
};
export const BACKEND = {
  NAME: "YN",
  BASE_URL: "/application/"
  // BASE_URL: "http://localhost/application/"





  //原本
  // BASE_URL: "http://localhost:3000/application/"
};
