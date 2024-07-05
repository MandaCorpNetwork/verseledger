import { Box } from '@mui/material';

//import { IContract } from '@Backend/interfaces/IContract';
// import { ContractManagerContractCard } from './ContractManagerContractCard';

type ContractManagerListProps = {
  //contracts: IContract[];
};

export const ContractManagerContractList: React.FC<ContractManagerListProps> = () => {
  // const dispatch = useAppDispatch();
  // const contracts = useAppSelector((root) => selectContracts(root));
  // React.useEffect(() => {
  //   dispatch(fetchContracts());
  // }, []);
  return (
    <Box
      data-testid="ContractManager__ContractListWrapper"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        overflow: 'auto',
        alignItems: 'center',
        mb: '5%',
        '&::-webkit-scrollbar': {
          width: '10px',
        },
        '&::-webkit-scrollbar-track': {
          background: 'rgb(8, 29, 68)',
          borderRadius: '20px',
        },
        '&::-webkit-scrollbar-thumb': {
          borderRadius: '20px',
          background: 'rgb(121, 192, 244, .5)',
        },
      }}
    >
      {/* {tempContractData.map((contract) => {
        return <ContractManagerContractCard contract={contract as contract} key={contract.id} />;
      })} */}
      {/* {contracts.map((contract) -> {
        return(
          <ContractManagerContractCard contract={contract} key={contract.id} />
        )
      })} */}
    </Box>
  );
};

export type TempContractProps = {
  id: string;
  title: string;
  pay: number;
  subType: string;
  ownerid: string;
  bidEnd: Date;
  ownerName: string;
};

const tempContractData = [
  {
    id: 1,
    title: 'Contract Title',
    pay: 10000,
    subType: 'Attache',
    ownerID: 0,
    ownerName: 'ThreeCrown',
    bidEnd: 1519211809934,
  },
  {
    id: 2,
    title: 'Contract Title',
    pay: 10000,
    subType: 'Mining',
    ownerID: 0,
    ownerName: 'ThreeCrown',
    bidEnd: 1519211809934,
  },
  {
    id: 3,
    title: 'Contract Title',
    pay: 10000,
    subType: 'Scouting',
    ownerID: 0,
    ownerName: 'ThreeCrown',
    bidEnd: 1519211809934,
  },
  {
    id: 4,
    title: 'Contract Title',
    pay: 10000,
    subType: 'Refuel',
    ownerID: 0,
    ownerName: 'ThreeCrown',
    bidEnd: 1519211809934,
  },
  {
    id: 5,
    title: 'Contract Title',
    pay: 10000,
    subType: 'Bounty',
    ownerID: 0,
    ownerName: 'ThreeCrown',
    bidEnd: 1519211809934,
  },
  {
    id: 6,
    title: 'Contract Title',
    pay: 10000,
    subType: 'Middleman',
    ownerID: 0,
    ownerName: 'ThreeCrown',
    bidEnd: 1519211809934,
  },
  {
    id: 7,
    title: 'Contract Title',
    pay: 10000,
    subType: 'Salvage',
    ownerID: 0,
    ownerName: 'ThreeCrown',
    bidEnd: 1519211809934,
  },
  {
    id: 8,
    title: 'Contract Title',
    pay: 10000,
    subType: 'Scouting',
    ownerID: 0,
    ownerName: 'ThreeCrown',
    bidEnd: 1519211809934,
  },
  {
    id: 9,
    title: 'Contract Title',
    pay: 10000,
    subType: 'Exploration',
    ownerID: 0,
    ownerName: 'ThreeCrown',
    bidEnd: 1519211809934,
  },
  {
    id: 10,
    title: 'Contract Title',
    pay: 10000,
    subType: 'Trauma',
    ownerID: 0,
    ownerName: 'ThreeCrown',
    bidEnd: 1519211809934,
  },
];
console.log(tempContractData);
