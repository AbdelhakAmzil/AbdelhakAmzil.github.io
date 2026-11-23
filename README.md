# abdelhakamzil.github.io

Portfolio freelance d'Abdelhak Amzil — développeur fullstack (web, e-commerce, Odoo, IA, mobile). Site statique
(HTML, CSS, JavaScript sans framework) publié par GitHub Pages, en deux langues : anglais à la racine, français dans
`fr/`. Chaque page a son équivalent dans l'autre langue (même nom de fichier).

## Mettre à jour les projets, sans toucher au code

Tout se passe dans `data/projets.en.json` et `data/projets.fr.json` (même contenu, une langue chacun) :

- `phare` : le projet mis en avant (aujourd'hui Mall Privé) ;
- `entreprise` : les projets réalisés en entreprise (KARTUAPP, Kobor ERP) ;
- `personnels` : les dépôts publics, avec leur catégorie (`Fullstack`, `IA` ou `Data`) pour les filtres.

Pour une capture : déposer l'image dans `assets/img/` puis renseigner `"image": "assets/img/nom-du-fichier.webp"`.
Tant que `image` est vide, un emplacement gris décrit la capture attendue.

Règles : captures avec des données fictives uniquement ; écrans d'un client ou d'un employeur publiés seulement avec
son accord ; jamais de nom de personne, de clé, de mot de passe ni d'adresse interne.

## Mettre à jour la galerie (photos et vidéos)

Tout se passe dans `data/medias.en.json` et `data/medias.fr.json`, un bloc par projet :

- photo : `{ "type": "photo", "titre": "…", "legende": "…", "image": "assets/img/fichier.webp" }` ;
- photo avec copie légère pour les vignettes : ajouter `"vignette": "assets/img/fichier-800.webp"` ;
- vidéo du site : `{ "type": "video", "titre": "…", "legende": "…", "fichier": "assets/video/demo.mp4", "duree": "0:20", "image": "assets/video/demo.webp" }`
  (mp4 H.264 de quelques Mo au plus, `image` = affiche) ;
- vidéo YouTube : `{ "type": "video", "titre": "…", "legende": "…", "youtube": "IDENTIFIANT", "duree": "2:15", "image": "" }`.

Captures Mall Privé : `assets/img/mall-prive/` (maquettes navigateur et téléphone, 1600 px et copie `-800`), démos dans
`assets/video/`. Toutes faites avec des données fictives ; le destinataire de la fiche colis est flouté.

Vidéos YouTube : sur YouTube en « non répertoriée » ; l'identifiant est la fin de l'adresse (`youtu.be/IDENTIFIANT`). Le lecteur
YouTube (sans cookie) ne se charge qu'au clic. Lien direct vers un projet : `galerie.html?projet=kobor` (ou `fr/galerie.html?projet=kobor`).

## Voir le site sur son ordinateur

Les projets sont chargés par `fetch` : ouvrir le fichier directement ne suffit pas, il faut un petit serveur.

```
npx serve .
```

puis ouvrir l'adresse affichée (http://localhost:3000).

## Après une modification du CSS ou du JavaScript

Changer le numéro `?v=…` des liens vers `site.css`, `projets.js` et `galerie.js` dans les 6 pages (par exemple la date du
jour) : les navigateurs téléchargent alors la nouvelle version au lieu de garder l'ancienne en cache.

## Structure

- `index.html`, `fr/index.html` : accueil (services, réalisations, déroulement, questions, devis) ;
- `assets/css/site.css` : styles communs ;
- `assets/js/projets.js` : affichage des projets, filtres, formulaire de contact (ouvre la messagerie, rien n'est stocké) ;
- `assets/cv/Abdelhak_AMZIL_CV.pdf` : CV téléchargeable ;
- `mall-prive.html`, `fr/mall-prive.html` : étude de cas Mall Privé ;
- `galerie.html`, `fr/galerie.html`, `assets/js/galerie.js` : photos et vidéos ;
- `data/projets.<langue>.json` : les projets ; `data/medias.<langue>.json` : les médias de la galerie.
