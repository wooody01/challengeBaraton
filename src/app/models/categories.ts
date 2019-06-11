export interface categories {
    id:number,
    name:string,
    sublevels: sublevels[]
}

export interface sublevels {
    id: number,
    name:string, 
    sublevels?: sublevels[]
}