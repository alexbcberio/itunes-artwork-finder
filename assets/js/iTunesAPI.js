class iTunesAPI {

    static get apiUrl() {
        return "https://itunes.apple.com/search";
    }

    static get loader() {
        let loader = document.createElement("div");
        loader.id = "loader";

        for (let i = 0; i < 4; i++) {
            loader.appendChild(document.createElement("span"));
        }

        return loader;
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

    static removeLoader() {
        if (document.getElementById("loader")) {
            document.getElementById("loader").remove();
        }
    }

    constructor(target) {
        this.target = target;
    }

    search(formData) {
        this.target.innerHTML = null;

        if (!iTunesAPI.isOnline) {
            iTunesAPI.noNetwork();

        } else if (!formData.get("term")) {
            iTunesAPI.noTerm();

        } else {
            this.target.appendChild(iTunesAPI.loader);
            this.fetch(formData)
            .then(json => this.showCollection(json))
            .catch(error => iTunesAPI.prototype.manageApiError(error));
        }
    }

    manageApiError(error) {
        iTunesAPI.removeLoader();

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
                break;
        }

    }

    fetch(formData) {
        return new Promise(function (resolve, reject) {
            let URI = `${iTunesAPI.apiUrl}?term=${formData.get("term")}&country=${formData.get("country")}&media=${formData.get("media")}&entity=${formData.get("entity")}&limit=${formData.get("limit")}`;

            fetch(URI)
            .then(response => {
                if (response.ok) {
                    response.text()
                    .then(body => {
                        resolve(JSON.parse(body));
                    });

                } else {
                    reject({
                        type: "httpError",
                        httpStatus: response.status,
                        httpResponse: response.statusText
                    });
                }

            }).catch(exception => {
                reject({
                    type: "exception",
                    exception: exception
                });
            });
        });
    }

    showCollection(collection) {
        iTunesAPI.removeLoader();

        if (collection.resultCount == 0) {
            iTunesAPI.notFound();

        } else {
            collection.results.forEach(collectionElement => {
                this.displayResult(collectionElement);
            });
        }
    }

    displayResult(collectionElement) {
        let element = document.createElement("div");
        element.classList.add("collectionElement");

        let name = document.createElement("p");
        name.classList.add("collection-name")
        name.innerText = collectionElement.collectionName;

        let downloadLinks = document.createElement("div");
        downloadLinks.classList.add("albumart-download-links")

        let mediumDownloadLink = document.createElement("a");
        mediumDownloadLink.classList.add("albumart-download-link");
        mediumDownloadLink.href = collectionElement.artworkUrl60.replace("60x60", "500x500");
        mediumDownloadLink.target = "_blank";
        mediumDownloadLink.setAttribute("download", "medium.jpg");
        mediumDownloadLink.setAttribute("data-locale-position", "text");
        mediumDownloadLink.setAttribute("data-locale-value", "iTunes-search.download-image.standard-resolution");
        mediumDownloadLink.innerText = locale.get("iTunes-search.download-image.standard-resolution");

        let largeDownloadLink = document.createElement("a");
        largeDownloadLink.classList.add("albumart-download-link");
        largeDownloadLink.href = collectionElement.artworkUrl60.replace("60x60", "5000x5000");
        largeDownloadLink.target = "_blank";
        largeDownloadLink.setAttribute("download", "large.jpg");
        largeDownloadLink.setAttribute("data-locale-position", "text");
        largeDownloadLink.setAttribute("data-locale-value", "iTunes-search.download-image.hight-resolution");
        largeDownloadLink.innerText = locale.get("iTunes-search.download-image.hight-resolution");

        let albumArt = document.createElement("img");
        albumArt.classList.add("albumart");
        albumArt.src = collectionElement.artworkUrl60.replace("60x60", "500x500");

        element.appendChild(name);
        element.appendChild(downloadLinks);
        element.appendChild(albumArt);

        downloadLinks.appendChild(mediumDownloadLink);
        downloadLinks.appendChild(largeDownloadLink);

        this.target.appendChild(element);
    }
}
