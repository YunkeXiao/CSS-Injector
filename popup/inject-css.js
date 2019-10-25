// Global variable
let old_css = "a";

/**
 * Choose what to display on the popup
 * @param page: Integer from 0 to 2 inclusive
 */
let changePage = (page) => {
    let menu = document.getElementById("popup-0");
    let inject = document.getElementById("popup-1");
    let inject_0 = [
        document.getElementById("domain-selector"),
        document.getElementById("domain-title")
    ];
    let inject_1 = [
        document.getElementById("domain-search"),
        document.getElementById("domain-select")
    ];
    switch (page) {
        // Menu page
        case 0:
            menu.classList.remove("--hidden");
            inject.classList.add("--hidden");
            break;
        // Display CSS injection page for new domain
        case 1:
            menu.classList.add("--hidden");
            while (inject.classList.contains("--hidden")) {
                inject.classList.remove("--hidden");
            }
            for (let element of inject_0) {
                while (element.classList.contains("--hidden")) {
                    element.classList.remove("--hidden");
                }
            }
            for (let element of inject_1) {
                if (!element.classList.contains("--hidden")) {
                    element.classList.add("--hidden");
                }
            }
            break;
        // Display CSS injection page for existence
        case 2:
            menu.classList.add("--hidden");
            while (inject.classList.contains("--hidden")) {
                inject.classList.remove("--hidden");
            }
            for (let element of inject_1) {
                while (element.classList.contains("--hidden")) {
                    element.classList.remove("--hidden");
                }
            }
            for (let element of inject_0) {
                if (!element.classList.contains("--hidden")) {
                    element.classList.add("--hidden");
                }
            }
            break;
        default:
    }
};

/**
 * Check what triggers the click event, call response
 * @param event: Event object
 */
let updatePopup = (event) => {
    let object_id = event.target["id"];
    switch (object_id) {
        // Menu navigation section
        case "domain-submit__input--back":
            changePage(0);
            break;
        case "new-domain":
            changePage(1);
            break;
        case "existing-domain":
            changePage(2);
            break;

        // CSS injection section
        case "domain-submit__input--test":
            old_css = applyCSS(old_css);
            break;
        case "domain-submit__input--add":
            break;
    }
};

/**
 * Update the CSS to be injected into the website
 * @returns {string}: Previous CSS string that was applied by the CSS injector
 */
let applyCSS = () => {
    console.log("OLD_CSS: " + old_css);
    let text_area = document.getElementById("domain-submit__textarea").value;
    browser.tabs.removeCSS({code: old_css}).then(browser.tabs.insertCSS({code: text_area}), null);
    old_css = text_area;
    console.log("TEXT_AREA: " + text_area);
    return text_area;
};

(function () {
    /**
     * Check and set a global guard variable.
     * If this content script is injected into the same page again,
     * it will do nothing next time.
     */
    if (window.hasRun) {
        return;
    }
    window.hasRun = true;

    document.addEventListener("click", (e) => {
        updatePopup(e);
    });
})();

// export let setOldCss = (new_val) => {
//     old_css = new_val;
// };