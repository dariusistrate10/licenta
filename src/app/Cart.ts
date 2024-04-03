import { CartEntry } from "./CartEntry";
import { Orders } from "./Orders";
import { User } from "./User";

export interface Cart {
    id?: number,
    orders?: Orders,
    cartEntries?: CartEntry[],
    user?: User
}