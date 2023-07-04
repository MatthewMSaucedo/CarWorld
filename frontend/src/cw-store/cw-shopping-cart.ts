import { CWShoppingItemType, CWStoreItem } from "./cw-store-item"

export interface CWShoppingCartEntry {
    cwStoreItem: CWStoreItem
    quantity: number
    size?: string
}

export class CWShoppingCart {
    contents: CWShoppingCartEntry[]
    size: number

    constructor(contents = []) {
        this.contents = contents
        this.size = this.contents.length
    }

    static staticAddToCart(cart: CWShoppingCart, entry: CWShoppingCartEntry) {
        const itemIsInCart: [boolean, number | undefined] = this.itemAlreadyInCart(cart, entry)

        if (itemIsInCart[0]) {
            // NOTE:
            //   Making use of the non-null assertion operator: ! (bang)
            //   This prevents TS from assuming the value can be undefined
            cart.contents[itemIsInCart[1]!].quantity += 1
        } else {
            cart.contents.push(entry)
        }
        cart.size += 1

        return cart
    }

    static staticRemoveFromCart(cart: CWShoppingCart, deletionEntry: CWShoppingCartEntry) {
        console.log("attempting deletion of " + deletionEntry.cwStoreItem.title)

        let indexToRemove: number | undefined = undefined
        cart.contents.some( (entry, i) => {
            // First, find matching item by title
            if (entry.cwStoreItem.title === deletionEntry.cwStoreItem.title) {
                // If this is clothing, the sizes also must match
                if (entry.cwStoreItem.type === CWShoppingItemType.Clothing) {
                    if (entry.size === deletionEntry.size) {
                        indexToRemove = i
                        return true
                    }
                } else {
                    indexToRemove = i
                    return true
                }
            }
        })
        console.log(indexToRemove)
        // console.log(cart.contents[indexToRemove].cwStoreItem.title)

        // Remove index from cart
        if (indexToRemove !== undefined) {
            if (cart.contents[indexToRemove].quantity > 1) {
                cart.contents[indexToRemove].quantity -= 1
            } else {
                cart.contents.splice(indexToRemove, 1)
            }

            cart.size -= 1
        } else {
            console.log("Unhandled CW Error: item chosen to remove not found in cart")
        }
    }

    static itemAlreadyInCart(cart: CWShoppingCart, entry: CWShoppingCartEntry): [boolean, number | undefined] {
        let itemInCart: boolean = false
        let index: number | undefined = undefined

        cart.contents.forEach((currentEntry: CWShoppingCartEntry, i: number) => {
            // First, look for matching item by title
            if (entry.cwStoreItem.title === currentEntry.cwStoreItem.title) {
                // If this is clothing, the sizes also must match
                if (entry.cwStoreItem.type === CWShoppingItemType.Clothing) {
                    if (entry.size === currentEntry.size) {
                        itemInCart = true
                        index = i
                        return
                    }
                } else {
                    itemInCart = true
                    index = i
                    return
                }
            }
        })

        return [itemInCart, index]
    }

    // TODO: update
    add(cwShoppingCartEntry: CWShoppingCartEntry) {
        this.contents?.push(cwShoppingCartEntry)
        this.size += 1
    }

    // TODO: update
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
