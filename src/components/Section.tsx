export default function Section({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`max-w-[1280px] mx-auto px-6 py-10 relative z-[1] ${className}`}
    >
      {children}
    </section>
  );
}
