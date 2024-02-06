import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserInfo } from './interfaces/UserInfo.interface';
import { FormBuilder, FormGroup } from '@angular/forms';
import { getRoleFromLocalStorage } from '../functions/getRoleFromLocalStorage';
import { UserInfoUpdateDto } from './dto/UserInfoUpdate.dto';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor(
    private profileService: ServicesService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
  ) {}

  id: string | null | undefined;
  data: UserInfo;
  updateUserInfo: FormGroup;
  userInfoDto: UserInfoUpdateDto;

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');

      if (this.id) {
        getRoleFromLocalStorage.call(this);

        this.profileService.getUserInfo(this.id).subscribe((user) => {
          this.data = user;
        });
      }

      this.updateUserInfo = this.fb.group({
        email: '',
        password: '',
      });
    });
  }

  updateUserInfoModel(): void {
    const updateDto: UserInfo = this.updateUserInfo.value;
    console.log('updateDto', updateDto);
    const parsedId = this.id ?? '';
    this.profileService.updateUserInfo(parsedId, updateDto).subscribe(
      (response) => {
        console.log('Update successful', response);
        setTimeout(() => {
          this.updateUserInfo.reset(); // Reset the form after a delay
          this.router
            .navigateByUrl('/', { skipLocationChange: true })
            .then(() => {
              this.router.navigate([`/profile/${this.id}`]);
            });
        }, 300);
      },
      (error) => {
        console.error('Error updating', error);
      },
    );
  }
}
