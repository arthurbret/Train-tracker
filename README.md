# Voici TrainTracker <img src="./logo.png" alt="logo TrainTracker" width="50"/>

## Génèse du projet
J'utilise au quotidien les trains TER pour me rendre à l'école et régulièrement des problèmes (retards, trains supprimés...) sont présents. J'ai donc testé différentes manières pour me tenir au courant de ces perturbations : application L'assistant SNCF, l'application SNCF Connect, applications tierces. Elles fonctionnent pour la plupart mais ne sont pas complètes selon moi, elles ne proposent pas de système de notification par exemple, elles prennent du temps à s'ouvrir et beaucoup de clics sont nécessaires pour accéder à l'information recherchée. J'ai donc voulu créer une alternative rapide et simple, sans bug, facile à utiliser en proposant un accès instantanné aux retards, suppressions, grève sur la gare demandée par l'utilisateur.

## Objectifs de ce projet
**Court terme (quelques semaines) :**
 - [x] Accès au tableau des prochains trains d'une gare
 - [x] Autocompletion barre de recherche
 - [ ] Amélioration visuelle site web
 - [ ] Page "train" avec toutes les informations sur le train
 - [ ] Affichage complet retards et suppression avec la cause
 
**Moyen terme (quelques mois) :**
 - [ ] Compte utilisateur avec les gares préférées
 - [ ] Système communautaire d'alerte perturbation
 - [ ] Notification webapp avec les perturbations détectées
 
 **Long terme (rentrée septembre 2024)**
 
 - [ ] Application mobile iOS/Android avec widgets
 - [ ] Application montre connectée watchOS/wearOS avec fonctionnalité logicielle

# Présentation des fonctionnalités

## Accès au tableau des prochains trains d'une gare
Fonction de base du projet, permettre l'affichage du tableau des prochains trains (comme on retrouve dans toutes les gares) de manière simplifiée pour une lecture rapide. Cette fonctionnalité est liée à la barre de recherche qui permet à l'utilisateur de rechercher le nom de la gare qu'il souhaite Tracker.

## Autocompletion barre de recherche
Fonctionnalité indispensable pour simplifier grandement la recherche. Au lieu de taper lui même le nom exact de la gare, l'utilisateur voit apparaitre des suggestions qui se rapprochent de ce qu'il a déjà tapé dans la barre de recherche. Cette fonctionnalité manque encore de certains éléments de navigation via les touches du clavier (flèche de bas pour défiler dans les suggestions et touche entrée pour valider) et d'éléments de style pour éviter que les suggestions effacent le tableau des prochains départs. Cette autocompletion génère aussi un bug de duplication des suggestions. Ces éléments vont être patchés rapidement, ils ne sont pas très compliqués à résoudre.

## Amélioration visuelle site web
N'ayant pas beaucoup d'expérience et d'affinités avec le frontend le site n'est pas très joli, certains bugs visuels sont présents comme avec les suggestions mais aussi l'affichage des retards. Ces bugs seront résolus au compte-goutte car ce n'est pas la priorité du projet.
