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

Need a thunk to check if any of these user ratings are recent.
  Create Rating Endpoing
    checks an array of users
    runs the checkRecentRatings for array
    Returns an object of booleans for each user in the array
    can use this to disable the rating field for certain users

The ICreateUserRatingBody State needs to be nullable
We need to create a new object for the list of rateable contractors
Whenever a contractor is rated, it then gets added to the state body

onSubmit needs to run the submit rating as it has,

handleClose needs to run the same handleSubmitRating



