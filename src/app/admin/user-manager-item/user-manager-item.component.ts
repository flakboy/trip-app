import { Component, Input } from '@angular/core';
import { UserManagementService } from '../user-management.service';

@Component({
  selector: 'app-user-manager-item',
  templateUrl: './user-manager-item.component.html',
  styleUrls: ['./user-manager-item.component.css']
})
export class UserManagerItemComponent {
  @Input() uid!: string;
  @Input() username!: string;
  @Input() isBanned!: boolean;
  @Input() roles!: {
    admin: boolean;
    manager: boolean;
    client: boolean;
  };
  editMode: boolean = false;
  constructor(private userMgr: UserManagementService) {

  }

  toggleEdit() {
    this.editMode = !this.editMode;
  }

  saveChanges() {
    this.userMgr.updateUser(this.uid, {
      roles: {...this.roles, guest: true},
      isBanned: this.isBanned
    });
  }
}
