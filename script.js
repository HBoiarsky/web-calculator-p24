const calculatrice = document.querySelector('.calculator');
const touches = calculatrice.querySelector('.calculator__keys');
const affichage = calculatrice.querySelector('.calculator__display');

function calculer(nombre1, operateur, nombre2) {
    let resultat = '';

    if (operateur === 'add') {
        resultat = parseFloat(nombre1) + parseFloat(nombre2);
    } else if (operateur === 'subtract') {
        resultat = parseFloat(nombre1) - parseFloat(nombre2);
    } else if (operateur === 'multiply') {
        resultat = parseFloat(nombre1) * parseFloat(nombre2);
    } else if (operateur === 'divide') {
        if (parseFloat(nombre2) === 0) {
            return 'Erreur'; // Division par zéro
        }
        resultat = parseFloat(nombre1) / parseFloat(nombre2);
    }

    return resultat;
}

function gerer_entree_nombre(contenu_touche, nombre_affiche, type_touche_precedente) {
    if (nombre_affiche === '0' || type_touche_precedente === 'operateur') {
        return contenu_touche;
    }
    return nombre_affiche + contenu_touche;
}

function gerer_entree_decimale(nombre_affiche, type_touche_precedente) {
    if (!nombre_affiche.includes('.')) {
        return nombre_affiche + '.';
    } else if (type_touche_precedente === 'operateur') {
        return '0.';
    }
    return nombre_affiche;
}

function gerer_effacer() {
    return '0';
}

touches.addEventListener('click', e => {
    if (!e.target.matches('button')) return;

    const touche = e.target;
    const action = touche.dataset.action;
    const contenu_touche = touche.textContent;
    const nombre_affiche = affichage.textContent;
    const type_touche_precedente = calculatrice.dataset.typeTouchePrecedente;

    if (!action) {
        affichage.textContent = gerer_entree_nombre(contenu_touche, nombre_affiche, type_touche_precedente);
        calculatrice.dataset.typeTouchePrecedente = 'nombre';
    }

    if (action === 'decimal') {
        affichage.textContent = gerer_entree_decimale(nombre_affiche, type_touche_precedente);
        calculatrice.dataset.typeTouchePrecedente = 'decimal';
    }

    if (action === 'clear') {
        affichage.textContent = gerer_effacer();
        calculatrice.dataset.typeTouchePrecedente = 'effacer';
    }

    if (['add', 'subtract', 'multiply', 'divide'].includes(action)) {
        calculatrice.dataset.premiereValeur = nombre_affiche;
        calculatrice.dataset.operateur = action;
        calculatrice.dataset.typeTouchePrecedente = 'operateur';
    }

    if (action === 'calculate') {
        const premiereValeur = calculatrice.dataset.premiereValeur;
        const operateur = calculatrice.dataset.operateur;
        const deuxiemeValeur = nombre_affiche;

        affichage.textContent = calculer(premiereValeur, operateur, deuxiemeValeur);
        calculatrice.dataset.typeTouchePrecedente = 'calculer';
    }
});