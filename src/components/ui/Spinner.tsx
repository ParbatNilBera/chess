export const Spinner = ({ label }: { label?: string }) => (
  <div className="flex flex-col items-center gap-3">
    <div
      className="w-8 h-8 border-2 border-amber-600/30 border-t-amber-500 rounded-full animate-spin"
      role="status"
      aria-label={label ?? "Loading"}
    />
    {label && <p className="text-sm text-stone-400 animate-pulse">{label}</p>}
  </div>
);
