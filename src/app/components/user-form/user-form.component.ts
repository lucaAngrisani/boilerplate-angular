import { JsonPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import {
  form,
  Field,
  required,
  email,
  debounce,
  FieldTree,
  applyEach,
  SchemaPathTree,
  FormField,
} from '@angular/forms/signals';
import { User } from '../../models/user.model';
import { Address } from '../../models/address.model';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  imports: [FormField, JsonPipe],
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

  protected submit(): void {
    if (this.userFormList().valid()) {
      console.log('Form Submitted', this.userFormList().value());
    } else {
      console.log('Form is invalid');
    }
  }

  protected updateFormValue(
    userForm: FieldTree<Partial<User>, string | number>
  ): void {
    userForm().value.update((u) => ({
      ...u,
      firstName: 'Jane',
      lastName: 'Smith',
    }));
  }

  protected addUserForm(): void {
    this.usersModel.update(({ users }) => ({
      users: [
        ...users,
        {
          firstName: '',
          lastName: '',
          email: '',
          address: new Address({
            street: '',
            city: '',
            state: '',
            zip: '',
          }),
        },
      ],
    }));
  }

  protected deleteUserForm(index: number): void {
    this.usersModel.update(({ users }) => ({
      users: users.filter((_, i) => i !== index),
    }));
  }
}

function ItemSchema(item: SchemaPathTree<Partial<User>>) {
  debounce(item.email, 500);
  email(item.email);
  required(item.email);
  required(item.firstName);
  required(item.lastName);
}
