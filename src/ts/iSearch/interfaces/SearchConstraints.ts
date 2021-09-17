import { SearchAttributeConstraint } from "../enums/SearchAttributeConstraint";
import { SearchCountryConstraint } from "../enums/SearchCountryConstraint";
import { SearchEntityConstraint } from "../enums/SearchEntityConstraint";
import { SearchMediaConstraint } from "../enums/SearchMediaConstraint";

export interface SearchConstraints {
  country: SearchCountryConstraint;
  media?: SearchMediaConstraint;
  entity?: SearchEntityConstraint;
  attribute?: SearchAttributeConstraint;
  limit?: number;
  lang?: "en_us" | "ja_jp";
  version?: "1" | "2";
  explicit?: boolean;
  offset?: number;
}
