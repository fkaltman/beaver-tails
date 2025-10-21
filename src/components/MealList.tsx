//handles fetching and rendering the full list of meals
import React, { useEffect } from "react";
import { type Meal } from "../types";
import MealItem from "./MealItem";
import { fetchMeals, fetchMealDetails } from "../api/meals";

export default function MealList( ) {
  const [meals, setMeals] = React.useState<Meal[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  async function loadMeals() {
    try {
      setLoading(true);
      setError(null);
      const summaries = await fetchMeals();
      const details: Meal[] = [];

      for (const summary of summaries) {
        const meal = await fetchMealDetails(summary.idMeal);
        details.push(meal);
      }

      setMeals(details);
    } catch (e) {
      setError("Failed to load meals");
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadMeals();
  }, []);

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (loading) return <p>Loading meals...</p>; 
  

  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {meals.map((meal) => (
        <MealItem key={meal.idMeal} meal={meal} />
      ))}
    </ul>
  );
}