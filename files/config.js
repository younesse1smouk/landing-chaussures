/* ===== CONFIGURATION : modifiez uniquement ce fichier =====
   Les valeurs ci-dessous sont des EXEMPLES à remplacer par vos vraies informations.
   Une rubrique laissée vide (liste [] ou null) est automatiquement masquée. */
const CONFIG = {
  brand: "Ma Boutique",
  siteUrl: "",                       // adresse finale de la page (pour SEO / partage), ex. "https://monsite.netlify.app"

  whatsappNumber: "212600000000",    // format international sans + ni espaces (Maroc : 212 + numéro sans le 0)
  contact: { phone: "+212 6 00 00 00 00", city: "Casablanca", hours: "" },

  product: {
    name: "Nom du modèle",
    tagline: "Votre slogan ici",
    description: "Décrivez ici votre paire : état (neuf ou occasion), matière, marque, pointures disponibles.",
    features: [],                    // ex. ["Semelle amortissante", "Cuir véritable"] : seulement si c'est vrai
    images: [
      { src: "file:///C:/Users/youne/Downloads/files/image/1.png", alt: "Chaussure vue de profil" },
      { src: "file:///C:/Users/youne/Downloads/files/image/1.png", alt: "Chaussure vue de face" },
      { src: "file:///C:/Users/youne/Downloads/files/image/1.png", alt: "Semelle de la chaussure" }
      ],

    colors: [],                      // ex. [{ name: "Noir", hex: "#111111" }, { name: "Blanc", hex: "#ffffff" }]
    sizes: [                         // available: false = taille épuisée
      { size: 39, available: true }, { size: 40, available: true }, { size: 41, available: true },
      { size: 42, available: true }, { size: 43, available: true }, { size: 44, available: true },
      { size: 45, available: false }
    ]
  },

  price: { current: 299, old: null, currency: "DH" },   // old: mettez l'ancien prix SEULEMENT si la promo est réelle

  delivery: {
    zones: [                         // EXEMPLES : remplacez par vos vrais tarifs et délais
      { name: "Casablanca", fee: 25, delay: "24 h" },
      { name: "Rabat / Salé", fee: 35, delay: "24 à 48 h" },
      { name: "Autres villes du Maroc", fee: 45, delay: "2 à 4 jours" }
    ],
    cashOnDelivery: true,            // false si vous n'acceptez pas le paiement à la livraison
    freeFrom: null                   // ex. 500 : livraison offerte à partir de 500 DH
  },

  returnPolicy: "",                  // ex. "Échange possible sous 7 jours si la chaussure n'a pas été portée."
  reviews: []                        // ex. [{ name: "Prénom", text: "Avis réel d'un client", city: "Fès" }] : jamais d'avis inventés
};
