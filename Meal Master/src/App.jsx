import { useEffect, useState } from "react";
import MealCard from "./components/MealCard";
import "./App.css";

export default function App() {
  const [meals, setMeals] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  async function fetchMeals(query = "") {
    setLoading(true);

    try {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
      );
      const data = await res.json();

      setMeals(data.meals || []);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  }

  useEffect(() => {
    fetchMeals();
  }, []);

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchMeals(search);
    }, 500); // debounce

    return () => clearTimeout(delay);
  }, [search]);

  return (
    <div className="app">
      <h1>🍽️ Meals Explorer</h1>

      <input
        type="text"
        placeholder="Search meals..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading && <p>Loading...</p>}

      <div className="container">
        {meals.length === 0 && !loading ? (
          <p>No meals found</p>
        ) : (
          meals.map((meal) => (
            <MealCard key={meal.idMeal} meal={meal} />
          ))
        )}
      </div>
    </div>
  );
}