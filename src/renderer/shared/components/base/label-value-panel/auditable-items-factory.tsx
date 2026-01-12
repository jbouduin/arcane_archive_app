import { Text } from "@blueprintjs/core";
import { IAuditFieldsViewmodel } from "../../../viewmodel/audit-fields.viewmodel";

export function createAuditableLabelValueItems(viewmodel: IAuditFieldsViewmodel): Map<string, JSX.Element | null> {
  const items = new Map<string, JSX.Element | null>();
  items.set("Id", (<Text>{viewmodel.idAsString}</Text>));
  items.set("empty", null);
  items.set("Created at", (<Text>{viewmodel.createdAtString}</Text>));
  items.set("Created by", (<Text>{viewmodel.createdBy}</Text>));
  items.set("Modified at", (<Text>{viewmodel.modifiedAtString.toLocaleString()}</Text>));
  items.set("Modified by", (<Text>{viewmodel.modifiedBy}</Text>));
  return items;
}
