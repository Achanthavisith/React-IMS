class Auth {
    constructor() {
        this.authenticated = false;
        this.isLoggedIn = false;
    }

    login(cb) {
        this.authenticated = true;
        this.isLoggedIn = true;
        cb();
    }

    logout(cb) {
        this.authenticated = false;
        this.isLoggedIn = false;
        cb();
    }

    isAuthenticated() {
        return this.authenticated && this.isLoggedIn;
    }
}

export default new Auth();