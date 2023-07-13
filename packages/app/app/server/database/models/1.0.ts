import { UpgradeableData, BaseUpgrader, DataUpgrader } from '../';
import { v4 as uuid } from 'uuid';

export type Data_1_0 = {
  bybitKeyEncrypted: string | null;
  steps: 
}

export class UpgradeTo1_0 implements DataUpgrader<Data_1_0, undefined> {
  version = '1.0';
  prior = new BaseUpgrader();
  upgrade() {
    
  };
}