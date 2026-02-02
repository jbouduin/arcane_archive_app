import { readFile } from "fs/promises";
import { isError } from "lodash";
import path from "path";
import { inject, injectable } from "tsyringe";
import { ResultDto, ValidationErrorDto } from "../../../../common/dto";
import { ArcaneArchiveServer } from "../../../../common/types";
import { DiscoveryDto } from "../../../dto";
import { BaseService } from "../../base";
import { IConfigurationService, ILogService, IResultFactory, ISessionService } from "../../infra/interface";
import { INFRASTRUCTURE } from "../../service.tokens";
import { IArcaneArchiveClient } from "../interface";

@injectable()
export class ArcaneArchiveClient extends BaseService implements IArcaneArchiveClient {
  // #region Private fields ---------------------------------------------------
  private readonly configurationService: IConfigurationService;
  private readonly sessionService: ISessionService;
  // #endregion

  // #region Constructor ------------------------------------------------------
  public constructor(
    @inject(INFRASTRUCTURE.LogService) logService: ILogService,
    @inject(INFRASTRUCTURE.ResultFactory) resultFactory: IResultFactory,
    @inject(INFRASTRUCTURE.ConfigurationService) configurationService: IConfigurationService,
    @inject(INFRASTRUCTURE.SessionService) sessionService: ISessionService
  ) {
    super(logService, resultFactory);
    this.configurationService = configurationService;
    this.sessionService = sessionService;
  }
  // #endregion

  // #region IarcaneArchiveProxy Members --------------------------------------
  public async discover(): Promise<ResultDto<DiscoveryDto>> {
    return this.sendRequest(
      "GET",
      this.configurationService.systemConfiguration.discovery,
      null,
      {
        accept: "application/json"
      }
    );
  }

  public async getData<Res extends object>(server: ArcaneArchiveServer, path: string): Promise<ResultDto<Res>> {
    let result: Promise<ResultDto<Res>>;
    if (this.configurationService.apiConfiguration != null) {
      const headers: Record<string, string> = {
        accept: "application/json"
      };
      const jwt = this.sessionService.getJwt;
      if (jwt != null) {
        headers["Authorization"] = "Bearer " + jwt();
      }
      result = this.sendRequest(
        "GET",
        this.buildPath(server, path),
        null,
        {
          accept: "application/json"
        }
      );
    } else {
      result = Promise.reject();
    }
    return result;
  }

  public async postData<Req extends object, Res extends object>(
    server: ArcaneArchiveServer,
    path: string,
    data: Req): Promise<ResultDto<Res>> {
    let result: Promise<ResultDto<Res>>;
    if (this.configurationService.apiConfiguration != null) {
      const headers: Record<string, string> = {
        "accept": "application/json",
        "Content-Type": "application/json"
      };
      const jwt = this.sessionService.getJwt();
      if (jwt != null) {
        headers["Authorization"] = "Bearer " + jwt;
      }
      result = this.sendRequest(
        "POST",
        this.buildPath(server, path),
        JSON.stringify(data),
        headers
      );
    } else {
      result = Promise.reject();
    }
    return result;
  }

  public async postMultiPart<Res extends object>(
    server: ArcaneArchiveServer, serverPath: string, filePath: string
  ): Promise<ResultDto<Res>> {
    let result: Promise<ResultDto<Res>>;
    if (this.configurationService.apiConfiguration != null) {
      const headers: Record<string, string> = {
        accept: "application/json",
        // "Content-Type": "multipart/form-data"
      };
      const jwt = this.sessionService.getJwt();
      if (jwt != null) {
        headers["Authorization"] = "Bearer " + jwt;
      }

      const buffer = await readFile(filePath);
      const blob = new Blob([buffer]);
      const formData = new FormData();
      formData.append("file", blob, path.basename(filePath)); // field name, content, filename
      result = this.sendRequest(
        "POST",
        this.buildPath(server, serverPath),
        formData,
        headers
      );
    } else {
      result = Promise.reject();
    }
    return result;
  }
  // #endregion

  // #region Auxiliary Methods ------------------------------------------------
  private sendRequest<Resp extends object>(
    verb: "GET" | "POST",
    path: string,
    data: BodyInit | null,
    headers: Record<string, string>
  ): Promise<ResultDto<Resp>> {
    let result: Promise<ResultDto<Resp>>;

    try {
      return fetch(
        path,
        {
          method: verb,
          headers: headers,
          body: data,
        }
      )
        .then(
          async (response: Response) => {
            const resultDto: ResultDto<Resp> = (await response.json()) as ResultDto<Resp>;
            if (response.status >= 400) {
              return this.processErrorResponse<Resp>(path, resultDto);
            } else {
              return resultDto;
            }
          },
          (reason: Error) => this.processRejection<ResultDto<Resp>>(path, reason)
        );
    } catch (reason: unknown) {
      if (isError(reason)) {
        result = this.processRejection(path, reason);
      } else {
        result = this.processRejection<ResultDto<Resp>>(path, new Error("Unknown error"));
      }
    }
    return result;
  }

  private buildPath(server: ArcaneArchiveServer, path: string): string {
    if (!path.startsWith("/")) {
      path = "/" + path;
    }
    switch (server) {
      case "authentication":
        return this.configurationService.apiConfiguration!.authenticationApiRoot + path;
      case "collection":
        return this.configurationService.apiConfiguration!.collectionApiRoot + path;
      case "deck":
        return this.configurationService.apiConfiguration!.deckApiRoot + path;
      default:
        return this.configurationService.apiConfiguration!.libraryApiRoot + path;
    }
  }

  private processRejection<T>(path: string, reason: Error): Promise<T> {
    let message: string;
    // Detect unreachable server (ERR_CONNECTION_REFUSED → "Failed to fetch")
    if (reason.message?.includes("Failed to fetch")) {
      message = "Cannot connect to the server.";
    } else {
      message = reason.message ?? "An unexpected error occurred.";
    }
    this.logService.error("Main", message);
    return Promise.reject<T>(reason);
  }

  private processErrorResponse<T>(path: string, response: ResultDto<T>): Promise<ResultDto<T>> {
    let message: Array<string>;
    if (response.errors) {
      message = response.errors;
    } else {
      message = response.validationErrors.map((v: ValidationErrorDto) => v.errorMessage);
    }
    this.logService.error("API", "Error", ...message);
    return Promise.reject(new Error(`Server error: ${response.status}`));
  }
  // #endregion
}
