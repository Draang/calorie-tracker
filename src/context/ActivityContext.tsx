import { createContext, Dispatch, ReactNode, useReducer } from "react";
import { activityReducer, initialState } from "../reducers/activityReducer";
import type {
  ActivityAction,
  ActivityState,
} from "../reducers/activityReducer";
type ActivityProviderProps = {
  children: ReactNode;
};
type ActivityContextProps = {
  state: ActivityState;
  dispatch: Dispatch<ActivityAction>;
};
export const ActivityContext = createContext<ActivityContextProps>(null!);
export default function ActivityProvider({ children }: ActivityProviderProps) {
  const [state, dispatch] = useReducer(activityReducer, initialState);
  return (
    <ActivityContext.Provider value={{ state, dispatch }}>
      {children}
    </ActivityContext.Provider>
  );
}
