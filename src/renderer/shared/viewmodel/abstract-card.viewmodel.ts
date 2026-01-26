export abstract class AbstractCardViewmodel {
  // #region Auxiliary Methods ------------------------------------------------
  protected calculateCardManaCost(manacosts: Array<string>): Array<string> {
    const result = new Array<string>();
    manacosts.forEach((cost: string, idx: number) => {
      if (idx > 0) {
        result.push("//");
      }
      result.push(...this.convertManaCost(cost));
    });
    if (result.length == 1 && result[0] == "//") {
      result.pop();
    } else if (result[0] == "//") {
      result.splice(0, 0, "-");
    } else if (result[result.length - 1] == "//") {
      result.push("-");
    }
    return result;
  }

  protected convertManaCost(manaCost: string): Array<string> {
    const splittedCellValue = manaCost.split("}");
    splittedCellValue.pop();
    return splittedCellValue.map((s: string, i: number) => {
      /* es-lint-disable-next-line @stylistic/operator-linebreak */
      return i < splittedCellValue.length ? s + "}" : s;
    });
  }
  // #endregion
}
