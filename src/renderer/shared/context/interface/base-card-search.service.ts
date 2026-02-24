import { BaseCardListDto, CardQueryFilterDto, QueryParamsDto, QueryResultDto } from "../../dto";
import { BaseDesktopViewDto } from "../../dto/desktop";
import { IArcaneArchiveProxy } from "./arcane-archive.proxy";

export type ViewDtoProvider<LDto extends BaseCardListDto, VDto extends BaseDesktopViewDto<LDto>> =
  (queryParams: QueryParamsDto, queryFilter: CardQueryFilterDto, queryResult: QueryResultDto<LDto>) => VDto;

export interface IBaseCardSearchService<LDto extends BaseCardListDto, VDto extends BaseDesktopViewDto<LDto>> {
  readonly viewDto: VDto;

  search(viewDto: VDto): Promise<QueryResultDto<LDto>>;
  initialize(
    arcaneArchiveProxy: IArcaneArchiveProxy,
    viewDtoProvide: ViewDtoProvider<LDto, VDto>): void;
}
