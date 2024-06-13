import { Subject, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { EventTypes } from './EventTypes';
import { DrakeFactory } from './DrakeFactory';
export const MockDrakeFactory = new DrakeFactory((containers, options) => {
    return new MockDrake(containers, options);
});
/** You can use MockDrake to simulate Drake events.
 *
 * The three methods that actually do anything are `on(event, listener)`,
 * `destroy()`, and a new method, `emit()`. Use `emit()` to manually emit Drake
 * events, and if you injected MockDrake properly with MockDrakeFactory or
 * mocked the DragulaService.find() method, then you can make ng2-dragula think
 * drags and drops are happening.
 *
 * Caveats:
 *
 * 1. YOU MUST MAKE THE DOM CHANGES YOURSELF.
 * 2. REPEAT: YOU MUST MAKE THE DOM CHANGES YOURSELF.
 *    That means `source.removeChild(el)`, and `target.insertBefore(el)`.
 * 3. None of the other methods do anything.
 *    That's ok, because ng2-dragula doesn't use them.
 */
export class MockDrake {
    /**
     * @param containers A list of container elements.
     * @param options These will NOT be used. At all.
     * @param models Nonstandard, but useful for testing using `new MockDrake()` directly.
     *               Note, default value is undefined, like a real Drake. Don't change that.
     */
    constructor(containers = [], options = {}, models) {
        this.containers = containers;
        this.options = options;
        this.models = models;
        // Basic but fully functional event emitter shim
        this.emitter$ = new Subject();
        this.subs = new Subscription();
        /* Doesn't represent anything meaningful. */
        this.dragging = false;
    }
    on(event, callback) {
        this.subs.add(this.emitter$
            .pipe(filter(({ eventType }) => eventType === event))
            .subscribe(({ eventType, args }) => {
            if (eventType === EventTypes.Drag) {
                const argument = Array.from(args);
                const el = argument[0];
                const source = argument[1];
                //@ts-ignore
                callback(el, source);
                return;
            }
            if (eventType === EventTypes.Drop) {
                const argument = Array.from(args);
                const el = argument[0];
                const target = argument[1];
                const source = argument[2];
                const sibling = argument[3];
                //@ts-ignore
                callback(el, target, source, sibling);
                return;
            }
            if (eventType === EventTypes.Remove) {
                const argument = Array.from(args);
                const el = argument[0];
                const container = argument[1];
                const source = argument[2];
                //@ts-ignore
                callback(el, container, source);
                return;
            }
            callback(args);
        }));
    }
    /* Does nothing useful. */
    start(item) {
        this.dragging = true;
    }
    /* Does nothing useful. */
    end() {
        this.dragging = false;
    }
    cancel(revert) {
        this.dragging = false;
    }
    /* Does nothing useful. */
    canMove(item) {
        return this.options.accepts ? this.options.accepts(item) : false;
    }
    /* Does nothing useful. */
    remove() {
        this.dragging = false;
    }
    destroy() {
        this.subs.unsubscribe();
    }
    /**
     * This is the most useful method. You can use it to manually fire events that would normally
     * be fired by a real drake.
     *
     * You're likely most interested in firing `drag`, `remove` and `drop`, the three events
     * DragulaService uses to implement [dragulaModel].
     *
     * See https://github.com/bevacqua/dragula#drakeon-events for what you should emit (and in what order).
     *
     * (Note also, firing dropModel and removeModel won't work. You would have to mock DragulaService for that.)
     */
    emit(eventType, ...args) {
        this.emitter$.next({ eventType, args });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTW9ja0RyYWtlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGlicy9uZzItZHJhZ3VsYS9zcmMvTW9ja0RyYWtlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRTdDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN4QyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBRTFDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUc5QyxNQUFNLENBQUMsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLFlBQVksQ0FBQyxDQUFDLFVBQVUsRUFBRSxPQUFPLEVBQUUsRUFBRTtJQUN2RSxPQUFPLElBQUksU0FBUyxDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUMsQ0FBQztBQUM1QyxDQUFDLENBQUMsQ0FBQztBQUVIOzs7Ozs7Ozs7Ozs7Ozs7R0FlRztBQUNILE1BQU0sT0FBTyxTQUFTO0lBS3BCOzs7OztPQUtHO0lBQ0gsWUFDUyxhQUF3QixFQUFFLEVBQzFCLFVBQTBCLEVBQUUsRUFDNUIsTUFBZ0I7UUFGaEIsZUFBVSxHQUFWLFVBQVUsQ0FBZ0I7UUFDMUIsWUFBTyxHQUFQLE9BQU8sQ0FBcUI7UUFDNUIsV0FBTSxHQUFOLE1BQU0sQ0FBVTtRQWJ6QixnREFBZ0Q7UUFDeEMsYUFBUSxHQUFHLElBQUksT0FBTyxFQUEwQyxDQUFDO1FBQ2pFLFNBQUksR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBNkRsQyw0Q0FBNEM7UUFDNUMsYUFBUSxHQUFHLEtBQUssQ0FBQztJQWxEZCxDQUFDO0lBVUosRUFBRSxDQUFDLEtBQWEsRUFBRSxRQUE4QjtRQUM5QyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUTthQUN4QixJQUFJLENBQ0gsTUFBTSxDQUFDLENBQUMsRUFB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b3J0IHsgU3ViamVjdCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IERyYWtlV2l0aE1vZGVscyB9IGZyb20gJy4vRHJha2VXaXRoTW9kZWxzJztcclxuaW1wb3J0IHsgZmlsdGVyIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBFdmVudFR5cGVzIH0gZnJvbSAnLi9FdmVudFR5cGVzJztcclxuaW1wb3J0IHsgRHJhZ3VsYU9wdGlvbnMgfSBmcm9tICcuL0RyYWd1bGFPcHRpb25zJztcclxuaW1wb3J0IHsgRHJha2VGYWN0b3J5IH0gZnJvbSAnLi9EcmFrZUZhY3RvcnknO1xyXG5pbXBvcnQgeyBEcmFrZSB9IGZyb20gJ2RyYWd1bGEnO1xyXG5cclxuZXhwb3J0IGNvbnN0IE1vY2tEcmFrZUZhY3RvcnkgPSBuZXcgRHJha2VGYWN0b3J5KChjb250YWluZXJzLCBvcHRpb25zKSA9PiB7XHJcbiAgcmV0dXJuIG5ldyBNb2NrRHJha2UoY29udGFpbmVycywgb3B0aW9ucyk7XHJcbn0pO1xyXG5cclxuLyoqIFlvdSBjYW4gdXNlIE1vY2tEcmFrZSB0byBzaW11bGF0ZSBEcmFrZSBldmVudHMuXHJcbiAqXHJcbiAqIFRoZSB0aHJlZSBtZXRob2RzIHRoYXQgYWN0dWFsbHkgZG8gYW55dGhpbmcgYXJlIGBvbihldmVudCwgbGlzdGVuZXIpYCxcclxuICogYGRlc3Ryb3koKWAsIGFuZCBhIG5ldyBtZXRob2QsIGBlbWl0KClgLiBVc2UgYGVtaXQoKWAgdG8gbWFudWFsbHkgZW1pdCBEcmFrZVxyXG4gKiBldmVudHMsIGFuZCBpZiB5b3UgaW5qZWN0ZWQgTW9ja0RyYWtlIHByb3Blcmx5IHdpdGggTW9ja0RyYWtlRmFjdG9yeSBvclxyXG4gKiBtb2NrZWQgdGhlIERyYWd1bGFTZXJ2aWNlLmZpbmQoKSBtZXRob2QsIHRoZW4geW91IGNhbiBtYWtlIG5nMi1kcmFndWxhIHRoaW5rXHJcbiAqIGRyYWdzIGFuZCBkcm9wcyBhcmUgaGFwcGVuaW5nLlxyXG4gKlxyXG4gKiBDYXZlYXRzOlxyXG4gKlxyXG4gKiAxLiBZT1UgTVVTVCBNQUtFIFRIRSBET00gQ0hBTkdFUyBZT1VSU0VMRi5cclxuICogMi4gUkVQRUFUOiBZT1UgTVVTVCBNQUtFIFRIRSBET00gQ0hBTkdFUyBZT1VSU0VMRi5cclxuICogICAgVGhhdCBtZWFucyBgc291cmNlLnJlbW92ZUNoaWxkKGVsKWAsIGFuZCBgdGFyZ2V0Lmluc2VydEJlZm9yZShlbClgLlxyXG4gKiAzLiBOb25lIG9mIHRoZSBvdGhlciBtZXRob2RzIGRvIGFueXRoaW5nLlxyXG4gKiAgICBUaGF0J3Mgb2ssIGJlY2F1c2UgbmcyLWRyYWd1bGEgZG9lc24ndCB1c2UgdGhlbS5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBNb2NrRHJha2UgaW1wbGVtZW50cyBEcmFrZVdpdGhNb2RlbHMge1xyXG4gIC8vIEJhc2ljIGJ1dCBmdWxseSBmdW5jdGlvbmFsIGV2ZW50IGVtaXR0ZXIgc2hpbVxyXG4gIHByaXZhdGUgZW1pdHRlciQgPSBuZXcgU3ViamVjdDx7IGV2ZW50VHlwZTogRXZlbnRUeXBlcywgYXJnczogYW55W10gfT4oKTtcclxuICBwcml2YXRlIHN1YnMgPSBuZXcgU3Vic2NyaXB0aW9uKCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSBjb250YWluZXJzIEEgbGlzdCBvZiBjb250YWluZXIgZWxlbWVudHMuXHJcbiAgICogQHBhcmFtIG9wdGlvbnMgVGhlc2Ugd2lsbCBOT1QgYmUgdXNlZC4gQXQgYWxsLlxyXG4gICAqIEBwYXJhbSBtb2RlbHMgTm9uc3RhbmRhcmQsIGJ1dCB1c2VmdWwgZm9yIHRlc3RpbmcgdXNpbmcgYG5ldyBNb2NrRHJha2UoKWAgZGlyZWN0bHkuXHJcbiAgICogICAgICAgICAgICAgICBOb3RlLCBkZWZhdWx0IHZhbHVlIGlzIHVuZGVmaW5lZCwgbGlrZSBhIHJlYWwgRHJha2UuIERvbid0IGNoYW5nZSB0aGF0LlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHVibGljIGNvbnRhaW5lcnM6IEVsZW1lbnRbXSA9IFtdLFxyXG4gICAgcHVibGljIG9wdGlvbnM6IERyYWd1bGFPcHRpb25zID0ge30sXHJcbiAgICBwdWJsaWMgbW9kZWxzPzogYW55W11bXVxyXG4gICkge31cclxuXHJcbiAgb24oZXZlbnQ6ICdkcmFnJywgbGlzdGVuZXI6IChlbDogRWxlbWVudCwgc291cmNlOiBFbGVtZW50KSA9PiB2b2lkKTogRHJha2U7XHJcbiAgb24oZXZlbnQ6ICdkcmFnZW5kJywgbGlzdGVuZXI6IChlbDogRWxlbWVudCkgPT4gdm9pZCk6IERyYWtlO1xyXG4gIG9uKGV2ZW50OiAnZHJvcCcsIGxpc3RlbmVyOiAoZWw6IEVsZW1lbnQsIHRhcmdldDogRWxlbWVudCwgc291cmNlOiBFbGVtZW50LCBzaWJsaW5nOiBFbGVtZW50KSA9PiB2b2lkKTogRHJha2U7XHJcbiAgb24oZXZlbnQ6ICdjYW5jZWwnIHwgJ3JlbW92ZScgfCAnc2hhZG93JyB8ICdvdmVyJyB8ICdvdXQnLCBsaXN0ZW5lcjogKGVsOiBFbGVtZW50LCBjb250YWluZXI6IEVsZW1lbnQsIHNvdXJjZTogRWxlbWVudCkgPT4gdm9pZCk6IERyYWtlO1xyXG4gIG9uKGV2ZW50OiAnY2xvbmVkJywgbGlzdGVuZXI6IChjbG9uZTogRWxlbWVudCwgb3JpZ2luYWw6IEVsZW1lbnQsIHR5cGU6ICdjb3B5JyB8ICdtaXJyb3InKSA9PiB2b2lkKTogRHJha2U7XHJcbiAgb24oZXZlbnQ6ICdkcm9wTW9kZWwnLCBsaXN0ZW5lcjogKFtlbCwgdGFyZ2V0LCBzb3VyY2UsIHNpYmxpbmcsIGl0ZW0sIHNvdXJjZU1vZGVsLCB0YXJnZXRNb2RlbCwgc291cmNlSW5kZXgsIHRhcmdldEluZGV4LF06IFtFbGVtZW50LCBFbGVtZW50LCBFbGVtZW50LCBFbGVtZW50LCBhbnksIGFueVtdLCBhbnlbXSwgbnVtYmVyLCBudW1iZXJdKSA9PiB2b2lkKTogRHJha2U7XHJcbiAgb24oZXZlbnQ6ICdyZW1vdmVNb2RlbCcsIGxpc3RlbmVyOiAoW2VsLCBjb250YWluZXIsIHNvdXJjZSwgaXRlbSwgc291cmNlTW9kZWwsIHNvdXJjZUluZGV4XTogW0VsZW1lbnQsIEVsZW1lbnQsIEVsZW1lbnQsIGFueSwgYW55W10sIG51bWJlcl0pID0+IHZvaWQpOiBEcmFrZTtcclxuXHJcbiAgb24oZXZlbnQ6IHN0cmluZywgY2FsbGJhY2s6ICguLi5hcmdzOiBhbnkpPT4gYW55KTogYW55IHtcclxuICAgIHRoaXMuc3Vicy5hZGQodGhpcy5lbWl0dGVyJFxyXG4gICAgICAucGlwZShcclxuICAgICAgICBmaWx0ZXIoKHsgZXZlbnRUeXBlIH0pID0+IGV2ZW50VHlwZSA9PT0gZXZlbnQpXHJcbiAgICAgIClcclxuICAgICAgLnN1YnNjcmliZSgoe2V2ZW50VHlwZSwgYXJnc30gKSA9PiB7XHJcbiAgICAgICAgaWYgKGV2ZW50VHlwZSA9PT0gRXZlbnRUeXBlcy5EcmFnKSB7XHJcbiAgICAgICAgICBjb25zdCBhcmd1bWVudCA9IEFycmF5LmZyb20oYXJncyk7XHJcbiAgICAgICAgICBjb25zdCBlbCA9IGFyZ3VtZW50WzBdO1xyXG4gICAgICAgICAgY29uc3Qgc291cmNlID0gYXJndW1lbnRbMV07XHJcbiAgICAgICAgICAvL0B0cy1pZ25vcmVcclxuICAgICAgICAgIGNhbGxiYWNrKGVsLCBzb3VyY2UpO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGV2ZW50VHlwZSA9PT0gRXZlbnRUeXBlcy5Ecm9wKSB7XHJcbiAgICAgICAgICBjb25zdCBhcmd1bWVudCA9IEFycmF5LmZyb20oYXJncyk7XHJcbiAgICAgICAgICBjb25zdCBlbCA9IGFyZ3VtZW50WzBdO1xyXG4gICAgICAgICAgY29uc3QgdGFyZ2V0ID0gYXJndW1lbnRbMV07XHJcbiAgICAgICAgICBjb25zdCBzb3VyY2UgPSBhcmd1bWVudFsyXTtcclxuICAgICAgICAgIGNvbnN0IHNpYmxpbmcgPSBhcmd1bWVudFszXTtcclxuICAgICAgICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgICAgICAgY2FsbGJhY2soZWwsIHRhcmdldCwgc291cmNlLCBzaWJsaW5nKTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChldmVudFR5cGUgPT09IEV2ZW50VHlwZXMuUmVtb3ZlKSB7XHJcbiAgICAgICAgICBjb25zdCBhcmd1bWVudCA9IEFycmF5LmZyb20oYXJncyk7XHJcbiAgICAgICAgICBjb25zdCBlbCA9IGFyZ3VtZW50WzBdO1xyXG4gICAgICAgICAgY29uc3QgY29udGFpbmVyID0gYXJndW1lbnRbMV07XHJcbiAgICAgICAgICBjb25zdCBzb3VyY2UgPSBhcmd1bWVudFsyXTtcclxuICAgICAgICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgICAgICAgY2FsbGJhY2soZWwsIGNvbnRhaW5lciwgc291cmNlKTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2FsbGJhY2soYXJncyk7XHJcbiAgICAgIH0pKTtcclxuICB9XHJcblxyXG4gIC8qIERvZXNuJ3QgcmVwcmVzZW50IGFueXRoaW5nIG1lYW5pbmdmdWwuICovXHJcbiAgZHJhZ2dpbmcgPSBmYWxzZTtcclxuXHJcbiAgLyogRG9lcyBub3RoaW5nIHVzZWZ1bC4gKi9cclxuICBzdGFydChpdGVtOiBFbGVtZW50KTogYW55IHtcclxuICAgIHRoaXMuZHJhZ2dpbmcgPSB0cnVlO1xyXG4gIH1cclxuICAvKiBEb2VzIG5vdGhpbmcgdXNlZnVsLiAqL1xyXG4gIGVuZCgpOiBhbnkge1xyXG4gICAgdGhpcy5kcmFnZ2luZyA9IGZhbHNlO1xyXG4gIH1cclxuICAvKiBEb2VzIG5vdGhpbmcgdXNlZnVsLiAqL1xyXG4gIGNhbmNlbChyZXZlcnQ6IGJvb2xlYW4pOiBhbnk7XHJcbiAgY2FuY2VsKCk6IGFueTtcclxuICBjYW5jZWwocmV2ZXJ0PzogYW55KSB7XHJcbiAgICB0aGlzLmRyYWdnaW5nID0gZmFsc2U7XHJcbiAgfVxyXG5cclxuICAvKiBEb2VzIG5vdGhpbmcgdXNlZnVsLiAqL1xyXG4gIGNhbk1vdmUoaXRlbTogRWxlbWVudCkge1xyXG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy5hY2NlcHRzID8gdGhpcy5vcHRpb25zLmFjY2VwdHMoaXRlbSkgOiBmYWxzZTtcclxuICB9XHJcblxyXG4gIC8qIERvZXMgbm90aGluZyB1c2VmdWwuICovXHJcbiAgcmVtb3ZlKCk6IGFueSB7XHJcbiAgICB0aGlzLmRyYWdnaW5nID0gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBkZXN0cm95KCk6IGFueSB7XHJcbiAgICB0aGlzLnN1YnMudW5zdWJzY3JpYmUoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgaXMgdGhlIG1vc3QgdXNlZnVsIG1ldGhvZC4gWW91IGNhbiB1c2UgaXQgdG8gbWFudWFsbHkgZmlyZSBldmVudHMgdGhhdCB3b3VsZCBub3JtYWxseVxyXG4gICAqIGJlIGZpcmVkIGJ5IGEgcmVhbCBkcmFrZS5cclxuICAgKlxyXG4gICAqIFlvdSdyZSBsaWtlbHkgbW9zdCBpbnRlcmVzdGVkIGluIGZpcmluZyBgZHJhZ2AsIGByZW1vdmVgIGFuZCBgZHJvcGAsIHRoZSB0aHJlZSBldmVudHNcclxuICAgKiBEcmFndWxhU2VydmljZSB1c2VzIHRvIGltcGxlbWVudCBbZHJhZ3VsYU1vZGVsXS5cclxuICAgKlxyXG4gICAqIFNlZSBodHRwczovL2dpdGh1Yi5jb20vYmV2YWNxdWEvZHJhZ3VsYSNkcmFrZW9uLWV2ZW50cyBmb3Igd2hhdCB5b3Ugc2hvdWxkIGVtaXQgKGFuZCBpbiB3aGF0IG9yZGVyKS5cclxuICAgKlxyXG4gICAqIChOb3RlIGFsc28sIGZpcmluZyBkcm9wTW9kZWwgYW5kIHJlbW92ZU1vZGVsIHdvbid0IHdvcmsuIFlvdSB3b3VsZCBoYXZlIHRvIG1vY2sgRHJhZ3VsYVNlcnZpY2UgZm9yIHRoYXQuKVxyXG4gICAqL1xyXG4gIGVtaXQoZXZlbnRUeXBlOiBFdmVudFR5cGVzLCAuLi5hcmdzOiBhbnlbXSkge1xyXG4gICAgdGhpcy5lbWl0dGVyJC5uZXh0KHsgZXZlbnRUeXBlLCBhcmdzIH0pO1xyXG4gIH1cclxuXHJcbn1cclxuIl19