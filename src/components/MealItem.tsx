// handles rendering of a single meal item
import React from "react";
import { type Meal } from "../types";

export default function MealItem({ meal }: { meal: Meal }) {
  const ingredients = Array.from({ length: 20 }, (_, i) => i + 1)
    .map((n) => {
      const ingredient = meal[`strIngredient${n}`];
      const measure = meal[`strMeasure${n}`];
      return ingredient && ingredient.trim()
        ? `${ingredient} – ${measure || ""}`
        : null;
    })
    .filter(Boolean); // removes all the null values

  return (
    <li key={meal.idMeal} style={{ padding: "1rem 0", borderBottom: "1px solid #ccc" }}>
      <h2>{meal.strMeal}</h2>
      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        style={{ width: "350px", display: "block", marginBottom: "1rem" }}
      />
      <p>{meal.strInstructions}</p>
      <h3>Ingredients</h3>
      <ul>
        {ingredients.map((text, idx) => (
          <li key={idx}>{text}</li>
        ))}
      </ul>
    </li>
  );
} 
