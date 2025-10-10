import { useEffect, useState } from "react";

import "./App.css";

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strInstructions: string;
  [key: `strIngredient${number}`]: string | null;
  [key: `strMeasure${number}`]: string | null;
}

function App() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

   useEffect(() => {
    loadMeals();
  }, []);


const loadMeals = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        "https://www.themealdb.com/api/json/v1/1/filter.php?a=Canadian"
      );
      const { meals } = (await res.json()) as {
        meals: { idMeal: string; strMeal: string; strMealThumb: string }[];
      };

      const detailedMeals: Meal[] = [];

      for (const meal of meals) {
        const res = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`
        );
        const { meals: fullDetails } = (await res.json()) as { meals: Meal[] };
        detailedMeals.push(fullDetails[0]);
      }

      setMeals(detailedMeals);
    } catch (err) {
      setError("Failed to load meals");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "system-ui, sans-serif" }}>
      <h1>Canadian Recipes</h1>
      <button onClick={loadMeals} disabled={loading}>
        {loading ? "Loading..." : "Reload"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul style={{ listStyle: "none", padding: 0 }}>
        {meals.map((meal) => (
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
              {Array.from({ length: 20 }, (_, i) => i + 1)
                .map((n) => {
                  const ingredient = meal[`strIngredient${n}`];
                  const measure = meal[`strMeasure${n}`];
                  return ingredient && ingredient.trim()
                    ? `${ingredient} – ${measure || ""}`
                    : null;
                })
                .filter(Boolean) //removes all the null values
                .map((text, idx) => <li key={idx}>{text}</li>)}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
