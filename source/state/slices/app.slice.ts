import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Machine, MachineType } from '../../../models';

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
    ) => {},
  },
});

export const { SAVE_NEW_MACHINE_TYPE_ACTION } = appSlice.actions;

export default appSlice.reducer;
