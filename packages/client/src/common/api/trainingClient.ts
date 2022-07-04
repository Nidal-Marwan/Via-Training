import axios, { AxiosRequestConfig } from "axios";

export const trainingClient = axios.create({
	baseURL: "http://localhost:3001/api",
});

trainingClient.interceptors.request.use(async (config: AxiosRequestConfig) => {
	if (config.url?.includes("user") || config.url?.includes("locations")) {
		const token = window.localStorage.getItem("access_token");
		config.headers!.Authorization = `Bearer ${token}`;
	}
	return config;
}, error => Promise.reject(error));
