import login from "../api/login.js";

export default class LoginComponent extends HTMLElement {
    constructor() {
        super();

        // Find the template and make a shadow dom
        let template = document.getElementById("github-login");
        let templateContent = template.content;
        
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(templateContent.cloneNode(true));

        // Fix view and set listeners
        this.updateView();
        this.shadowRoot.getElementById("login").addEventListener("click", this.login.bind(this));
        this.shadowRoot.getElementById("logout").addEventListener("click", this.logout.bind(this));
    }

    /**
     * Function that updates the view when a change of login state has happened
     */
    updateView() {
        const isLoggedIn = login.isLoggedIn();
        this.shadowRoot.getElementById("notloggedin").hidden = isLoggedIn;
        this.shadowRoot.getElementById("loggedin").hidden = !isLoggedIn;

        // Show username when logged in
        if(isLoggedIn) {
            const credentials = login.getCredentials();
            this.shadowRoot.getElementById("username").innerText = credentials.username;
        }
    }

    /**
     * Function to perform login
     */
    login() {
        const username = window.prompt("Please enter your username:");
        const key = window.prompt("Please enter your key:");

        login.login(username, key);
        this.updateView();
    }

    /**
     * Function to perform logout
     */
    logout() {
        login.login("", "");
        this.updateView();
    }
};

window.customElements.define('github-login', LoginComponent);