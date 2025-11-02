import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

let isRefreshing = false;
let refreshSubscribers = [];

// Helper: notify all queued requests after refresh
function onRefreshed() {
  refreshSubscribers.forEach(callback => callback());
  refreshSubscribers = [];
}

axiosInstance.interceptors.response.use(
  response => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // If already refreshing, wait for it to complete
      if (isRefreshing) {
        return new Promise((resolve) => {
          refreshSubscribers.push(() => {
            resolve(axiosInstance(originalRequest));
          });
        });
      }

      // Begin refresh
      isRefreshing = true;
      try {
        await axiosInstance.post("/auth/refresh", {}, {
          withCredentials: true,
        });

        isRefreshing = false;
        onRefreshed(); // Retry all queued requests
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        isRefreshing = false;
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;



