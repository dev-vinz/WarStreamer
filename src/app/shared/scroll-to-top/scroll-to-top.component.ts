import { AfterViewInit, Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-scroll-to-top',
  templateUrl: './scroll-to-top.component.html',
  styleUrl: './scroll-to-top.component.scss',
})
export class ScrollToTopComponent implements AfterViewInit {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                          PROPERTIES                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  private _progressPath: any;
  private _pathLength!: number;

  private _offset: number = 100;

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                        CONSTRUCTORS                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  constructor() {}

  ngAfterViewInit(): void {
    this._progressPath = document.querySelector('.ws-progress-wrap path');
    this._pathLength = this._progressPath.getTotalLength();

    this._progressPath.style.transition = 'none';
    this._progressPath.style.strokeDasharray = `${this._pathLength} ${this._pathLength}`;
    this._progressPath.style.strokeDashoffset = `${this._pathLength}`;
    this._progressPath.getBoundingClientRect();
    this._progressPath.style.transition = 'stroke-dashoffset 10ms ease-in-out';
  }

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                           PUBLIC                            *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  @HostListener('window:scroll', ['$event'])
  public onScroll(event: Event): void {
    this.updateProgress();

    if (window.scrollY > this._offset) {
      document
        .querySelector('.ws-progress-wrap')
        ?.classList.add('ws-active-progress');
    } else {
      document
        .querySelector('.ws-progress-wrap')
        ?.classList.remove('ws-active-progress');
    }
  }

  public scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                           PRIVATE                           *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  public updateProgress(): void {
    const scroll = window.scrollY;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const progress = this._pathLength - (scroll * this._pathLength) / height;
    this._progressPath.style.strokeDashoffset = progress;
  }
}
