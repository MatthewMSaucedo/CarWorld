import CWHomeComponent from './cw-home/cw-home-component'
import CWStoreComponent from './cw-store/cw-store-component'
import CWVideosComponent from './cw-videos/cw-videos-component'
import { CWShoppingItemType, CWStoreItem } from './cw-store/cw-store-item'
import * as images from './assets/images'
import StripePaymentComponent from './cw-store/stripe-components/stripe-payment-component'

export const enum CW_ROUTE_ENUM {
  'landing',
  'home',
  'store',
  'videos'
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
]

export const STRIPE_PUB_KEY = "pk_test_51MVNG0Edd7yLru5yTI1lXrQ3y9cTs01dMpm1K5nFqzVAHkZ0PEhp8gnpqpJyuB2cbbkLI3FSDcxR9MmgNDUgikXM00MHFJnNAs"

export const STORE_ITEMS: CWStoreItem[] = [
  {
    title: 'ENTER CAR WORLD T shirt ',
    price: 30,
    serverName: '',
    image: images.enterCarWorldImg,
    type: CWShoppingItemType["Clothing"]
  },
  {
    title: 'Car World T shirt',
    price: 30,
    serverName: '',
    image: images.carWorldShirtImg,
    type: CWShoppingItemType["Clothing"]
  },
  {
    title: 'VIP Pass - Car World Needs Me wristband - 3 pack',
    price: 20,
    serverName: '',
    image: images.vipPassImg,
    type: CWShoppingItemType["Art"]
  },
  {
    title: 'Synthetic Beacon Medallion',
    price: 45,
    serverName: '',
    image: images.syntheticBeaconMedallionImg,
    type: CWShoppingItemType["Art"]
  },
  {
    title: 'Attendant Sponsorship Certificates',
    price: 20,
    serverName: '',
    image: images.attendantSponsorshipCertsImg,
    type: CWShoppingItemType["Art"]
  },
  {
    title: 'Car World Temple pamphlets - 2 pack',
    price: 15,
    serverName: '',
    image: images.carWorldTempleImg,
    type: CWShoppingItemType["Art"]
  },
]
