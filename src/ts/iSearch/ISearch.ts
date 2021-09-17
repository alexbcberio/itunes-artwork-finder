import { ISearchResult } from "./ISearchResult";
import { ISearchResultCollection } from "./ISearchResultCollection";
import { SearchConstraints } from "./interfaces/SearchConstraints";

export class ISearch {
  private static get API_BASE_URL(): string {
    return "https://itunes.apple.com/search";
  }

  private static get DEFAULT_CONSTRAINTS(): SearchConstraints {
    return {
      country: "us",
      lang: "en_us",
      version: "2",
      offset: 0,
    };
  }

  private static get MAX_LIMIT(): number {
    const maxLimit = 200;

    return maxLimit;
  }

  private static get MIN_LIMIT(): number {
    const minLimit = 200;

    return minLimit;
  }

  private static get MIN_OFFSET(): number {
    const minOffset = 200;

    return minOffset;
  }

  public ["constructor"]: typeof ISearch;
  private _term: string;
  private _searchConstraints: SearchConstraints;
  private _searchResultCollection: ISearchResultCollection;
  private _hasFoundResults: boolean;

  constructor(term: string, searchConstraints: SearchConstraints) {
    this._term = term;

    this._searchConstraints = {
      ...ISearch.DEFAULT_CONSTRAINTS,
      ...searchConstraints,
    };

    this._searchResultCollection = new ISearchResultCollection();
    this._hasFoundResults = false;
  }

  public get hasFoundResults(): boolean {
    return this._hasFoundResults;
  }

  public async search(): Promise<Array<ISearchResult>> {
    const url = this.getSearchUrl();
    // TODO: handle fetch errors and API rate-limit (http status 403)
    const res = await fetch(url);
    const resJson = await res.json();

    const resultCount = resJson.resultCount;
    const results = resJson.results;

    // eslint-disable-next-line no-magic-numbers
    this._hasFoundResults = resultCount > 0;
    this._searchConstraints.offset += resultCount;

    return this._searchResultCollection.addResults(results);
  }

  private getSearchUrl(): string {
    const term = this._term;

    let searchUrl = this.constructor.API_BASE_URL;

    searchUrl += `?term=${encodeURIComponent(term)}`;
    searchUrl += this.getSearchConstraints();

    return searchUrl;
  }

  private getSearchConstraints(): string {
    const searchConstraints = this._searchConstraints;

    let searchConstraintParams = "";

    for (const constraint in searchConstraints) {
      // @ts-expect-error cannot statically verify type
      if (typeof searchConstraints[constraint] !== "undefined") {
        let value: string;

        switch (constraint) {
          case "limit":
            value = Math.min(
              this.constructor.MAX_LIMIT,
              // @ts-expect-error already checked if is not undefined
              Math.max(this.constructor.MIN_LIMIT, searchConstraints.limit)
            ).toString();
            break;
          case "explicit":
            value = searchConstraints.explicit === true ? "Yes" : "No";
            break;
          case "offset":
            value = Math.max(
              this.constructor.MIN_OFFSET,
              // @ts-expect-error already checked if is not undefined
              searchConstraints.offset
            ).toString();
            break;
          case "country":
          case "media":
          case "entity":
          case "attribute":
          case "lang":
          case "version":
            // @ts-expect-error already checked if is not undefined
            value = searchConstraints[constraint];
            break;
          default:
            value = "";
        }

        if (value) {
          const entrySeparator = searchConstraintParams ? "&" : "";

          searchConstraintParams += `${entrySeparator}${constraint}=${value}`;
        }
      }
    }

    return searchConstraintParams;
  }
}
