import { CWStoreItem } from "./cw-store-item"

export class CWShoppingCart {
    contents: CWShoppingCartEntry[]
    size: number

    constructor() {
        this.contents = []
        this.size = 0
    }

    add(cwShoppingCartEntry: CWShoppingCartEntry) {
        this.contents?.push(cwShoppingCartEntry)
        this.size += 1
    }
}

export interface CWShoppingCartEntry {
    cwStoreItem: CWStoreItem
    size?: string
}

// export class CWShoppingItem {
//     title: string
//     quantity: number
//     type: CWShoppingItemType

//     // clothing
//     color?: string | null
//     size?: string | null

//     constructor(title: string, quantity: number, color?: string, size?: string) {
//         this.title = title
//         this.quantity = quantity
//         this.color = color
//         this.size = size
//     }
// }

