import type { Activity } from "../types";

export type ActivityAction =
  | {
      type: "save-activity";
      payload: { newActivity: Activity };
    }
  | {
      type: "set-active-id";
      payload: { id: Activity["id"] };
    }
  | {
      type: "delete-activity";
      payload: { id: Activity["id"] };
    }
  | {
      type: "reset-activities";
    };
const localStorageActivities = (): Activity[] => {
  const activities = localStorage.getItem("activities");
  return activities ? JSON.parse(activities) : [];
};
export type ActivityState = {
  activities: Activity[];
  activeId: Activity["id"];
};

export const initialState: ActivityState = {
  activities: localStorageActivities(),
  activeId: "",
};
export const activityReducer = (
  state: ActivityState,
  action: ActivityAction
) => {
  switch (action.type) {
    case "save-activity": {
      let updatedActivities: Activity[] = [];
      //actualizar state
      if (state.activeId) {
        //actualizar
        updatedActivities = state.activities.map((activity) =>
          activity.id === state.activeId ? action.payload.newActivity : activity
        );
      } else {
        //anadir
        updatedActivities = [...state.activities, action.payload.newActivity];
      }

      return {
        ...state,
        activities: updatedActivities,
        activeId: "",
      };
    }
    case "set-active-id":
      return { ...state, activeId: action.payload.id };
    case "delete-activity":
      return {
        ...state,
        activities: state.activities.filter(
          (activity) => activity.id !== action.payload.id
        ),
      };
    case "reset-activities":
      return {
        activities: [],
        activeId: "",
      };
    default:
      return state;
  }
};
