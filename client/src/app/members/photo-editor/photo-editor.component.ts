import { Component, OnInit, Input } from '@angular/core';
import { Member } from 'src/app/_models/member';
import { FileUploadModule, FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';
import { AccountService } from 'src/app/_services/account.service';
import { take } from 'rxjs/operators';
import { Subscriber } from 'rxjs';
import { User } from 'src/app/_models/user';
import { Photo } from 'src/app/_models/photo';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {
  @Input()
  member: Member | undefined;
  uploader!: FileUploader;
  hasBaseDropZoneOver = false;
  baseurl = environment.apiUrl;
  user!: User;

  constructor(private accountService: AccountService, private memberService: MembersService) { 
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
  }

  ngOnInit(): void {
    this.intializeUploader();
  }

  fileOverBase(e: any){
    this.hasBaseDropZoneOver = e;
  }

  setMainPhoto(photo: Photo){
    this.memberService.setMainPhoto(photo.id).subscribe(() => {
      this.user.photoUrl = photo.url
      this.accountService.setCurrentUser(this.user);
      this.member!.photoUrl = photo.url;
      this.member!.photos.forEach(p => {
        if (p.isMain) p.isMain = false;
        if (p.id == photo.id) {
          p.isMain = true;
        }

      });
    })
  }

  deletePhoto(photo: Photo) {

    this.memberService.deletePhoto(photo.id).subscribe(() => {
      this.member!.photos = this.member!.photos.filter(x => x.id !== photo.id);
    })
  }

  intializeUploader() {

    this.uploader =  new FileUploader ({
      url: this.baseurl+ "users/add-photo",
      authToken: "Bearer " + this.user.token,
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024

    });

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    }

    this.uploader.onSuccessItem = (file, response, status, headers) => {
      if(response){
        const photo = JSON.parse(response);
        this.member!.photos.push(photo);
      }
    }
  }

}
