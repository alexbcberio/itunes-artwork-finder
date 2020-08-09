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
            return await this.fetch(formData, {
                mode: "no-cors"
            });
        }
    }

    async fetch(formData) {
        let URI = `${this.constructor.apiEndpoint}?term=${formData.get("term")}&country=${formData.get("country")}&media=${formData.get("media")}&entity=${formData.get("entity")}&limit=${formData.get("limit")}`;

        let response = await fetch(URI);

        if (response.ok) {
            let json = await response.json();

            return json;

        } else {
            throw {
                type: "httpError",
                httpStatus: response.status,
                httpResponse: response.statusText
            };
        }

    }
}
