import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  @Output() cancelRegister = new EventEmitter();
  model:any = {};

  constructor(private accountService:AccountService) { }

  ngOnInit(): void {
  }

  register(){
    console.log(this.model);
    if (this.model.username != null && this.model.password != null) {
        this.accountService.registerUser(this.model).subscribe((userResponse) => {
        console.log("Register user API response:",JSON.stringify(userResponse))
        this.cancel();
        }, error => {
          console.error();
        })
    }
  }

  cancel(){
    console.log("cancelled");
    this.cancelRegister.emit(false);
  }

}
