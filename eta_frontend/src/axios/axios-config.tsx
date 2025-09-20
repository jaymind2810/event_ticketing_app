import axios from "axios";


export const baseURL = import.meta.env.VITE_APP_API_URL

axios.interceptors.request.use(
  (config) => {
    // ** Get token from localStorage
    const accessToken = localStorage.getItem("token");
    // ** If token is present add it to request's Authorization Header
    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;

    if (response && response.data && response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
    }
    return Promise.reject(error);
  }
);

const SetLoader = (shouldShow: boolean, status: boolean) => {
  /* Todo: set global processing loader true or false */
  // if (shouldShow) {
  //     store.dispatch(setProcessing(status));
  // }
};

export const axiosPost = (
  url: string,
  data: any = {},
  params: any = {},
  shouldProcess: boolean = false
) => {
  SetLoader(shouldProcess, true);
  return axios
    .post(baseURL + url, data, { params })
    .then((res) => {
      SetLoader(shouldProcess, false);
      return res;
    })
    .catch((error) => {
      SetLoader(shouldProcess, false);
      return error.response;
    });
};

export const axiosGet = (
  url: string,
  params: any = {},
  shouldProcess: boolean = false
) => {
  SetLoader(shouldProcess, true);
  return axios
    .get(baseURL + url, { params })
    .then((res) => {
      SetLoader(shouldProcess, false);
      return res;
    })
    .catch((error) => {
      SetLoader(shouldProcess, false);
      return error.response;
    });
};

export const axiosPut = (
  url: string,
  data: any = {},
  params: any = {},
  shouldProcess: boolean = false
) => {
  SetLoader(shouldProcess, true);
  return axios
    .put(baseURL + url, data, { params })
    .then((res) => {
      SetLoader(shouldProcess, false);
      return res;
    })
    .catch((error) => {
      SetLoader(shouldProcess, false);
      return error.response;
    });
};

export const axiosPatch = (
  url: string,
  data: any = {},
  params: any = {},
  shouldProcess: boolean = false
) => {
  SetLoader(shouldProcess, true);
  return axios
    .patch(baseURL + url, data, { params })
    .then((res) => {
      SetLoader(shouldProcess, false);
      return res;
    })
    .catch((error) => {
      SetLoader(shouldProcess, false);
      return error.response;
    });
};

export const axiosDelete = (
  url: string,
  data: any = {},
  params: any = {},
  shouldProcess: boolean = false
) => {
  SetLoader(shouldProcess, true);
  return axios
    .delete(baseURL + url, { params, data })
    .then((res) => {
      SetLoader(shouldProcess, false);
      return res;
    })
    .catch((error) => {
      SetLoader(shouldProcess, false);
      return error.response;
    });
};

export default axios;
