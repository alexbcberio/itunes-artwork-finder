import NoNetworkException from "../exception/NoNetworkException";
import NoTermException from "../exception/NoTermException";

export default class iTunesAPI {

    static get apiEndpoint() {
        return "https://itunes.apple.com/search";
    }

    static get isOnline() {
        return navigator.onLine;
    }

    constructor() {

    }

    async search(formData) {
        if (!this.constructor.isOnline) {
            throw new NoNetworkException();
        } else if (!formData.get("term")) {
            throw new NoTermException();
        } else {
            return await this.fetch(formData);
        }
    }

    async fetch(formData) {
        let URI = `${this.constructor.apiEndpoint}?`;
        for (const key of formData.keys()) {
            if (key && formData.get(key)) {
                URI += `${key}=${formData.get(key)}&`;
            }
        }

        const response = await fetch(URI);

        if (response.ok) {
            return await response.json();

        } else {
            throw {
                type: "httpError",
                httpStatus: response.status,
                httpResponse: response.statusText
            };
        }
    }

}
