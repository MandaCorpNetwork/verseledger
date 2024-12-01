UPDATE `feature_flags`
SET `enabled` = "1",
  `percentageOfUsers` = 1,
  `description` = "Core Organization Apps and Systems for Participating as a Community."
WHERE `id` = "F-orgs";
UPDATE `feature_flags`
SET `enabled` = "1",
  `percentageOfUsers` = 1,
  `settingName` = NULL,
  `settingValue` = NULL,
  `description` = "Support Section of the Website including About Section, General information Pages and Wiki/Knowledge based articles."
WHERE `id` = "F-wiki";
UPDATE `feature_flags`
SET `enabled` = "1",
  `percentageOfUsers` = 0.5,
  `description` = "Tool used to track Package & Hauling Drop off and Delivery Locations."
WHERE `id` = "F-routing";
