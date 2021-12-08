import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Member } from '../_models/member';



@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseurl = environment.apiUrl;
  constructor(private http: HttpClient) { 

  }

  getMembers(): Observable<Member[]>{
    return this.http.get<Member[]>(this.baseurl + 'users');
  }

  getMember(username: string) {
    return this.http.get<Member>(this.baseurl + 'users/' + username);
  }
}
