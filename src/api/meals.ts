import { type Meal, type MealSummary } from "../types";

export async function fetchMeals(): Promise<MealSummary[]> {
  const res = await fetch(
    "https://www.themealdb.com/api/json/v1/1/filter.php?a=Canadian"
  );
  const { meals } = (await res.json()) as {
    meals: MealSummary[];
  };
  return meals;
}

export async function fetchMealDetails(idMeal: string): Promise<Meal> {
  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
  );
  const { meals } = (await res.json()) as { meals: Meal[] };
  return meals[0];
}