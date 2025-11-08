ALTER TABLE `contract_bids`
ADD COLUMN `amount` DOUBLE NOT NULL DEFAULT 0;
UPDATE `contract_bids` BIDS
  INNER JOIN `contracts` CONTRACTS ON `BIDS`.`contract_id` = `CONTRACTS`.`id`
SET `amount` = `CONTRACTS`.`defaultPay`;
