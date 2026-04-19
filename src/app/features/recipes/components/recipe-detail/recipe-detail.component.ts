import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../models/recipe.model';

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css',
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      this.recipe = this.recipeService.getRecipeById(id);
    });
  }

  goBack(): void {
    this.router.navigate(['/recipes']);
  }
}
