# abdelhakamzil.github.io

Portfolio d'Abdelhak Amzil — ingénieur en développement applicatif et IA. Site statique (HTML, CSS, JavaScript sans
framework) publié par GitHub Pages.

## Mettre à jour les projets, sans toucher au code

Tout se passe dans `data/projets.json` :

- `phare` : le projet mis en avant (aujourd'hui Mall Privé) ;
- `entreprise` : les projets réalisés en entreprise (KARTUAPP, Kobor ERP) ;
- `personnels` : les dépôts publics, avec leur catégorie (`Fullstack`, `IA` ou `Data`) pour les filtres.

Pour une capture : déposer l'image dans `assets/img/` puis renseigner `"image": "assets/img/nom-du-fichier.webp"`.
Tant que `image` est vide, un emplacement gris décrit la capture attendue.

Règles : captures avec des données fictives uniquement ; écrans d'un client ou d'un employeur publiés seulement avec
son accord ; jamais de nom de personne, de clé, de mot de passe ni d'adresse interne.

## Mettre à jour la galerie (photos et vidéos)

Tout se passe dans `data/medias.json`, un bloc par projet :

- photo : `{ "type": "photo", "titre": "…", "legende": "…", "image": "assets/img/fichier.webp" }` ;
- vidéo : `{ "type": "video", "titre": "…", "legende": "…", "youtube": "IDENTIFIANT", "duree": "2:15", "image": "" }`.

Vidéos : sur YouTube en « non répertoriée » ; l'identifiant est la fin de l'adresse (`youtu.be/IDENTIFIANT`). Le lecteur
YouTube (sans cookie) ne se charge qu'au clic. Lien direct vers un projet : `galerie.html?projet=kobor`.

## Voir le site sur son ordinateur

Les projets sont chargés par `fetch` : ouvrir le fichier directement ne suffit pas, il faut un petit serveur.

```
npx serve .
```

puis ouvrir l'adresse affichée (http://localhost:3000).

## Structure

- `index.html` : accueil ;
- `assets/css/site.css` : styles communs ;
- `assets/js/projets.js` : affichage des projets, filtres, formulaire de contact (ouvre la messagerie, rien n'est stocké) ;
- `assets/cv/Abdelhak_AMZIL_CV.pdf` : CV téléchargeable ;
- `mall-prive.html` : étude de cas Mall Privé ;
- `galerie.html`, `assets/js/galerie.js` : photos et vidéos ;
- `data/projets.json` : les projets ; `data/medias.json` : les médias de la galerie.
