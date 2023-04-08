import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '..';
import { useSelector } from 'react-redux';
import { MachineType } from '../../../models';

const appSelector = (state: RootState) => state.app;

export const useMachineTypesSelector = () =>
  useSelector((state: RootState) => state.app.machineTypes);
