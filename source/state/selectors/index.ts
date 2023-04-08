import { RootState } from '..';
import { useSelector } from 'react-redux';
import { PossiblyUndefined } from '../../../types';

export const useMachineTypesSelector = () =>
  useSelector((state: RootState) => state.app.machineTypes);

export const useMachineTypeSelector = (id: string) =>
  useSelector((state: RootState) =>
    state.app.machineTypes.find((machineType) => machineType.id === id)
  );

export const useMachinesSelector = (machineTypeId: PossiblyUndefined<string>) =>
  useSelector((state: RootState) => {
    // Filter by machine type
    if (machineTypeId) {
      return state.app.machines.filter(
        (machine) => machine.machineTypeId === machineTypeId
      );
    }

    // Fetch all machines
    return state.app.machines;
  });
