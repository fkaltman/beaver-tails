// handles rendering of a single meal item
import { useMemo } from "react";
import { type Meal } from "../types";

const Max_INGREDIENTS = 20;

export default function MealItem({ meal }: { meal: Meal }) {
  const ingredients = Array.from({ length: Max_INGREDIENTS }, (_, i) => i + 1)
    .map((n) => {
      const ingredient = meal[`strIngredient${n}`];
      const measure = meal[`strMeasure${n}`];
      return ingredient && ingredient.trim()
        ? `${ingredient} – ${measure || ""}`
        : null;
    })
    .filter(Boolean);
  
  return (
    <li className="meal-item">
      <h2>{meal.strMeal}</h2>
      <div className="pic-and-instructions">
      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        className="meal-image"
      />
      <p className="meal-instructions">{meal.strInstructions}</p>
      </div>
      <h3>Ingredients</h3>
      <ul className="ingredients-list">
        {ingredients.map((text, idx) => (
          <li key={idx}>{text}</li>
        ))}
      </ul>
    </li>
  );
} 
