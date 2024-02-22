import { Component } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent {
  articleArray = [
    { category: 'creatures' },
    { category: 'spirits' },
    { category: 'gods' },
    { category: 'Монстр' },
    { category: 'Дух' },
    { category: 'Бог' },
  ];

  selectedCategory: string | null;

  filterCategory(category: string): void {
    this.selectedCategory = category;
    console.log(this.selectedCategory);
  }

  showAll() {
    this.selectedCategory = null;
  }
}
