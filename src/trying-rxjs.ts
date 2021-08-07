import { fromEvent, Observable } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  takeUntil,
} from 'rxjs/operators';

// const search$ = new Observable<Event>((observer) => {
//   const search = document.getElementById('search');
//   const stop = document.getElementById('stop');

//   if (!search || !stop) {
//     observer.error('no elem');
//     return;
//   }

//   const onSearch = (e: any) => {
//     console.log(123);
//     checkSubscription();
//     observer.next(e);
//   };

//   const onStop = (e: any) => {
//     checkSubscription();
//     observer.complete();
//     clear();
//   };

//   search.addEventListener('input', onSearch);
//   stop.addEventListener('click', onStop);

//   const checkSubscription = () => {
//     if (observer.closed) {
//       clear();
//     }
//   };

//   const clear = () => {
//     search.removeEventListener('input', onSearch);
//     stop.removeEventListener('click', onStop);
//   };
// });

//заміняє верхній код
const search$: Observable<Event> = fromEvent<Event>(
  document.getElementById('search')!,
  'input'
);

const stop$: Observable<Event> = fromEvent<Event>(
  document.getElementById('stop')!,
  'click'
);

search$
  .pipe(
    map((e) => (e.target as HTMLInputElement).value),
    debounceTime(500),
    map((value) => (value.length > 3 ? value : '')),
    distinctUntilChanged(),
    takeUntil(stop$)
  )
  .subscribe((value) => {
    console.log(value);
  });
