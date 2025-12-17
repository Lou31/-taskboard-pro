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

## Séquence 4 — Tests Unitaires Angular

### 📚 Ce que j'ai appris

#### 1. Pourquoi tester ?
- Les tests permettent de **vérifier automatiquement que le code fonctionne comme prévu** et d'éviter les régressions lors de modifications futures
- Sans tests, le risque est de **casser des fonctionnalités existantes** sans s'en apercevoir lors de l'ajout de nouvelles features


#### 2. Outils utilisés
- **Jasmine** : Framework de tests qui fournit la syntaxe (`describe`, `it`, `expect`) pour écrire et structurer les tests
- **Karma** : Test runner qui exécute les tests dans un vrai navigateur et affiche les résultats en temps réel
- **TestBed** : Utilitaire Angular pour configurer un environnement de test, créer des composants et injecter des dépendances

#### 3. Concepts clés maîtrisés
- **AAA Pattern** : Arrange (préparer les données), Act (exécuter l'action), Assert (vérifier le résultat) - structure claire pour organiser chaque test
- **Mocks** : Objets factices qui simulent le comportement de vraies dépendances pour isoler le code testé
- **Spies** : Fonction Jasmine permettant d'espionner les appels de méthodes et de vérifier qu'elles ont été appelées avec les bons paramètres
- **Fixture & detectChanges()** : La fixture encapsule le composant et son template. `detectChanges()` force Angular à mettre à jour le DOM après modification des données

#### 4. Types de tests pratiqués
- ✅ Test d'une classe simple (sans Angular)
- ✅ Test d'un service (`Task`)
- ✅ Test d'un composant avec TestBed (`TaskHighlight`, `TasksPage`)
- ✅ Test des @Input (propriété `title` du composant `TaskHighlight`)
- ✅ Test du DOM (vérification que les tâches s'affichent correctement dans le template)

#### 5. Erreurs courantes rencontrées
- **Oublier `detectChanges()`** : Le DOM n'est pas mis à jour et les tests échouent car les modifications ne sont pas reflétées dans le template
- **Tests qui dépendent les uns des autres** : Ne pas réinitialiser l'état avec `clearTasks()` dans `beforeEach()` - solution : toujours partir d'un état propre avant chaque test

#### 6. Commandes importantes
```bash
ng test                              # Lancer tous les tests
ng test --include='**/fichier.spec.ts'  # Tester un fichier spécifique
ng test --code-coverage              # Avec rapport de couverture
```

#### 7. Difficultés rencontrées et solutions
| Difficulté | Solution trouvée |
|------------|------------------|
| `clearTasks()` ne vidait pas `this.tasks` | Ajouter `this.tasks = []` dans la méthode pour synchroniser le tableau avec le BehaviorSubject |
| Import de `ComponentFixture` et `TestBed` manquants | Ajouter `import { ComponentFixture, TestBed } from '@angular/core/testing'` |
| Test attendait 4 tâches mais n'en trouvait que 2 | Corriger l'assertion pour correspondre au nombre réel de tâches ajoutées |

#### 8. Points à approfondir
- [ ] Tests d'intégration entre plusieurs composants
- [ ] Tests E2E avec Cypress ou Playwright
- [ ] Mocking avancé pour HttpClient
- [ ] Tests de services asynchrones avec RxJS

### 🎯 Projet : Tests TaskBoard Pro

#### Tests implémentés
**TaskService**
- ✅ `addTask()` - Ajoute une tâche et vérifie qu'elle apparaît dans la liste
- ✅ `deleteTask()` - Supprime une tâche par ID
- ✅ `getTasks()` - Retourne toutes les tâches
- ✅ `clearTasks()` - Vide complètement la liste des tâches

**TaskHighlight Component**
- ✅ Affichage du titre dans le DOM
- ✅ @Input `title` - Vérifie que le titre est bien passé au composant
- ✅ Rendu dans le DOM avec `fixture.detectChanges()`

**TasksPage Component**
- ✅ Affichage du bon nombre de tâches
- ✅ Affichage du titre des tâches dans le template

### 💡 Réflexion personnelle
Cette séquence m'a permis de comprendre l'importance des tests unitaires dans le développement Angular. Au début, écrire des tests semblait fastidieux, mais j'ai rapidement réalisé leur valeur quand j'ai détecté le bug dans `clearTasks()` grâce aux tests. 

Le pattern AAA rend les tests plus lisibles et maintenables. J'ai aussi compris pourquoi `detectChanges()` est indispensable : Angular ne met pas automatiquement à jour le DOM dans les tests.

À l'avenir, j'appliquerai le TDD (Test-Driven Development) pour les fonctionnalités critiques : écrire les tests avant le code aide à mieux structurer les composants et services.

### 📚 Ressources consultées
- [Angular Testing Guide](https://angular.io/guide/testing)
- [Jasmine Documentation](https://jasmine.github.io/)
- Notes de cours - Séquence 4
