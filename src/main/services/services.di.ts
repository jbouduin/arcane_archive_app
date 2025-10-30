import { InfraDi } from "./infra/infra.di";

export class ServicesDI {
    public static register() {
        InfraDi.register();
    }
}