export class AppError {
    status: AppErrorCode;
    error: any;

    constructor(status: AppErrorCode, error: any) {
        this.status = status;
        this.error = error;
    }
}

export enum AppErrorCode {
    ApiError = 'API_ERROR',
    DBError = 'DB_ERROR',
    InvalidRequest = 'INVALID_REQUEST',
    BadRequest = 'BAD_REQUEST'
}