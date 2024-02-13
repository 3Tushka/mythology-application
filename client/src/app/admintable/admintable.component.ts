import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-admintable',
  templateUrl: './admintable.component.html',
  styleUrls: ['./admintable.component.scss'],
})
export class AdmintableComponent implements OnInit {
  users: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private readonly adminTableService: ServicesService,
    private fb: FormBuilder,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.adminTableService.getUsers().subscribe((users) => {
      this.users = users;
    });
  }
}
