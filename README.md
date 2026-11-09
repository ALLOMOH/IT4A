# IT Experts 4 Africa (IT4A) — Site vitrine

Site vitrine de **IT Experts 4 Africa**, ESN basée à **Abidjan (Côte d'Ivoire)** et à **Maurice** : conseil, architecture, déploiement et exploitation d'infrastructures numériques (réseaux, cybersécurité, cloud, datacenter, ERP).

- Domaine cible : https://www.itexperts4africa.com
- Langues : **français** (par défaut) et **anglais**
- Thèmes : **clair** et **sombre**
- Type : application monopage (SPA) React, servie en statique

---

## Sommaire

1. [Démarrage rapide](#1-démarrage-rapide)
2. [Stack technique](#2-stack-technique)
3. [Structure du projet](#3-structure-du-projet)
4. [Pages et contenu](#4-pages-et-contenu)
5. [Architecture et fonctionnement](#5-architecture-et-fonctionnement)
6. [Design system](#6-design-system)
7. [Traductions (i18n)](#7-traductions-i18n)
8. [Formulaire de contact (EmailJS)](#8-formulaire-de-contact-emailjs)
9. [SEO et analytics](#9-seo-et-analytics)
10. [Déploiement](#10-déploiement)
11. [Guide : tâches courantes](#11-guide--tâches-courantes)
12. [Points d'attention et pistes d'amélioration](#12-points-dattention-et-pistes-damélioration)

---

## 1. Démarrage rapide

**Prérequis :** Node.js **20.19+** ou **22.12+** (exigé par Vite 8) et npm.

```bash
npm install          # installe les dépendances
npm run dev          # serveur de développement (http://localhost:5173)
npm run build        # build de production dans dist/
npm run preview      # prévisualise le build de production
npm run lint         # vérifie le code avec ESLint
```

Créer un fichier `.env` à la racine (voir [section 8](#8-formulaire-de-contact-emailjs)) :

```env
# Service EmailJS (formulaire de contact)
VITE_EMAILJS_SERVICE_ID=...
VITE_EMAILJS_TEMPLATE_ID=...
VITE_EMAILJS_PUBLIC_KEY=...

# Google Analytics 4 (gtag.js)
VITE_GA_ID=G-XXXXXXXXXX
```

> Les variables préfixées `VITE_` sont **intégrées au JavaScript livré au navigateur** : elles sont donc publiques. N'y mettre aucun secret serveur.

---

## 2. Stack technique

| Domaine | Technologie | Rôle |
|---|---|---|
| Framework UI | **React 19** | Composants, état, rendu |
| Optimisation | **React Compiler** (`babel-plugin-react-compiler`) | Mémoïsation automatique des composants |
| Build / dev | **Vite 8** (+ `@vitejs/plugin-react`, `@rolldown/plugin-babel`) | Serveur de dev rapide, build optimisé |
| Routage | **React Router 7** (`react-router-dom`) | Navigation entre les 6 pages |
| Styles | **Tailwind CSS 4** (`@tailwindcss/vite`) + `tw-animate-css` | Classes utilitaires, thème via `@theme` dans `index.css` |
| Composants UI | **shadcn/ui** (style `base-sera`) sur **Base UI** (`@base-ui/react`) | Toasts de notification, bouton |
| Utilitaires CSS | `class-variance-authority`, `cn` | Variantes de composants, fusion de classes |
| Animations | **Motion** (`motion/react`, ex-Framer Motion) | Apparitions au scroll, parallaxe, timeline, menu mobile |
| Défilement fluide | **Lenis** | Smooth scroll (désactivé si « réduire les animations ») |
| Icônes | **lucide-react** | Icônes SVG |
| E-mail | **EmailJS** (`@emailjs/browser`) | Envoi du formulaire de contact sans backend |
| Analytics | **Google Analytics 4** (gtag.js) | Mesure d'audience |
| Carte | **Google Maps embed** (iframe, sans clé d'API) | Localisation des bureaux |
| Qualité | **ESLint 9** (+ `react-hooks`, `react-refresh`) | Lint |
| Hébergement prévu | **Apache** (`.htaccess`) | Serveur statique avec réécriture SPA |

Le code est en **JavaScript (JSX)**. Seuls les composants générés par shadcn (`src/components/ui/*.tsx`) sont en TypeScript : Vite les compile sans vérification de types.

---

## 3. Structure du projet

```
it4a/
├── index.html                 # HTML racine : meta SEO, Open Graph, JSON-LD, gtag, script anti-flash du thème
├── vite.config.js             # Config Vite (plugins React, Tailwind, React Compiler)
├── components.json            # Config shadcn/ui
├── eslint.config.js
├── .env / .env.production     # Variables EmailJS + Google Analytics
├── public/                    # Fichiers servis tels quels (copiés dans dist/)
│   ├── .htaccess              # Réécriture Apache → index.html (routes SPA)
│   ├── robots.txt, sitemap.xml
│   ├── brand/                 # Logos (clair / sombre, horizontal)
│   ├── favicon/               # Favicons clair et sombre + webmanifest
│   ├── fonts/                 # Conthrax, Futura, Poppins
│   └── image/                 # clients/, domains/, hero-*.webp, photos, certificats, partenaires…
└── src/
    ├── main.jsx               # Point d'entrée React
    ├── App.jsx                # Providers, router, Lenis, scroll-to-top, layout
    ├── index.css              # Tailwind, palette, thème clair/sombre, classes .shell/.btn, animations
    ├── pages/                 # Une page par route
    │   ├── Home.jsx  About.jsx  Services.jsx
    │   ├── Expertises.jsx  References.jsx  Contact.jsx
    ├── components/
    │   ├── Header.jsx         # Header masqué au scroll, bandeau de coordonnées, menu mobile, langue, thème
    │   ├── Footer.jsx
    │   ├── RouteSeo.jsx       # Titre, description, OG, canonical par page et par langue
    │   ├── Reveal.jsx         # Apparition au scroll + PageHero + SectionHeading
    │   ├── RotatingHeadline.jsx, CountUp.jsx, Trace.jsx
    │   ├── AfricaMap.jsx      # Carte SVG de l'Afrique (bureaux + projets)
    │   ├── DomainCarousel.jsx, MethodTimeline.jsx, CaseCard.jsx, ClientLogo.jsx
    │   ├── CtaSection.jsx, OfficeMap.jsx
    │   ├── GridBackground.jsx + ShapeGrid.jsx/.css   # Fond de grille animé (canvas)
    │   ├── Logo.jsx, Logo-socials.jsx
    │   └── ui/                # Composants shadcn : toast.tsx, button.tsx
    ├── i18n/
    │   ├── LanguageContext.jsx  # Contexte langue (fr/en)
    │   ├── translations.js      # Textes principaux par page
    │   └── extra.js             # Textes complémentaires (exposés sous t.x)
    ├── theme/ThemeContext.jsx   # Thème clair/sombre + animation de bascule
    ├── hooks/useTheme.js        # (non utilisé, voir §12)
    └── lib/
        ├── lenis.js           # Référence partagée à l'instance Lenis
        └── utils.ts
```

---

## 4. Pages et contenu

| Route | Fichier | Contenu principal |
|---|---|---|
| `/` | `pages/Home.jsx` | Hero avec titre rotatif et lignes « circuit » du logo, 3 chiffres clés, bandeau défilant des logos clients, mosaïque de statistiques (bento), carrousel des domaines, timeline de la méthode, études de cas, « Pourquoi nous », carte de l'Afrique, appel à l'action |
| `/a-propos` | `pages/About.jsx` | Présentation, vision / mission, valeurs, équipe |
| `/services` | `pages/Services.jsx` | Cycle de vie en 5 étapes (conseil → exploitation), 8 domaines d'intervention, services transverses |
| `/expertises` | `pages/Expertises.jsx` | Domaines d'expertise, filtrables. Le domaine sélectionné est stocké dans l'URL (`?…`, via `useSearchParams`) |
| `/references` | `pages/References.jsx` | Études de cas filtrables, logos clients |
| `/contact` | `pages/Contact.jsx` | Formulaire (EmailJS), coordonnées, carte des bureaux Abidjan / Maurice |

Toutes les pages partagent le `Header`, le `Footer`, le `Toaster` et, pour la plupart, la `CtaSection`.

---

## 5. Architecture et fonctionnement

Ordre d'imbrication dans [`App.jsx`](src/App.jsx) :

```
ThemeProvider
└── LanguageProvider
    ├── HtmlLang            → met à jour <html lang="…">
    └── MotionConfig (reducedMotion="user")
        └── BrowserRouter
            └── LenisRoot   → smooth scroll
                ├── ScrollToTop → remonte en haut à chaque changement de page
                ├── RouteSeo    → meta par page
                └── Header / <Routes> / Footer / Toaster
```

**Points clés :**

- **Thème** ([`ThemeContext.jsx`](src/theme/ThemeContext.jsx)) : la classe `dark` est posée sur `<html>`. Un petit script dans `index.html` l'applique **avant le premier rendu** pour éviter le flash blanc ou sombre. Le choix est mémorisé dans `localStorage` (clé `it4a-theme`). Sans choix explicite du visiteur, le site suit le réglage du système. La bascule utilise la **View Transitions API** (un cercle qui s'ouvre depuis le bouton) et coupe les transitions CSS pendant le changement (`.theme-switching`) pour éviter les saccades.
- **Accessibilité des animations** : `MotionConfig reducedMotion="user"`, Lenis désactivé et animations CSS raccourcies si `prefers-reduced-motion: reduce`. Le bandeau de logos et le curseur de frappe restent actifs, car leurs mouvements sont lents.
- **Header** : se cache quand on descend et réapparaît quand on remonte. Le bandeau de coordonnées se replie au scroll. Le menu mobile bloque le défilement (via `lenisRef`) et se ferme avec la touche Échap ou au changement de page.
- **Carte des bureaux** ([`OfficeMap.jsx`](src/components/OfficeMap.jsx)) : iframe Google Maps `output=embed` (sans clé d'API), onglets Abidjan / Maurice, filtre CSS inversé en mode sombre, liens « Itinéraire » et « Ouvrir dans Google Maps ».

---

## 6. Design system

Défini dans [`src/index.css`](src/index.css), avec Tailwind 4 (`@theme inline`) et des variables CSS.

**Palette** (le bleu marine et le jaune viennent du logo) :

| Token Tailwind | Variable | Clair | Sombre | Usage |
|---|---|---|---|---|
| `paper` | `--paper` | `#f4f6f9` | `#1d3446` | Fond de page |
| `card` / `card-2` | `--card` / `--card-2` | `#fff` / `#e9eef4` | `#132535` / `#1a2f43` | Cartes, surfaces |
| `ink` / `ink-soft` | `--ink` / `--ink-soft` | `#13263a` / `#536579` | `#edf1f5` / `#95a6b7` | Texte |
| `line` | `--line` | `#d9e0e8` | `#22384c` | Bordures |
| `brand` | `--brand` | `#f1ca13` | `#f1ca13` | Jaune IT4A (CTA) |
| `mark` | `--mark` | `#8a6800` | `#fcd12f` | Jaune lisible sur fond |
| `band` | `--band` | `#1f3549` | `#16293b` | Bandes marine |

Exemples : `bg-paper`, `text-ink`, `border-line`, `bg-brand`, `text-mark`.
Les variables shadcn (`primary`, `muted`, `border`…) sont mappées sur cette palette.

**Typographies** (dans `public/fonts/`) :
- `font-body` → Poppins (texte courant)
- `font-heading` → Helvetica (titres)
- `font-sans` / `font-futura` → Futura
- `font-conthrax` → Conthrax (style logo)

**Classes utilitaires maison :**
- `.shell` : conteneur centré (max 86 rem, marges latérales responsives)
- `.btn`, `.btn-primary` (jaune), `.btn-ghost` (contour)
- `.trace-line`, `.trace-dot` : tracé animé des lignes « circuit »
- `.animate-marquee`, `.marquee-mask` : bandeau de logos défilant
- `.map-pulse` : ondes sur la carte de l'Afrique

---

## 7. Traductions (i18n)

Système maison, sans bibliothèque externe :

- [`LanguageContext.jsx`](src/i18n/LanguageContext.jsx) expose `{ lang, setLang, t }`.
- `t` = `translations[lang]` (textes principaux), auquel on ajoute `t.x` = `extra[lang]` (textes ajoutés au fil du projet).
- Dans un composant :

```jsx
const { t, lang, setLang } = useLanguage();
<h1>{t.home.title}</h1>
<p>{t.x.contact.response}</p>
```

**Ajouter un texte :** ajouter la clé **dans `fr` et dans `en`** (même chemin), dans `translations.js` ou `extra.js`. Une clé manquante dans une langue s'affiche vide (`undefined`).

---

## 8. Formulaire de contact (EmailJS)

[`pages/Contact.jsx`](src/pages/Contact.jsx) envoie le formulaire directement depuis le navigateur via **EmailJS** (aucun backend).

- Champs envoyés au template : `from_name`, `from_email`, `reply_to`, `company`, `service`, `message`.
- Identifiants lus depuis `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID` et `VITE_EMAILJS_PUBLIC_KEY`.
- Retour à l'utilisateur par toast (succès ou erreur), bouton protégé contre le double envoi.

**Configuration côté EmailJS** (https://dashboard.emailjs.com) :
1. Créer un service e-mail (Gmail, Outlook, SMTP…).
2. Créer un template qui utilise les variables ci-dessus (`{{from_name}}`, `{{message}}`…).
3. Dans *Account → Security*, **restreindre les domaines autorisés** à `itexperts4africa.com` pour éviter qu'un tiers utilise la clé publique.

---

## 9. SEO et analytics

- **`index.html`** : title, description, Open Graph, Twitter Card, données structurées **JSON-LD** `Organization`, `theme-color` clair et sombre, favicons adaptés au thème.
- **[`RouteSeo.jsx`](src/components/RouteSeo.jsx)** : à chaque changement de page ou de langue, met à jour `document.title`, la meta description, les balises OG / Twitter, `og:locale` et la balise `<link rel="canonical">`. Pour ajouter une page, ajouter son entrée dans l'objet `SEO`.
- **`public/sitemap.xml`** et **`public/robots.txt`** : à mettre à jour quand on ajoute une page.
- **Google Analytics 4** : script gtag dans `index.html`. L'ID est injecté au build via `%VITE_GA_ID%`.

> Limite : comme c'est une SPA, le HTML initial est le même pour toutes les pages. Google exécute le JavaScript et voit les bonnes meta, mais les aperçus de liens (WhatsApp, LinkedIn, Facebook) affichent toujours les meta d'`index.html`. Voir §12.

---

## 10. Déploiement

Le site est **100 % statique** :

```bash
npm run build      # génère dist/
```

Puis envoyer **le contenu de `dist/`** à la racine web de l'hébergement (par exemple `public_html/`).

- **Apache** (hébergement mutualisé : cPanel, o2switch, Hostinger…) : le fichier `.htaccess` (copié depuis `public/`) redirige toutes les routes inconnues vers `index.html`. Sans lui, recharger `/contact` renverrait une erreur 404.
- **Nginx** : équivalent à configurer :
  ```nginx
  location / { try_files $uri $uri/ /index.html; }
  ```
- **Netlify / Vercel** : ajouter une règle de réécriture SPA (`/* → /index.html 200`).

**Checklist avant mise en ligne :**
- [ ] `.env.production` rempli (EmailJS + GA)
- [ ] Domaines autorisés configurés dans EmailJS
- [ ] HTTPS actif et redirection vers `https://www.` unique (dans `.htaccess`)
- [ ] `robots.txt` et `sitemap.xml` sur le même domaine (avec `www`)
- [ ] Sitemap soumis dans Google Search Console
- [ ] Test du formulaire en production
- [ ] Test des aperçus de partage (WhatsApp, LinkedIn)

---

## 11. Guide : tâches courantes

**Ajouter une page**
1. Créer `src/pages/MaPage.jsx`.
2. Ajouter la route dans `App.jsx` : `<Route path="/ma-page" element={<MaPage />} />`.
3. Ajouter le lien dans `Header.jsx` (et dans `Footer.jsx` si besoin), puis les libellés dans `translations.js` (`nav`).
4. Ajouter l'entrée SEO dans `RouteSeo.jsx` et l'URL dans `public/sitemap.xml`.

**Ajouter un logo client**
Déposer un `.webp` dans `public/image/clients/`, puis l'ajouter à la liste qui alimente `ClientLogo` (Home / References).

**Modifier une couleur**
Changer la variable dans `:root` (clair) et dans `.dark` (sombre) de `index.css`. Toutes les classes Tailwind associées suivent automatiquement.

**Ajouter un composant shadcn**
`npx shadcn@latest add <composant>` (config dans `components.json`).

---

## 12. Points d'attention et pistes d'amélioration

Repérés pendant l'analyse du code, classés par priorité.

### À corriger avant la mise en ligne
- **`.env` absent du `.gitignore`** : ajouter `.env` et `.env.*` au `.gitignore`. Les valeurs finissent de toute façon dans le bundle, mais c'est une bonne pratique, notamment pour l'ID GA et les identifiants EmailJS.
- **Domaine incohérent** : `robots.txt` pointe vers `https://itexperts4africa.com/sitemap.xml` (sans `www`), alors que le sitemap et les canonicals utilisent `www`. Uniformiser.
- **Redirection HTTPS + www** absente du `.htaccess` : l'ajouter pour éviter le contenu dupliqué.
- **`vite.config.js`** :
  - `server.allowedHosts` contient une ancienne URL ngrok : à supprimer.
  - `alias` est placé à la racine, alors qu'il doit être dans `resolve.alias` (sinon l'alias `@/` ne fonctionne pas).
- **Police Poppins** : l'unique `@font-face` « Poppins » charge le fichier **`Poppins-Italic.ttf`** déclaré comme normal, donc tout le texte courant s'affiche en glyphes italiques. À vérifier : si ce n'est pas voulu, charger `Poppins-Regular.ttf`, plus les graisses utilisées (500, 600, 700), de préférence converties en **woff2**.

### Performance
- **Images lourdes dans `public/`** : `services/Gemini_Generated_Image_*.png` (~7,5 Mo), `bg/backgroundMaquette.png` (~5,8 Mo), `bg/backgroundMaquette.webp` (~3,9 Mo), `it-experts-4-africa-transformation-digitale-esn.jpg` (~2,5 Mo, image Open Graph), `motif-transparent.png` (~1,4 Mo). Supprimer celles qui ne servent plus et compresser les autres (WebP / AVIF, moins de 300 Ko ; image OG en 1200×630, moins de 300 Ko).
- **Fichiers inutiles dans `public/`**, copiés dans le build : `favicon/*.zip`, `fonts/conthrax/*.pdf` et `read-this.html`, `fonts/futura/example.html`, les doublons de logos (`public/BlueLogo.png`, `WhiteLogo.png`, `image/logo/…`, fichiers `(copy 1)`), `pngwing.com.png`.
- **Polices** : convertir les TTF/OTF en woff2 et ne garder que les graisses utilisées.
- **Découpage du code** : charger les pages avec `React.lazy()` + `Suspense` pour alléger le premier chargement.

### Nettoyage du code
- **Dépendances installées mais non utilisées** : `gsap`, `react-helmet-async`, `@fontsource-variable/archivo`, `@fontsource-variable/noto-sans`, `@fontsource-variable/playfair-display`. `shadcn` (outil CLI) devrait être en `devDependencies`.
- **Composants non utilisés** : `HeroMosaic.jsx`, `ScrollRevealText.jsx`, `TypeHeadline.jsx`, `ui/button.tsx`, `hooks/useTheme.js` (doublon de `ThemeContext`, qui contient en plus un `console.log`).
- **Assets du template Vite** : `src/assets/react.svg`, `vite.svg`, `hero.png`, ainsi que `App.css`.
- **`tailwind.config.js`** : fichier hérité de Tailwind 3 (CommonJS, plugin `tailwindcss-animate` non installé). Tailwind 4 utilise `@theme` dans `index.css`, donc ce fichier peut probablement être supprimé (penser à mettre à jour `components.json`).
- **Code commenté** dans `Home.jsx` (`CaseCard`, `<Cases />`) : supprimer ou réactiver.
- **Textes `showMap` et `mapNote`** dans `extra.js` : prévus pour une carte chargée au clic, non utilisés actuellement.

### Fonctionnalités et expérience utilisateur
- **Mémoriser la langue** : `LanguageProvider` démarre toujours en `fr`. Sauvegarder le choix dans `localStorage` et/ou détecter `navigator.language`.
- **URLs par langue** (`/en/...`) avec balises `hreflang` : meilleur référencement de la version anglaise.
- **Page 404** : ajouter `<Route path="*" element={<NotFound />} />`. Actuellement, une URL inconnue affiche une page vide entre le header et le footer.
- **Carte Google** : charger l'iframe au clic (façade) ou passer à OpenStreetMap. Cela évite les requêtes Google au chargement, les erreurs `ERR_BLOCKED_BY_CLIENT` avec les bloqueurs de pub et améliore la conformité RGPD.
- **Consentement cookies** : GA4 se charge sans bandeau de consentement. Ajouter une bannière et le Google Consent Mode, si le public visé le requiert (RGPD / loi ivoirienne 2013-450).
- **Anti-spam du formulaire** : ajouter un champ « honeypot » caché et/ou un reCAPTCHA (supporté par EmailJS), plus une validation des champs.
- **Pré-rendu (SSG)** : générer un HTML statique par page (par exemple `vite-plugin-prerender`, ou migration vers React Router en mode framework / Astro / Next.js). Cela donne des aperçus de partage corrects par page et un meilleur SEO.
- **Données structurées enrichies** : ajouter `address` (Abidjan et Maurice), `sameAs` (LinkedIn) et `LocalBusiness` au JSON-LD.
- **Contenu modifiable sans développeur** : à terme, brancher un CMS headless (Strapi, Sanity, Decap CMS) pour les références et les textes.
- **Tests** : ajouter Vitest + Testing Library (les `data-testid` sont déjà présents dans les sections) et un test end-to-end Playwright du formulaire.
- **TypeScript** : migration progressive possible (le projet a déjà un `tsconfig.json`).

---

## Licences des polices

- **Poppins** : SIL Open Font License (`public/fonts/Poppins/OFL.txt`)
- **Conthrax** : Typodermic, voir la licence fournie dans `public/fonts/conthrax/`. Vérifier que l'usage web est couvert.
- **Futura** : police commerciale. **Vérifier la licence web** avant la mise en ligne.

---

© IT Experts 4 Africa. Tous droits réservés.
