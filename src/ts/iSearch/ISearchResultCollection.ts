import { ISearchResult } from "./ISearchResult";
import { SearchConstraints } from "./interfaces/SearchConstraints";

export class ISearchResultCollection {
  private readonly _term: string;
  private readonly _searchConstraints: SearchConstraints;

  private _results: Map<string, ISearchResult> = new Map();

  constructor(term: string, searchConstraints: SearchConstraints) {
    this._term = term;
    this._searchConstraints = searchConstraints;
  }

  public get term(): string {
    return this._term;
  }

  public get searchConstraints(): SearchConstraints {
    return this._searchConstraints;
  }

  public get isEmpty(): boolean {
    const emptySize = 0;

    return this._results.size === emptySize;
  }

  public get results(): Array<ISearchResult> {
    const results = new Array<ISearchResult>();

    if (this.isEmpty) {
      return results;
    }

    const iterable = this._results.values();
    let iterator = iterable.next();

    do {
      results.push(iterator.value);
      iterator = iterable.next();
    } while (!iterator.done);

    return results;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
  public addResults(searchResult: any): void {
    const resultCount: number = searchResult.resultCount;
    const results: Array<unknown> = searchResult.results;

    if (typeof this._searchConstraints.offset === "undefined") {
      this._searchConstraints.offset = 0;
    }

    this._searchConstraints.offset += resultCount;

    for (let i = 0; i < results.length; i++) {
      this.addResult(results[i]);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
  private addResult(result: any): boolean {
    const resultModel = new ISearchResult(result);
    const resultUuid: string = resultModel.uuid;

    if (this._results.has(resultUuid)) {
      return false;
    }

    this._results.set(resultUuid, resultModel);

    return true;
  }
}
