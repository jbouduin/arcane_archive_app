import { SessionDto, PreferencesDto, SystemConfigurationDto } from "../../../../common/dto";
import { ApiStatus } from "./api-status";

type Listener<T> = (data: T) => void;

export type ApiStatusChangeListener = Listener<ApiStatus>;
export type InvalidSessionListener = () => void;
export type PreferencesChangeListener = Listener<PreferencesDto>;
export type PreferencesLoadedListener = Listener<PreferencesDto>;
export type SessionChangeListener = Listener<SessionDto | null>;
export type SystemConfigurationChangeListener = Listener<SystemConfigurationDto>;
