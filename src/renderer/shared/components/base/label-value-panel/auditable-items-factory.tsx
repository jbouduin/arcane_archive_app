import { Text } from "@blueprintjs/core";
import { AuditableDto } from "../../../../../common/dto";

export function createAuditableLabelValueItems(dto: AuditableDto & { id?: number; }): Map<string, JSX.Element | null> {
  const items = new Map<string, JSX.Element | null>([
    ["Id", (<Text>{dto.id || "-"}</Text>)],
    ["empty", null],
    ["Created at", (<Text>{dto.createdAt != null ? new Date(dto.createdAt).toLocaleString() : "-"}</Text>)],
    ["Created by", (<Text>{dto.createdBy}</Text>)],
    ["Modified at", (<Text>{dto.modifiedAt != null ? new Date(dto.modifiedAt).toLocaleString() : "-"}</Text>)],
    ["Modified by", (<Text>{dto.modifiedBy ?? "-"}</Text>)]
  ]);
  return items;
}
