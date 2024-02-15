import { Component, OnInit } from '@angular/core';

import { WarStreamerService } from '../../core/api/warstreamer.service';

import { TeamLogo } from '../../core/api/models/TeamLogo';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrl: './teams.component.scss',
})
export class TeamsComponent implements OnInit {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                          PROPERTIES                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  private _teams: TeamLogo[] = [];

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                        CONSTRUCTORS                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  constructor(private _apiService: WarStreamerService) {}

  async ngOnInit(): Promise<void> {
    this._teams = await this._apiService.teamLogos.getAll().execute();
    this._sort();
  }

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                           PUBLIC                            *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  public add(team: TeamLogo): void {
    this._teams.push(team);
    this._sort();
  }

  public getCustomSelector(team: TeamLogo): string {
    return team.teamName.replace(/\s/g, '-').toLowerCase();
  }

  public remove(index: number): void {
    this._teams.splice(index, 1);
  }

  /* * * * * * * * * * * * * * * *\
  |*           GETTERS           *|
  \* * * * * * * * * * * * * * * */

  public get teams(): TeamLogo[] {
    return this._teams;
  }

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                           PRIVATE                           *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  private _sort(): void {
    this._teams.sort((a, b) => a.teamName.localeCompare(b.teamName));
  }
}
