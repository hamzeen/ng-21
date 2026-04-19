export interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string;
  ingredients: string[];
  steps: string[];
  time: number;
}
