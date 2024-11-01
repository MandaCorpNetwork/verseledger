import { createLocalID } from '@Utils/createId';
import { ILocation } from 'vl-shared/src/schemas/LocationSchema';
import { IDestination, ITask } from 'vl-shared/src/schemas/RoutesSchema';

export function createTaskArray(value: {
  missionId: string;
  missionLabel: string;
  tasks: {
    id: string;
    relationalId: string;
    label: string;
    pickup: ILocation;
    item: string;
    scu: number;
    dropoffs: { dropoff: ILocation; scu: number }[];
  }[];
}) {
  if (!value) return;
  const missionLabel = value.missionLabel;
  const missionId = value.missionId;
  const createdTasks = value.tasks.flatMap((obj) => {
    const relationalId = obj.relationalId;
    const newPickup = {
      id: obj.id,
      relationId: relationalId,
      label: obj.label,
      type: 'pickup',
      missionLabel,
      missionId,
      location: obj.pickup,
      status: 'pending',
      item: obj.item,
      scu: obj.id,
    };
    const newDropOffs = obj.dropoffs.flatMap((drop) => ({
      id: createLocalID('T'),
      relationalId,
      label: obj.label,
      type: 'dropoff',
      missionLabel,
      missionId,
      location: drop.dropoff,
      status: 'pending',
      item: obj.item,
      scu: drop.scu,
    }));
    return [newPickup, ...newDropOffs];
  });
  return createdTasks as ITask[];
}

export function createDestinations(destinations: IDestination[], tasks: ITask[]) {
  const pickups = tasks.filter((task) => task.type !== 'pickup');
  const dropOffs = tasks.filter((task) => task.type !== 'dropoff');
  const newDestinations = [] as IDestination[];

  pickups.forEach((task) => {
    const matchedPickup = destinations.find(
      (dest) => dest.location.id === task.location.id,
    );
    const relatedDrops = dropOffs.filter((drop) => drop.relationId === task.relationId);

    if (matchedPickup) {
      //MatchedPickup Create
      const updatedPickup = { ...matchedPickup, tasks: [...matchedPickup.tasks, task] };
      newDestinations.push(updatedPickup);

      relatedDrops.forEach((drop) => {
        const matchedDrop = destinations.find(
          (dest) =>
            drop.location.id === dest.location.id &&
            dest.stopNumber > matchedPickup.stopNumber,
        );

        if (matchedDrop) {
          const updatedDrop = { ...matchedDrop, tasks: [...matchedDrop.tasks, drop] };
          newDestinations.push(updatedDrop);
        } else {
          const newDrop = {
            id: createLocalID('D'),
            stopNumber: destinations.length + 1,
            visited: false,
            tasks: [drop],
            location: drop.location,
          };
          newDestinations.push(newDrop);
        }
      });
    } else {
      const newPickup = {
        id: createLocalID('D'),
        stopNumber: 0,
        visited: false,
        tasks: [task],
        location: task.location,
      };
      newDestinations.push(newPickup);
      relatedDrops.forEach((drop) => {
        const newDrop = {
          id: createLocalID('D'),
          stopNumber: 0,
          visited: false,
          tasks: [drop],
          location: drop.location,
        };
        newDestinations.push(newDrop);
      });
    }
  });

  const remainingDestinations = destinations.filter((dest) => {
    return !newDestinations.some((newDest) => newDest.id === dest.id);
  });
  const updatedDestination = [...newDestinations, ...remainingDestinations];

  const correctedStopNumbers = updatedDestination.map((dest, index) => {
    return {
      ...dest,
      stopNumber:
        dest.stopNumber !== 0 &&
        dest.stopNumber === updatedDestination[index - 1].stopNumber
          ? dest.stopNumber + 1
          : dest.stopNumber,
    };
  });

  return correctedStopNumbers;
}
