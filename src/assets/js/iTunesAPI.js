import swal from "sweetalert";

let i18n;
const locale = {
    get: (term, vars) => {
        term = term.split(".");
        let msg = i18n.messages[i18n.locale].terms;

        for (let t of term) {
            msg = msg[t];
        }

        for (let v in vars) {
            msg = msg.replace(`%${v}%`, vars[v]);
        }

        return msg;
    }
}

export default class iTunesAPI {

    static get apiUrl() {
        return "https://itunes.apple.com/search";
    }

    static get isOnline() {
        return navigator.onLine;
    }

    static noNetwork() {
        swal({
            title: locale.get("iTunes-search.errors.no-network.title"),
            text: locale.get("iTunes-search.errors.no-network.text"),
            icon: "error"
        });
    }

    static noTerm() {
        swal({
            title: locale.get("iTunes-search.errors.no-term.title"),
            text: locale.get("iTunes-search.errors.no-term.text")
        }).then(function () {
            document.getElementsByName("term")[0].focus();
        });
    }

    static notFound() {
        swal({
            title: locale.get("iTunes-search.errors.not-found.title"),
            text: locale.get("iTunes-search.errors.not-found.text"),
            info: "info"
        }).then(function () {
            document.getElementsByName("term")[0].focus();
        });
    }

    async search(formData) {

        if (!iTunesAPI.isOnline) {
            iTunesAPI.noNetwork();

        } else if (!formData.get("term")) {
            iTunesAPI.noTerm();

        } else {
            try {
                let result = await this.fetch(formData);

                return result;
            } catch (e) {
                this.manageApiError(e);
            }
        }
    }

    constructor($i18n) {
         i18n = $i18n;
    }

    manageApiError(error) {
        switch(error.type) {
            case "exception":
                swal({
                    title: "Error",
                    text: locale.get("iTunes-search.errors.exception", {
                        "exceptionMsg": error.exception.message
                    }),
                    icon: "error",
                });
                break;

            case "httpError":
                swal({
                    title: "Error " + error.httpStatus,
                    text: locale.get("iTunes-search.errors.httpError",{
                        "httpStatus": error.httpStatus,
                        "httpResponse": error.httpResponse
                    }),
                    icon: "error"
                });
                break;

            default:
                console.error(error);
        }

    }

    async fetch(formData) {
        let URI = `${iTunesAPI.apiUrl}?term=${formData.get("term")}&country=${formData.get("country")}&media=${formData.get("media")}&entity=${formData.get("entity")}&limit=${formData.get("limit")}`;

        try {
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
        } catch (e) {
            throw e;
        }
    }
}
