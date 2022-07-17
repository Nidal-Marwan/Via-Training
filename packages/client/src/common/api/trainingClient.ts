import axios, { AxiosRequestConfig } from "axios";

export const trainingClient = axios.create({
	baseURL: "http://localhost:3002/api",
});

trainingClient.interceptors.request.use(async (config: AxiosRequestConfig) => {
	const token = window.localStorage.getItem("access_token");
	if (token) {
		config.headers = {
			Authorization: `Bearer ${token}`
		};
	}
	return config;
}, error => Promise.reject(error));
