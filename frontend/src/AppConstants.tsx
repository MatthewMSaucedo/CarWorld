import CWLandingComponent from './cw-landing/cw-landing-component'
import CWHomeComponent from './cw-home/cw-home-component'
import CWStoreComponent from './cw-store/cw-store-component'
import { CWShoppingItemType, CWStoreItem } from './cw-store/cw-store-item'
import * as images from './assets/images'

export const enum CW_ROUTE_ENUM {
  'landing',
  'home',
  'store'
}
export const CW_ROUTES = [
  {
    path: '/',
    element: <CWLandingComponent />
  },
  {
    path: 'home',
    element: <CWHomeComponent />
  },
  {
    path: 'store',
    element: <CWStoreComponent />
  }
]

export const STRIPE_PUB_KEY = "pk_test_51MVNG0Edd7yLru5yTI1lXrQ3y9cTs01dMpm1K5nFqzVAHkZ0PEhp8gnpqpJyuB2cbbkLI3FSDcxR9MmgNDUgikXM00MHFJnNAs"

export const STORE_ITEMS: CWStoreItem[] = [
  {
    title: 'ENTER CAR WORLD T shirt ',
    price: 30,
    image: images.enterCarWorldImg,
    type: CWShoppingItemType["Clothing"]
  },
  {
    title: 'Car World T shirt',
    price: 30,
    image: images.carWorldShirtImg,
    type: CWShoppingItemType["Clothing"]
  },
  {
    title: 'VIP Pass - Car World Needs Me wristband - 3 pack',
    price: 20,
    image: images.vipPassImg,
    type: CWShoppingItemType["Art"]
  },
  {
    title: 'Synthetic Beacon Medallion',
    price: 45,
    image: images.syntheticBeaconMedallionImg,
    type: CWShoppingItemType["Art"]
  },
  {
    title: 'Attendant Sponsorship Certificates',
    price: 20,
    image: images.attendantSponsorshipCertsImg,
    type: CWShoppingItemType["Art"]
  },
  {
    title: 'Car World Temple pamphlets - 2 pack',
    price: 15,
    image: images.carWorldTempleImg,
    type: CWShoppingItemType["Art"]
  },
]
