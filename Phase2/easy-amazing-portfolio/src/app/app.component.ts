import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  show:boolean = false;
  showLogin:boolean = false;
  showSignup:boolean = true;
  showPortfolio:boolean = false;

  loginSuccess:string = "";
  user:string ="";
  pwd:string = "";
  fname:string = "";
  lname:string = "";

  contacts:[string,number][] = [];

  title = 'easy-amazing-portfolio';

  toggle(){
    this.show = !this.show;
  }
  createUser(signupRef:NgForm):void{
    let signup = signupRef.value;


    this.showLogin = true;
    this.showSignup = false;
    this.user = signup.username;
    this.pwd = signup.password;
    this.fname = signup.fname;
    this.lname = signup.lname;
  }

  checkUser(loginRef:NgForm){
    let login = loginRef.value;

    if(login.username == this.user && login.password == this.pwd){
      console.log("hell yes"); 
      this.showPortfolio = true;
      this.showLogin = false;
      this.loginSuccess = "";
    }
    else{
      this.loginSuccess = "Try again!";
      console.log(login.username + " is username " + login.password + " is passowrd")
    }
  }

  logout(){
    this.showPortfolio = false;
    this.showLogin = true;
  }
  backToLogin(){
    this.showSignup = false;
    this.showLogin = true;
  }
  backToSignup(){
    this.showSignup = true;
    this.showLogin = false;
  }
  saveContact(contactRef:any, contactNumRef:any){
    this.contacts.push([contactRef.value, contactNumRef.value]);
  }
}
