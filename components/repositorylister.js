import login from "../api/login.js";
import repo from "../api/repo.js";

export default class RepositoryLister extends HTMLElement {
    constructor() {
        super();

        let template = document.getElementById("github-repositorylister");
        let templateContent = template.content;

        // Prepare shadow DOM
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(templateContent.cloneNode(true));

        // Make local variables
        this.searchBox = this.shadowRoot.getElementById("repository");
        this.searchButton = this.shadowRoot.getElementById("find");
        this.results = this.shadowRoot.getElementById("repositories");

        // Update view
        this.updateView();

        // Set up listeners
        window.addEventListener("loginstatuschange", this.updateView.bind(this));
        this.searchButton.addEventListener("click", this.search.bind(this));
    }

    /**
     * Function that updates the view when conditions have changed.
     * In this case: when a loginstatuschange has happened
     */
    updateView() {
        const isLoggedIn = login.isLoggedIn();

        // If we're not logged in we disable this control
        if(!isLoggedIn) {
            this.searchBox.disabled = true;
            this.searchButton.disabled = true;
            this.results.innerHTML = "";

            return;
        }

        // If we are logged in we enable this control
        this.searchButton.disabled = false;
        this.searchBox.disabled = false;
    }

    /**
     * Callback for when a user wants to start searching
     */
    async search() {
        let username = this.searchBox.value;
        let repositories = await repo.getRepositories(username);

        // Clear results
        this.results.innerHTML = "";

        for(let repositoryIndex in repositories) {
            let repository = repositories[repositoryIndex];
            
            // Make an instance of a custom element dynamically
            let repositoryView = document.createElement("github-repository");

            // Connect slots
            let titleSpan = document.createElement("span");
            titleSpan.setAttribute("slot", "title");
            titleSpan.innerText = repository.name;

            let descSpan = document.createElement("span");
            descSpan.setAttribute("slot", "description");
            descSpan.innerText = repository.description;

            repositoryView.appendChild(titleSpan);
            repositoryView.appendChild(descSpan);

            this.results.appendChild(repositoryView);
        }
    }
};

window.customElements.define('github-repositorylister', RepositoryLister);