import { SelectOption } from "../../types";

export function addSelectOption<T>(
  dtoArray: Array<T>,
  viewModelArray: Array<SelectOption<T>>,
  option: SelectOption<T>,
  sort?: (a: SelectOption<T>, b: SelectOption<T>) => number): void {
  dtoArray.push(option.value);
  viewModelArray.push(option);
  if (sort) {
    viewModelArray.sort(sort);
  } else {
    viewModelArray.sort((a: SelectOption<T>, b: SelectOption<T>) => a.label.localeCompare(b.label));
  }
}

export function removeSelectOption<T>(dtoArray: Array<T>, viewModelArray: Array<SelectOption<T>>, option: SelectOption<T>): void {
  let idx = dtoArray.indexOf(option.value);
  dtoArray.splice(idx, 1);
  idx = viewModelArray.findIndex((so: SelectOption<T>) => so.value == option.value);
  viewModelArray.splice(idx, 1);
}

export function clearSelection<T>(dtoArray: Array<T>, viewModelArray: Array<SelectOption<T>>): void {
  dtoArray.splice(0);
  viewModelArray.splice(0);
}
