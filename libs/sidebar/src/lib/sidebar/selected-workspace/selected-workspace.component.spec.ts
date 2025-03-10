import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, RouterLink } from '@angular/router';

import { SelectedWorkspaceComponent } from './selected-workspace.component';

describe('SelectedWorkspaceComponent', () => {
  let component: SelectedWorkspaceComponent;
  let fixture: ComponentFixture<SelectedWorkspaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectedWorkspaceComponent, RouterLink],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectedWorkspaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
