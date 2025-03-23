import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkspaceCreatorComponent } from './workspace-creator.component';

describe('WorkspaceCreatorComponent', () => {
  let component: WorkspaceCreatorComponent;
  let fixture: ComponentFixture<WorkspaceCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkspaceCreatorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WorkspaceCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
