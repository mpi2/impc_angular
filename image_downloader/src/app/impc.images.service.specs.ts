import {} from 'jasmine';
import { TestBed, async } from '@angular/core/testing';
import { ImagesRestService } from './impc.images.rest.service';
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ImagesRestService
      ],
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(ImagesRestService);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as name 'World'`, async(() => {
    const fixture = TestBed.createComponent(ImagesRestService);
    const app = fixture.debugElement.componentInstance;
    expect(app.name).toEqual('World');
  }));
  it(`should render 'Hello World!' in a h1 tag`, async(() => {
    const fixture = TestBed.createComponent(ImagesRestService);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Hello World!');
  }));
});
