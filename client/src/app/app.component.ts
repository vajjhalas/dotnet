import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
 
  title = 'Dating App';
  private apiURL = 'https://localhost:5001/api/users';
  users:any
  constructor(private http: HttpClient) {

  }

  ngOnInit(): void {
   this.getUsers();
  }

  getUsers() {
    this.http.get(this.apiURL).subscribe( response => {
      this.users = response;
    }, error => {
      console.log(error);
    })
  }
  
}
