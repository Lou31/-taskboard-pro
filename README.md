# TaskboardV4

## Commandes utilisées

- `ng g c about` : Générer le composant About
- `ng serve` : Lancer le serveur de développement
- `ng g c features/tasks/task-highlight` : Générer le composant TaskHighlight

## Routes fonctionnelles

- `/` : Page d'accueil (Home)
- `/about` : Page "À propos" (About)
- `/tasks` : Page de gestion des tâches (TasksPage)

## Séquence 3 — Lazy Loading & Composants dynamiques

### Qu'est-ce que le Lazy Loading ?

Le Lazy Loading est une technique qui permet de charger les modules Angular uniquement lorsque l'utilisateur navigue vers une route spécifique, plutôt que de tout charger au démarrage de l'application. Cela réduit considérablement le temps de chargement initial et améliore les performances.


Au lieu de charger directement le composant `TasksPage`, on utilise `loadChildren` qui importe le module uniquement quand l'utilisateur accède à `/tasks`.

### Structure de l'application avec `features/`

La structure `features/` permet d'organiser l'application par fonctionnalités métier plutôt que par type de fichier. Chaque fonctionnalité contient ses propres composants, services et routes.

### Qu'est-ce qu'un composant dynamique ?

Un composant dynamique est un composant créé et injecté dans le DOM à l'exécution (runtime), de manière programmatique, plutôt que d'être déclaré de façon statique dans un template HTML.

### Comment fonctionne `ViewContainerRef` + `createComponent()`

**ViewContainerRef** est une référence à un conteneur dans le DOM où on peut injecter dynamiquement des composants.


1. **Définir un conteneur dans le template** avec une variable template :

```html
<div #highlightContainer></div>
```

2. **Récupérer la référence dans le composant** avec `@ViewChild` :

```typescript
@ViewChild('highlightContainer', { read: ViewContainerRef })
container!: ViewContainerRef;
```

3. **Créer et injecter le composant dynamiquement** :

```typescript
highlight(task: TaskItem) {
  // Efface le contenu précédent
  this.container.clear();

  // Crée le composant TaskHighlight
  const ref = this.container.createComponent(TaskHighlight);

  // Passe les données au composant via @Input
  ref.instance.title = task.title;
}
```

**Résultat :** Le composant `TaskHighlight` est créé et affiché dans le `<div #highlightContainer>` uniquement lorsque l'utilisateur clique sur "Mettre en avant".
