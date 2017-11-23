import { Component, ElementRef, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'yv-search-list-item',
  templateUrl: './search-list-item.component.html',
  styleUrls: ['./search-list-item.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SearchListItemComponent implements OnInit {
  @Input() videoData: any;
  @ViewChild('imageElement') imageElement: ElementRef;

  public videoThumbnailUrl: string;
  public videoTitle: string;
  public videoDescription: string;

  constructor(private router: Router) { }

  ngOnInit() {
    this.videoThumbnailUrl = this.videoData.snippet.thumbnails.default.url;
    this.videoTitle = this.videoData.snippet.title;
    this.videoDescription = this.videoData.snippet.description;

    this.imageElement.nativeElement.addEventListener('load', () => {
      console.log('load');
      this.imageElement.nativeElement.classList.remove('hidden');
    });
  }

  public redirectToVideo() {
    this.router.navigate(['/video', this.videoData.id.videoId]);
  }
}
