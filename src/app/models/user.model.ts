import { Address } from './address.model';

export interface UserDTO {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  code: string;
  address?: Address;
}

export class User implements UserDTO {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  code: string;
  address?: Address;

  constructor(dto: UserDTO) {
    this.id = dto.id;
    this.firstName = dto.firstName;
    this.lastName = dto.lastName;
    this.email = dto.email;
    this.code = dto.code;
    this.address = dto.address ? new Address(dto.address) : undefined;
  }
}
