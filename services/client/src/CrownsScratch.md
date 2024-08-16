# Feedback Forms

# Work on Location Popup

# Fix the Widget popping in outside of Viewport

# Connect Radio to new sound system

# Contract Manager

- Hook up the Filter
- Restyle Filters
- Add Bids & Owned Drop Down Sections to History Tab
- Add Full Mobile Conversion to Contract Manager
- Update Display Style & Component Usage

# Mobile Fixes

## Settings Page

    * Switch To a Tab Bar

# Copied URL does not show as valid location until using the back button

# Sortby for Contracts

- Player Card Update
- Add Profile Page
- Fix Verify Popup
- Adjust Ratings popup to only display if there is bidders on a contract and only allow it to be completed if there is a bidder
- Only allow the user to start the contract if there is a bidder
- Change Duration Text to Duration
- Add a Read section to the Overview Notifications
- GetReadNotification fetches notifications within a week

# SelectContract Manager UI
Merge concept with the Contract page
Add a End Bidding Button

Specific Breakpoint for the Top bar @ 1400px to column with the digidisplays going to 100% width

need the bid status state to update in the state.
Also change to where the contract selection is done through the URLQuery

# Contract Controller
- Accept Invite
- Witdraw Bid
- Decline Invite
- ResubmitBid

# Contractor Item
-Accept Bid



const getStartBodyText = () => {
    const now = new Date();
    if (
      contract.status === 'BIDDING' ||
      (contract.status === 'PENDING' && contract.startDate && contract.startDate < now)
    ) {
      return `Are you sure you want to start the contract before the set start time (${contract.startDate?.toLocaleString()})?`;
    } else if (contract.bidDate && contract.bidDate < now) {
      return `Are you sure you want to start the contract before the set bidding close (${contract.bidDate.toLocaleString()})?`;
    } else {
      return `Are you sure you want to start the contract?`;
    }
  };

  const startBodyText = getStartBodyText();

  const handleStartContract = () => {
    const now = new Date();
    if (contract.startDate && contract.startDate > now) {
      dispatch(
        openPopup(POPUP_YOU_SURE, {
          title: 'Start Contract',
          subjectText: `Starting Contract ${contract.title}`,
          bodyText: startBodyText,
          acceptText: 'Start Contract',
          cancelText: 'Wait',
          clickaway: true,
          onAccept: startContract,
        }),
      );
    } else {
      startContract();
    }
  };