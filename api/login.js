export default {
    /**
     * Returns whether we have logged in
     */
    isLoggedIn() {
        const username = window.localStorage.getItem("username");
        const key = window.localStorage.getItem("key");
        return !!username && !!key; // !! converts to bool
    },

    /**
     * Stores the given username and password
     * @param {string} username 
     * @param {string} key 
     */
    login(username, key) {
        // Temporarily store the credentials
        window.localStorage.setItem("username", username);
        window.localStorage.setItem("key", key);

        window.dispatchEvent(new Event("loginstatuschange"));
    },

    /**
     * Returns the stored credentials
     * 
     * @returns {Credentials}
     */
    getCredentials() {
        // Returns the username and password
        if(!this.isLoggedIn()) return;
        return { username: window.localStorage.getItem("username"), key: window.localStorage.getItem("key") };
    },
}

/**
 * @typedef {Object} Credentials
 * @property {string} username
 * @property {string} key
 */