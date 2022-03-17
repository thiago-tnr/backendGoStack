
export default class Error{
    public readonly message: string;
    public readonly statusCode: number;

    constructor(message:string, StatusCode = 400){
        this.message = message;
        this.statusCode = StatusCode
    }
}