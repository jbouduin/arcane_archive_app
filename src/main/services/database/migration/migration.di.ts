import { MigrationProvider } from "kysely";
import { DependencyContainer, Lifecycle, container } from "tsyringe";
import { DATABASE } from "../../service.tokens";
import { CustomMigrationProvider } from "./custom-migration-provider";
import { V0_0_1_Di } from "./v0.0.1/v0.0.1.di";

export class MigrationDi {
  public static registerMigrations(): DependencyContainer {
    const child = container.createChildContainer();
    child.register<MigrationProvider>(DATABASE.CustomMigrationProvider, { useClass: CustomMigrationProvider }, { lifecycle: Lifecycle.Singleton });
    V0_0_1_Di.registerMigrations(child);
    return child;
  }
}
