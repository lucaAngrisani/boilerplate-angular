import { Address } from "./address.model";

export class User {
  id: string;

  firstName: string;
  lastName: string;
  email: string;

  code: string;

  address?: Address;

  constructor(user?: User) {
    this.id = user?.id;

    this.firstName = user?.firstName;
    this.lastName = user?.lastName;
    this.email = user?.email;

    this.code = user?.code;

    this.address = user?.address ? new Address(user.address) : new Address();
  }

}

/** suggest to use https://www.npmjs.com/package/mapper-factory */
