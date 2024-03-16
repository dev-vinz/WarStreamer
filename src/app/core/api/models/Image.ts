import { Location2D } from './Location2D';

export class Image {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                          PROPERTIES                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  private _userId: string;
  private _name: string;
  private _image: File;
  private _location: Location2D;
  private _width: number;
  private _height: number;
  private _isUsed: boolean;

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                        CONSTRUCTORS                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  constructor(
    userId: string,
    name: string,
    image: File,
    location: Location2D,
    width: number,
    height: number,
    isUsed: boolean
  ) {
    // Inputs
    {
      this._userId = userId;
      this._name = name;
      this._image = image;
      this._location = location;
      this._width = width;
      this._height = height;
      this._isUsed = isUsed;
    }
  }

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                           PUBLIC                            *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  public exportAsFormData(): FormData {
    const formData = new FormData();
    formData.append('UserId', this._userId);
    formData.append('Name', this._name);
    formData.append('Image', this._image, this._image.name);
    formData.append('LocationX', `${this._location.x}`);
    formData.append('LocationY', `${this._location.y}`);
    formData.append('Width', `${this._width}`);
    formData.append('Height', `${this._height}`);
    formData.append('IsUsed', `${this._isUsed}`);

    return formData;
  }

  public async generateImageUrl(): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(this._image);

      reader.onload = (event) => {
        resolve(event.target?.result as string);
      };

      reader.onerror = (error) => {
        reject(error);
      };
    });
  }

  /* * * * * * * * * * * * * * * *\
  |*           GETTERS           *|
  \* * * * * * * * * * * * * * * */

  public get userId(): string {
    return this._userId;
  }

  public get name(): string {
    return this._name;
  }

  public get image(): File {
    return this._image;
  }

  public get location(): Location2D {
    return this._location;
  }

  public get width(): number {
    return this._width;
  }

  public get height(): number {
    return this._height;
  }

  public get isUsed(): boolean {
    return this._isUsed;
  }

  public get ratio(): number {
    return this._width / this._height;
  }

  /* * * * * * * * * * * * * * * *\
  |*           SETTERS           *|
  \* * * * * * * * * * * * * * * */

  public set image(value: File) {
    this._image = value;
  }

  public set width(value: number) {
    this._width = value;
  }

  public set height(value: number) {
    this._height = value;
  }

  public set isUsed(value: boolean) {
    this._isUsed = value;
  }
}
