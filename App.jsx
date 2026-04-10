import { useEffect, useState } from "react";
import MealCard from "./components/MealCard";
import "./App.css";

export default function App() {
  const [meals, setMeals] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const [sort, setSort] = useState("");
  const [category, setCategory] = useState("");
  const [dark, setDark] = useState(false);

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
    }, 500);

    return () => clearTimeout(delay);
  }, [search]);

  let updatedMeals = [...meals];

  if (category) {
    updatedMeals = updatedMeals.filter(
      (meal) => meal.strCategory === category
    );
  }

  if (sort === "asc") {
    updatedMeals.sort((a, b) => a.strMeal.localeCompare(b.strMeal));
  } else if (sort === "desc") {
    updatedMeals.sort((a, b) => b.strMeal.localeCompare(a.strMeal));
  }

  return (
    <div className={dark ? "app dark" : "app"}>
      <h1>🍽️ Meals Explorer</h1>

      <input
        type="text"
        placeholder="Search meals..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div>
        <select onChange={(e) => setSort(e.target.value)}>
          <option value="">Sort</option>
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </select>

        <select onChange={(e) => setCategory(e.target.value)}>
          <option value="">All</option>
          <option value="Chicken">Chicken</option>
          <option value="Dessert">Dessert</option>
          <option value="Vegetarian">Vegetarian</option>
        </select>

        <button onClick={() => setDark(!dark)}>
          {dark ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      {loading && <p>Loading...</p>}

      <div className="container">
        {updatedMeals.length === 0 && !loading ? (
          <p>No meals found</p>
        ) : (
          updatedMeals.map((meal) => (
            <MealCard key={meal.idMeal} meal={meal} />
          ))
        )}
      </div>
    </div>
  );
}