import { ClockIcon, LevelIcon, PotIcon } from "./icons";

export default function RecipeMeta({ minutes, level, kashrut, className = "" }: { minutes: number; level: string; kashrut: string; className?: string }) {
  return (
    <ul className={`recipe-card__meta ${className}`}>
      <li><ClockIcon className="icon-accent" /> <span>{minutes}</span></li>
      <li><LevelIcon className="icon-accent" /> <span>{level}</span></li>
      <li><PotIcon className="icon-accent" /> <span>{kashrut}</span></li>
    </ul>
  );
}
