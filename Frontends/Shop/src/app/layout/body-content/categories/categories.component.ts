import { Component, OnInit } from '@angular/core';
import { ToggleInViewDirective } from '../../../shared/directives/toggleInViewClass';
import { TypingEffectDirective } from '../../../shared/directives/typingEffect';
import { CategoriesService } from '../../../shared/services/categories/categories.service';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../environment/environment.prod';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [TypingEffectDirective, ToggleInViewDirective, CommonModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {

  baseImgUrl = environment.baseImageUrl;

  constructor(
    public categoriesService: CategoriesService,
  ) { }

  ngOnInit(): void {
    this.categoriesService.refreshAllCategories();
  }

}
