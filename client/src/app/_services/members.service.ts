import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Member } from '../_models/member';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseurl = environment.apiUrl;
  members: Member[] = [];

  constructor(private http: HttpClient) { 

  }

  getMembers(): Observable<Member[]>{
    if (this.members.length > 0) return of(this.members);
    return this.http.get<Member[]>(this.baseurl + 'users').pipe(
      map(members => {
        this.members = members;
        return members;
      })
    )
  }

  getMember(username: string) {
    const member = this.members.find( x => x.username === username)
    if(member != undefined) return of(member);
    return this.http.get<Member>(this.baseurl + 'users/' + username);
  }

  updateMember(member: Member) {
    return this.http.put(this.baseurl + 'users', member).pipe(
      map(() => {
        const index = this.members.indexOf(member);
        if (index !== -1 && index < this.members.length) this.members[index] = member;
    })
    )
  }

  setMainPhoto(photoId: number) {
    return this.http.put(this.baseurl + 'users/set-main-photo/'+ photoId, {});
  }

  deletePhoto(photoId: number){
    return this.http.delete(this.baseurl + 'users/delete-photo/'+ photoId);
  }
}
