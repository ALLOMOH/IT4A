// Logo client dans une tuile : les vraies couleurs restent lisibles en mode clair comme en mode sombre.
// Les logos blancs (dark) sont posés sur une tuile marine.
export const ClientLogo = ({ name, src, dark = false, className = "" }) => (
  <span
    className={`flex items-center justify-center rounded-md px-4 py-3 ${dark ? "bg-[#1f3549]" : "bg-white ring-1 ring-line dark:ring-0"} ${className}`}
    title={name}
  >
    <img src={src} alt={name} loading="lazy" className="block h-full w-full object-contain" />
  </span>
);
