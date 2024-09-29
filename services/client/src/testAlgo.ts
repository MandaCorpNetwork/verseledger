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
      // Define all Parent Locations
      // location.category === 'Planet'
      const parents = [];

      //Start Evaluating Every Objective to create Destinations
      objectives.forEach((objective) => {
        //Checks if the Objective has already been completed
        if (objective.status === 'Completed') return;

        // Handle Pickup Locations
        // Check to see if the pickupLocation already exists as a Destination
        const pickupExists = destinations.find(dest => dest.location.id === objective.pickup.id);
        if (pickupExists) {
          // If the destination exists, pushes the objective to the Destination
          pickupExists.objectives.push(objective);
        } else {
          // If a Destination does not exist, creates one.
          destinations.push({
            location: objective.pickup,
            reason: 'Mission',
            objectives: [objective]
          })
        }


        // Handle Dropoff Locations
                // Check to see if the pickupLocation already exists as a Destination
                const pickupExists = destinations.find(dest => dest.location.id === objective.pickup.id);
                if (pickupExists) {
                  // If the destination exists, pushes the objective to the Destination
                  pickupExists.objectives.push(objective);
                } else {
                  // If a Destination does not exist, creates one.
                  destinations.push({
                    location: objective.pickup,
                    reason: 'Mission',
                    objectives: [objective]
                  })
                }
        
      });



      // Organizes the Destinations using the Bellman Ford Algorithm
      // Each Destination Needs Sorted with it's parent Location
      const groupedDestinations = parents.forEach((parent) => return { parent: parent, destinations: destinations.filter((destination) => destination.location.parent === parent.short_name) });

      const currentParent = parents.find((parent) => currentLocation.parent === parent.short_name);

      // Run Bellman-Ford Algo for Grouped Destinations.
      // CurrentLocation & CurrentParent are the Initial Locations
      // If the value1's parent =  value2's parent then evaluate distance based on value1 & value2
      // If They do not equal, then evaluate distance based on value1's parent vs value2's parent
      // If no Parent's are equal to the parent of the Current Location, then the first Destination should be to the closest Parent from GroupedDestinations within the standard efficency arethmatic of the algorithm
      // When Jumping to a different Parent, a New Destination should be Created for that Parent: 
      const relevantParent = location; //The Parent needing to be jumped to to get to the next Locations
      destinations.push({ location: relevantParent, reason: 'Checkpoint' });
      // I'm not sure how to evaluate the first stop on a planet. Each stop's x,y,z is local to the Parent and not relative to the Parent's X,Y,Z.
      // Once we know the first Location, use Belman Ford Algo for each destination for this Parent.
      // If an Objective on a Destination has not yet had the Pickup Location visted then that Objective should be moved to a new Destination object with the same Location. 
      //If the Pickup Location is on the SAME PARENT as the Dropoff then we should keep this within the groupedDestination it was in.
      //If the Pickup Location is on a DIFFERENT PARENT as the Dropoff AND the destination location = dropoff location then the Objective should be moved to a new Destination and that Destination should be moved to a new groupedDestination.
      // So I suppose we should be running Bellman Ford on the Grouped Destinations & then run again for each GroupedDestinations Destinations. 
      // Sometimes will be coming from one Parent to another, getting a pickup, and needing to go back to the previous parent, But want to ensure Bellman Ford Accounts for this
      
      // Sets StopNumber for Sorting
      // Sets the StopNumber if the Reason is 'Checkpoint' or 'Mission'
      // Will allow us to Put in Custom Stops later where we set the stop number and add one to all the stopNumbers after it
      destinations.forEach((destination) => destination.reason === 'Mission' || destination.reason === "Checkpoint" && destination.stopNumber = index);
      // Organizes 
    }

    return result;
      };
  