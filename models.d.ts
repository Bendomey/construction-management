import { BlockTypes } from './types';
import { v4 as uuidv4 } from 'uuid';

export interface MachineType {
  /** Unique ID of each machine type configured. */
  id: string;
  /** Name of machine type. */
  name: string;
  /** Unqiue for each machine type. */
  slug: string;
  /** Attributes the machine type possesses. */
  attributes: Array<MachineTypeAttribute>;
  /** Meta data for machine type.  */
  metaData: MachineTypeMetaData;
}

interface MachineTypeAttribute {
  /** Name of attribute. */
  name: string;
  /** Type of data to expect for this attribute. */
  type: BlockTypes;
}

interface MachineTypeMetaData {
  /** Title attribute for each machine created. */
  titleAttribute: string;
}

interface Machine {
  /** Unique ID of each machine created. */
  id: string;
  /** Machine Type Id. */
  machineTypeId: string;
  /** Data holds all information user enters for that machine. */
  data: Record<string, string | number | Date | boolean>;
}
