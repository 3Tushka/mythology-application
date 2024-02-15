import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../services.service';

@Component({
  selector: 'app-users-admin',
  templateUrl: './users-admin.component.html',
  styleUrls: ['./users-admin.component.scss'],
})
export class UsersAdminComponent implements OnInit {
  users: any;

  constructor(private readonly usersAdminService: ServicesService) {}

  ngOnInit(): void {
    this.usersAdminService.getUsers().subscribe((users) => {
      this.users = users;
      console.log(this.users);
    });
  }
}
