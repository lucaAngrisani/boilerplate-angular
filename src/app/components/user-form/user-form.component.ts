import { JsonPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import {
  form,
  Field,
  required,
  email,
  debounce,
  FieldTree,
  min,
  minLength,
  applyEach,
  SchemaPathTree,
} from '@angular/forms/signals';
import { Address } from 'src/app/models/address.model';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  imports: [Field, JsonPipe],
})
export class UserFormComponent {
  protected userListModel = signal<Partial<User>[]>([]);
  protected usersModel = signal<{ users: Partial<User>[] }>({
    users: this.userListModel(),
  });
  protected userFormList = form(this.usersModel, (schemaPath) => {
    applyEach(schemaPath.users, ItemSchema);
  });

  constructor() {
    // INIT VALUES

    const user = {
      firstName: 'John',
      lastName: 'Doe',
      email: '',
      address: new Address({
        street: '123 Main St',
        city: 'Anytown',
        state: 'CA',
        zip: '12345',
      }),
    };

    this.userListModel.set([user]);
  }

  public submit(): void {
    if (this.userFormList().valid()) {
      console.log('Form Submitted', this.userFormList().value());
    } else {
      console.log('Form is invalid');
    }
  }

  public updateFormValue(
    userForm: FieldTree<Partial<User>, string | number>
  ): void {
    userForm().value.update((u) => ({
      ...u,
      firstName: 'Jane',
      lastName: 'Smith',
    }));
  }

  public addUserForm(): void {
    this.usersModel.update((form) => {
      form.users.push({
        firstName: '',
        lastName: '',
        email: '',
        address: new Address({
          street: '',
          city: '',
          state: '',
          zip: '',
        }),
      });
      return form;
    });
  }

  public deleteUserForm(index: number): void {
    this.usersModel.update((form) => {
      form.users.splice(index, 1);
      return form;
    });
  }
}

function ItemSchema(item: SchemaPathTree<Partial<User>>) {
  debounce(item.email, 500);
  email(item.email);
  required(item.email);
  required(item.firstName);
  required(item.lastName);
}
