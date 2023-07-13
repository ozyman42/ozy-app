import { Data_1_0 as Latest } from './models/1.0';

export interface UpgradeableData<Data> {
  userId: string;
  schemaVerion: string;
  data: Data;
}

export interface DataUpgrader<Data, PriorData> {
  version: string;
  priorUpgrader: DataUpgrader<PriorData, any>;
  upgrade(prior: PriorData): Data;
}

export class BaseUpgrader implements DataUpgrader<undefined, undefined> {
  version = '0';
  priorUpgrader = this;
  public upgrade() { return undefined; };
}

export interface Database {
  get(userId: string): Promise<UpgradeableData<any> | undefined>;
  set(userId: string, data: Latest): Promise<{success: true} | {success: false; }>
}

export enum GetAndUpgradeError {
  FailedToUpgrade
}

export async function getAndUpgrade(data: UpgradeableData<any>): Promise<{success: true, upgraded: boolean, data: Latest} | {success: false; error: GetAndUpgradeError}> {

}