import { Directive, Input, Output, ElementRef, EventEmitter } from '@angular/core';
import { DragulaService } from './dragula.service';
import { Subscription } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "./dragula.service";
export class DragulaDirective {
    constructor(el, dragulaService) {
        this.el = el;
        this.dragulaService = dragulaService;
        this.dragulaModelChange = new EventEmitter();
    }
    get container() {
        return this.el && this.el.nativeElement;
    }
    ngOnChanges(changes) {
        if (changes && changes.dragula) {
            const { previousValue: prev, currentValue: current, firstChange } = changes.dragula;
            const hadPreviousValue = !!prev;
            const hasNewValue = !!current;
            // something -> null       =>  teardown only
            // something -> something  =>  teardown, then setup
            //      null -> something  =>  setup only
            //
            //      null -> null (precluded by fact of change being present)
            if (hadPreviousValue) {
                this.teardown(prev);
            }
            if (hasNewValue) {
                this.setup();
            }
        }
        else if (changes && changes.dragulaModel) {
            // this code only runs when you're not changing the group name
            // because if you're changing the group name, you'll be doing setup or teardown
            // it also only runs if there is a group name to attach to.
            const { previousValue: prev, currentValue: current, firstChange } = changes.dragulaModel;
            const drake = this.group?.drake;
            if (this.dragula && drake) {
                drake.models = drake.models || [];
                const prevIndex = drake.models.indexOf(prev);
                if (prevIndex !== -1) {
                    // delete the previous
                    drake.models.splice(prevIndex, 1);
                    // maybe insert a new one at the same spot
                    if (current) {
                        drake.models.splice(prevIndex, 0, current);
                    }
                }
                else if (current) {
                    // no previous one to remove; just push this one.
                    drake.models.push(current);
                }
            }
        }
    }
    // call ngOnInit 'setup' because we want to call it in ngOnChanges
    // and it would otherwise run twice
    setup() {
        const checkModel = (group) => {
            if (this.dragulaModel) {
                if (group.drake?.models) {
                    group.drake?.models?.push(this.dragulaModel);
                }
                else {
                    if (group.drake) {
                        group.drake.models = [this.dragulaModel];
                    }
                }
            }
        };
        // find or create a group
        if (!this.dragula) {
            return;
        }
        let group = this.dragulaService.find(this.dragula);
        if (!group) {
            const options = {};
            group = this.dragulaService.createGroup(this.dragula, options);
        }
        // ensure model and container element are pushed
        checkModel(group);
        group.drake?.containers.push(this.container);
        this.subscribe(this.dragula);
        this.group = group;
    }
    subscribe(name) {
        this.subs = new Subscription();
        this.subs.add(this.dragulaService
            .dropModel(name)
            .subscribe(({ source, target, sourceModel, targetModel }) => {
            if (source === this.el.nativeElement) {
                this.dragulaModelChange.emit(sourceModel);
            }
            else if (target === this.el.nativeElement) {
                this.dragulaModelChange.emit(targetModel);
            }
        }));
        this.subs.add(this.dragulaService
            .removeModel(name)
            .subscribe(({ source, sourceModel }) => {
            if (source === this.el.nativeElement) {
                this.dragulaModelChange.emit(sourceModel);
            }
        }));
    }
    teardown(groupName) {
        if (this.subs) {
            this.subs.unsubscribe();
        }
        const group = this.dragulaService.find(groupName);
        if (group) {
            const itemToRemove = group.drake?.containers.indexOf(this.el.nativeElement);
            if (itemToRemove !== -1) {
                group.drake?.containers.splice(itemToRemove, 1);
            }
            if (this.dragulaModel && group.drake && group.drake.models) {
                const modelIndex = group.drake.models.indexOf(this.dragulaModel);
                if (modelIndex !== -1) {
                    group.drake.models.splice(modelIndex, 1);
                }
            }
        }
    }
    ngOnDestroy() {
        if (!this.dragula) {
            return;
        }
        this.teardown(this.dragula);
    }
}
DragulaDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.2", ngImport: i0, type: DragulaDirective, deps: [{ token: i0.ElementRef }, { token: i1.DragulaService }], target: i0.ɵɵFactoryTarget.Directive });
DragulaDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "14.2.2", type: DragulaDirective, selector: "[dragula]", inputs: { dragula: "dragula", dragulaModel: "dragulaModel" }, outputs: { dragulaModelChange: "dragulaModelChange" }, usesOnChanges: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.2", ngImport: i0, type: DragulaDirective, decorators: [{
            type: Directive,
            args: [{ selector: '[dragula]' }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1.DragulaService }]; }, propDecorators: { dragula: [{
                type: Input
            }], dragulaModel: [{
                type: Input
            }], dragulaModelChange: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhZ3VsYS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9saWJzL25nMi1kcmFndWxhL3NyYy9jb21wb25lbnRzL2RyYWd1bGEuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQThDLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMvSCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFFbkQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQzs7O0FBSXBDLE1BQU0sT0FBTyxnQkFBZ0I7SUFZM0IsWUFBMkIsRUFBYyxFQUFVLGNBQThCO1FBQXRELE9BQUUsR0FBRixFQUFFLENBQVk7UUFBVSxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFUaEUsdUJBQWtCLEdBQUcsSUFBSSxZQUFZLEVBQVMsQ0FBQztJQVVoRSxDQUFDO0lBTkQsSUFBWSxTQUFTO1FBQ25CLE9BQU8sSUFBSSxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQztJQUMxQyxDQUFDO0lBTU0sV0FBVyxDQUFDLE9BQThEO1FBQy9FLElBQUksT0FBTyxJQUFJLE9BQU8sQ0FBQyxPQUFPLEVBQUU7WUFDOUIsTUFBTSxFQUFFLGFBQWEsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDO1lBQ3BGLE1BQU0sZ0JBQWdCLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUNoQyxNQUFNLFdBQVcsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDO1lBQzlCLDRDQUE0QztZQUM1QyxtREFBbUQ7WUFDbkQseUNBQXlDO1lBQ3pDLEVBQUU7WUFDRixnRUFBZ0U7WUFDaEUsSUFBSSxnQkFBZ0IsRUFBRTtnQkFDcEIsSUFB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YSxDQUFDLENBQUM7WUFDNUUsSUFBSSxZQUFZLEtBQUssQ0FBQyxDQUFDLEVBQUU7Z0JBQ3ZCLEtBQUssQ0FBQyxLQUFLLEVBQUUsVUFBVSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLENBQUM7YUFDakQ7WUFDRCxJQUFJLElBQUksQ0FBQyxZQUFZLElBQUksS0FBSyxDQUFDLEtBQUssSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRTtnQkFDMUQsTUFBTSxVQUFVLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztnQkFDakUsSUFBSSxVQUFVLEtBQUssQ0FBQyxDQUFDLEVBQUU7b0JBQ3JCLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUM7aUJBQzFDO2FBQ0Y7U0FDRjtJQUNILENBQUM7SUFFTSxXQUFXO1FBQ2hCLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2pCLE9BQU87U0FDUjtRQUVELElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzlCLENBQUM7OzZHQTFJVSxnQkFBZ0I7aUdBQWhCLGdCQUFnQjsyRkFBaEIsZ0JBQWdCO2tCQUQ1QixTQUFTO21CQUFDLEVBQUMsUUFBUSxFQUFFLFdBQVcsRUFBQzs4SEFFaEIsT0FBTztzQkFBdEIsS0FBSztnQkFDVSxZQUFZO3NCQUEzQixLQUFLO2dCQUNXLGtCQUFrQjtzQkFBbEMsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIE91dHB1dCwgRWxlbWVudFJlZiwgT25Jbml0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSwgU2ltcGxlQ2hhbmdlLCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRHJhZ3VsYVNlcnZpY2UgfSBmcm9tICcuL2RyYWd1bGEuc2VydmljZSc7XHJcbmltcG9ydCB7IERyYWtlV2l0aE1vZGVscyB9IGZyb20gJy4uL0RyYWtlV2l0aE1vZGVscyc7XHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBHcm91cCB9IGZyb20gJy4uL0dyb3VwJztcclxuXHJcbkBEaXJlY3RpdmUoe3NlbGVjdG9yOiAnW2RyYWd1bGFdJ30pXHJcbmV4cG9ydCBjbGFzcyBEcmFndWxhRGlyZWN0aXZlIGltcGxlbWVudHMgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xyXG4gIEBJbnB1dCgpIHB1YmxpYyBkcmFndWxhPzogc3RyaW5nO1xyXG4gIEBJbnB1dCgpIHB1YmxpYyBkcmFndWxhTW9kZWw/OiBhbnlbXTtcclxuICBAT3V0cHV0KCkgcHVibGljIGRyYWd1bGFNb2RlbENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55W10+KCk7XHJcblxyXG4gIHByaXZhdGUgc3Vicz86IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgcHJpdmF0ZSBnZXQgY29udGFpbmVyKCk6IEhUTUxFbGVtZW50IHtcclxuICAgIHJldHVybiB0aGlzLmVsICYmIHRoaXMuZWwubmF0aXZlRWxlbWVudDtcclxuICB9XHJcbiAgcHJpdmF0ZSBncm91cD86IEdyb3VwO1xyXG5cclxuICBwdWJsaWMgY29uc3RydWN0b3IocHJpdmF0ZSBlbDogRWxlbWVudFJlZiwgcHJpdmF0ZSBkcmFndWxhU2VydmljZTogRHJhZ3VsYVNlcnZpY2UpIHtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiB7ZHJhZ3VsYT86IFNpbXBsZUNoYW5nZSwgZHJhZ3VsYU1vZGVsPzogU2ltcGxlQ2hhbmdlfSk6IHZvaWQge1xyXG4gICAgaWYgKGNoYW5nZXMgJiYgY2hhbmdlcy5kcmFndWxhKSB7XHJcbiAgICAgIGNvbnN0IHsgcHJldmlvdXNWYWx1ZTogcHJldiwgY3VycmVudFZhbHVlOiBjdXJyZW50LCBmaXJzdENoYW5nZSB9ID0gY2hhbmdlcy5kcmFndWxhO1xyXG4gICAgICBjb25zdCBoYWRQcmV2aW91c1ZhbHVlID0gISFwcmV2O1xyXG4gICAgICBjb25zdCBoYXNOZXdWYWx1ZSA9ICEhY3VycmVudDtcclxuICAgICAgLy8gc29tZXRoaW5nIC0+IG51bGwgICAgICAgPT4gIHRlYXJkb3duIG9ubHlcclxuICAgICAgLy8gc29tZXRoaW5nIC0+IHNvbWV0aGluZyAgPT4gIHRlYXJkb3duLCB0aGVuIHNldHVwXHJcbiAgICAgIC8vICAgICAgbnVsbCAtPiBzb21ldGhpbmcgID0+ICBzZXR1cCBvbmx5XHJcbiAgICAgIC8vXHJcbiAgICAgIC8vICAgICAgbnVsbCAtPiBudWxsIChwcmVjbHVkZWQgYnkgZmFjdCBvZiBjaGFuZ2UgYmVpbmcgcHJlc2VudClcclxuICAgICAgaWYgKGhhZFByZXZpb3VzVmFsdWUpIHtcclxuICAgICAgICB0aGlzLnRlYXJkb3duKHByZXYpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChoYXNOZXdWYWx1ZSkge1xyXG4gICAgICAgIHRoaXMuc2V0dXAoKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChjaGFuZ2VzICYmIGNoYW5nZXMuZHJhZ3VsYU1vZGVsKSB7XHJcbiAgICAgIC8vIHRoaXMgY29kZSBvbmx5IHJ1bnMgd2hlbiB5b3UncmUgbm90IGNoYW5naW5nIHRoZSBncm91cCBuYW1lXHJcbiAgICAgIC8vIGJlY2F1c2UgaWYgeW91J3JlIGNoYW5naW5nIHRoZSBncm91cCBuYW1lLCB5b3UnbGwgYmUgZG9pbmcgc2V0dXAgb3IgdGVhcmRvd25cclxuICAgICAgLy8gaXQgYWxzbyBvbmx5IHJ1bnMgaWYgdGhlcmUgaXMgYSBncm91cCBuYW1lIHRvIGF0dGFjaCB0by5cclxuICAgICAgY29uc3QgeyBwcmV2aW91c1ZhbHVlOiBwcmV2LCBjdXJyZW50VmFsdWU6IGN1cnJlbnQsIGZpcnN0Q2hhbmdlIH0gPSBjaGFuZ2VzLmRyYWd1bGFNb2RlbDtcclxuICAgICAgY29uc3QgZHJha2UgPSB0aGlzLmdyb3VwPy5kcmFrZTtcclxuICAgICAgaWYgKHRoaXMuZHJhZ3VsYSAmJiBkcmFrZSkge1xyXG4gICAgICAgIGRyYWtlLm1vZGVscyA9IGRyYWtlLm1vZGVscyB8fCBbXTtcclxuICAgICAgICBjb25zdCBwcmV2SW5kZXggPSBkcmFrZS5tb2RlbHMuaW5kZXhPZihwcmV2KTtcclxuICAgICAgICBpZiAocHJldkluZGV4ICE9PSAtMSkge1xyXG4gICAgICAgICAgLy8gZGVsZXRlIHRoZSBwcmV2aW91c1xyXG4gICAgICAgICAgZHJha2UubW9kZWxzLnNwbGljZShwcmV2SW5kZXgsIDEpO1xyXG4gICAgICAgICAgLy8gbWF5YmUgaW5zZXJ0IGEgbmV3IG9uZSBhdCB0aGUgc2FtZSBzcG90XHJcbiAgICAgICAgICBpZiAoY3VycmVudCkge1xyXG4gICAgICAgICAgICBkcmFrZS5tb2RlbHMuc3BsaWNlKHByZXZJbmRleCwgMCwgY3VycmVudCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmIChjdXJyZW50KSB7XHJcbiAgICAgICAgICAvLyBubyBwcmV2aW91cyBvbmUgdG8gcmVtb3ZlOyBqdXN0IHB1c2ggdGhpcyBvbmUuXHJcbiAgICAgICAgICBkcmFrZS5tb2RlbHMucHVzaChjdXJyZW50KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vIGNhbGwgbmdPbkluaXQgJ3NldHVwJyBiZWNhdXNlIHdlIHdhbnQgdG8gY2FsbCBpdCBpbiBuZ09uQ2hhbmdlc1xyXG4gIC8vIGFuZCBpdCB3b3VsZCBvdGhlcndpc2UgcnVuIHR3aWNlXHJcbiAgcHVibGljIHNldHVwKCk6IHZvaWQge1xyXG4gICAgY29uc3QgY2hlY2tNb2RlbCA9IChncm91cDogR3JvdXApID0+IHtcclxuICAgICAgaWYgKHRoaXMuZHJhZ3VsYU1vZGVsKSB7XHJcbiAgICAgICAgaWYgKGdyb3VwLmRyYWtlPy5tb2RlbHMpIHtcclxuICAgICAgICAgIGdyb3VwLmRyYWtlPy5tb2RlbHM/LnB1c2godGhpcy5kcmFndWxhTW9kZWwpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBpZiAoZ3JvdXAuZHJha2UpIHtcclxuICAgICAgICAgICAgZ3JvdXAuZHJha2UubW9kZWxzID0gW3RoaXMuZHJhZ3VsYU1vZGVsXTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLy8gZmluZCBvciBjcmVhdGUgYSBncm91cFxyXG4gICAgaWYgKCF0aGlzLmRyYWd1bGEpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBncm91cCA9IHRoaXMuZHJhZ3VsYVNlcnZpY2UuZmluZCh0aGlzLmRyYWd1bGEpO1xyXG4gICAgaWYgKCFncm91cCkge1xyXG4gICAgICBjb25zdCBvcHRpb25zID0ge307XHJcbiAgICAgIGdyb3VwID0gdGhpcy5kcmFndWxhU2VydmljZS5jcmVhdGVHcm91cCh0aGlzLmRyYWd1bGEsIG9wdGlvbnMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGVuc3VyZSBtb2RlbCBhbmQgY29udGFpbmVyIGVsZW1lbnQgYXJlIHB1c2hlZFxyXG4gICAgY2hlY2tNb2RlbChncm91cCk7XHJcbiAgICBncm91cC5kcmFrZT8uY29udGFpbmVycy5wdXNoKHRoaXMuY29udGFpbmVyKTtcclxuICAgIHRoaXMuc3Vic2NyaWJlKHRoaXMuZHJhZ3VsYSk7XHJcblxyXG4gICAgdGhpcy5ncm91cCA9IGdyb3VwO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHN1YnNjcmliZShuYW1lOiBzdHJpbmcpIHtcclxuICAgIHRoaXMuc3VicyA9IG5ldyBTdWJzY3JpcHRpb24oKTtcclxuICAgIHRoaXMuc3Vicy5hZGQoXHJcbiAgICAgIHRoaXMuZHJhZ3VsYVNlcnZpY2VcclxuICAgICAgLmRyb3BNb2RlbChuYW1lKVxyXG4gICAgICAuc3Vic2NyaWJlKCh7IHNvdXJjZSwgdGFyZ2V0LCBzb3VyY2VNb2RlbCwgdGFyZ2V0TW9kZWwgfSkgPT4ge1xyXG4gICAgICAgIGlmIChzb3VyY2UgPT09IHRoaXMuZWwubmF0aXZlRWxlbWVudCkge1xyXG4gICAgICAgICAgdGhpcy5kcmFndWxhTW9kZWxDaGFuZ2UuZW1pdChzb3VyY2VNb2RlbCk7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0YXJnZXQgPT09IHRoaXMuZWwubmF0aXZlRWxlbWVudCkge1xyXG4gICAgICAgICAgdGhpcy5kcmFndWxhTW9kZWxDaGFuZ2UuZW1pdCh0YXJnZXRNb2RlbCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgKTtcclxuICAgIHRoaXMuc3Vicy5hZGQoXHJcbiAgICAgIHRoaXMuZHJhZ3VsYVNlcnZpY2VcclxuICAgICAgLnJlbW92ZU1vZGVsKG5hbWUpXHJcbiAgICAgIC5zdWJzY3JpYmUoKHsgc291cmNlLCBzb3VyY2VNb2RlbCB9KSA9PiB7XHJcbiAgICAgICAgaWYgKHNvdXJjZSA9PT0gdGhpcy5lbC5uYXRpdmVFbGVtZW50KSB7XHJcbiAgICAgICAgICB0aGlzLmRyYWd1bGFNb2RlbENoYW5nZS5lbWl0KHNvdXJjZU1vZGVsKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHRlYXJkb3duKGdyb3VwTmFtZTogc3RyaW5nKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5zdWJzKSB7XHJcbiAgICAgIHRoaXMuc3Vicy51bnN1YnNjcmliZSgpO1xyXG4gICAgfVxyXG4gICAgY29uc3QgZ3JvdXAgPSB0aGlzLmRyYWd1bGFTZXJ2aWNlLmZpbmQoZ3JvdXBOYW1lKTtcclxuICAgIGlmIChncm91cCkge1xyXG4gICAgICBjb25zdCBpdGVtVG9SZW1vdmUgPSBncm91cC5kcmFrZT8uY29udGFpbmVycy5pbmRleE9mKHRoaXMuZWwubmF0aXZlRWxlbWVudCk7XHJcbiAgICAgIGlmIChpdGVtVG9SZW1vdmUgIT09IC0xKSB7XHJcbiAgICAgICAgZ3JvdXAuZHJha2U/LmNvbnRhaW5lcnMuc3BsaWNlKGl0ZW1Ub1JlbW92ZSwgMSk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHRoaXMuZHJhZ3VsYU1vZGVsICYmIGdyb3VwLmRyYWtlICYmIGdyb3VwLmRyYWtlLm1vZGVscykge1xyXG4gICAgICAgIGNvbnN0IG1vZGVsSW5kZXggPSBncm91cC5kcmFrZS5tb2RlbHMuaW5kZXhPZih0aGlzLmRyYWd1bGFNb2RlbCk7XHJcbiAgICAgICAgaWYgKG1vZGVsSW5kZXggIT09IC0xKSB7XHJcbiAgICAgICAgICBncm91cC5kcmFrZS5tb2RlbHMuc3BsaWNlKG1vZGVsSW5kZXgsIDEpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgaWYgKCF0aGlzLmRyYWd1bGEpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMudGVhcmRvd24odGhpcy5kcmFndWxhKTtcclxuICB9XHJcblxyXG59XHJcbiJdfQ==