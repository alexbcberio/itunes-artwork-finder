import { ISearchResult } from "./ISearchResult";
export class ISearchResultCollection {
  private _results: Map<string, ISearchResult> = new Map();

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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public addResults(results: Array<any>): Array<ISearchResult> {
    const addedResults: Array<ISearchResult> = [];

    for (let i = 0; i < results.length; i++) {
      const resultModel = new ISearchResult(results[i]);
      const added = this.addResult(resultModel);

      if (added) {
        addedResults.push(resultModel);
      }
    }

    return addedResults;
  }

  private addResult(resultModel: ISearchResult): boolean {
    const resultUuid: string = resultModel.uuid;

    if (this._results.has(resultUuid)) {
      return false;
    }

    this._results.set(resultUuid, resultModel);

    return true;
  }
}
