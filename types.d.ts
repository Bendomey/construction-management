export type PossiblyUndefined<T> = T | undefined;

export type Maybe<T> = T | null;

export type Empty = {};

export type MainDrawerItemsProps = {
  Dashboard: undefined;
  Configurations: undefined;
  [Page: string]: {
    machineType: string;
  }
}

export type BlockTypes = "CHECKBOX" | "NUMBER" | "TEXT" | "DATE"