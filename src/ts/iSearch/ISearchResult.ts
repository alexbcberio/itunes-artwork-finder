import { SearchResultKind } from "./enums/SearchResultKind";
import { SearchResultType } from "./enums/SearchResultType";

export class ISearchResult {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
  private _raw: any;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
  constructor(raw: any) {
    this._raw = raw;
  }

  public get type(): SearchResultType {
    return this._raw.wrapperType;
  }

  public get explicit(): boolean {
    return this._raw.collectionExplicitness === "explicit";
  }

  public get kind(): SearchResultKind {
    return this._raw.kind;
  }

  public get trackName(): string {
    return this._raw.trackName;
  }

  public get artistName(): string {
    return this._raw.artistName;
  }

  public get collectionName(): string {
    return this._raw.collectionName;
  }

  public get hasArtwork(): boolean {
    return typeof this._raw.artworkUrl100 === "string";
  }

  public artworkUrl(size: number): string {
    if (!this.hasArtwork) {
      throw new Error("Search result has no artwork");
    }

    const artworkUrl100: string = this._raw.artworkUrl100;

    return artworkUrl100.replace("100x100", `${size}x${size}`);
  }
}
