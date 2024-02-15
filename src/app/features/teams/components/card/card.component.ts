import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  inject,
} from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { take } from 'rxjs';

import { SwiperContainer } from 'swiper/element';
import { Swiper, SwiperOptions } from 'swiper/types';

import { WarStreamerService } from '../../../../core/api/warstreamer.service';

import { TeamLogoModalComponent } from '../team-logo-modal/team-logo-modal.component';

import { ClashClan } from '../../../../core/api/models/ClashClan';
import { TeamLogo } from '../../../../core/api/models/TeamLogo';
import { ConfirmDeleteModalComponent } from '../confirm-delete-modal/confirm-delete-modal.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent implements AfterViewInit, OnInit {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                          CONSTANTS                          *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  private readonly _basePaginationCSSSelector: string =
    'ws-teams-card-swiper-pagination';

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                          PROPERTIES                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  @Input()
  public customSelector: string = '';

  @Input()
  public teamLogo: TeamLogo | null = null;

  @Output()
  public teamDeleted: EventEmitter<void> = new EventEmitter();

  @ViewChild('swiper')
  private _swiperContainer!: ElementRef<SwiperContainer>;

  private _clans: ClashClan[] = [];
  private _config!: SwiperOptions;
  private _iconUrl: string = '';
  private _modalService = inject(NgbModal);

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                        CONSTRUCTORS                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  constructor(private _apiService: WarStreamerService) {}

  ngAfterViewInit(): void {}

  async ngOnInit(): Promise<void> {
    this._config = {
      spaceBetween: 30,
      effect: 'fade',
      loop: true,
      allowTouchMove: false,
      mousewheel: false,
      pagination: {
        el: `.${this.paginationCSSSelector}`,
        clickable: true,
        bulletClass: 'ws-teams-card-swiper-pagination-bullet',
        bulletActiveClass: 'ws-teams-card-swiper-pagination-bullet-active',
      },
    };

    if (this.teamLogo) {
      this._loadTeamLogoClans();
      this._iconUrl = await this.teamLogo.generateImageUrl();
    }
  }

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                           PUBLIC                            *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  public delete(): void {
    const modalRef = this._modalService.open(ConfirmDeleteModalComponent, {
      centered: true,
    });

    modalRef.componentInstance.teamName = this.teamLogo?.teamName;

    modalRef.closed.pipe(take(1)).subscribe((result) => {
      if (result) {
        this.teamDeleted.emit();
      }
    });
  }

  public edit(): void {
    const modalRef = this._modalService.open(TeamLogoModalComponent, {
      centered: true,
    });

    modalRef.componentInstance.existingTeamLogo = this.teamLogo;

    modalRef.closed.pipe(take(1)).subscribe(async (result) => {
      if (result as TeamLogo) {
        this.teamLogo = result;
        this._loadTeamLogoClans();
        this._iconUrl = await this.teamLogo!.generateImageUrl();

        this._swiper.update();
        this._swiper.slideTo(0);
      }
    });
  }

  public isFirstClanSlide(index: number): boolean {
    return index === 0;
  }

  public isLastClanSlide(index: number): boolean {
    return index >= this.clanSlides - 1;
  }

  public nextSlide(): void {
    this._swiper.slideNext();
  }

  public prevSlide(): void {
    this._swiper.slidePrev();
  }

  public selectClansSlide(index: number): ClashClan[] {
    const start = index * 3;
    const end = start + 3;

    return this._clans.slice(start, end);
  }

  /* * * * * * * * * * * * * * * *\
  |*           GETTERS           *|
  \* * * * * * * * * * * * * * * */

  public get clanSlides(): number {
    return Math.ceil((this.teamLogo?.clanTags.length ?? 0) / 3);
  }

  public get config(): SwiperOptions {
    return this._config;
  }

  public get iconUrl(): string {
    return this._iconUrl;
  }

  public get paginationCSSSelector(): string {
    return `${this._basePaginationCSSSelector}-${this.customSelector}`;
  }

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                           PRIVATE                           *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  private _loadTeamLogoClans(): void {
    if (this.teamLogo) {
      this._clans = [];
      this.teamLogo.clanTags.forEach(async (tag) =>
        this._clans.push(
          await this._apiService.clashClans.getByTag(tag).execute()
        )
      );
    }
  }

  /* * * * * * * * * * * * * * * *\
  |*           GETTERS           *|
  \* * * * * * * * * * * * * * * */

  private get _swiper(): Swiper {
    return this._swiperContainer.nativeElement.swiper;
  }
}
