class Locale {
    static get availableLocales() {
        return [
            "en",
            "es",
            "eu",
        ];
    }

    static get defaultLocale() {
        return "en";
    }

    static get userLocales() {
        let userLocales = navigator.languages;
        let locales = [];

        for (let i in navigator.languages) {
            if (userLocales[i].length == 2) {
                locales.push(userLocales[i]);
            }
        }

        return locales;
    }

    static get firstMatchLocale() {
        let locales = this.userLocales;

        for (let i in locales) {
            if (this.availableLocales.indexOf(locales[i]) > -1) {
                return locales[i];
            }
        }

        return this.defaultLocale;
    }

    constructor(localeCode) {
        if (!localeCode) {
            throw new Error("Locale code must be specified");

        } else if (localeCode.length != 2) {
            throw new Error("Locale code must meet ISO 3166");
        }

        this.code = localeCode;

        this.getTerms()
        .then(status => {
            if (status) {
                this.updateTexts();
            } else {
                // ko
            }
        });
    }

    getTerms() {
        return new Promise((resolve) => {
            fetch("/locales/" + this.code + ".json")
            .then(response => {
                if (response.ok) {
                    return response.text()
                } else {
                    let error = new Error();
                    error.name = "httpError";
                    error.status = response.status;
                    error.statusText = response.statusText;
                    throw error;
                }
            })
            .then(text => {
                this.terms = JSON.parse(text);
                resolve(true);
            })
            .catch(e => {
                if (e.name == "httpError") {
                    swal({
                        "title": "Error getting the locales",
                        "text": "The server responded with a " + e.status + ", " + e.statusText + ".",
                        "icon": "error"
                    });
                }

                resolve(false);
            });
        });
    }

    updateTexts() {
        let items = document.querySelectorAll("[data-locale-value]");

        items.forEach(item => {
            let value = item.getAttribute("data-locale-value");
            let position = item.getAttribute("data-locale-position").toLowerCase();

            if (position == "text") {
                item.innerText = this.get(value);

            } else {
                item.setAttribute(position, this.get(value));
            }
        });
    }

    get(name, variables) {
        let term = this.terms["terms"];
        let nameParts = name.split(".");

        if (name == "code") {
            return this.code;

        } else if (name == "language") {
            return this.language;
        }

        try {
            for(let i = 0; i < nameParts.length; i++) {
                term = term[nameParts[i]];
            }

            if (variables && typeof variables === "object") {
                for (let name in variables) {
                    term = term.replace("%" + name + "%", variables[name])
                }
            }

        } catch (e) {
            term = name
        }

        return term;
    }
}
