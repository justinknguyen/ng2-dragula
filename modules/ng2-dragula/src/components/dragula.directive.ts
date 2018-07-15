import { Directive, Input, ElementRef, OnInit, OnChanges, OnDestroy, SimpleChange } from '@angular/core';
import { DragulaService } from './dragula.provider';
import { dragula } from './dragula.class';
import { DrakeWithModels } from '../DrakeWithModels';
import { DragulaOptions } from 'dragula';

@Directive({selector: '[dragula]'})
export class DragulaDirective implements OnInit, OnChanges, OnDestroy {
  @Input() public dragula: string;
  @Input() public dragulaModel: any[];
  @Input() public dragulaOptions: DragulaOptions = {};
  private container: any;
  private drake: DrakeWithModels;
  private isLocalMirror: boolean = false;

  private el: ElementRef;
  private dragulaService: DragulaService;
  public constructor(el: ElementRef, dragulaService: DragulaService) {
    this.el = el;
    this.dragulaService = dragulaService;
    this.container = el.nativeElement;
  }

  @Input() set dragulaLocalMirror(val: any) {
    this.isLocalMirror = val !== 'false';
  }

  public ngOnInit(): void {
    // console.log(this.bag);
    let bag = this.dragulaService.find(this.dragula);
    let checkModel = () => {
      if (this.dragulaModel) {
        if (this.drake.models) {
          this.drake.models.push(this.dragulaModel);
        } else {
          this.drake.models = [this.dragulaModel];
        }
      }
    };
    if (bag) {
      this.drake = bag.drake;
      checkModel();
      this.drake.containers.push(this.container);
    } else {
      if (this.isLocalMirror) {
        this.dragulaOptions.mirrorContainer = this.el.nativeElement;
      }
      this.drake = dragula([this.container], Object.assign({}, this.dragulaOptions));
      checkModel();
      this.dragulaService.add(this.dragula, this.drake);
    }
  }

  public ngOnChanges(changes: {dragulaModel?: SimpleChange}): void {
    // console.log('dragula.directive: ngOnChanges');
    // console.log(changes);
    if (changes && changes.dragulaModel) {
      if (this.drake) {
        if (this.drake.models) {
          let modelIndex = this.drake.models.indexOf(changes.dragulaModel.previousValue);
          this.drake.models.splice(modelIndex, 1, changes.dragulaModel.currentValue);
        } else {
          this.drake.models = [changes.dragulaModel.currentValue];
        }
      }
    }
  }

  public ngOnDestroy(): void {
    const bag = this.dragulaService.find(this.dragula);
    const itemToRemove = bag.drake.containers.indexOf(this.el.nativeElement);
    if (itemToRemove !== -1) {
      bag.drake.containers.splice(itemToRemove, 1);
    }
  }

}
