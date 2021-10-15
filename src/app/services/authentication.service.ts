import { Injectable } from "@angular/core";
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  itemListRef: AngularFireList<any>;
  itemngRef: AngularFireObject<any>;
  constructor(
    public afAuth: AngularFireAuth,
    private db: AngularFireDatabase
  ) { }
  // Get Single
  getProduct(id: string) {
    this.itemngRef = this.db.object('/products/' + id);
    return this.itemngRef;
  }

  // Get List
  getProductList() {
    this.itemListRef = this.db.list('/products');
    return this.itemListRef;
  }
  registerUser(value) {
    return new Promise<any>((resolve, reject) => {

      this.afAuth.createUserWithEmailAndPassword(value.email, value.password)
        .then(
          res => resolve(res),
          err => reject(err))
    })

  }

  loginUser(value) {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.signInWithEmailAndPassword(value.email, value.password)
        .then(
          res => resolve(res),
          err => reject(err))
    })
  }

  logoutUser() {
    return new Promise((resolve, reject) => {
      if (this.afAuth.currentUser) {
        this.afAuth.signOut()
          .then(() => {
            console.log("LOG Out");
           // resolve();
          }).catch((error) => {
            reject();
          });
      }
    })
  }
   
  userDetails() {
    return this.afAuth.user
  }
}