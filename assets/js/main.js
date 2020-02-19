document.addEventListener("DOMContentLoaded", init);

let locale,
    api,
    form;

function init() {
    if (!isSupported()) {
        swal({
            title: "Unsupported browser",
            text: "You browser does not support some of the functions, please consider upgrading it or changing to a more modern one",
            icon: "error"
        });

        return;
    }

    locale = new Locale(Locale.firstMatchLocale);
    console.info("Selected \"%s\" locale.", Locale.firstMatchLocale);

    api = new iTunesAPI(document.getElementById("response"));

    form = document.getElementById("search-iTunes");
    form.addEventListener("submit", function (e) {
        let formData = new FormData(this);
        formData.set("media", document.querySelector("#search-iTunes [name=entity]").selectedOptions[0].parentNode.getAttribute("label").toLowerCase());

        e.preventDefault();

        api.search(formData);

        history.pushState({
            "term": formData.get("term"),
            "country": formData.get("country"),
            "media": formData.get("media"),
            "entity": formData.get("entity"),
            "limit": isNaN(formData.get("limit")) ? 50 : Math.max(Math.min(formData.get("limit"), 200), 1)
        }, document.title, `?q=${formData.get("term")}&country=${formData.get("country")}&entity=${formData.get("entity")}&limit=${formData.get("limit")}`);
    });

    window.addEventListener("popstate", function (event) {
        let data = event.state;
        let formData = new FormData();

        for (let input in data) {
            let value = data[input];
            formData.set(input, value);
            document.getElementsByName(input)[0].value = value;
        }

        api.search(formData);

    });

    if (location.search) {
        let params = location.search.substr(1).split("&");

        let formElement = document.getElementById("search-iTunes");
        let formData = new FormData();
        formData.set("country", "es");
        formData.set("entity", "album");
        formData.set("limit", 50);

        for (let param of params) {
            let data = param.split("=");

            if (data.length == 2) {
                switch (data[0]) {
                    case "q":
                        formData.set("term", data[1]);
                        formElement.querySelector("[name=term]").value = unescape(data[1]);
                        break;
                    case "media":
                        formData.set("media", data[1]);
                        break;
                    case "entity":
                        formData.set("entity", data[1]);
                        formElement.querySelector("[name=entity]").value = data[1];
                        break;
                    case "country":
                        formData.set("country", data[1]);
                        formElement.querySelector("[name=country]").value = data[1];
                        break;
                    case "limit":
                        let limit = isNaN(data[1]) ? 50 : Math.max(Math.min(data[1], 200), 1);
                        formData.set("limit", limit);
                        formElement.querySelector("[name=limit]").value = limit;
                        break;
                }
            }
        }

        if (formData.get("term"))

        api.search(formData);
    }

    initScrollTop();
    createChangeLang();
}

function initScrollTop() {
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

function createChangeLang() {
    let list = document.createElement("select");
    list.id = "changeLocale";
    let locales = Locale.availableLocales.sort();

    locales.forEach(loc => {
        let option = document.createElement("option");
        option.value = loc;
        option.innerText = loc;

        if (loc == locale.code) {
            option.selected = "selected";
        }

        list.appendChild(option);
    });

    document.body.appendChild(list);
    list.addEventListener("change", function () {
        locale = new Locale(this.value);
    })
}

function isSupported() {
    try {
        let requires = [
            FormData,
            new FormData(document.getElementById("search-iTunes")).get("term"),
            Promise,
            fetch,
        ];

        for (let i = 0; i < requires.length; i++) {
            if (typeof requires[i] === "undefined") {
                return false;
            }
        }
        return true;

    } catch (e) {
        return false;
    }
}
