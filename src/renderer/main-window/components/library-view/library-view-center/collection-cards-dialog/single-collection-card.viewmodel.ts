import { ScryFallImageStatus } from "../../../../../../common/enums";
import {
  CollectionCardDto, CollectionCardQuantityDto, CollectionDto,
  LanguageDto, LibraryCollectionCardImageStatusDto, MtgSetTreeDto
} from "../../../../../shared/dto";
import { CardConditionDto } from "../../../../../shared/dto/card-condition.dto";
import { LibraryCollectionCardDto } from "../../../../../shared/dto/library-collection-card.dto";
import { CardLayout, SelectOption } from "../../../../../shared/types";
import { BaseViewmodel, CollectionCardViewmodel } from "../../../../../shared/viewmodel";
import { SingleCollectionCardDto } from "./single-collection-card.dto";

export class SingleCollectionCardViewmodel extends BaseViewmodel<SingleCollectionCardDto> {
  //#region Private fields ----------------------------------------------------
  private readonly collectionCardViewmodelMap: Map<string, CollectionCardViewmodel>;
  private readonly collectionCardViewmodels: Array<CollectionCardViewmodel>;
  private readonly libraryCard: LibraryCollectionCardDto;
  private readonly set: MtgSetTreeDto;
  //#endregion

  //#region Public fields -----------------------------------------------------
  public readonly languages: Array<LanguageDto>;
  //#endregion

  //#region Getters/Setters ---------------------------------------------------
  public get cardBackId(): string {
    return this.libraryCard.cardBackId;
  }

  public get cardCode(): string {
    return this.libraryCard.code;
  }

  public get cardName(): string {
    return this.libraryCard.cardName;
  }

  public get rarity(): string {
    return this.libraryCard.rarity;
  }

  public get setName(): string {
    return this.set.setName;
  }

  public get keyruneCode(): string {
    return this.set.keyruneCode;
  }

  public get layout(): CardLayout {
    return this.libraryCard.layout;
  }

  public get setCode(): string {
    return this.set.code;
  }

  public get collectorNumber(): string {
    return this.libraryCard.collectorNumber;
  }
  //#endregion

  //#region Override Getters/Setters ------------------------------------------
  override get dtoToSave(): SingleCollectionCardDto {
    return {
      libraryCard: this.dto.libraryCard,
      collectionCards: this.collectionCardViewmodels
        .filter((vm: CollectionCardViewmodel) => vm.hasChanges)
        .map((vm: CollectionCardViewmodel) => vm.dtoToSave)
    };
  }
  //#endregion

  //#region Constructor & C° --------------------------------------------------
  public constructor(
    dto: SingleCollectionCardDto,
    set: MtgSetTreeDto,
    collection: CollectionDto,
    languages: Array<LanguageDto>,
    cardConditions: Array<SelectOption<CardConditionDto>>
  ) {
    super(dto, "update");
    this.collectionCardViewmodelMap = new Map<string, CollectionCardViewmodel>();
    this.collectionCardViewmodels = new Array<CollectionCardViewmodel>();
    this.libraryCard = dto.libraryCard;
    this.set = set;
    this.languages = languages;
    const collectionCardMap = new Map<string, CollectionCardDto>();
    dto.collectionCards.forEach((cc: CollectionCardDto) => collectionCardMap.set(cc.language, cc));
    const imageStatusMap = new Map<string, ScryFallImageStatus>();
    dto.libraryCard.imageStatuses.forEach(
      (s: LibraryCollectionCardImageStatusDto) => imageStatusMap.set(s.language, s.imageStatus)
    );
    languages.forEach(
      (l: LanguageDto) => this.registerLanguage(
        l,
        collectionCardMap.get(l.language) || {
          id: null,
          cardCode: dto.libraryCard.code,
          collectionId: collection.id!,
          language: l.language,
          quantities: new Array<CollectionCardQuantityDto>(),
          setCode: set.code
        },
        imageStatusMap.get(l.language)!,
        cardConditions)
    );
  }

  private registerLanguage(
    language: LanguageDto,
    dto: CollectionCardDto,
    imageStatus: ScryFallImageStatus,
    cardConditions: Array<SelectOption<CardConditionDto>>
  ): void {
    const collectionCardViewmodel = new CollectionCardViewmodel(
      dto,
      imageStatus,
      "update",
      cardConditions
    );
    this.collectionCardViewmodelMap.set(language.language, collectionCardViewmodel);
    this.collectionCardViewmodels.push(collectionCardViewmodel);
    this.registerChildViewmodel(collectionCardViewmodel);
  }
  //#endregion

  //#region Public methods ----------------------------------------------------
  public getCollectionCardViewmodelForLanguage(language: string): CollectionCardViewmodel {
    return this.collectionCardViewmodelMap.get(language)!;
  }
  //#endregion
}
