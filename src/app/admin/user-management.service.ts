import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../shared/services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class UserManagementService {
  users: BehaviorSubject<any> = new BehaviorSubject(null);
  constructor(
    private auth: AuthService,
    private angularFireAuth: AngularFireAuth,
    private db: AngularFirestore
  ) {
    this.db.collection("users").valueChanges({idField: "uid"}).subscribe(data => {
      this.users.next(data);
    })
  }

  getUsers() {
    return this.users;
  }

  updateUser(uid: string, info: {}) {
    this.db.collection("users").doc(uid).update(info);
  }
}
