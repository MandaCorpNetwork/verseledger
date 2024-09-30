//Psuedo & WhiteText For Middleware algo

import { fetchSearchedLocations } from '@Redux/Slices/Locations/actions/fetchSearchedLocations';
import { AppDispatch, RootState } from '@Redux/store';
import { PayloadAction } from '@reduxjs/toolkit';
import { Middleware } from 'redux';
import { IMission, IObjective, IDestination } from 'vl-shared/src/schemas/RoutesSchema';
import { ILocationSearch } from 'vl-shared/src/schemas/SearchSchema';
import { Logger } from '@Utils/Logger';
import { ILocation } from 'vl-shared/src/schemas/LocationSchema';

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

      // **Fetch Current Route State Data**

      // Define all missions Existing on the state
      const missions = state.routes.missions;
      // Define all destinations existing on the state
      const destinations: IDestination[] = Object.values(state.routes.destinations);
      // Define all Objectives
      const objectives =
        Object.values(missions)
        .filter(mission => mission.objectives && mission.objectives.length > 0)
        .flatMap((mission) => mission.objectives);
      
      // TODO: Get more efficient way to find parent Locations other than a String
      // Set Params to search for Parent Locations
      const parentParams: ILocationSearch = {
        page: 0,
        limit: 200,
        category: 'Planet'
      };
      // Fetch the Parent Locations
      const parents = await dispatch(fetchSearchedLocations(parentParams)).then((res) => {
        if (fetchSearchedLocations.fulfilled.match(res) && res.payload) {
          return res.payload.data as ILocation[];
        } else {
          return null;
        }
      });

      // Escape Process if Parents fails to Fetch
      if (parents == null) return Logger.warn('Parent Locations Search Failed');

      // Set the Current Parent Location
      const currentParent = parents.find((parent) => currentLocation.parent === parent.short_name) ?? null;

      // **Start Evaluating Every Objective to create Destinations**

      objectives.forEach((objective: IObjective) => {
        //Checks if the Objective has already been completed
        if (objective.status === 'COMPLETED') return;

        // Handle Pickup Locations
        // Check to see if the pickupLocation already exists as a Destination
        const pickupExists = destinations.find((dest: IDestination) => dest.location.id === objective.pickup.id);

        if (pickupExists && pickupExists.objectives) {
          // If the destination exists, pushes the objective to the Destination
          pickupExists.objectives.push(objective);
        } else {
          // If a Destination does not exist, creates one.
          const newDestination: IDestination = {
            stopNumber: destinations.length + 1,
            location: objective.pickup,
            reason: 'Mission',
            objectives: [objective]
          }
          state.routes.destinations[newDestination.stopNumber] = newDestination;
        }


        // Handle Dropoff Locations
        // Check to see if the dropOffLocation already exists as a Destination
        const dropOffExists = destinations.find(dest => dest.location.id === objective.dropOff.id);
        if (dropOffExists && dropOffExists.objectives) {
          // If the destination exists, pushes the objective to the Destination
          dropOffExists.objectives.push(objective);
        } else {
          // If a Destination does not exist, creates one.
          const newDestination: IDestination = {
            stopNumber: destinations.length + 1,
            location: objective.dropOff,
            reason: 'Mission',
            objectives: [objective]
          }
          state.routes.destinations[newDestination.stopNumber] = newDestination;
        }
      });

      // Group Destinations with their Parent Locations
      const groupedDestinations = parents.map(parent => 
        ({ parent: parent, destinations: destinations.filter(dest => 
          dest.location.parent === parent.short_name)}))

      // **Bellman-Ford Integration**

      //Define Graph
      const graph = createGraph(groupedDestinations, currentLocation);

      //Calculate an Optimal Path
      const shortestPath = bellmanRouting(graph, currentParent);

      // Update Stop numbers based on the calculated shortest Path
      assignStopNumbers(shortestPath, destinations);

      // Add checkpoints or additional stops if needed
      if (requiresCheckpoint(currentParent, shortestPath)) {
        const newDestination: IDestination = {
          location: relevantParent, //TODO
          reason: 'Checkpoint',
          stopNumber: getNextStopNumber(destinations), //TODO
        }
      }

      // Reorder destinations to ensure pickups happen before dropoffs
      reorderDestinations(destinations);

      // Run Bellman-Ford Algo for Grouped Destinations.
      // CurrentLocation & CurrentParent are the Initial Locations
      // If the value1's parent =  value2's parent then evaluate distance based on value1 & value2
      // If They do not equal, then evaluate distance based on value1's parent vs value2's parent
      // If no Parent's are equal to the parent of the Current Location, then the first Destination should be to the closest Parent from GroupedDestinations within the standard efficency arethmatic of the algorithm
      // When Jumping to a different Parent, a New Destination should be Created for that Parent: 
      // const relevantParent = location;
      //The Parent needing to be jumped to to get to the next Locations
      // destinations.push({ location: relevantParent, reason: 'Checkpoint' });
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
      destinations.forEach((destination) => destination.reason === 'Mission' || destination.reason === "Checkpoint" && destination.stopNumber = index); //TODO ??
      // Organizes 
    }

    return result;
      };
  

      // Helper Functions

      //Create Graph from grouped destinations for Bellman-Ford
      function createGraph(groupedDestinations, currentLocation: ILocation) {
        let graph = {};

        groupedDestinations.forEach(group => {
          group.destinations.forEach(dest => {
            const from = group.parent.short_name;
            const to = dest.location.short_name;
            const cost = calculateCost(currentLocation, dest.location);
            graph[from] = graph[from] || {};
            graph[from][to] = cost;
          });
        });

        return graph;
      }

      // Bellman-Ford Algo Implement
      function bellmanRouting(graph, start) {
        let distances = {};
        let previous = {};

        // Initialize distances and previous nodes
        for (let node in graph) {
          distances[node] = Infinity;
          previous[node] = null;
        }
        distances[start] = 0;

        // Relax edges (V-1) times
        for (let i = 0; i < Object.keys(graph).length - 1; i++) {
          for (let from in graph) {
            if (distance[from] + graph[from][to] < distances[to]) {
              distances[to] = distances[from] + graph[from][to];
              previous[to] = from;
            }
          }
        }

        //Check for negative cycles (optional)
        for (let from in graph) {
          for (let to in graph[from]) {
            if (distances[from] + graph[from][to] < distances[to]) {
              throw new Error("Graoh contains a negative-weight cycle")
            }
          }
        }
      }

      // Assign Stop Numbers to destinations based on the Bellman-Ford output
      function assignStopNumbers(shortestPath, destinations) {
        shortestPath.forEach((location, index) => {
          const destination = destinations.find(dest => dest.location.short_name === location);
          if (destination) {
            destination.stopNumber = index + 1;
          }
        });
      }

      // Checks if a Checkpoint is required
      function requiresCheckpoint(currentParent, shortestPath) {
        // Logic to Determine if a checkpoint is needed
        return false; // Placeholder
      }

      // Reorder destinations to ensure proper pickup before dropoff order
      function reorderDestinations(destinations) {
        destinations.sort((a, b) => a.stopNumber - b.stopNumber);
      }