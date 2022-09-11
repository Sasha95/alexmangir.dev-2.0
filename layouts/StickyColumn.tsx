export function StickyColumn({ children }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 md:gap-8">
      <div className="col-span-8">{children}</div>
    </div>
  );
}
