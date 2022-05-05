# Transistoshare
Un projet de Josselin Gauthier et Rémi Chartier

## Prérequis
- NodeJS v10.14.x ou plus
- npm v7 ou plus
- Git, si clonage via commande

## Installation
Depuis une fenêtre de terminal (invité de commande sous Windows), accédez au répertoire qui contiendra le projet avec la commande `cd`
- Cloner le repo du projet (`git clone git@github.com:/Jossl123/Transistoshare` - recommandé, ou via téléchargement du fichier ZIP)
- `cd Transistoshare`
- Installer les dépendances : `npm i`
- Lancer le serveur : `node server`

## Utilisation
Transistoshare est composé de plusieurs pages.

### `/` : **Page d'accueil**
La page d'accueil contient un lien vers la page de connexion, et vers la page de manipulation de blocs logiques

### `/login` : **Page de connexion**
La page de connexion permet à un utilisateur de s'identifier sur le site, afin d'utiliser les fonctionnalités d'enregistrement et de partages de schémas de blocs.

### `/computer` : **Manipulation des blocs logiques**
La page de manipulation des blocs logiques permet d'insérer des blocs logiques prédéfinis depuis la barre du bas de l'écran, créer de nouveaux blocs, et faire interagir les blocs entre eux, en simulant les entrées logiques (haut ou bas), afin d'obtenir des sorties à la suite de ces séries de blocs.
- Afin d'ajouter des blocs sur la zone du milieu, il suffit de cliquer sur les noms d'opérateurs logiques (comme `XOR`, `AND` ou bien `NOT`, par exemple)
- Afin de créer des blocs personnalisés, il faut cliquer sur le bouton "CREATE" en bas de la page