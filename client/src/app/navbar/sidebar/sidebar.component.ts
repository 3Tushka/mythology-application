import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  urlPath: string | null | undefined;

  constructor(private readonly router: ActivatedRoute) {}

  ngOnInit(): void {
    this.router.paramMap.subscribe(() => {
      this.urlPath = this.router.snapshot.url[1].path;
    });
  }
}
