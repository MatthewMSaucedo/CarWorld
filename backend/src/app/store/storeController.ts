import { StoreServiceInterface } from './storeServiceInterface';

export class StoreController {
  storeService: StoreServiceInterface;

  constructor(storeService) {
    this.storeService = storeService;
  }

  listItems(req, res) {
    const listItemsResponse = null
    return res.status(loginResponse.code).send(listItemsResponse)
  }

  purchaseItem(req, res) {
    const purchaseItemsResponse = null
    return res.status(200).send(purchaseItemsResponse)
  }
}
