export default class Repository extends HTMLElement {
    constructor() {
        super();

        // Find template
        let template = document.getElementById("github-repository");
        let templateContent = template.content;

        // Make a Shadow DOM and put the template in it
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(templateContent.cloneNode(true));
    }
};

window.customElements.define('github-repository', Repository);