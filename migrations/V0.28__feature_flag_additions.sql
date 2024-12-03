ALTER TABLE `feature_flags`
CHANGE `description` `description` text COLLATE 'utf8mb4_0900_ai_ci' NOT NULL AFTER `name`;
INSERT INTO `feature_flags` (`id`, `name`, `description`) VALUES
('F-builder', 'Builder Beta', 'Ship Loadout manager for exploring ship builds exclusively. An Alternative to the Ship Management Tool.'),
('F-market', 'Verse Market Beta', 'Advanced tool for User to User trading and ordering. A Verse Ledger operated Marketplace.'),
('F-orgRelations', 'Org Relations Beta', 'Tool for Viewing and managing Relationships of an Org with Individuals & other Orgs.'),
('F-orgContracts', 'Org Contracting Beta', 'Allows Orgs to create contracts for their users, other orgs, or for anyone else and manage internally in the Org.'),
('F-payroll', 'Org Payroll Beta', 'An app for managing Payroll Ledgers to link into Contracts & Orders allowing the Org to have an in Depth Finance management tool.'),
('F-orgExplore', 'Org Explorer Beta', 'An app for Orgs to Log their Group Exploration Data and share with their members and Relations.'),
('F-orgFleet', 'Org Fleet Beta', 'An Org Fleet Composition Tool for tracking and managing their fleets.'),
('F-orgMarket', 'Org Market Beta', 'An App that Connects Orgs to the Verse Market for creating internal & external Orders, and having their own Market Pages to be managed that people can view when looking at Orgs.'),
('F-orgInventory', 'Org Inventory Beta', 'The Inventory Application extended to Organizations.');

UPDATE `feature_flags`
SET `description` = "An Explore Application for Viewing Location Information and keeping personal Exploration Data."
WHERE `id` = "F-explore";
UPDATE `feature_flags`
SET `description` = "A Fleet Management App for managing the Ships you own and viewing a detailed list of their General Information."
WHERE `id` = "F-fleet";
UPDATE `feature_flags`
SET `description` = "A Inventory Management Tool for A user to manage all aspects of their Items, Commodities and Ships in regards to Manifest Tooling. "
WHERE `id` = "F-inventory";
UPDATE `feature_flags`
SET `description` = "Verse Ledger App for Viewing Verse Ledger Updates & Star Citizen Updates."
WHERE `id` = "F-news";
UPDATE `feature_flags`
SET `description` = "A User Specific version of the Profile Page with more Utility."
WHERE `id` = "F-profile";
UPDATE `feature_flags`
SET `description` = "Viewing your contacts made through Verse Ledger."
WHERE `id` = "F-relations";
UPDATE `feature_flags`
SET `description` = "The Ship Management App for managing your Current Ship, the Crew, Manifests, and various information that integrate with other Apps."
WHERE `id` = "F-ship";
UPDATE `feature_flags`
SET `description` = "Quick tool for Creating or Editing Ship Tuning Profiles and managing the SCTuningFiles for personal usage."
WHERE `id` = "F-tuning";

UPDATE `feature_flags`
SET `name` = "VerseLedger Support"
WHERE `id` = "F-wiki";
