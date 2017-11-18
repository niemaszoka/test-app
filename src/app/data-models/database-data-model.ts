import {User} from "./user-data-model";

export class Database {
  public data: {
    users: Array<User>,
    [id: string]: {}
  };
}
