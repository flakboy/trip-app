import { Injectable } from '@angular/core';

import { AngularFireAuth } from "@angular/fire/compat/auth"
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from "rxjs";
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: BehaviorSubject<any> = new BehaviorSubject(null);
  public userRoles: any = {
    admin: false,
    manager: false,
    client: false,
    guest: true,
  };

  isBanned!: boolean;
  private username: string = "";

  constructor (
    private angularFireAuth: AngularFireAuth,
    private router: Router,
    private db: AngularFirestore
    ) {
      this.angularFireAuth.authState.subscribe((user: any) => {
        if (user) {
          let data = user!["_delegate"]!;
          this.userData.next(data);
          //localStorage jest chyba niepotrzebne jak używam firebase?
          // localStorage.setItem('user', JSON.stringify(this.userData.getValue()));
        } else {
          this.userData.next(null);
          // localStorage.setItem('user', 'null');
        }
        this.setUserData();
        
        //tak można wyciągnąć dane z localStorage
        //JSON.parse(localStorage.getItem('user')!); 
      });
    }
  
    // Sign in with email/password
    signIn(email: string, password: string) {
      return this.angularFireAuth.setPersistence("local").then(()=> {
        return this.angularFireAuth.signInWithEmailAndPassword(email, password)
        .then(result => {
          this.setUserData();
          this.angularFireAuth.authState.subscribe((user) => {
            if (user) {
              this.router.navigate(['']);
            }
          });
        })
        .catch((error) => {
          window.alert(error.message);
        });
      });
    }
  
    isLoggedIn(): boolean {
      return this.userData.getValue() !== null;
    }
  
    setUserData(): void {
      if (this.userData.getValue() !== null) {
        this.db.collection<any>("users").doc(this.userData.getValue().uid).get().subscribe((result:any) => {
          let {isBanned, roles, username} = result.data();
          this.userRoles = roles;
          this.isBanned = isBanned;
          this.username = username;
        });
      } else {
        this.userRoles = {
          admin: false,
          manager: false,
          client: false,
          guest: true,
        }
      }
      console.log("ustawiono dane na", this.userRoles);

    }
  
    getUserData(): BehaviorSubject<any> {
      return this.userData;
    }

    getUserName(): string {
      return this.username;
    }

    getCurrentUserId(): string {
      return this.userData.getValue().uid;
    }

    signOut() {
      return this.angularFireAuth.signOut().then(() => {
        localStorage.removeItem('user');
        this.router.navigate(['']);
      });
    }

    signUp(username: string, email: string, password: string) {
      this.angularFireAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => { 
        window.alert("Pomyślnie utworzono konto!");
        this.db.collection<any>("users").doc(result.user!.uid).set({
          "roles": {
            "admin": false,
            "manager": false,
            "client": true,
            "guest": true
          },
          "isBanned": false,
          "username": username
        });
        this.router.navigate(['']);
      })
      .catch((error) => { 
        window.alert(error.message);
      });
    }

    isAdmin(): boolean {
      return this.userRoles.admin === true;
    }
    
    isManager(): boolean {
      return this.userRoles.manager === true;
    }
    
    isClient(): boolean {
      return this.userRoles.client === true;
    }

    getAuthenticated(): Observable<any> {
      return this.angularFireAuth.authState;
    }
}
