import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  token:string;

  constructor(private router:Router) { }

  login(email:string, password:string){
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password).
      then(  
          response =>{
            auth.currentUser?.getIdToken().then(
              token => {
                console.log(token);
                this.token = token;
                this.router.navigate(['/']);
              } 
            )
          }
      )
  }

  getIdToken(){
    return this.token;
  }

  isAutenticado(){
    return this.token !=  null && this.token != '';
  }
  
  logout(){
    getAuth().signOut().then( () => {
      this.token = '';
      this.router.navigate(['/login']);

    }).catch( error => console.log("error logout", error)
    )
  }
}
