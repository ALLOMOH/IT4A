// Logo horizontal officiel, recadré sans marges.
// Version marine en mode clair, version blanche en mode sombre.
export default function Logo({ className = "h-10" }) {
  return (
    <span className={`inline-flex shrink-0 ${className}`}>
      <img
        src="/brand/logo-h-light.png"
        alt="IT Experts 4 Africa"
        className="h-full w-auto dark:hidden"
        width="1744"
        height="647"
      />
      <img
        src="/brand/logo-h-dark.png"
        alt="IT Experts 4 Africa"
        className="hidden h-full w-auto dark:block"
        width="872"
        height="324"
      />
    </span>
  );
}
