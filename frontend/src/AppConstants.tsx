import CWHomeComponent from './cw-home/cw-home-component'
import CWStoreComponent from './cw-store/cw-store-component'
import CWVideosComponent from './cw-videos/cw-videos-component'
import { CWShoppingItemType, CWStoreItem } from './cw-store/cw-store-item'
import * as images from './assets/images'
import StripePaymentComponent from './cw-store/stripe-components/stripe-payment-component'
import CWCommodityDisplayComponent from './cw-store/cw-commodity-display-component'
import CWWikiComponent from './cw-wiki/cw-wiki-component'

export const enum CW_ROUTE_ENUM {
  'landing',
  'home',
  'store',
  'videos',
  'checkout',
  'product',
  'wiki'
}
export const CW_ROUTES = [
  {
    path: '/',
    element: <CWHomeComponent />
  },
  {
    path: 'store',
    element: <CWStoreComponent />
  },
  {},
  {
    path: 'videos',
    element: <CWVideosComponent />
  },
  {
    path: 'checkout',
    element: <StripePaymentComponent />
  },
  {
    path: 'product',
    element: <CWCommodityDisplayComponent />
  },
  {
    path: 'wiki',
    element: <CWWikiComponent />
  },

]

export const STRIPE_PUB_KEY = "pk_test_51MVNG0Edd7yLru5yTI1lXrQ3y9cTs01dMpm1K5nFqzVAHkZ0PEhp8gnpqpJyuB2cbbkLI3FSDcxR9MmgNDUgikXM00MHFJnNAs"

export const STORE_ITEMS: CWStoreItem[] = [
  {
    title: 'ENTER CAR WORLD Shirt ',
    price: 25,
    serverName: 'magwadi shirt',
    image: images.enterCarWorldImg,
    type: CWShoppingItemType["Clothing"]
  },
  {
    title: 'Car World Shirt',
    price: 25,
    serverName: 'magwadi shirt',
    image: images.carWorldShirtImg,
    type: CWShoppingItemType["Clothing"]
  },
  {
    title: 'VIP Pass - 3 pack',
    price: 12,
    serverName: 'magwadi shirt',
    image: images.vipPassImg,
    type: CWShoppingItemType["Art"]
  },
  {
    title: 'Synthetic Beacon Medallion',
    price: 45,
    serverName: 'magwadi shirt',
    image: images.syntheticBeaconMedallionImg,
    type: CWShoppingItemType["Art"]
  },
  {
    title: 'Attendant Sponsorship Certificates',
    price: 20,
    serverName: 'magwadi shirt',
    image: images.attendantSponsorshipCertsImg,
    type: CWShoppingItemType["Art"]
  },
  {
    title: 'Car World Temple pamphlets - 2 pack',
    price: 10,
    serverName: 'magwadi shirt',
    image: images.carWorldTempleImg,
    type: CWShoppingItemType["Art"]
  },
]
