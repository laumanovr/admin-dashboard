import axios from 'axios';

const BASE_URL = 'https://test-api.mybimiboo.dev/api';

export const sendGetRequest = (url) => sendRequest('GET', url);

export const sendPostRequest = (url, data) => sendRequest('POST', url, data);

export const sendPutRequest = (url, data) => sendRequest('PUT', url, data);

export const sendPatchRequest = (url, data) => sendRequest('PATCH', url, data);

export const sendDeleteRequest = (url, data) => sendRequest('DELETE', url, data);

const sendRequest = async (method, finalUrl, data) => {
	const url = `${BASE_URL}/${finalUrl}`;
	const isFormData = data instanceof FormData;
	const config = {
		method,
		url,
		headers: {
			'Content-Type': !isFormData ? 'application/json' : ''
		}
	};
	if (data) {
		config.data = isFormData ? data : JSON.stringify(data);
	}
	try {
		const res = await axios(config);
		return res.data;
	} catch (err) {
	  debugger;
		return Promise.reject(err?.response?.data?.message);
	}
};
