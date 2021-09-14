import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AccountService } from './_services/account.service';
import { User } from './_models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
 
  title = 'Dating App';
  private apiURL = 'https://localhost:5001/api/users';
  users:any;

  constructor(private accountservice: AccountService) {

  }

  ngOnInit(): void {
   
   this.setCurrentUser();
  }

  setCurrentUser() {
      const user: User = JSON.parse(localStorage.getItem('user')!);
      this.accountservice.setCurrentUser(user);
  }
  
  
}
