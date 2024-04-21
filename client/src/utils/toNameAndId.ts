export const toNameAndId  = (arr:any,toName:any,toId:any): NameAndId[] => {
    if (Array.isArray(arr)) {
        const newArray = arr.map((ele:any) => (
            {
                name:ele[toName],
                id:ele[toId]
            }
        ))
        return newArray
    }else {
        return []
    }
    
}