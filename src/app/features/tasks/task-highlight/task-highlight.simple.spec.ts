import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { TaskHighlight } from './task-highlight';
import { Task } from '../../../core/services/task';
import { TasksPage } from '../../../tasks-page/tasks-page';

// describe('TaskHighlight', () => {
//   it('devrait initialiser title avec une chaîne vide', () => {
//     const component = new TaskHighlight();
//     expect(component.title).toBe('');
//   });

//   it('devrait permettre de changer le titre', () => {
//     const component = new TaskHighlight();
//     component.title = 'Tâche en avant';
//     expect(component.title).toBe('Tâche en avant');
//   });
// });

describe('TaskHighlight', () => {
  let component: TaskHighlight;
  let fixture: ComponentFixture<TaskHighlight>;

  beforeEach(async () => {
    // Configuration du module de test
    await TestBed.configureTestingModule({
      imports: [TaskHighlight],
    }).compileComponents();

    // Création du composant
    fixture = TestBed.createComponent(TaskHighlight);
    component = fixture.componentInstance;
  });

  it('devrait afficher le titre dans le DOM', () => {
    // ARRANGE : Définir le titre
    component.title = 'Ma tâche';

    // ACT : Mettre à jour le template
    fixture.detectChanges(); // ⚠️ IMPORTANT !

    // ASSERT : Vérifier le DOM
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h2')?.textContent).toContain('Ma tâche');
  });
});

fdescribe('Task Service', () => {
  let service: Task;

  beforeEach(() => {
    // Configurer TestBed
    TestBed.configureTestingModule({
      providers: [Task],
    });

    // Récupérer le service
    service = TestBed.inject(Task);
    service.clearTasks(); // État propre
  });

  it('devrait être créé', () => {
    expect(service).toBeTruthy();
  });

  it('devrait ajouter une tâche', () => {
    service.addTask('Apprendre les tests');

    const tasks = service.getTasks();
    expect(tasks.length).toBe(1);
    expect(tasks[0].title).toBe('Apprendre les tests');
  });

  it('devrait supprimer une tâche', () => {
    service.addTask('Tâche temporaire');
    const taskId = service.getTasks()[0].id;

    service.deleteTask(taskId);

    expect(service.getTasks().length).toBe(0);
  });

  it('devrait retourner toutes les tâches', () => {
    service.addTask('Tâche 1');
    service.addTask('Tâche 2');
    service.addTask('Tâche 3');

    const tasks = service.getTasks();
    expect(tasks.length).toBe(3);
  });
});

fdescribe('TasksPage Component - Rendu', () => {
  let component: TasksPage;
  let fixture: ComponentFixture<TasksPage>;
  let service: Task;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TasksPage],
      providers: [provideRouter([]), Task],
    }).compileComponents();

    fixture = TestBed.createComponent(TasksPage);
    component = fixture.componentInstance;
    service = TestBed.inject(Task);

    // Partir d'un état propre
    service.clearTasks();
    fixture.detectChanges();
  });

  it('devrait afficher le bon nombre de tâches', async () => {
    // ARRANGE : Ajouter des tâches via le service
    service.addTask('Tâche 1');
    service.addTask('Tâche 2');

    // ACT : Mettre à jour le template
    fixture.detectChanges();

    // Attendre que l'Observable émette
    await fixture.whenStable();

    // ASSERT : Compter les éléments <li> dans le DOM
    const items = fixture.nativeElement.querySelectorAll('li');
    expect(items.length).toBe(2);
  });

  it('devrait afficher le titre des tâches', async () => {
    // ARRANGE
    service.addTask('Apprendre Angular');
    service.addTask('Maîtriser les tests');

    // ACT
    fixture.detectChanges();
    await fixture.whenStable();

    // ASSERT
    const element = fixture.nativeElement;
    const text = element.textContent;

    expect(text).toContain('Apprendre Angular');
    expect(text).toContain('Maîtriser les tests');
  });
});
