type CalorieDisplayProps = {
  calories: number;
  title: string;
};
export default function CalorieDisplay({
  calories,
  title,
}: CalorieDisplayProps) {
  return (
    <p className="text-white font-bold rounded-full  grid grid-cols-1 gap-3 text-center">
      <span className="font-black text-6xl text-orange-400">{calories}</span>
      {title}
    </p>
  );
}
