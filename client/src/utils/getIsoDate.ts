export const getIsoDate = (inputDate:string) => {
    const date = new Date(inputDate)
    return date.toISOString().slice(0, 16)
}