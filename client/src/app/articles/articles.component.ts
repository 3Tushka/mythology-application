import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ServicesService } from '../services.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';

import { ArticleInterface } from '../interfaces/article.interface';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
})
export class ArticlesComponent implements OnInit {
  articles$!: Observable<any>;
  form!: FormGroup;

  jwtHelper = new JwtHelperService();

  isAddButtonClicked = false;

  searchValue = '';
  searchedArticle: ArticleInterface[] = [];
  seartchForm = this.fb.group({
    searchValue: '',
  });

  filter = {
    gods: false,
    creatures: false,
    myths: false,
  };

  constructor(
    private articlesService: ServicesService,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.fetchSearchData();
  }

  fetchSearchData(): void {
    this.articlesService
      .getSearchArticles(this.searchValue)
      .subscribe((res) => {
        this.searchedArticle = res;
        this.seartchForm.reset();
      });
  }

  onSearchSubmit(): void {
    this.searchValue = this.seartchForm.value.searchValue ?? '';
    this.fetchSearchData();
  }

  onAddButtonClick(): void {
    this.isAddButtonClicked = true;
  }

  onCloseButtonClick(): void {
    this.isAddButtonClicked = false;
  }
}
