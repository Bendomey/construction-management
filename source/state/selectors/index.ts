import { RootState } from '..';
import { useSelector } from 'react-redux';
import { Machine, MachineType } from '../../../models';

export const useMachineTypesSelector = () =>
  useSelector((state: RootState) => state.app.machineTypes);

export const useMachineTypeSelector = (id: string) =>
  useSelector((state: RootState) =>
    state.app.machineTypes.find((machineType) => machineType.id === id)
  );

export const useMachinesUnderMachineTypeSelector = (machineTypeId: string) =>
  useSelector((state: RootState) =>
    state.app.machines.filter(
      (machine) => machine.machineTypeId === machineTypeId
    )
  );

export const useMachinesSelector = () =>
  useSelector((state: RootState) => {
    const data: Array<{
      type: MachineType;
      data: Array<Machine>;
    }> = [];

    state.app.machineTypes.forEach((machineType) => {
      data.push({
        type: machineType,
        data: state.app.machines.filter(
          (machine) => machine.machineTypeId === machineType.id
        ),
      });
    });
    return data;
  });
