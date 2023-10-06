export interface CWStoreItem {
    title: string
    price: number
    serverName: string
    images: any[]
    description_paragraphs: string[]
    type: CWShoppingItemType
    credits?: {
        text: string,
        url: string
    }[]
}

export enum CWShoppingItemType {
    Ticket,
    Clothing,
    Art
}
