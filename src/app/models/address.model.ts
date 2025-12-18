export class Address {
  street: string;
  city: string;
  state: string;
  zip: string;

  constructor(user?: Address) {
    this.street = user?.street;
    this.city = user?.city;
    this.state = user?.state;
    this.zip = user?.zip;
  }
}
