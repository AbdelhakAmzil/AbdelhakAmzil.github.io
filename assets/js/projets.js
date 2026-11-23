// Accueil : projets lus depuis data/projets.json (mettre à jour ce fichier suffit), filtres et formulaire de contact.
(function () {
  'use strict';

  function el(tag, attrs, enfants) {
    const n = document.createElement(tag);
    Object.entries(attrs || {}).forEach(([k, v]) => {
      if (k === 'texte') { n.textContent = v; } else { n.setAttribute(k, v); }
    });
    (enfants || []).forEach((e) => e && n.appendChild(e));
    return n;
  }

  /** Capture si l'image existe, sinon emplacement gris avec sa description. */
  function visuel(image, texte, alt) {
    if (image) {
      return el('div', { class: 'visuel visuel--image' }, [el('img', { src: image, alt: alt, loading: 'lazy' })]);
    }
    return el('div', { class: 'visuel', texte: texte });
  }

  function etiquettes(liste) {
    return el('ul', { class: 'etiquettes', 'aria-label': 'Technologies' }, liste.map((t) => el('li', { texte: t })));
  }

  function projetPhare(p) {
    return el('article', { class: 'projet-phare' }, [
      visuel(p.image, p.texteImage, 'Capture de ' + p.titre),
      el('div', { class: 'projet-phare__texte' }, [
        el('p', { class: 'surtitre', texte: p.etiquette }),
        el('h3', { texte: p.titre }),
        el('p', { class: 'texte', texte: p.resume }),
        etiquettes(p.technos),
        el('a', { class: 'bouton bouton--principal', href: p.lien, texte: "Lire l'étude de cas" })
      ])
    ]);
  }

  function projetEntreprise(p) {
    return el('article', { class: 'projet-entreprise' }, [
      visuel(p.image, p.texteImage, 'Capture de ' + p.titre),
      el('div', { class: 'projet-entreprise__texte' }, [
        el('p', { class: 'meta', texte: p.etiquette }),
        el('h4', { texte: p.titre }),
        el('p', { class: 'texte', texte: p.resume }),
        etiquettes(p.technos)
      ])
    ]);
  }

  function projetPersonnel(p) {
    return el('article', { class: 'projet' }, [
      el('p', { class: 'meta', texte: p.categorie + ' · ' + p.langage }),
      el('h4', { texte: p.titre }),
      el('p', { texte: p.resume }),
      el('a', { href: p.lien, rel: 'noopener', texte: 'Voir le code', 'aria-label': 'Voir le code de ' + p.titre })
    ]);
  }

  function afficherPersonnels(liste, categorie) {
    const zone = document.getElementById('projets-personnels');
    zone.replaceChildren(...liste.filter((p) => categorie === 'Tous' || p.categorie === categorie).map(projetPersonnel));
  }

  async function chargerProjets() {
    const statut = document.getElementById('projets-statut');
    try {
      const reponse = await fetch('data/projets.json', { cache: 'no-cache' });
      if (!reponse.ok) { throw new Error(String(reponse.status)); }
      const d = await reponse.json();
      document.getElementById('projet-phare').replaceChildren(projetPhare(d.phare));
      document.getElementById('projets-entreprise').replaceChildren(...d.entreprise.map(projetEntreprise));
      afficherPersonnels(d.personnels, 'Tous');
      document.querySelectorAll('[data-filtre]').forEach((bouton) => {
        bouton.addEventListener('click', () => {
          document.querySelectorAll('[data-filtre]').forEach((b) => b.setAttribute('aria-pressed', String(b === bouton)));
          afficherPersonnels(d.personnels, bouton.dataset.filtre);
        });
      });
      statut.textContent = '';
    } catch (e) {
      statut.textContent = 'Les projets ne se sont pas chargés. Retrouvez-les sur GitHub.';
    }
  }

  // Sans serveur d'envoi : le message s'ouvre dans la messagerie du visiteur, rien n'est stocké.
  function brancherContact() {
    const f = document.getElementById('formulaire-contact');
    if (!f) { return; }
    f.addEventListener('submit', (evenement) => {
      evenement.preventDefault();
      const nom = f.elements.nom.value.trim();
      const besoin = f.elements.message.value.trim();
      const sujet = 'Portfolio — message de ' + (nom || 'un visiteur');
      const corps = besoin + '\n\n' + nom + (f.elements.courriel.value.trim() ? ' — ' + f.elements.courriel.value.trim() : '');
      window.location.href = 'mailto:abdelhakamzil.2000@gmail.com?subject=' + encodeURIComponent(sujet)
        + '&body=' + encodeURIComponent(corps);
    });
  }

  document.getElementById('annee').textContent = String(new Date().getFullYear());
  chargerProjets();
  brancherContact();
})();
