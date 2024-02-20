import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { ServicesService } from '../../services.service';
import { ArticleInterface } from '../../interfaces/article.interface';

@Component({
  selector: 'app-articles-admin',
  templateUrl: './articles-admin.component.html',
  styleUrls: ['./articles-admin.component.scss'],
})
export class ArticlesAdminComponent implements OnInit {
  articles$!: Observable<any>;
  form: any;

  isAddButtonClicked = false;

  searchValue = '';
  searchedArticle: ArticleInterface[] = [];
  seartchForm = this.formBuilder.group({
    searchValue: '',
  });

  constructor(
    private articleAdminService: ServicesService,
    private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient,
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: '',
      content: '',
      category: '',
      image: [null],
      temper: '',
      location: '',
      appointment: '',
      amulet: '',
      fairing: '',
      magicaItem: '',
      origin: '',
    });

    this.fetchSearchData();
  }

  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.get('image').setValue(file);
    }
  }

  submit(): void {
    const formData = new FormData();
    formData.append('title', this.form.get('title').value);
    formData.append('content', this.form.get('content').value);
    formData.append('category', this.form.get('category').value);
    formData.append('image', this.form.get('image').value);
    formData.append('temper', this.form.get('temper').value);
    formData.append('location', this.form.get('location').value);
    formData.append('appointment', this.form.get('appointment').value);
    formData.append('amulet', this.form.get('amulet').value);
    formData.append('fairing', this.form.get('fairing').value);
    formData.append('magicaItem', this.form.get('magicaItem').value);
    formData.append('origin', this.form.get('origin').value);

    this.http.post('http://localhost:1268/articles', formData).subscribe(() => {
      setTimeout(() => {
        this.isAddButtonClicked = false;
      }, 2000);
    });
  }

  fetchSearchData(): void {
    this.articleAdminService
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
