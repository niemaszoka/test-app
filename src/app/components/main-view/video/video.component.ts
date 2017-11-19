import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'yv-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VideoComponent implements OnInit {
  public videoUrl: SafeUrl;
  private VIDEO_URL_BASE = 'https://www.youtube-nocookie.com/embed/';
  private VIDEO_URL_PARAMS = '?rel=0';

  constructor(private route: ActivatedRoute,
              private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.VIDEO_URL_BASE.concat(params.videoId, this.VIDEO_URL_PARAMS));
    });
  }
}
