import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-admintable',
  templateUrl: './admintable.component.html',
  styleUrls: ['./admintable.component.scss'],
})
export class AdmintableComponent implements OnInit {
  constructor(private readonly adminTableService: ServicesService) {}

  ngOnInit(): void {}
}
