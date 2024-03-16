export class Font {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                          PROPERTIES                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  private _id: string;
  private _displayName: string;
  private _familyName: string;
  private _file: File;

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                        CONSTRUCTORS                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  constructor(id: string, displayName: string, familyName: string, file: File) {
    // Inputs
    {
      this._id = id;
      this._displayName = displayName;
      this._familyName = familyName;
      this._file = file;
    }
  }

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                           PUBLIC                            *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  public async generateFontSource(): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(this._file);

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

  public get id(): string {
    return this._id;
  }

  public get displayName(): string {
    return this._displayName;
  }

  public get familyName(): string {
    return this._familyName;
  }

  public get file(): File {
    return this._file;
  }
}
