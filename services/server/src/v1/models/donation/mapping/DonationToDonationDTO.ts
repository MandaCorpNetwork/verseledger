import { Mapper } from '@Infrastructure/Mapper';
import { Donation } from '../donation.model';
import { DonationDTO } from './DonationDTO';
import { IDonation } from 'vl-shared/src/schemas/DonationSchema';

export class DonationToDonationDTOMapper extends Mapper<Donation, DonationDTO> {
  public static override map(artifact: Donation): DonationDTO {
    const donation: IDonation = artifact.get();
    return new DonationDTO(donation);
  }
}
