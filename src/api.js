import { API_URL } from './config';

export const apiFetch = (url, options = {}) => {
    const defaults = {
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const fullUrl = url.startsWith('http') ? url : `${API_URL}${url}`;

    if (options.body && typeof options.body === 'object' && !(options.body instanceof FormData)) {
        options.body = JSON.stringify(options.body);
    }

    return fetch(fullUrl, { ...defaults, ...options });
};
