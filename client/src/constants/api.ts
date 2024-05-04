export const BASE_URL :string = "http://localhost:8000/api"



export const clientsRoute = "/client"
export const horsesRoute = "/hourse"
export const instructorsRoute = "/instractor"
export const authRoute = "/auth"
export const updateAdminRoute = `${authRoute}/update-admin`
export const getAdminRoute = `${authRoute}/get-admin` 
export const memberShipStatusesRoute = '/membership-status'
export const horseCategoriesRoute = "/hourse-category"
export const memberShipTypesRoute = "/membershipType"
export const cafeteriaRoute = "/caveteria"
export const cafeteriaMenuItemRoute = `${cafeteriaRoute}/menuitem`
export const cafeteriaConsumedItemRoute = `${cafeteriaRoute}/consume`
export const inventoryRoute = '/inventory'
export const inventoryItemsRoute = `${inventoryRoute}/inventoryitem`
export const inventoryConsumedItemsRoute = `${inventoryRoute}/InvConsume`
export const individualMembershipRoute = `/invmembership`
export const familyMembershipRoute = `/family`
export const packagesRoute = "/package"