type Children = {
    readonly children: React.ReactNode
}


type RootTemplateProps = {
    readonly children: React.ReactNode
}

type RootLayoutProps = {
    readonly children: React.ReactNode
}


type NameAndId = {
    name: string,
    id:string
} | null


type QueryReqParameters = {
    pagination?:string,
    onSuccess?:((data:any)=>any)|null,
    onError?:((data:any)=>any)|null,
    queryKey?:any[]
} 