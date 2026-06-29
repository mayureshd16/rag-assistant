export const API_CONFIG = {

    BASE_URL: import.meta.env.VITE_API_URL,

    REQUEST_TIMEOUT: 60000,

    MAX_FILE_SIZE: 25 * 1024 * 1024

};

export const API_ENDPOINTS = {

  UPLOAD: "/upload",

  QUERY: "/query",

  HEALTH: "/health"

};

export const REQUEST_TIMEOUT = 60000;