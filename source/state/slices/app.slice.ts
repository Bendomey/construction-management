import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Machine, MachineType } from '../../../models';
import update from 'immutability-helper';
import uuid from 'react-native-uuid';

// ------------------------------------
// Constants
// ------------------------------------

interface State {
  machineTypes: Array<MachineType>;
  machines: Array<Machine>;
}

const initialState: State = {
  machineTypes: [],
  machines: [],
};

// ------------------------------------
// Slice
// ------------------------------------
const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    SAVE_NEW_MACHINE_TYPE_ACTION: (
      state,
      { payload }: PayloadAction<Omit<MachineType, 'id'>>
    ) => {
      const uniqueId = uuid.v4();
      if (typeof uniqueId == 'string') {
        state.machineTypes = update(state.machineTypes, {
          $push: [
            {
              ...payload,
              id: uniqueId,
            },
          ],
        });
      }
    },

    UPDATE_MACHINE_TYPE_ACTION: (
      state,
      { payload }: PayloadAction<{ index: number; data: MachineType }>
    ) => {
      state.machineTypes = update(state.machineTypes, {
        [payload.index]: {
          $set: payload.data,
        },
      });
    },

    UPDATE_TITLE_ATTRIBUTE_FOR_MACHINE_TYPE_ACTION: (
      state,
      { payload }: PayloadAction<{ machineTypeId: string; attribute }>
    ) => {
      state.machineTypes = state.machineTypes.map((mt) =>
        mt.id === payload.machineTypeId
          ? {
              ...mt,
              metaData: {
                titleAttribute: payload.attribute,
              },
            }
          : mt
      );
    },

    DELETE_MACHINE_TYPE_ACTION: (state, { payload }: PayloadAction<string>) => {
      state.machineTypes = state.machineTypes.filter(
        (machineType) => machineType.id !== payload
      );
    },

    ADD_MACHINE_ACTION: (
      state,
      { payload }: PayloadAction<Omit<Machine, 'id'>>
    ) => {
      const uniqueId = uuid.v4();
      if (typeof uniqueId == 'string') {
        state.machines = update(state.machines, {
          $push: [
            {
              ...payload,
              id: uniqueId,
            },
          ],
        });
      }
    },

    UPDATE_MACHINE_ACTION: (
      state,
      { payload }: PayloadAction<{ index: number; data: Machine }>
    ) => {
      state.machines = update(state.machines, {
        [payload.index]: {
          $set: payload.data,
        },
      });
    },

    DELETE_MACHINE_ACTION: (state, { payload }: PayloadAction<string>) => {
      state.machines = state.machines.filter(
        (machine) => machine.id !== payload
      );
    },
  },
});

export const {
  SAVE_NEW_MACHINE_TYPE_ACTION,
  DELETE_MACHINE_TYPE_ACTION,
  UPDATE_MACHINE_TYPE_ACTION,
  UPDATE_TITLE_ATTRIBUTE_FOR_MACHINE_TYPE_ACTION,
  ADD_MACHINE_ACTION,
  DELETE_MACHINE_ACTION,
  UPDATE_MACHINE_ACTION,
} = appSlice.actions;

export default appSlice.reducer;
