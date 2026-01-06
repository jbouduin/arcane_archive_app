import { LoginResponseDto } from "../../../../common/dto";

export type SessionChangeListener = (data: LoginResponseDto | null) => void;
