class LocalStorageHelper {
    constructor() {
        this.userEmail = null;
        if (typeof window !== "undefined") {
            const email = localStorage.getItem("userEmail");
            if (email) {
                this.userEmail = email;
            }
        }
    }

    getUserEmail() {
        return this.userEmail;
    }

    setUserEmail(email) {
        this.userEmail = email;
        if (typeof window !== "undefined") {
            localStorage.setItem("userEmail", email)
        }
    }
}

const localStorageHelper = new LocalStorageHelper();
export default localStorageHelper;