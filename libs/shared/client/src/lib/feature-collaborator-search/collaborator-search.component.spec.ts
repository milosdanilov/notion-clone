import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CollaboratorSearchComponent } from './collaborator-search.component';

describe('CollaboratorSearchComponent', () => {
  let component: CollaboratorSearchComponent;
  let fixture: ComponentFixture<CollaboratorSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollaboratorSearchComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CollaboratorSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
