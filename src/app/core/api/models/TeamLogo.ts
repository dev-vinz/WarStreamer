export class TeamLogo {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                          PROPERTIES                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  private _teamName: string;
  private _userId: string;
  private _logo: File;
  private _clanTags: string[];

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                        CONSTRUCTORS                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  constructor(
    teamName: string,
    userId: string,
    logo: File,
    clanTags: string[]
  ) {
    // Inputs
    {
      this._teamName = teamName;
      this._userId = userId;
      this._logo = logo;
      this._clanTags = clanTags;
    }
  }

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                           PUBLIC                            *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  public exportAsFormData(): FormData {
    const formData = new FormData();
    formData.append('TeamName', this._teamName);
    formData.append('UserId', this._userId);
    formData.append('Logo', this._logo, this._logo.name);

    this._clanTags.forEach((tag) => {
      formData.append('ClanTags', tag);
    });

    return formData;
  }

  public async generateImageUrl(): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(this._logo);

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

  public get teamName(): string {
    return this._teamName;
  }

  public get userId(): string {
    return this._userId;
  }

  public get logo(): File {
    return this._logo;
  }

  public get clanTags(): string[] {
    return this._clanTags;
  }

  /* * * * * * * * * * * * * * * *\
  |*           SETTERS           *|
  \* * * * * * * * * * * * * * * */

  public set logo(value: File) {
    this._logo = value;
  }

  public set clanTags(value: string[]) {
    this._clanTags = value;
  }
}
