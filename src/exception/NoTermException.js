export default class NoTermException extends Error {
    constructor(message) {
        super();

        this.name = "NoTermException";
    }
}
