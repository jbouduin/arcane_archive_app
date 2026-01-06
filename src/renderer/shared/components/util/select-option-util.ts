import { SelectOption } from "../../types";

export function addSelectOption<T>(
  dtoArray: Array<T>,
  viewmodelArray: Array<SelectOption<T>>,
  option: SelectOption<T>,
  sort?: (a: SelectOption<T>, b: SelectOption<T>) => number): void {
  dtoArray.push(option.value);
  viewmodelArray.push(option);
  if (sort) {
    viewmodelArray.sort(sort);
  } else {
    viewmodelArray.sort((a: SelectOption<T>, b: SelectOption<T>) => a.label.localeCompare(b.label));
  }
}

export function removeSelectOption<T>(dtoArray: Array<T>, viewmodelArray: Array<SelectOption<T>>, option: SelectOption<T>): void {
  let idx = dtoArray.indexOf(option.value);
  if (idx >= 0) {
    dtoArray.splice(idx, 1);
  }
  idx = viewmodelArray.findIndex((so: SelectOption<T>) => so.value == option.value);
  if (idx >= 0) {
    viewmodelArray.splice(idx, 1);
  }
}

export function clearSelection<T>(dtoArray: Array<T>, viewmodelArray: Array<SelectOption<T>>): void {
  dtoArray.splice(0);
  viewmodelArray.splice(0);
}
