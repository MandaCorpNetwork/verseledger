//Psuedo & WhiteText For Middleware algo

import { AppDispatch, RootState } from '@Redux/store';
import { PayloadAction } from '@reduxjs/toolkit';
import { Middleware } from 'redux';
import { IMission } from 'vl-shared/src/schemas/RoutesSchema';

/*
Explination:
Whenever a new Mission is Created, the new Mission contains Objective Objects that have a Dropoff And Pickup Location

If a Destination does not exist for a Pickup Location we need to Create a Destination & Add the objective to the Destination's Objectives List.

Otherwise if it does exist, we need to add the Objective to a Preexisting Destination for the Pickup Location.

If a Destination does not exist for a DropOff Location, we meed to Create a Destination & Add the objective to the New Destination's Objective List.

Otherwise, if it does exist, we need to add the Objective to a Preexisting Destination for the DropOff Location.

Sticky part is, we need to ensure Each Objective on Destinations has it's Pickup Location Before Dropoff Location, otherwise we need to Create another Destination for the Dropoff Location if the location will need to be revisited.

But at the same time we want to use the Bellman Ford Algorithm to Create the Most efficient Route.

Additionally, each locations Coordiante is relative to it's local planet, so we will need to efficiently route to planets aswell and add them as their own destination.

Destination Objectives allow for stop numbers, so we can change the stop numbers in order to properly sort them. 
*/

const destinationCreation: Middleware<unknown, RootState> =
  ({ dispatch, getState }: { dispatch: AppDispatch; getState: () => RootState }) =>
  (next) =>
  (action) => {
    // Define all Parent Locations
    // location.category === 'Planet'
    const parents = []; //Find all locations that have category of 'Planet' and store the location objects in an array of objects.

    const result = next(action);
    const state = getState();
    const currentLocation = state.auth.userLocation;

    //Checks if the addMission is ran
    if ((action as PayloadAction<IMission>).type === 'routes/addMission') {
      // Define all missions Existing on the state
      const missions = state.routes.missions;
      // Define all destinations existing on the state
      const destinations = state.routes.destinations;
      // Define all Objectives
      const objectives = missions.map((mission) => mission.objectives);

      //Start Evaluating Every Objective to create Destinations
      objectives.forEach((objective) => {
        //Checks if the Objective has already been completed
        if (objective.status === 'Completed') return;

        // Checks if a destination exists for the Objective's Pickup Location
        if (destinations.includes(objective.pickup)) {
          //If Destination Exists, finds the destination and pushes the Objective to the Array of Objectives that exists on the Destination
          const destination = destinations.find(
            (destination) => destination.location.id === objective.pickup.id,
          );
          destination[objectives].push(objective);
        } else {
          //If the Destination doesn't exist, creates a new destination with the Objective.
          destinations.push({
            location: objective.pickup,
            reason: 'Mission',
            objectives: [objective],
          });
        }

        // Checks if a destination exists for the Objective's DropOff Location
        if (destinations.includes(objective.dropOff)) {
          //If Destination Exists, finds the destination and pushes the Objective to the Array of Objectives that exists on the Destination
          const destination = destinations.find(
            (destination) => destination.location.id === objective.dropOff.id,
          );
          destination[objectives].push(objective);
        } else {
          //If the Destination doesn't exist, creates a new destination with the Objective.
          destinations.push({
            location: objective.dropOff,
            reason: 'Mission',
            objectives: [objective],
          });
        }
      });

      // Organizes the Destinations using the Bellman Ford Algorithm
      // Each Destination Needs Sorted with it's parent Location
      const groupedDestinations = parents.forEach((parent) => return { parent: parent, destinations: destinations.filter((destination) => destination.location.parent === parent.short_name) });

      

    }

    return result;
  };
