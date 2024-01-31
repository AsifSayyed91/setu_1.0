import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FileuploadformyradiologyPage } from './fileuploadformyradiology.page';

describe('FileuploadformyradiologyPage', () => {
  let component: FileuploadformyradiologyPage;
  let fixture: ComponentFixture<FileuploadformyradiologyPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FileuploadformyradiologyPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FileuploadformyradiologyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
