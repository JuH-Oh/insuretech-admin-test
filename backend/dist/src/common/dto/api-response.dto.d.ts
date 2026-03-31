export declare class ApiResponseDto<T> {
    success: boolean;
    message: string;
    data: T | null;
    constructor(success: boolean, message: string, data?: T | null);
}
