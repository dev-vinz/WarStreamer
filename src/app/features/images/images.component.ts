import { Component, OnInit } from '@angular/core';
import { Image } from '../../core/api/models/Image';
import { WarStreamerService } from '../../core/api/warstreamer.service';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrl: './images.component.scss',
})
export class ImagesComponent implements OnInit {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                          PROPERTIES                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  private _images: Image[] = [];

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                        CONSTRUCTORS                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  constructor(private _apiService: WarStreamerService) {}

  async ngOnInit(): Promise<void> {
    this._images = await this._apiService.images.getAll().execute();
    this._sort();
  }

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                           PUBLIC                            *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  public add(image: Image): void {
    this._images.push(image);
    this._sort();
  }

  public remove(index: number): void {
    this._images.splice(index, 1);
  }

  /* * * * * * * * * * * * * * * *\
  |*           GETTERS           *|
  \* * * * * * * * * * * * * * * */

  public get images(): Image[] {
    return this._images;
  }

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                           PRIVATE                           *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  private _sort(): void {
    this._images.sort((a, b) => a.name.localeCompare(b.name));
  }
}
