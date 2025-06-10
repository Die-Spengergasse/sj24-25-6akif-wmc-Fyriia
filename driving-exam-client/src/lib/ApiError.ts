
export class ApiError extends Error {
    status: number;
    title: string;
    detail: string;

    constructor(status: number, title: string, detail: string) {
        super(detail || title);
        this.status = status;
        this.title = title;
        this.detail = detail;
    }
}
