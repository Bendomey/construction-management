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

    DELETE_MACHINE_TYPE_ACTION: (state, { payload }: PayloadAction<number>) => {
      state.machineTypes = update(state.machineTypes, {
        $splice: [[payload, 1]],
      });
    },
  },
});

export const {
  SAVE_NEW_MACHINE_TYPE_ACTION,
  DELETE_MACHINE_TYPE_ACTION,
  UPDATE_MACHINE_TYPE_ACTION,
} = appSlice.actions;

export default appSlice.reducer;
