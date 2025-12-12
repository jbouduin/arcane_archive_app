import { LoginResponseDto } from "../../dto";

export type SessionChangeListener = (data: LoginResponseDto | null) => void;
