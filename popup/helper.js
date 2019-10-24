/**
 *
 */
document.addEventListener("click", (e) => {

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
                while(inject.classList.contains("--hidden")) {
                    inject.classList.remove("--hidden");
                }
                for (let element of inject_0){
                    while (element.classList.contains("--hidden")){
                        element.classList.remove("--hidden");
                    }
                }
                for (let element of inject_1){
                    if (!element.classList.contains("--hidden")){
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

    let updatePopup = (event) => {
        let object_id = event.target["id"];
        switch (object_id) {
            case "domain-submit__input--back":
                changePage(0);
                break;
            case "new-domain":
                changePage(1);
                break;
            case "existing-domain":
                changePage(2);
                break;
        }
    };
    updatePopup(e);
    console.log(e.target.id);
});