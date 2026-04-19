import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';
import { RecipeCardComponent } from '../recipe-card/recipe-card.component';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RecipeCardComponent],
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css',
})
export class RecipeListComponent implements OnInit {
  recipes = signal<Recipe[]>([]);
  searchQuery = signal('');

  filteredRecipes = computed(() =>
    this.recipes().filter((recipe) =>
      recipe.title.toLowerCase().includes(this.searchQuery().toLowerCase()),
    ),
  );

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.recipes.set(this.recipeService.getRecipes());
  }
}
