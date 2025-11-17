import { Props } from "@blueprintjs/core";
import { CardSearchDto } from "../../dto/card-search.dto";

export interface CardSearchViewProps extends Props {
  initialCardSearchDto: CardSearchDto;
  onSearch: (cardSearch: CardSearchDto) => void;
}
