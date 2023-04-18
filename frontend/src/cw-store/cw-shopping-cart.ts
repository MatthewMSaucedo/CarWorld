import { CWShoppingItemType, CWStoreItem } from "./cw-store-item"

export class CWShoppingCart {
    contents: CWShoppingCartEntry[]
    size: number

    constructor() {
        this.contents = []
        this.size = 0
    }

    static staticAddToCart(cart: CWShoppingCart, entry: CWShoppingCartEntry) {
        cart.contents.push(entry)
        cart.size += 1
        return cart
    }

    static staticRemoveFromCart(cart: CWShoppingCart, entry: CWShoppingCartEntry) {
        let indexToRemove: number | undefined = undefined
        cart.contents.forEach( (currentEntry, i) => {
            // First, find matching item by title
            if (entry.cwStoreItem.title === currentEntry.cwStoreItem.title) {
                // If this is clothing, the sizes also must match
                if (entry.cwStoreItem.type === CWShoppingItemType.Clothing) {
                    if (entry.size === currentEntry.size) {
                        indexToRemove = i
                    }
                } else {
                    indexToRemove = i
                }
            }
        })

        if (indexToRemove) {
            cart.contents.splice(indexToRemove, 1)
        } else {
            console.log("Unhandled CW Error: item chosen to remove not found in cart")
        }
        return cart
    }

    add(cwShoppingCartEntry: CWShoppingCartEntry) {
        this.contents?.push(cwShoppingCartEntry)
        this.size += 1
    }

    remove(cwShoppingCartEntry: CWShoppingCartEntry) {
        let indexToRemove: number | undefined = undefined
        this.contents.forEach( (entry, i) => {
            // First, find matching item by title
            if (entry.cwStoreItem.title === cwShoppingCartEntry.cwStoreItem.title) {
                // If this is clothing, the sizes also must match
                if (cwShoppingCartEntry.cwStoreItem.type === CWShoppingItemType.Clothing) {
                    if (entry.size === cwShoppingCartEntry.size) {
                        indexToRemove = i
                    }
                } else {
                    indexToRemove = i
                }
            }
        })

        // Remove index from cart
        if (indexToRemove) {
            this.contents.splice(indexToRemove, 1)
        } else {
            console.log("Unhandled CW Error: item chosen to remove not found in cart")
        }
    }
}

export interface CWShoppingCartEntry {
    cwStoreItem: CWStoreItem
    size?: string
}
