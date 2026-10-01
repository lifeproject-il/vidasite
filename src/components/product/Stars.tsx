// Read-only star rating (★★★★★), partially filled for fractional ratings.
export default function Stars({ rating, size = 20, label }: { rating: number; size?: number; label?: string }) {
  const pct = Math.max(0, Math.min(100, (rating / 5) * 100));
  return (
    <span className="stars" style={{ fontSize: size }} role="img" aria-label={label ?? `${rating} מתוך 5`}>
      <span className="stars__empty" aria-hidden="true">★★★★★</span>
      <span className="stars__full" style={{ width: `${pct}%` }} aria-hidden="true">★★★★★</span>
    </span>
  );
}
