export const toNameAndId  = (arr:any[],toName:any,toId:any): NameAndId[] => {

    const newArray = arr.map((ele:any) => (
        {
            name:ele[toName],
            id:ele[toId]
        }
    ))
    return newArray
}