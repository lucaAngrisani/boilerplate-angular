export class User {
  id: string;

  firstName: string;
  lastName: string;
  email: string;

  code: string;

  constructor(user?: User) {
    this.id = user?.id;

    this.firstName = user?.firstName;
    this.lastName = user?.lastName;
    this.email = user?.email;

    this.code = user?.code;
  }

}

/** suggest to use https://www.npmjs.com/package/mapper-factory */
