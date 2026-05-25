export default function NavLink({ href, children, onClick, className = '' }) {
  return (
    <a
      className={`rounded-full px-3 py-2 transition hover:bg-slate-50 ${className}`}
      href={href}
      onClick={onClick}
    >
      {children}
    </a>
  );
}