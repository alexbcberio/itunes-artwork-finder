export default class NoNetworkException extends Error {
    constructor(message) {
        super();

        this.name = "NoNetworkException";
    }
}
