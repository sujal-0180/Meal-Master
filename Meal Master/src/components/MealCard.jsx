export default function MealCard({ meal }) {
  return (
    <div className="card">
      <img src={meal.strMealThumb} alt={meal.strMeal} />
      <h3>{meal.strMeal}</h3>
    </div>
  );
}