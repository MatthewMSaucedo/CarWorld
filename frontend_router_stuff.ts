/* TODO:
 * Move this to the cw-navbar dir, in the service.
 */
export class CarWorldNavbarTab {
  title: string;
  path: string;
  condition = true;

  constructor(title: string, path: string, condition?: boolean) {
    this.title = title;
    this.path = path;
    if (condition !== undefined) this.condition = condition
  }
}

export default function Home() {

  /* const cwNavbarService = CarWorldNavbarService.new() */
