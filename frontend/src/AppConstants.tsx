import CWStoreComponent from './cw-store/cw-store-component'
import CWVideosComponent from './cw-videos/cw-videos-component'
import { CWShoppingItemType, CWStoreItem } from './cw-store/cw-store-item'
import StripePaymentComponent from './cw-store/stripe-components/stripe-payment-component'
import CWStoreItemDetailComponent from './cw-store/cw-store-item-detail-component'
import CWWikiComponent from './cw-wiki/cw-wiki-component'
import CWCartComponent from './cw-store/cw-cart-component'
import CWPaymentProcessedComponent from './cw-store/stripe-components/payment-processed-component'
import CWAuthComponent from './my-carworld/auth/auth-component'
import CWProfileComponent from './my-carworld/cw-profile/cw-profile-component'
import CWNationComponent from './cw-nation/cw-nation-compnent'

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
  'auth',
  'car_world_nation'
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
  {
    path: 'car_world_nation',
    element: <CWNationComponent />
  },
]

export enum CarWorldNationRegion {
    "USA",
    "CA",
    "EU",
    "OCEANIA",
    "ASIA"
}
export interface CarWorldNationBranch {
    location: string,
    region: CarWorldNationRegion
}
export const CAR_WORLD_NATION_BRANCHES: CarWorldNationBranch[] = [
    {
        location: "New York, NY",
        region: CarWorldNationRegion.USA
    },
    {
        location: "Los Angeles, CA",
        region: CarWorldNationRegion.USA
    },
    {
        location: "Chicago, IL",
        region: CarWorldNationRegion.USA
    },
    {
        location: "St. Louis, MO",
        region: CarWorldNationRegion.USA
    },
    {
        location: "Houston, TX",
        region: CarWorldNationRegion.USA
    },
    {
        location: "Philadelphia, PA",
        region: CarWorldNationRegion.USA
    },
    {
        location: "Portland, PA",
        region: CarWorldNationRegion.USA
    },
    {
        location: "Portland, OR",
        region: CarWorldNationRegion.USA
    },
    {
        location: "San Francisco, CA",
        region: CarWorldNationRegion.USA
    },
    {
        location: "Toronto, ON",
        region: CarWorldNationRegion.USA
    },
    {
        location: "Dallas, TX",
        region: CarWorldNationRegion.USA
    },
    {
        location: "Minneapolis, MN",
        region: CarWorldNationRegion.USA
    },
    {
        location: "Salt Lake City, UT",
        region: CarWorldNationRegion.USA
    },
    {
        location: "Seattle, WA",
        region: CarWorldNationRegion.USA
    },
    {
        location: "Washington D.C.",
        region: CarWorldNationRegion.USA
    },
    {
        location: "Dublin, IRELAND",
        region: CarWorldNationRegion.EU
    },
    {
        location: "Seoul, SOUTH KOREA",
        region: CarWorldNationRegion.ASIA
    },
    {
        location: "Cincinnati, OH",
        region: CarWorldNationRegion.USA
    },
    {
        location: "Denver, CO",
        region: CarWorldNationRegion.USA
    },
    {
        location: "Fort Lauderdale, FL",
        region: CarWorldNationRegion.USA
    },
    {
        location: "Long Island, NY",
        region: CarWorldNationRegion.USA
    },
    {
        location: "Detroit, MI",
        region: CarWorldNationRegion.USA
    },
    {
        location: "Enfield, MA",
        region: CarWorldNationRegion.USA
    },
    {
        location: "Pittsburgh, PA",
        region: CarWorldNationRegion.USA
    },
    {
        location: "Raleigh, NC",
        region: CarWorldNationRegion.USA
    },
    {
        location: "Santa Cruz, CA",
        region: CarWorldNationRegion.USA
    },
    {
        location: "Silver Spring, MD",
        region: CarWorldNationRegion.USA
    },
    {
        location: "Waco, TX",
        region: CarWorldNationRegion.USA
    },
    {
        location: "Albany, NY",
        region: CarWorldNationRegion.USA
    },
    {
        location: "Kansas City, MO",
        region: CarWorldNationRegion.USA
    },
    {
        location: "London, ENGLAND",
        region: CarWorldNationRegion.EU
    },
    {
        location: "Pullman, WA",
        region: CarWorldNationRegion.USA
    },
    {
        location: "Fort Wayne, IN",
        region: CarWorldNationRegion.USA
    },
    {
        location: "Richmond, VA",
        region: CarWorldNationRegion.USA
    },
    {
        location: "St. Petersburg, FL",
        region: CarWorldNationRegion.USA
    },
    {
        location: "Atlanta, GA",
        region: CarWorldNationRegion.USA
    },
    {
        location: "Austin, TX",
        region: CarWorldNationRegion.USA
    },
    {
        location: "Bloomington, IN",
        region: CarWorldNationRegion.USA
    },
    {
        location: "Belfast, ME",
        region: CarWorldNationRegion.USA
    },
    {
        location: "Boston, MA",
        region: CarWorldNationRegion.USA
    },
    {
        location: "Canberra, ACT",
        region: CarWorldNationRegion.OCEANIA
    },
    {
        location: "Durham, NH",
        region: CarWorldNationRegion.USA
    },
    {
        location: "Effingham, IL",
        region: CarWorldNationRegion.USA
    },
    {
        location: "Flagstaff, AZ",
        region: CarWorldNationRegion.USA
    },
    {
        location: "Oklahoma City, OK",
        region: CarWorldNationRegion.USA
    },
    {
        location: "Glasgow, SCOTLAND",
        region: CarWorldNationRegion.EU
    },
    {
        location: "Hendersonville, NC",
        region: CarWorldNationRegion.USA
    },
    {
        location: "Indianapolis, IN",
        region: CarWorldNationRegion.USA
    },
    {
        location: "Leeds, ENGLAND",
        region: CarWorldNationRegion.EU
    },
    {
        location: "Virginia Beach, VA",
        region: CarWorldNationRegion.USA
    },
    {
        location: "Lousiville, KY",
        region: CarWorldNationRegion.USA
    },
    {
        location: "Oberlin, OH",
        region: CarWorldNationRegion.USA
    },
    {
        location: "Missoula, MT",
        region: CarWorldNationRegion.USA
    },
    {
        location: "Charleston, WV",
        region: CarWorldNationRegion.USA
    },
    {
        location: "Montreal, QC",
        region: CarWorldNationRegion.CA
    },
    {
        location: "New Brunswick, NJ",
        region: CarWorldNationRegion.USA
    },
    {
        location: "Newcastle, NSW",
        region: CarWorldNationRegion.OCEANIA
    },
    {
        location: "Newfoundland",
        region: CarWorldNationRegion.OCEANIA
    },
    {
        location: "Omaha, NE",
        region: CarWorldNationRegion.USA
    },
    {
        location: "Ottawa, ON",
        region: CarWorldNationRegion.CA
    },
    {
        location: "Santa Fe, NM",
        region: CarWorldNationRegion.USA
    },
    {
        location: "Tokyo, JAPAN",
        region: CarWorldNationRegion.ASIA
    },
    {
        location: "Wellington, NZ",
        region: CarWorldNationRegion.OCEANIA
    },
    {
        location: "Windsor, CT",
        region: CarWorldNationRegion.USA
    },
    {
        location: "Winston-Salem, NC",
        region: CarWorldNationRegion.USA
    },
    {
        location: "Carbondale, IL",
        region: CarWorldNationRegion.USA
    }
]

export const STRIPE_PUB_KEY = "pk_test_51MVNG0Edd7yLru5yTI1lXrQ3y9cTs01dMpm1K5nFqzVAHkZ0PEhp8gnpqpJyuB2cbbkLI3FSDcxR9MmgNDUgikXM00MHFJnNAs"

export const API_RETRY = 3

export const CW_API_ENDPOINTS = {
  "commerce": {
    "secret": "https://01dkxmbxgh.execute-api.us-east-1.amazonaws.com/commerce/secret",
    "cache_email": "https://01dkxmbxgh.execute-api.us-east-1.amazonaws.com/commerce/cache_email",
    "commodities": "https://01dkxmbxgh.execute-api.us-east-1.amazonaws.com/commerce/commodities"
  },
  "auth": {
    "refresh": "https://01dkxmbxgh.execute-api.us-east-1.amazonaws.com/auth/refresh",
    "login": "https://01dkxmbxgh.execute-api.us-east-1.amazonaws.com/auth/login",
    "register": "https://01dkxmbxgh.execute-api.us-east-1.amazonaws.com/auth/register",
    "guest": "https://01dkxmbxgh.execute-api.us-east-1.amazonaws.com/auth/guest"
  },
  "profile": {
    "ddp_rank": "https://01dkxmbxgh.execute-api.us-east-1.amazonaws.com/profile/ddp_rank"
  },
}

export const STORE_ITEMS: CWStoreItem[] = [
  {
    title: 'Car World Needs Me',
    price: 25,
    serverName: 'car world needs me shirt',
    images: [
      "https://cw-merch-images.s3.amazonaws.com/CAR+WORLD+WEBSITE+STILLS/CAR+WORLD+NEEDS+ME+shirt/car_world_needs_me_main.jpg",
    ],
    description_paragraphs: [
      "Wear this shirt as a true expression of your value and the important role you play among our global community. This shirt is especially recommended to be worn by Members of Car World Nation, although anyone is permitted to wear it.",
      "Artwork by William Banks"
    ],
    type: CWShoppingItemType["Clothing"]
  },
  {
    title: 'I Want To Go To Car World',
    price: 25,
    serverName: 'i want to go to car world shirt',
    images: [
      "https://cw-merch-images.s3.amazonaws.com/CAR+WORLD+WEBSITE+STILLS/I+WANT+TO+GO+TO+CAR+WORLD+shirt/I_want_to_go_to_car_world.jpg",
    ],
    description_paragraphs: [
      "Do you want to go to Car World? Then this shirt is for you! Together, we are brought into the collective hope & belief that one day we may become an Apostle of William Banks and journey with him to cross the Bridge to Car World and be forever at peace.",
      "Artwork by Actor Caroline Yost"
    ],
    type: CWShoppingItemType["Clothing"]
  },
  {
    title: 'Quuarux Did the Gas Wars',
    price: 25,
    serverName: 'quuarux gas wars shirt',
    images: [
      "https://cw-merch-images.s3.amazonaws.com/CAR+WORLD+WEBSITE+STILLS/QUUARUX+shirt/quuarux+main.png",
      "https://cw-merch-images.s3.amazonaws.com/CAR+WORLD+WEBSITE+STILLS/QUUARUX+shirt/quuarux+model_1.png",
      "https://cw-merch-images.s3.amazonaws.com/CAR+WORLD+WEBSITE+STILLS/QUUARUX+shirt/quuarux+model_2.png",
      "https://cw-merch-images.s3.amazonaws.com/CAR+WORLD+WEBSITE+STILLS/QUUARUX+shirt/quuarux+model_3.png"
    ],
    description_paragraphs: [
      "William Banks is not responsible for Gas Wars I or II. Quuarux is. Wearing this shirt will help remind your friends that this is true.",
    ],
    type: CWShoppingItemType["Clothing"],
    credits: [{
        text: "Artwork by A.T. Pratt",
        url: "https://atpratt.net/"
    }]
  },
  {
    title: "Magwadi",
    price: 25,
    serverName: 'magwadi shirt',
    images: [
      "https://cw-merch-images.s3.amazonaws.com/CAR+WORLD+WEBSITE+STILLS/MAGWADI+shirt/magwadi+main.png",
      "https://cw-merch-images.s3.amazonaws.com/CAR+WORLD+WEBSITE+STILLS/MAGWADI+shirt/magwadi+model_1.png",
      "https://cw-merch-images.s3.amazonaws.com/CAR+WORLD+WEBSITE+STILLS/MAGWADI+shirt/magwadi+model_2.png",
      "https://cw-merch-images.s3.amazonaws.com/CAR+WORLD+WEBSITE+STILLS/MAGWADI+shirt/magwadi+model_3.png"
    ],
    description_paragraphs: [
      "Magwadi was the bird that William Banks bonded with in Car World. They would fly high above his citadel and go on many adventures together.",
      "Artwork & Hand by Director Russell Katz"
    ],
    /* hyperLink: { */
    /* text: "", */
    /* link: "" */
    /* } */
    type: CWShoppingItemType["Clothing"]
  },
  {
    title: "Enter Car World",
    price: 25,
    serverName: 'enter car world shirt',
    images: [
      "https://cw-merch-images.s3.amazonaws.com/CAR+WORLD+WEBSITE+STILLS/ECW+shirt/ecwshirt+main.png",
      "https://cw-merch-images.s3.amazonaws.com/CAR+WORLD+WEBSITE+STILLS/ECW+shirt/ecwshirt+model_1.png",
      "https://cw-merch-images.s3.amazonaws.com/CAR+WORLD+WEBSITE+STILLS/ECW+shirt/ecwshirt+model_2.png",
      "https://cw-merch-images.s3.amazonaws.com/CAR+WORLD+WEBSITE+STILLS/ECW+shirt/ecwshirt+model_3.png"
    ],
    description_paragraphs: [
      "ENTER CAR WORLD (dir. DRK, 2022) premiered at Car World Gala and stars William Banks, Caroline Yost, Chloe Troast, and Tej Khanna.",
      "Artwork & Hand by Director Russell Katz"
    ],
    /* hyperLink: { */
    /* text: "", */
    /* link: "" */
    /* } */
    type: CWShoppingItemType["Clothing"]
  },
  {
    title: 'Save The Attendants',
    price: 25,
    serverName: 'save the attendants shirt',
    images: [
      "https://cw-merch-images.s3.amazonaws.com/CAR+WORLD+WEBSITE+STILLS/SAVE+THE+ATTENDANTS+shirt/savetheattendants+main.png",
      "https://cw-merch-images.s3.amazonaws.com/CAR+WORLD+WEBSITE+STILLS/SAVE+THE+ATTENDANTS+shirt/savetheattendants+model_1.png",
      "https://cw-merch-images.s3.amazonaws.com/CAR+WORLD+WEBSITE+STILLS/SAVE+THE+ATTENDANTS+shirt/savetheattendants+model_2.png",
      "https://cw-merch-images.s3.amazonaws.com/CAR+WORLD+WEBSITE+STILLS/SAVE+THE+ATTENDANTS+shirt/savetheattendants+model_3.png",
    ],
    description_paragraphs: [
      "Attendants are the native species of Car World. They have suffered long enough under Quuarux’ rule. William Banks will bring about The Attendants Revolution when he returns to Car World with his 12 Apostles.",
    ],
    type: CWShoppingItemType["Clothing"],
    credits: [{
        text: "Artwork by A.T. Pratt",
        url: "https://atpratt.net/"
    }]
  },
  {
    title: 'VIP Pass (4-pack)',
    price: 12,
    serverName: 'vip pass',
    images: [
      "https://cw-merch-images.s3.amazonaws.com/CAR+WORLD+WEBSITE+STILLS/VIP+PASSES/vip+pass+model_2.png",
      "https://cw-merch-images.s3.amazonaws.com/CAR+WORLD+WEBSITE+STILLS/VIP+PASSES/vip+pass+main.png",
      "https://cw-merch-images.s3.amazonaws.com/CAR+WORLD+WEBSITE+STILLS/VIP+PASSES/vip+pass+model_1.png",
      "https://cw-merch-images.s3.amazonaws.com/CAR+WORLD+WEBSITE+STILLS/VIP+PASSES/vip+pass+model_3.png",
    ],
    description_paragraphs: [
      "Wear daily to affirm your belief that Car World Needs You. This wristband will help signal to others that you are a very important person in the eyes of William Banks."
    ],
    type: CWShoppingItemType["Art"]
  },
  {
    title: 'The Artifact',
    price: 8000,
    serverName: 'the artifact',
    images: [
      "https://cw-merch-images.s3.amazonaws.com/CAR+WORLD+WEBSITE+STILLS/THE+ARTIFACT/theartifact+only.png"
    ],
    description_paragraphs: [
      "Proof that William Banks has healing powers. He plunged his head into a vat of molten metal spoons at Car World Supper NYC 2023, and then healed his face. These are the hardened remains, preserved and restored by Furnacier Gus Laughlin."
    ],
    type: CWShoppingItemType["Art"]
  },
  {
    title: 'Pamphlet Bundle',
    price: 9,
    serverName: 'pamphlet bundle',
    images: [
      "https://cw-merch-images.s3.amazonaws.com/CAR+WORLD+WEBSITE+STILLS/PAMPHLET+PACK/pamphlets+main.png",
      "https://cw-merch-images.s3.amazonaws.com/CAR+WORLD+WEBSITE+STILLS/PAMPHLET+PACK/pamphlets+model_1.png",
      "https://cw-merch-images.s3.amazonaws.com/CAR+WORLD+WEBSITE+STILLS/PAMPHLET+PACK/pamphlets+model_2.png",
      "https://cw-merch-images.s3.amazonaws.com/CAR+WORLD+WEBSITE+STILLS/PAMPHLET+PACK/pamphlets+model_3.png",
    ],
    description_paragraphs: [
      "This bundle includes informational pamphlets distributed at Car World Temple Touch, Car World Temple Attention, and Car World Supper 2023.",
      "Artwork by Alexander Laird"
    ],
    type: CWShoppingItemType["Art"]
  },
  {
    title: 'Devotion Point',
    price: 1,
    serverName: 'devotion point',
    images: [
      "https://cw-merch-images.s3.amazonaws.com/CAR+WORLD+WEBSITE+STILLS/DEVOTION+POINT/dp+1.png",
      "https://cw-merch-images.s3.amazonaws.com/CAR+WORLD+WEBSITE+STILLS/DEVOTION+POINT/dp+2.png",
      "https://cw-merch-images.s3.amazonaws.com/CAR+WORLD+WEBSITE+STILLS/DEVOTION+POINT/dp+3.png",
    ],
    description_paragraphs: [
      "These are how you feel a sense of gratification. 1 DP is valued at 1 USD. Purchase of each Devotion Point comes with an equivalent Digital Devotion Point. DDP is projected to become incredibly valuable in the global marketplace."
    ],
    type: CWShoppingItemType["Art"]
  },
  {
    title: 'Car World Supper Book',
    price: 10,
    serverName: 'car world supper book',
    images: [
      "https://cw-merch-images.s3.amazonaws.com/CAR+WORLD+WEBSITE+STILLS/SUPPER+BOOK/supper+book+main.png",
      "https://cw-merch-images.s3.amazonaws.com/CAR+WORLD+WEBSITE+STILLS/SUPPER+BOOK/supper+book+extra.png",
      "https://cw-merch-images.s3.amazonaws.com/CAR+WORLD+WEBSITE+STILLS/SUPPER+BOOK/supper+book_1.png",
      "https://cw-merch-images.s3.amazonaws.com/CAR+WORLD+WEBSITE+STILLS/SUPPER+BOOK/supper+book_2.png",
      "https://cw-merch-images.s3.amazonaws.com/CAR+WORLD+WEBSITE+STILLS/SUPPER+BOOK/supper+book_3.png"
    ],
    description_paragraphs: [
      "This Book is required to celebrate your own Car World Supper. It contains a guide to our traditions and the words to our songs, written by William Banks and DRK. 19 branches of Car World Nation hosted Suppers this year.",
    ],
    type: CWShoppingItemType["Art"],
    credits: [{
        text: "Artwork by A.T. Pratt",
        url: "https://atpratt.net/"
    }]
  },
  {
    title: 'Tat Pass Charm Bracelet',
    price: 55,
    serverName: 'tat pass bracelet',
    images: [
      "https://cw-merch-images.s3.amazonaws.com/CAR+WORLD+WEBSITE+STILLS/CHARM+BRACELET/charm+bracelet+main.png",
      "https://cw-merch-images.s3.amazonaws.com/CAR+WORLD+WEBSITE+STILLS/CHARM+BRACELET/charm+bracelet+model_2.png"
    ],
    description_paragraphs: [
      "Spice up any outfit with this cute devotional piece! Each charm depicts the Tat Passes brandished on the right arms of William Banks and his Apostles, as per the Bridgekeeper’s demand.",
    ],
    type: CWShoppingItemType["Art"],
    credits: [{
        text: "Made by Tara's Tiny Trinkets",
        url: "https://www.tarastinytrinkets.com/"
    }]
  },
  {
    title: 'Quuarux Earrings',
    price: 14,
    serverName: 'quuarux earrings',
    images: [
      "https://cw-merch-images.s3.amazonaws.com/CAR+WORLD+WEBSITE+STILLS/QUUARUX+EARRINGS/q+earrings+main.png",
      "https://cw-merch-images.s3.amazonaws.com/CAR+WORLD+WEBSITE+STILLS/QUUARUX+EARRINGS/q+earrings_1.png",
      "https://cw-merch-images.s3.amazonaws.com/CAR+WORLD+WEBSITE+STILLS/QUUARUX+EARRINGS/q+earrings_2.png"
    ],
    description_paragraphs: [
      "Show queen with these impressionistic danglers every day wherever you want to go. If Quuarux did the Gas Wars then so can you, bitch ;)"
    ],
    type: CWShoppingItemType["Art"],
    credits: [{
        text: "Made by Tara's Tiny Trinkets",
        url: "https://www.tarastinytrinkets.com/"
    }]
  },
  {
    title: 'Car World Emblem Earrings',
    price: 18,
    serverName: 'car world emblem earrings',
    images: [
      "https://cw-merch-images.s3.amazonaws.com/CAR+WORLD+WEBSITE+STILLS/LOGO+EARRINGS/logo+earrings+only.png",
    ],
    description_paragraphs: [
      "These simple logo studs represent both the planet and the movement. Wear them when you want."
    ],
    type: CWShoppingItemType["Art"]
  },
  {
    title: 'Attendant Pendant',
    price: 23,
    serverName: 'attendant pendant',
    images: [
      "https://cw-merch-images.s3.amazonaws.com/CAR+WORLD+WEBSITE+STILLS/ATTENDANT+PENDANT/attendant+pendant+only.png",
    ],
    description_paragraphs: [
      "Wear an Attendant around your neck to claim your role in The Attendants Revolution. Together, we can end their genocide."
    ],
    type: CWShoppingItemType["Art"],
    credits: [{
        text: "Made by Tara's Tiny Trinkets",
        url: "https://www.tarastinytrinkets.com/"
    }]
  },
  {
    title: 'Attendant Sponsorship Cert.',
    price: 9,
    serverName: 'attendant sponsorship',
    images: [
      "https://cw-merch-images.s3.amazonaws.com/CAR+WORLD+WEBSITE+STILLS/ATTENDANT+SPONSORSHIP+CERTIFICATES/attendant+sponshorship+card+only.png"
    ],
    description_paragraphs: [
      "One of these certificates guarantees your explicit responsibility and continuous financial support to insure the survival of the pictured Attendant. Includes real body hair collected from the Attendant in Car World.",
    ],
    type: CWShoppingItemType["Art"],
    credits: [{
        text: "Artwork by A.T. Pratt",
        url: "https://atpratt.net/"
    }]
  },
  {
    title: 'Devotion Candle',
    price: 12,
    serverName: 'william banks devotional candle',
    images: [
      "https://cw-merch-images.s3.amazonaws.com/CAR+WORLD+WEBSITE+STILLS/CANDLE/william+candle+only.png"
    ],
    description_paragraphs: [
      "Light up a Devotion Candle to fill a room with the scent of love for William Banks.",
    ],
    credits: [{text: "", url: ""}],
    type: CWShoppingItemType["Art"]
  },
  {
    title: 'Car World Water',
    price: 4.50,
    serverName: 'car world water',
    images: [
      "https://cw-merch-images.s3.amazonaws.com/CAR+WORLD+WEBSITE+STILLS/CAR+WORLD+WATER/car+world+water+only.png"
    ],
    description_paragraphs: [
      "Water from Car World has the unique ability to detect Mechanics. Spray or toss the contents of this vial onto the skin of a Mechanic to revert their body back to a worm as it appears in Car World."
    ],
    type: CWShoppingItemType["Art"]
  },
]
