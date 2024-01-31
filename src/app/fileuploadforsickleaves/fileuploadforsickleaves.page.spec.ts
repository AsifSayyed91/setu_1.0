import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FileuploadforsickleavesPage } from './fileuploadforsickleaves.page';

describe('FileuploadforsickleavesPage', () => {
  let component: FileuploadforsickleavesPage;
  let fixture: ComponentFixture<FileuploadforsickleavesPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FileuploadforsickleavesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FileuploadforsickleavesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
