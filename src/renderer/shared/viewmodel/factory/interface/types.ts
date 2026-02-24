import { BaseCardListDto, QueryResultDto } from "../../../dto";
import { BaseDesktopViewDto } from "../../../dto/desktop";

export type SearchCallback<LDto extends BaseCardListDto, VDto extends BaseDesktopViewDto<LDto>> =
  (dto: VDto) => Promise<QueryResultDto<LDto>>;
