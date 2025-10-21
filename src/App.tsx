import MealList from "./components/MealList";

export default function App() {
  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
      <h1>Yummy Canadian Recipes</h1>
      <MealList />
    </div>
  );
}