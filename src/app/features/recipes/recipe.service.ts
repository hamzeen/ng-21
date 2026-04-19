import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private recipes: Recipe[] = [
    {
      id: '1',
      title: 'Spaghetti Carbonara',
      description: 'Classic Italian pasta with creamy sauce',
      image: 'https://images.unsplash.com/photo-1546549032-9571cd6b27df?w=600&h=500&fit=crop',
      ingredients: [
        '400g spaghetti',
        '200g bacon',
        '4 eggs',
        '100g parmesan cheese',
        'Salt and pepper',
      ],
      steps: [
        'Cook spaghetti in salted boiling water',
        'Fry bacon until crispy',
        'Mix eggs with parmesan',
        'Combine pasta with bacon',
        'Add egg mixture off heat',
      ],
      time: 25,
    },
    {
      id: '2',
      title: 'Margherita Pizza',
      description: 'Fresh mozzarella and basil on tomato sauce',
      image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=600&h=500&fit=crop',
      ingredients: [
        'Pizza dough',
        '200ml tomato sauce',
        '250g mozzarella',
        'Fresh basil',
        'Olive oil',
      ],
      steps: [
        'Preheat oven to 220°C',
        'Spread tomato sauce on dough',
        'Add mozzarella',
        'Bake for 12-15 minutes',
        'Top with basil and olive oil',
      ],
      time: 30,
    },
    {
      id: '3',
      title: 'Caesar Salad',
      description: 'Crisp romaine with parmesan and croutons',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=500&fit=crop',
      ingredients: [
        'Romaine lettuce',
        'Parmesan cheese',
        'Croutons',
        'Caesar dressing',
        'Lemon juice',
      ],
      steps: [
        'Wash and chop romaine',
        'Make or use Caesar dressing',
        'Toss lettuce with dressing',
        'Add croutons and parmesan',
        'Serve immediately',
      ],
      time: 15,
    },
    {
      id: '4',
      title: 'Chocolate Cake',
      description: 'Rich and decadent chocolate dessert',
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&h=500&fit=crop',
      ingredients: [
        '200g flour',
        '100g cocoa powder',
        '200g sugar',
        '3 eggs',
        '100ml milk',
        '100ml oil',
      ],
      steps: [
        'Preheat oven to 180°C',
        'Mix dry ingredients',
        'Add wet ingredients',
        'Pour into greased pan',
        'Bake for 30-35 minutes',
      ],
      time: 50,
    },
  ];

  getRecipes(): Recipe[] {
    return this.recipes;
  }

  getRecipeById(id: string): Recipe | undefined {
    return this.recipes.find((r) => r.id === id);
  }
}
