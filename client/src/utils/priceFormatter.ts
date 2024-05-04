export const priceFormatter = (price:string) => {
    if (!price.includes(".00")) {
        price = price.split(".")[0]
        return `${price}.00`
    }
    return price
}