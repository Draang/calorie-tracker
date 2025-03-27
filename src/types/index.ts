export type Category = {
  id: number;
  name: string;
};
export type Activity = {
  id: string;
  category: Category["id"];
  name: string;
  calories: number;
};
