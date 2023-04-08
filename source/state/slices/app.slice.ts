import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Machine, MachineType } from '../../../models';
import update from 'immutability-helper';
import uuid from 'react-native-uuid';
import _ from 'lodash';

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
      const machineType = state.machineTypes[payload.index];

      // Once the attribute changes, update the individual machines.
      // Reasons: 1. Because some attributes could have been deleted.
      // 2. Datatype of attribute could have been changed too,
      // so it could cause some compatibility issues with the renderer form.
      if (!_.isEqual(machineType.attributes, payload.data.attributes)) {
        state.machines = state.machines.map((machine) => {
          if (machine.machineTypeId !== machineType.id) return machine;
          const data: Record<string, string | number | Date | boolean> = {};
          payload.data.attributes.forEach((attribute) => {
            const typeDefaults =
              attribute.type === 'CHECKBOX'
                ? false
                : attribute.type === 'NUMBER'
                ? ''
                : attribute.type === 'DATE'
                ? new Date()
                : '';

            data[attribute.name] =
              typeof machine.data[attribute.name] === 'string' &&
              ['NUMBER', 'TEXT'].includes(attribute.type)
                ? machine.data[attribute.name]
                : typeof machine.data[attribute.name] === 'boolean' &&
                  ['CHECKBOX'].includes(attribute.type)
                ? machine.data[attribute.name]
                : typeof machine.data[attribute.name] === 'object' &&
                  ['DATE'].includes(attribute.type)
                ? machine.data[attribute.name]
                : typeDefaults;
          });
          return { ...machine, data };
        });
      }

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
      { payload }: PayloadAction<{ id: string; data: Machine }>
    ) => {
      state.machines = state.machines.map((mach) =>
        mach.id === payload.id ? payload.data : mach
      );
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
