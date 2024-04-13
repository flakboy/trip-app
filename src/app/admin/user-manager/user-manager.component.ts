import { Component, OnInit } from '@angular/core';
import { UserManagementService } from '../user-management.service';

@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.css']
})
export class UserManagerComponent implements OnInit {
  users: any;

  constructor(private userMgr: UserManagementService) {}
  ngOnInit(): void {
    this.userMgr.getUsers().subscribe(data => {
      this.users = data;
    })
  }
}
