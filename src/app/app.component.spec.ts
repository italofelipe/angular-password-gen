import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  /* it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain(
      'password-generator app is running!'
    );
  });
   */
  it('should not generate password when length is 0', () => {
    const appComponent = new AppComponent();
    appComponent.length = 0;
    appComponent.onButtonClick();
    expect(appComponent.password).toBe('');
  });

  // Length input is negative
  it('should set length to 0 when length input is negative', () => {
    const appComponent = new AppComponent();
    appComponent.length = -5;
    appComponent.onChangeLength({ target: { value: '-5' } } as any);
    expect(appComponent.length).toBe(0);
  });


  // Length input is not a number
  it('should set length to 0 when length input is not a number', () => {
    const appComponent = new AppComponent();
    const event = {
      target: {
        value: 'abc'
      }
    };
    appComponent.onChangeLength(event as any);
    expect(appComponent.length).toBe(0);
  });


  // No character types are selected
  it('should generate an empty password when no character types are selected', () => {
    const appComponent = new AppComponent();
    appComponent.includeLetters = false;
    appComponent.includeSymbols = false;
    appComponent.includeNumbers = false;
    appComponent.length = 10;

    appComponent.onButtonClick();

    expect(appComponent.password).toBe('');
  });


  // All character types are selected
  it('should generate a password with all character types when all options are selected', () => {
    const appComponent = new AppComponent();
    appComponent.includeLetters = true;
    appComponent.includeSymbols = true;
    appComponent.includeNumbers = true;
    appComponent.length = 10;

    appComponent.onButtonClick();

    expect(appComponent.password).toHaveSize(10);
    expect(appComponent.password).toMatch(/[a-z]/);
    expect(appComponent.password).toMatch(/[0-9]/);
    expect(appComponent.password).toMatch(/[!@#$%^&*()]/);
  });


  // Generated password matches length and includes selected characters
  it('should generate a password with the correct length and selected characters', () => {
    const appComponent = new AppComponent();
    appComponent.includeLetters = true;
    appComponent.includeSymbols = true;
    appComponent.includeNumbers = true;
    appComponent.length = 10;

    appComponent.onButtonClick();

    expect(appComponent.password.length).toBe(10);
    expect(appComponent.password).toMatch(/[a-z]/);
    expect(appComponent.password).toMatch(/[0-9]/);
    expect(appComponent.password).toMatch(/[!@#$%^&*()]/);
  });

  // Changing length input updates length and generates new password
  it('should update length and generate new password when length input changes', () => {
    const appComponent = new AppComponent();
    appComponent.includeLetters = true;
    appComponent.includeSymbols = true;
    appComponent.includeNumbers = true;
    appComponent.length = 8;

    appComponent.onChangeLength({ target: { value: '10' } } as any);

    expect(appComponent.length).toBe(10);
    expect(appComponent.password.length).toBe(10);
  });

});

