**Listed Issues**

1. VER-10 Distance Efficiency Logic Broken
2. **PENDING** VER-11 Mission Viewer UI Refactor
3. VER-12 Store Locations Locally
4. VER-13 DestinationQue Custom Table Refactor
5. VER-14 DestinationQue Distance Table Refactor
6. VER-15 Start Route: Active Route State
7. VER-16 Route Export & Import
8. VER-17 Custom Stop Popup & Logic
9. VER-18 AddMission Popup: MultiMission Creation
10. VER-19 **COMPLETE** ~~Converte PlaySound Through Frontend~~
11. VER-20 Route Viewer UI Refactor
12. VER-21 Widget Drag Refactor
13. VER-22 Route Viewer Widget UI Refactor
14. VER-23 Tool Version Label -- **MOVE TO NEW ISSUE** --

**Progress Bugs**

- ~~Reordering Breaks VER-13~~ DONE

  - When Position Up: if the `.stopNumber` above the Target Position is set to 0, does not make the `.stopNumber` `1`. Instead sets to `Index + 1 `only

  - Position Up when Surrounded: by 0 properly changes following `.stopNumber`'s but same index issue.

  - Position Down when Surrounded: Sets the stopNumber to the index + 1 regardless of 0s, and somehow sets the previous wrong check logic again
    %% Switch from `.reduce()` to `.map()`

- Distance Incorrect VER-13
  Distances are just flat incorrect. It's not taking in the Location Tree

- Really Need To store Locations on Local when App Loads VER-12
  Need to store Locations in Local Storage as a part of the Application Loading.
  Currently a lag issue with [LocationSearch](./Common/Components/App/LocationSearch.tsx) when loading the list
  Location Search Options should be based on `location.waypoint_name`

- ~~Movable Stops VER-13~~ DONE
  New Stop Does not remove from current destination.
  The Stop Number is the Current Stop Number instead of the Target.
  Pulls an Objective from the Intended Target on Click to current Objective... Action
  For some reason the Objective Existed on the intended target, so then it pulled it to the current Objective, and now the intended target is correct
  Upon moving One of the duplicate Objectives does not remove the Empty Objective and it deleted the duplicate objective

- AddMission QuickSCU Wrong Ref VER-18
  Ref is auto assigning to the lowest Objective SCU Field
  %% Move Objectives to seperate component might fix

- Duplicate Stop Numbers don't correct on Move VER-13

- Missing Abandon Mission Logic VER-11

- Missing Edit Mission Logic VER-11

- QuickSCU Should Go away if the user typed
  Popper kind of gets in the way when wanting to click on the next Item. Feels Very Cluttered, Maybe have it display at the bottom of the Box

- ~~Set Objectives to Interupted VER-13~~ DONE
  When Moving Destinations, run a function that tells if a pickup comes after a dropoff then sets the status to interupted on the Mission, Destination, & Objectives State

- Very Very High GPU Usage
  Investigate

**Progress Styles**

- Grid the Accordian Summary VER-13
- Grid the Header & move to it's own Components VER-13
- Gap the table rows or provide a surface VER-13
- No Scrolling in the Custom Table VER-13
- UI Glitch when expanding beyond Box Bounds VER-13
- AddMission Objectives do not overflow VER-11

**Links**
_Parent Files_
[RouteApp](./Components/Locations/Routes/RouteApp.tsx)
[RouteUtility](./Components/Locations/Routes/RouteUtilities.ts)

_Table Components_
[MoveObjective](./Components/Locations/Routes/DestinationQue/TableContent/MoveObjective.tsx)
[TableRow](./Components/Locations/Routes/DestinationQue/TableContent/TableRow.tsx)
[DestinationTask](./Components/Locations/Routes/DestinationQue/TableContent/DestinationTask.tsx)

_Tables_
[CustomTable](./Components/Locations/Routes/DestinationQue/CustomTable.tsx)
[DistanceTable](./Components/Locations/Routes/DestinationQue/DistanceTable.tsx)
[ScratchDistanceTable](./Components/Locations/Routes/DestinationQue/temp.tsx)

_Table Container_
[DestinationQue](./Components/Locations/Routes/DestinationQue/DestinationQue.tsx)

_Add Mission Popup_
[AddMission](./Popups/Mission/AddMission.tsx)
[QuickSCU](./Common/Components/App/SCUQuickSelect.tsx)

**Construction**

MICL2 to MicroTech = 4ish Gm
MicroTech to Calliope = 60 MM
MicroTech to Babbage = X Km
Babbage to Calliope =

MicroTech to Calliope = 60 Mm
Babbage to Calliope
Babbage to Rayari Kaltag
Babbage to Hurston =
Babbage to Lorville

Result
Microtech to Calliope =
Babbage to Calliope =
Babbage to Kaltag =
Babbage to Hurston =
Babbage to Lorville =

Tm Color
Gm Color
Mm Color
km Color
Fluctuates
Redundant
Err

Car Insurance 200$
Car Payment 200$
Gym 80
Internet 120
Food 1000
Electric 200
Gas 300
Current Expense: 2100

Water: > 30
Renters Insurance: 100
Rent: 1,600 (2Bed)
Cost + Current = 3800           

Debt & Other Expenses

Material Prop:
  Metal
  Rubber
  Digital

  0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12);
            'linear-gradient(135deg, rgba(33,150,243,0.8), rgba(14,35,141,0.8))',


inset 0 -2px 3px rgba(0,0,0,0.12)
to
inset 0 -4px 6px rgba(0,0,0,0.3)

inset 0 -2px 4px rgba(0,30,100,0.3)
to
inset 0 -3px 5px rgba(0,30,100,0.5)

inset 0 -2px 5px rgba(0,0,0,0.2)
to
inset 0 -4px 6px rgba(0,0,0,0.5)

Labels
