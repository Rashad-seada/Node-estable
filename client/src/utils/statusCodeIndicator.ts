export const statusCodeIndicator = (code:number) => {
    switch (code) {
        case -1:
            return "validation error"
        case -2:
            return "not found"
        case -3:
            return "authorization error"
        case -4:
            return "internal error"
        default:
            return "success"
    }
}