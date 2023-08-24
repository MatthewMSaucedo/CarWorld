import CWStoreComponent from './cw-store/cw-store-component'
import CWVideosComponent from './cw-videos/cw-videos-component'
import { CWShoppingItemType, CWStoreItem } from './cw-store/cw-store-item'
import * as IMAGE_SRC from './assets/images'
import StripePaymentComponent from './cw-store/stripe-components/stripe-payment-component'
import CWStoreItemDetailComponent from './cw-store/cw-store-item-detail-component'
import CWWikiComponent from './cw-wiki/cw-wiki-component'
import CWCartComponent from './cw-store/cw-cart-component'
import CWPaymentProcessedComponent from './cw-store/stripe-components/payment-processed-component'
import CWAuthComponent from './my-carworld/auth/auth-component'
import CWProfileComponent from './my-carworld/cw-profile/cw-profile-component'

export const enum CW_ROUTE_ENUM {
  'home',
  'store',
  'videos',
  'checkout',
  'wiki',
  'cart',
  'product',
  'payment_processed',
  'my_carworld',
  'auth'
}
export const CW_ROUTES = [
  {
    path: '/',
    element: <CWStoreComponent />
  },
  {
    path: 'store',
    element: <CWStoreComponent />
  },
  {
    path: 'videos',
    element: <CWVideosComponent />
  },
  {
    path: 'checkout',
    element: <StripePaymentComponent />
  },
  {
    path: 'wiki',
    element: <CWWikiComponent />
  },
  {
    path: 'cart',
    element: <CWCartComponent />
  },
  {
    path: 'product/:store_item_index',
    element: <CWStoreItemDetailComponent />
  },
  {
    path: 'payment_processed',
    element: <CWPaymentProcessedComponent />
  },
  {
    path: 'my_carworld',
    element: <CWProfileComponent />
  },
  {
    path: 'auth',
    element: <CWAuthComponent />
  },
]

export const STRIPE_PUB_KEY = "pk_test_51MVNG0Edd7yLru5yTI1lXrQ3y9cTs01dMpm1K5nFqzVAHkZ0PEhp8gnpqpJyuB2cbbkLI3FSDcxR9MmgNDUgikXM00MHFJnNAs"

export const API_RETRY = 3

export const CW_API_ENDPOINTS = {
  "commerce": {
    "secret": "https://2x7mtrzbjh.execute-api.us-east-1.amazonaws.com/commerce/secret",
    "commodities": "https://2x7mtrzbjh.execute-api.us-east-1.amazonaws.com/commerce/commodities"
  },
  "auth": {
    "refresh": "https://2x7mtrzbjh.execute-api.us-east-1.amazonaws.com/auth/refresh",
    "login": "https://2x7mtrzbjh.execute-api.us-east-1.amazonaws.com/auth/login",
    "register": "https://2x7mtrzbjh.execute-api.us-east-1.amazonaws.com/auth/register",
    "guest": "https://2x7mtrzbjh.execute-api.us-east-1.amazonaws.com/auth/guest"
  },
  "profile": {
    "ddp_rank": "https://2x7mtrzbjh.execute-api.us-east-1.amazonaws.com/profile/ddp_rank"
  },
}

export const STORE_ITEMS: CWStoreItem[] = [
  {
    title: 'Attendant Sponsorship Certificates',
    price: 20,
    serverName: 'attendant sponsorship certificate',
    images: [
      IMAGE_SRC.attendantSponsorshipCertImg1,
    ],
    description_paragraphs: [
      "Spice up any outfit with this cute devotional piece! Each charm depicts the Tat Passes brandished on the right arms of William Banks and his Apostles, as per the Bridgekeeper’s demand."
    ],
    type: CWShoppingItemType["Art"]
  },
  {
    title: 'Quuarax Earrings',
    price: 30,
    serverName: 'quuarux earrings',
    images: [
      IMAGE_SRC.quuaruxEarringsImg1,
      IMAGE_SRC.quuaruxEarringsImg2,
      IMAGE_SRC.quuaruxEarringsImg3,
    ],
    description_paragraphs: [
      "Show queen with these impressionistic danglers every day wherever you want to go. If Quuarux did the Gas Wars then so can you, bitch ;)"
    ],
    type: CWShoppingItemType["Art"]
  },
  {
    title: 'Car World Emblem Earrings',
    price: 20,
    serverName: 'car world emblem earrings',
    images: [
      IMAGE_SRC.carWorldEmblemEarringsImg1,
    ],
    description_paragraphs: [
      "These simple logo studs represent both the planet and the movement. Wear them when you want."
    ],
    type: CWShoppingItemType["Art"]
  },
  {
    title: 'Save The Attendants',
    price: 25,
    serverName: 'save the attendants shirt',
    images: [
      IMAGE_SRC.saveTheAttendantsImg1,
      IMAGE_SRC.saveTheAttendantsImg2,
      IMAGE_SRC.saveTheAttendantsImg3,
      IMAGE_SRC.saveTheAttendantsImg4,
    ],
    description_paragraphs: [
      "Attendants are the native species of Car World. They have suffered long enough under Quuarux’ rule. William Banks will bring about The Attendants Revolution when he returns to Car World with his 12 Apostles.",
      "Artwork by A.T. Pratt"
    ],
    type: CWShoppingItemType["Clothing"]
  },
  {
    title: "DRK's Magwadi",
    price: 25,
    serverName: 'magwadi shirt',
    images: [
      IMAGE_SRC.magwadiImg1,
      IMAGE_SRC.magwadiImg2,
      IMAGE_SRC.magwadiImg3,
      IMAGE_SRC.magwadiImg4,
    ],
    description_paragraphs: [
      "Magwadi was the bird that William Banks bonded with in Car World. They would fly high above his citadel and go on many adventures together.",
      "Artwork & Hand by Director Russell Katz"
    ],
    type: CWShoppingItemType["Clothing"]
  },
  {
    title: 'Quuarux Did the Gas Wars',
    price: 25,
    serverName: 'quuarux gas wars shirt',
    images: [
      IMAGE_SRC.quuaruxGasWarsImg1,
      IMAGE_SRC.quuaruxGasWarsImg2,
      IMAGE_SRC.quuaruxGasWarsImg3,
      IMAGE_SRC.quuaruxGasWarsImg4,
    ],
    description_paragraphs: [
      "William Banks is not responsible for Gas Wars I or II. Quuarux is. Wearing this shirt will help remind your friends that this is true.",
      "Artwork by A.T. Pratt"
    ],
    type: CWShoppingItemType["Clothing"]
  },
  // TODO: add / obtain images
  /* {
   *   title: 'Enter Car World',
   *   price: 25,
   *   serverName: 'enter car world shirt',
   *   images: [
   *     IMAGE_SRC.enterCarWorldImg1,
   *     IMAGE_SRC.enterCarWorldImg2,
   *     IMAGE_SRC.enterCarWorldImg3,
   *     IMAGE_SRC.enterCarWorldImg4,
   *   ],
   *   description_paragraphs: [
   *     "ENTER CAR WORLD (dir. DRK, 2022) premiered at Car World Gala and stars William Banks, Caroline Yost, Chloe Troast, and Tej Khanna."
   *   ],
   *   type: CWShoppingItemType["Clothing"]
   * }, */
  /* {
   *   title: '',
   *   price: 20,
   *   serverName: 'tat pass bracelet',
   *   images: [
   *     IMAGE_SRC.tatPassBraceletImg1,
   *     IMAGE_SRC.tatPassBraceletImg2,
   *     IMAGE_SRC.tatPassBraceletImg4,
   *   ],
   *   description_paragraphs: [
   *     "Spice up any outfit with this cute devotional piece! Each charm depicts the Tat Passes brandished on the right arms of William Banks and his Apostles, as per the Bridgekeeper’s demand."
   *   ],
   *   type: CWShoppingItemType["Art"]
   * }, */
  {
    title: 'Devotion Candle',
    price: 12,
    serverName: 'william banks devotional candle',
    images: [
      IMAGE_SRC.devotionalCandleImg1,
    ],
    description_paragraphs: [
      "Light up a Devotion Candle to fill a room with the scent of love for William Banks."
    ],
    type: CWShoppingItemType["Art"]
  },
  {
    title: 'Attendant Pendant',
    price: 10,
    serverName: 'attendant pendant',
    images: [
      IMAGE_SRC.attendantPendantImg1,
    ],
    description_paragraphs: [
      "Wear an Attendant around your neck to claim your role in The Attendants Revolution. Together, we can end their genocide."
    ],
    type: CWShoppingItemType["Art"]
  },
  {
    title: 'VIP Pass (3-pack)',
    price: 10,
    serverName: 'vip pass',
    images: [
      IMAGE_SRC.vipPassImg1,
      IMAGE_SRC.vipPassImg2,
      IMAGE_SRC.vipPassImg3,
      IMAGE_SRC.vipPassImg4,
    ],
    description_paragraphs: [
      "Wear daily to affirm your belief that Car World Needs You. This wristband will help signal to others that you are a very important person in the eyes of William Banks."
    ],
    type: CWShoppingItemType["Art"]
  },
  {
    title: 'Car World Supper Book',
    price: 10,
    serverName: 'car world supper book',
    images: [
      IMAGE_SRC.carWorldSupperBookImg1,
      IMAGE_SRC.carWorldSupperBookImg2,
      IMAGE_SRC.carWorldSupperBookImg3,
      IMAGE_SRC.carWorldSupperBookImg4,
    ],
    description_paragraphs: [
      "This Book is required to celebrate your own Car World Supper. It contains a guide to our traditions and the words to our songs, written by William Banks and DRK. 19 branches of Car World Nation hosted Suppers this year.",
      "Artwork by A.T. Pratt"
    ],
    type: CWShoppingItemType["Art"]
  },
  {
    title: 'Car World Supper Book 10 pack',
    price: 70,
    serverName: 'car world supper book 10 pack',
    images: [
      IMAGE_SRC.carWorldSupperBookImg1,
      IMAGE_SRC.carWorldSupperBookImg2,
      IMAGE_SRC.carWorldSupperBookImg3,
      IMAGE_SRC.carWorldSupperBookImg4,
    ],
    description_paragraphs: [
      "This Book is required to celebrate your own Car World Supper. It contains a guide to our traditions and the words to our songs, written by William Banks and DRK. 19 branches of Car World Nation hosted Suppers this year.",
      "Artwork by A.T. Pratt"
    ],
    type: CWShoppingItemType["Art"]
  },
  {
    title: 'Pamphlet Bundle',
    price: 10,
    serverName: 'pamphlet bundle',
    images: [
      IMAGE_SRC.pamphletPackImg1,
      IMAGE_SRC.pamphletPackImg2,
      IMAGE_SRC.pamphletPackImg3,
      IMAGE_SRC.pamphletPackImg4,
    ],
    description_paragraphs: [
      "This bundle includes informational pamphlets distributed at Car World Temple Touch, Car World Temple Attention, and Car World Supper 2023.",
      "Artwork by Alexander Laird"
    ],
    type: CWShoppingItemType["Art"]
  },
  {
    title: 'Car World Water',
    price: 5,
    serverName: 'car world water',
    images: [
      IMAGE_SRC.carWorldWaterImg1,
    ],
    description_paragraphs: [
      "Water from Car World has the unique ability to detect Mechanics. Spray or toss the contents of this vial onto the skin of a Mechanic to revert their body back to a worm as it appears in Car World."
    ],
    type: CWShoppingItemType["Art"]
  },
  {
    title: 'Enter Car World Poster',
    price: 1,
    serverName: 'enter car world poster',
    images: [
      IMAGE_SRC.enterCarWorldPosterImg1,
      IMAGE_SRC.enterCarWorldPosterImg2,
    ],
    description_paragraphs: [
      "These are how you feel a sense of gratification. 1 DP is valued at 1 USD. Purchase of each Devotion Point comes with an equivalent Digital Devotion Point. DDP is projected to become incredibly valuable in the global marketplace."
    ],
    type: CWShoppingItemType["Art"]
  },
  {
    title: 'Devotion Point',
    price: 1,
    serverName: 'devotion point',
    images: [
      IMAGE_SRC.devotionPointImg1,
      IMAGE_SRC.devotionPointImg2,
      IMAGE_SRC.devotionPointImg3,
    ],
    description_paragraphs: [
      "These are how you feel a sense of gratification. 1 DP is valued at 1 USD. Purchase of each Devotion Point comes with an equivalent Digital Devotion Point. DDP is projected to become incredibly valuable in the global marketplace."
    ],
    type: CWShoppingItemType["Art"]
  },
  {
    title: 'The Artifact',
    price: 8000,
    serverName: 'the artifact',
    images: [
      IMAGE_SRC.theArtifactImg1,
    ],
    description_paragraphs: [
      "Proof that William Banks has healing powers. He plunged his head into a vat of molten metal spoons at Car World Supper NYC 2023, and then healed his face. These are the hardened remains, preserved and restored by Furnacier Gus Laughlin."
    ],
    type: CWShoppingItemType["Art"]
  } ,
]
