import { CLIENT_LOGOS } from "../i18n/translations";

// Associe le nom d'un client à son vrai logo quand on l'a.
const LOGOS = [
  ["orange", "/image/clients/orange.webp"],
  ["mtn", "/image/clients/mtn.webp"],
  ["bsic", "/image/clients/bsic.webp"],
  ["ansut", "/image/clients/ansut.webp"],
  ["kaydan", "/image/clients/kaydan.webp"],
  ["rawbank", "/image/clients/rawbank.webp"],
  ["bni", "/image/clients/bni.webp"],
];
export const logoFor = (client) => {
  const k = client.toLowerCase();
  const hit = LOGOS.find(([key]) => k.startsWith(key));
  return hit ? hit[1] : null;
};

export const ClientBadge = ({ client }) => {
  const src = logoFor(client);
  return src ? (
    <span className="flex h-11 w-24 items-center justify-center rounded-md bg-white px-2.5 py-1.5 ring-1 ring-line dark:ring-0" title={client}>
      <img src={src} alt={client} className="h-full w-full object-contain" loading="lazy" />
    </span>
  ) : (
    <span className="flex h-11 min-w-24 items-center justify-center rounded-md bg-card-2 px-3 font-heading text-[15px] font-bold [font-stretch:112%] text-ink">
      {client.split(" ")[0]}
    </span>
  );
};

export const CaseCard = ({ c, featured = false }) => (
  <article
    className={`group flex h-full flex-col rounded-2xl border p-6 sm:p-8 transition-colors ${
      featured ? "border-transparent bg-band text-band-ink" : "border-line bg-card hover:border-ink-soft/40"
    }`}
  >
    <div className="flex items-center justify-between gap-4">
      <ClientBadge client={c.client} />
      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${featured ? "bg-brand text-on-brand" : "bg-card-2 text-ink"}`}>
        {c.tag}
      </span>
    </div>
    <p className={`mt-6 text-sm font-semibold ${featured ? "text-band-soft" : "text-ink-soft"}`}>{c.client}</p>
    <h3 className={`mt-1.5 font-heading font-bold leading-snug ${featured ? "text-2xl sm:text-3xl text-band-ink" : "text-xl text-ink"}`}>
      {c.title}
    </h3>
    <p className={`mt-3 text-[15px] leading-relaxed ${featured ? "text-band-soft" : "text-ink-soft"}`}>{c.desc}</p>
  </article>
);

export { CLIENT_LOGOS };
