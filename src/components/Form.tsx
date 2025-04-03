import { ChangeEvent, FormEvent, useMemo, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { categories } from "../data/categories";
import { Activity } from "../types";
import { useActivity } from "../hooks/useActivity";

const INITIAL_ACTIVITY = {
  id: uuidv4(),
  category: 1,
  name: "",
  calories: 0,
};
export default function Form() {
  const { state, dispatch } = useActivity();
  const [activity, setActivity] = useState<Activity>(INITIAL_ACTIVITY);
  useEffect(() => {
    if (state.activeId) {
      const selectedActivity = state.activities.filter(
        (activity) => activity.id === state.activeId
      )[0];
      setActivity(selectedActivity);
    }
  }, [state.activeId]);

  const isValidActivity = useMemo(() => {
    const { calories, name } = activity;
    return name.trim() !== "" && calories > 0;
  }, [activity]);
  const handleChange = (
    e: ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const isNumberField = ["category", "calories"].includes(e.target.id);
    setActivity({
      ...activity,
      [e.target.id]: isNumberField ? +e.target.value : e.target.value,
    });
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({ type: "save-activity", payload: { newActivity: activity } });
    setActivity({ ...INITIAL_ACTIVITY, id: uuidv4() });
  };

  return (
    <form
      className="space-y-5 bg-white rounded-lg shadow p-10"
      onSubmit={handleSubmit}
    >
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="category" className="font-bold">
          Categorias
        </label>
        <select
          name="category"
          id="category"
          className="border border-slate-300 p-2 rounded-lg w-full bg-white"
          value={activity.category}
          onChange={handleChange}
        >
          {categories.map((category) => (
            <option value={category.id} key={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="name" className="font-bold">
          Actividad
        </label>
        <input
          type="text"
          id="name"
          className="rounded-lg border border-slate-300 p-2"
          placeholder="Ej. Comida, Bicicleta, Galletas"
          value={activity.name}
          onChange={handleChange}
        />
      </div>
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="calories" className="font-bold">
          Calorias
        </label>
        <input
          type="number"
          id="calories"
          className="rounded-lg border border-slate-300 p-2"
          placeholder="Ej. 300"
          value={activity.calories}
          onChange={handleChange}
        />
      </div>
      <input
        type="submit"
        className="bg-gray-800 hover:bg-gray-900 cursor-pointer w-full p-2 font-bold uppercase text-white rounded-lg disabled:opacity-50"
        disabled={!isValidActivity}
        value={activity.category === 1 ? "Guardar comida" : "Guardar ejercicio"}
      />
    </form>
  );
}
