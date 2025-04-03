import { useMemo } from "react";

import CalorieDisplay from "./CalorieDisplay";
import { useActivity } from "../hooks/useActivity";

export default function CalorieTracker() {
  const { state } = useActivity();
  const { activities } = state;
  const caloriesConsumed = useMemo(
    () =>
      activities.reduce(
        (total, activity) =>
          activity.category === 1 ? total + activity.calories : total,
        0
      ),
    [activities]
  );
  const caloriesBurned = useMemo(
    () =>
      activities.reduce(
        (total, activity) =>
          activity.category === 2 ? total + activity.calories : total,
        0
      ),
    [activities]
  );
  return (
    <>
      <h2 className="text-4xl text-white font-black text-center">
        Contador de calorias
      </h2>
      <div className="flex flex-col items-center md:flex-row md:justify-around gap-5 mt-10">
        <CalorieDisplay calories={caloriesConsumed} title="Consumidas" />
        <CalorieDisplay calories={caloriesBurned} title="Quemadas" />
        <CalorieDisplay
          calories={caloriesConsumed - caloriesBurned}
          title="Balance"
        />
      </div>
    </>
  );
}
