import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { RestService } from '../../services/rest.service';
import { Video } from '../../data-models/video-data-model';

@Component({
  selector: 'yv-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VideoComponent implements OnInit {
  public videoUrl: SafeUrl;
  public video: Video = new Video();
  private VIDEO_URL_BASE = 'https://www.youtube-nocookie.com/embed/';
  private VIDEO_URL_PARAMS = '?rel=0&vq=hd1080';

  constructor(private route: ActivatedRoute,
              private sanitizer: DomSanitizer,
              private restService: RestService) {
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.VIDEO_URL_BASE.concat(params.videoId, this.VIDEO_URL_PARAMS));
      this.restService.getVideoData(params.videoId).subscribe((data) => {
        const fetchedVideoData = data['items'][0];
        console.log(fetchedVideoData);
        this.video.title = fetchedVideoData.snippet.title;
        this.video.description = fetchedVideoData.snippet.description;
        this.video.tags = fetchedVideoData.snippet.tags;
      });
    });
  }
}
