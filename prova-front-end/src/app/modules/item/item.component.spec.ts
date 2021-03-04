import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemComponent } from './item.component';

const item = {
  key: '0',
  value: {
    children: {
      0: {
        children: {
          id: '59fdebaf-0229-4d27-901d-4cfbb4cf81de',
          level: 4,
          name: 'Alan G. William',
          open: false,
        }
      }
    },
    id: '35996ee4-74a6-4343-ba5e-9700c24bee11',
    level: 3,
    name: 'Joseph E. James A.',
    open: false,
  }
};

describe('ItemComponent', () => {
  let component: ItemComponent;
  let fixture: ComponentFixture<ItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemComponent);
    component = fixture.componentInstance;
    component.item = item;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('must call parser.changeInput when the toggleInput function is invoked with [0] and "check" values', () => {
    const changeInput = spyOn(component.parser, 'changeInput');
    component.toggleInput();
    expect(changeInput).toHaveBeenCalledWith([ 0 ], 'check');
  });

  it('must call parser.changeInput with [0] and "unCheck" values, when the toggleInput function is invoked', () => {
    const changeInput = spyOn(component.parser, 'changeInput');
    component.obj.checked = true;
    component.toggleInput();
    expect(changeInput).toHaveBeenCalledWith([ 0 ], 'unCheck');
  });

  it('must call parser.toogleOpenNode with [0] value, when the toogleOpenNode function is invoked ', () => {
    const toogleOpenNode = spyOn(component.parser, 'toogleOpenNode');
    component.toogleOpenNode();
    expect(toogleOpenNode).toHaveBeenCalledWith([ 0 ]);
  });
});
