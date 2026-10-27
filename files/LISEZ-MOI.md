# Landing page chaussures : commande par WhatsApp

## Fichiers
- `config.js` : **le seul fichier à modifier** (produit, photos, prix, tailles, livraison, numéro WhatsApp)
- `index.html`, `style.css`, `script.js` : structure, design, logique
- `images/` : placeholders à remplacer par vos photos

## Personnaliser (config.js)
1. `whatsappNumber` : format international sans `+` (ex. `212612345678`).
2. `product` : nom, slogan, description, photos (déposez vos .jpg/.webp dans `images/`, puis changez les chemins).
3. `price` : `current` ; ajoutez `old` seulement si la promotion est réelle.
4. `delivery.zones` : vos vrais tarifs et délais ; `cashOnDelivery: false` si pas de paiement à la livraison.
5. Rubriques facultatives (`features`, `colors`, `reviews`, `returnPolicy`) : laissées vides, elles sont masquées. Ne mettez que des informations réelles.
6. `siteUrl` : l'adresse finale de la page, une fois publiée.

Conseil : redimensionnez les photos à ~1200 px de large et compressez-les (squoosh.app) pour un chargement rapide.

## Lancer en local
- Double-cliquez sur `index.html`, ou
- `python -m http.server 8000` dans le dossier, puis ouvrez http://localhost:8000

## Publier gratuitement
- **Netlify Drop** : allez sur app.netlify.com/drop et glissez-déposez le dossier. Vous obtenez un lien public.
- **GitHub Pages** : créez un dépôt, envoyez les fichiers, puis Settings > Pages > branche `main`.
- **Cloudflare Pages** : "Upload assets" avec le dossier.

Collez ensuite le lien dans votre annonce Facebook Marketplace et dans `siteUrl`.
