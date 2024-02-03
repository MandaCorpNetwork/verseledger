import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
import React from 'react';

export const LogisiticsSubTypes = (
  <RadioGroup>
    <FormControlLabel value="Transport" control={<Radio />} label="Transport" />
    <FormControlLabel value="Hauling" control={<Radio />} label="Hauling" />
    <FormControlLabel value="Manage" control={<Radio />} label="Manage" />
  </RadioGroup>
);

export const MedicalSubTypes = (
  <RadioGroup>
    <FormControlLabel value="Trauma" control={<Radio />} label="Trauma" />
    <FormControlLabel value="On-Call" control={<Radio />} label="On-Call" />
  </RadioGroup>
);

export const SalvageSubTypes = (
  <RadioGroup>
    <FormControlLabel value="Collections" control={<Radio />} label="Collections" />
    <FormControlLabel value="Procurement" control={<Radio />} label="Procurement" />
  </RadioGroup>
);

export const SecuritySubTypes = (
  <RadioGroup>
    <FormControlLabel value="Escort" control={<Radio />} label="Escort" />
    <FormControlLabel value="Bounty" control={<Radio />} label="Bounty" />
    <FormControlLabel value="QRF" control={<Radio />} label="QRF" />
    <FormControlLabel
      value="AssetProtection"
      control={<Radio />}
      label="Asset Protection"
    />
    <FormControlLabel value="Attache" control={<Radio />} label="Attache" />
  </RadioGroup>
);

export const IndustrySubTypes = (
  <RadioGroup>
    <FormControlLabel value="Mining" control={<Radio />} label="Mining" />
    <FormControlLabel value="Refining" control={<Radio />} label="Refining" />
    <FormControlLabel value="Manufacturing" control={<Radio />} label="Manufacturing" />
    <FormControlLabel value="Scouting" control={<Radio />} label="Scouting" />
  </RadioGroup>
);

export const RRRSubTypes = (
  <RadioGroup>
    <FormControlLabel value="Rearm" control={<Radio />} label="Rearm" />
    <FormControlLabel value="Refuel" control={<Radio />} label="Refuel" />
    <FormControlLabel value="Repair" control={<Radio />} label="Repair" />
  </RadioGroup>
);

export const FleetSubTypes = (
  <RadioGroup>
    <FormControlLabel value="Crewman" control={<Radio />} label="Crewman" />
    <FormControlLabel value="Outsourcing" control={<Radio />} label="Outsourcing" />
  </RadioGroup>
);

export const ProxySubTypes = (
  <RadioGroup>
    <FormControlLabel value="Middleman" control={<Radio />} label="Middleman" />
    <FormControlLabel value="Other" control={<Radio />} label="Other" />
  </RadioGroup>
);
