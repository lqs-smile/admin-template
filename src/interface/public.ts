// 基础泛型接口
export interface IApiResponse<T> {
    code: string
    msg: string
    data: T
}
