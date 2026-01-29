// ==================== 路由 ====================
// parent | child
// =============================================

export interface Router {
    id?: string
    name?: string
    hidden?: boolean
    redirect?: string
    component?: string
    alwaysShow?: boolean
    query?: string
    path?: string
    meta?: Meta
    children?: Children[]
}

export interface Meta {
    title: string
    icon: string
    noCache: boolean
    link: string | null
}

export interface Children {
    id: string
    name: string
    path: string
    hidden: boolean
    component: string
    meta: Meta
}
