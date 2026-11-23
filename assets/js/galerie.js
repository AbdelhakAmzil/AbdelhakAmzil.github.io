// Galerie (anglais à la racine, français dans /fr/) : médias lus depuis data/medias.<langue>.json. Les vidéos YouTube se chargent seulement au clic
// (youtube-nocookie : aucun cookie avant la lecture).
(function () {
  'use strict';

  const racine = document.documentElement.dataset.racine || '';
  const fr = document.documentElement.lang.startsWith('fr');
  const T = fr ? {
    lire: 'Lire la vidéo : ', videoAVenir: 'Vidéo à venir : ', captureAVenir: 'Capture à venir : ',
    video: 'Vidéo', photo: 'Photo', echec: 'La galerie ne s\'est pas chargée. Réessayez dans un instant.'
  } : {
    lire: 'Play the video: ', videoAVenir: 'Video coming soon: ', captureAVenir: 'Screenshot coming soon: ',
    video: 'Video', photo: 'Photo', echec: 'The gallery could not be loaded. Please try again in a moment.'
  };
  const chemin = (c) => (!c || /^https?:/.test(c) ? c : racine + c);
  const etat = { projets: [], projet: 0, type: 'tous', index: 0 };
  const $ = (id) => document.getElementById(id);

  function el(tag, attrs, enfants) {
    const n = document.createElement(tag);
    Object.entries(attrs || {}).forEach(([k, v]) => {
      if (k === 'texte') { n.textContent = v; } else if (v !== undefined && v !== null) { n.setAttribute(k, v); }
    });
    (enfants || []).forEach((e) => e && n.appendChild(e));
    return n;
  }

  const idYoutube = /^[A-Za-z0-9_-]{6,20}$/;
  const medias = () => etat.projets[etat.projet].medias.filter((m) => etat.type === 'tous' || m.type === etat.type);

  function visionneuse(m) {
    if (m.type === 'video') {
      const lisible = idYoutube.test(m.youtube || '');
      const bouton = el('button', { type: 'button', class: 'lecture', 'aria-label': T.lire + m.titre, disabled: lisible ? null : '' }, [
        el('span', { class: 'lecture__icone', 'aria-hidden': 'true' })
      ]);
      const fond = m.image ? el('img', { src: chemin(m.image), alt: '' }) : el('span', { class: 'ecran__texte', texte: lisible ? '' : T.videoAVenir + m.titre });
      if (lisible) {
        bouton.addEventListener('click', () => {
          $('ecran').replaceChildren(el('iframe', {
            src: 'https://www.youtube-nocookie.com/embed/' + m.youtube + '?autoplay=1&rel=0',
            title: m.titre, allow: 'autoplay; encrypted-media; picture-in-picture', allowfullscreen: '', loading: 'lazy'
          }));
        });
      }
      return [fond, bouton, m.duree ? el('span', { class: 'duree', texte: m.duree }) : null];
    }
    return [m.image ? el('img', { src: chemin(m.image), alt: m.titre }) : el('span', { class: 'ecran__texte', texte: T.captureAVenir + m.titre })];
  }

  function afficher() {
    const liste = medias();
    document.querySelectorAll('#onglets button').forEach((b, i) => b.setAttribute('aria-selected', String(i === etat.projet)));
    document.querySelectorAll('#types button').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.type === etat.type)));
    const vide = liste.length === 0;
    $('vide').hidden = !vide;
    $('lecteur').hidden = vide;
    if (vide) { return; }
    etat.index = Math.min(etat.index, liste.length - 1);
    const m = liste[etat.index];
    $('ecran').replaceChildren(...visionneuse(m).filter(Boolean));
    $('titre-media').textContent = m.titre;
    $('legende-media').textContent = m.legende;
    $('position').textContent = (etat.index + 1) + ' / ' + liste.length;
    $('vignettes').replaceChildren(...liste.map((x, i) => {
      const b = el('button', {
        type: 'button', class: 'vignette', 'aria-current': i === etat.index ? 'true' : 'false',
        'aria-label': (x.type === 'video' ? T.video : T.photo) + ' : ' + x.titre
      }, [
        x.image ? el('img', { src: chemin(x.image), alt: '' }) : null,
        el('span', { class: 'vignette__titre', texte: x.titre }),
        el('span', { class: 'vignette__type', texte: x.type === 'video' ? T.video + (x.duree ? ' · ' + x.duree : '') : T.photo })
      ]);
      b.addEventListener('click', () => { etat.index = i; afficher(); });
      return el('li', {}, [b]);
    }));
  }

  function deplacer(pas) {
    const n = medias().length;
    if (n) { etat.index = (etat.index + pas + n) % n; afficher(); }
  }

  async function charger() {
    try {
      const r = await fetch(racine + 'data/medias.' + (fr ? 'fr' : 'en') + '.json', { cache: 'no-cache' });
      if (!r.ok) { throw new Error(String(r.status)); }
      etat.projets = (await r.json()).projets;
      const demande = new URLSearchParams(location.search).get('projet');
      etat.projet = Math.max(0, etat.projets.findIndex((p) => p.id === demande));
      $('onglets').replaceChildren(...etat.projets.map((p, i) => {
        const b = el('button', { type: 'button', class: 'pilule', role: 'tab', 'aria-selected': 'false', texte: p.nom });
        b.addEventListener('click', () => { etat.projet = i; etat.index = 0; afficher(); });
        return b;
      }));
      document.querySelectorAll('#types button').forEach((b) => b.addEventListener('click', () => {
        etat.type = b.dataset.type; etat.index = 0; afficher();
      }));
      $('precedent').addEventListener('click', () => deplacer(-1));
      $('suivant').addEventListener('click', () => deplacer(1));
      $('statut').textContent = '';
      afficher();
    } catch (e) {
      $('statut').textContent = T.echec;
    }
  }

  charger();
})();
