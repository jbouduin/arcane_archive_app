export interface IAuditFieldsViewmodel {
  readonly id: number;
  readonly createdAt: Date;
  readonly createdBy: string;
  readonly modifiedAt: Date;
  readonly modifiedBy: string;
}
