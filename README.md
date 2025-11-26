## Séquence 2 – Logique réactive du flux de données 

### 1. Structure du flux- Le service `TaskService` utilise un **BehaviorSubject** pour stocker et diffuser la liste des tâches.- Le composant `Home` s’abonne à ce flux via `tasks$` et le **pipe async**. 

### 2. Mise à jour des données- La méthode `addTask()` ajoute une tâche puis appelle `next()` pour émettre la nouvelle liste.- La méthode `removeTask()` supprime une tâche puis émet à nouveau la liste mise à jour.- La vue est automatiquement réactualisée sans rechargement. 

### 3. Points clés retenus- Pas besoin d’appeler `getTasks()` à chaque fois : la donnée est **vivante**.- `| async` gère l’abonnement et le désabonnement automatiquement.Le flux reste cohérent entre le service et la vue


Logique réactive :

Le flux de données entre le service, le composant et le template est réactif, ce qui signifie que les mises à jour des données dans le service se répercutent automatiquement dans la vue.
BehaviorSubject :

Il est utilisé pour stocker et diffuser une donnée initiale et toutes ses mises à jour. Les composants peuvent s'abonner pour recevoir ces mises à jour en temps réel.
Pipe | async :

Il simplifie la gestion des abonnements en s'abonnant automatiquement à un Observable et en affichant ses valeurs dans le template. Il gère également le désabonnement pour éviter les fuites de mémoire.
Flux service → composant → template :

Le service centralise les données et les met à jour via des méthodes comme addTask() ou removeTask().
Le composant s'abonne à ces données via un Observable (ex. tasks$).
Le template utilise le pipe | async pour afficher les données et réagir automatiquement aux changements.
Structure du flux
Service TaskService :

Utilise un BehaviorSubject pour stocker et diffuser la liste des tâches.
Les méthodes comme addTask() ou removeTask() modifient les données et émettent la nouvelle liste.
Composant Home :

S'abonne au BehaviorSubject via tasks$ pour recevoir les mises à jour.
Les actions utilisateur (ex. ajout ou suppression de tâches) appellent les méthodes du service.
Template :

Affiche les données via le pipe | async, qui gère automatiquement les abonnements et les désabonnements.
Points clés retenus
Données vivantes :

Pas besoin d'appeler manuellement une méthode comme getTasks() pour récupérer les données. Le BehaviorSubject maintient les données à jour en temps réel.
Pipe | async :

Simplifie la gestion des abonnements et garantit que le flux de données reste cohérent entre le service, le composant et la vue.
Réactivité :

Toute modification des données dans le service est immédiatement reflétée dans la vue sans rechargement manuel.
