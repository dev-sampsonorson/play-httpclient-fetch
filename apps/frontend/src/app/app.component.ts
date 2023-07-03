import { AsyncPipe, JsonPipe, NgFor } from '@angular/common';
import { HttpClient, HttpDownloadProgressEvent, HttpEventType } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { filter, scan } from 'rxjs';

@Component({
  standalone: true,
  imports: [AsyncPipe, JsonPipe, NgFor],
  selector: 'play-httpclient-fetch-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  http = inject(HttpClient);

  hello$ = this.http.get(`/api/hello`).pipe(

  );

  messageChunks$ = this.http.get(`http://localhost:3000/api/hello/chunk`, {
    observe: 'events',
    reportProgress: true,
    responseType: 'text'
  }).pipe(
    filter((response): response is HttpDownloadProgressEvent => {
      return response.type === HttpEventType.DownloadProgress;
    }),
    scan((acc, event) => {
      return [...acc, event.partialText].filter((x): x is string => !!x);
    }, [] as string[]),
  )
}
