const ITUNES_API = "https://itunes.apple.com/search";

document.getElementById("loader").classList.remove("hidden");
const LOADER = document.getElementById("loader").outerHTML;
document.getElementById("loader").innerHTML = null;

document.addEventListener("DOMContentLoaded", init);

function init() {
    let form = document.getElementById("search-iTunes");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        let formData = new FormData(form);

        if (!navigator.onLine) {
            noNetwork();

        } else if (formData.get("term")) {
            document.getElementById("response").innerHTML = LOADER;

            search(formData)
            .then(json => {
                showCollection(json);

            }).catch(error => {

                switch(error.type) {
                    case "exception":
                        swal({
                            title: "Error",
                            text: "Ocurrió un error al realizar la búsqueda: " + error.exception.message,
                            icon: "error",
                        });
                        break;

                    case "httpError":
                        swal({
                            title: "Error " + error.httpStatus,
                            text: "El servidor respondió con un el estado " + error.httpStatus + " (" + error.httpResponse + "), vuelve a intentarlo más tarde.",
                            icon: "error"
                        });
                        break;

                    default:
                        console.error(error);
                        break;
                }

            });

        } else {
            noTerm();
        }

    });

    let scrollTop = document.getElementById("scrollTop");
    scrollTop.addEventListener("click", function () {
        document.getElementById("title").scrollIntoView({behavior: "smooth"});
    });

    document.addEventListener("scroll", function () {
        if (form.getBoundingClientRect().bottom <= 0) {
            scrollTop.classList.remove("hidden");

        } else {
            scrollTop.classList.add("hidden");
        }
    });
}

function search(formData) {
    return new Promise(function (resolve, reject) {
        let URI = ITUNES_API + "?"
            + "term=" + formData.get("term")
            + "&country=" + formData.get("country")
            + "&entity=" + formData.get("entity");

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

function showCollection(collection) {
    if (document.getElementById("loader")) {
        document.getElementById("loader").remove();
    }

    if (collection.resultCount == 0) {
        notFound();

    } else {
        collection.results.forEach(collectionElement => {
            displayResult(collectionElement);
        });
    }
}

function displayResult(collectionElement) {
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
    mediumDownloadLink.setAttribute("download", "download");
    mediumDownloadLink.innerText = "Resolución Estandar";

    let largeDownloadLink = document.createElement("a");
    largeDownloadLink.classList.add("albumart-download-link");
    largeDownloadLink.href = collectionElement.artworkUrl60.replace("60x60", "5000x5000");
    largeDownloadLink.setAttribute("download", "download");
    largeDownloadLink.innerText = "Alta Resolución";

    let albumArt = document.createElement("img");
    albumArt.classList.add("albumart");
    albumArt.src = collectionElement.artworkUrl60.replace("60x60", "500x500");

    element.appendChild(name);
    element.appendChild(downloadLinks);
    element.appendChild(albumArt);

    downloadLinks.appendChild(mediumDownloadLink);
    downloadLinks.appendChild(largeDownloadLink);

    document.getElementById("response").appendChild(element);
}

function noNetwork() {
    swal({
        title: "Conexión de red no detectada",
        text: "Parece que no estás conectado a internet, por favor conectate y vuelve a intentarlo.",
        icon: "error"
    });
}

function noTerm() {
    swal({
        title: "Término no especificado",
        text: "Has de indicar algo para realizar la búsqueda",
    }).then(function () {
        document.getElementsByName("term")[0].focus();
    });
};

function notFound() {
    swal({
        title: "Sin resultados",
        text: "No se han encontrado resultados con el termino indicado, revisa la ortografía o prueba con otras palabras",
        info: "info"
    }).then(function () {
        document.getElementsByName("term")[0].focus();
    });
}
