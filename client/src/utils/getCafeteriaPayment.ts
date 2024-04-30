import { cafeteriaPayments } from "@/constants/cafeteriaPayments"

export const getCafeteriaPayment = (payment:string) => {
    return cafeteriaPayments
    .filter((currPayment:NameAndId)=> currPayment?.name.toLowerCase() === payment.toLowerCase())[0]
}