import { Props } from "@blueprintjs/core";
import { IAuditFieldsViewmodel } from "../../../viewmodel/audit-fields.viewmodel";

export interface AuditFieldsProps extends Props {
  auditFields: IAuditFieldsViewmodel;
}
