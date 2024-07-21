# Contract Filters

We need filters for querying the Backend in order to get a more specific DTO sent to the Slice. This will pull the correct objects to send to the FE.

## Filters Needed FE w/ BE Notes

We need Filters not only for the Contract Ledger, but also the Contract Manager to populate the tabs.
This means we need to be able to query ALL info on a Contract object.
There are 2 methods on the FE we will be searching through:

- A search Bar that searches Anything on a Contract
- Filters that query a specific item in the object including locations

### Contract Ledger

The FE for the Contract Ledger has the following Filters:

- Contract Subtype - which will query for Contracts matching possible Subtypes Selected (This will be an array)
- Contract Archetype - This will just be a faster way to query arrays of subtypes (FE only)
- Contract Locations - Queries contracts for specific locations (This will be an array) (We can get more complex with this after MVP where they can search based on distance but that calculation can be handled by the FE and pass in the IDs of the results)
- Bid Time Remaining - Searches for Contracts for a range of Date based on the Time they are searching for, should also be an Array with pairs of ranges
- Time to Start - This will be an array of Date Ranges that will search for Contracts that fall inside the range.
- Employer Rating - This will search for the Ratings of Contract Owners (Side note, this means we need to work out Rating system now)
- Contractor Rating - This will search for the Ratings of ContractorRating Limit
- Contract Status - This will search for Contracts based on their Status (This will be an array) (Side note: We should only return Contracts that are Bidding or InProgress for the Contract Ledger so we should probably implement an option to the Fetch to only return Contracts with a specific status - this would circumvent the need to the filter probably come to think of it)
- Contract Pay Range - This will search for Contracts based on the Pay Range (This will be an array with only two numbers)
  This would be all of the Singular Filters. Lastly we have a Search Bar that should be able to search everything on a contract object and return matches no matter the field:
- Title
- Location
- Subtype
- Owner
- Pay
- Status

### Contract Manager

The FE for the Contract Manager has the Following Filters:
The Tabs For pulling Contracts are:

- Contracts Accepted - This filters Contracts by Contract Bids for Contracts that either have a Status of Bidding, InProgress, or Pending with the UserID on Contract Bids showing Accepted
- Contracts Owned - Filters Contracts By Contract Owner matching the User ID with only a status of Bidding, InProgress, or Pending
- Contracts Pending - Filters Contracts by where the UserID matches Bids on Contracts that still show Pending
- Contract Offers - Filters Contracts by Contract Bids where the UserID was Invited
- Contract History - Filters Contracts with the UserID either Being Accepted on Contract Bids, UserID matching Owner ID with a contract Status of Completed or Canceled.
  Then the Possible Filters to apply to these Tabs are:
- Contract Subtype
- Contract Locations
- Contract Pay Range
- Bid Time Remaining
- Time To Start
  This would be all of the Singular Filters. Lastly this will also include the Contract Search Bar.
