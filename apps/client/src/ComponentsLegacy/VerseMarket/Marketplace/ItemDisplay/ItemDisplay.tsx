import { ComponentContainer } from '@Common/Components/Core/Boxes/ComponentContainer';
import ComponentDisplay from '@Common/Components/Core/Boxes/ComponentDisplay';
import { ControlPanelBox } from '@Common/Components/Core/Boxes/ControlPanelBox';
import FeatureContainer from '@Common/Components/Core/Boxes/FeatureContainer';
import { FileOpen } from '@mui/icons-material';
import { Box, Divider, IconButton, Typography } from '@mui/material';
import type React from 'react';

export const ItemDisplay: React.FC<unknown> = () => {
  return (
    <FeatureContainer
      data-testid="VerseMarket-Marketplace-ItemDisplay"
      sx={{
        height: '100%',
        p: '1em',
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        mx: '.5em',
        justifyContent: 'space-around',
      }}
    >
      <Box
        data-testid="VerseMarket-Marketplace-ItemDisplay__TopBox"
        sx={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-around',
          gap: '1em',
          maxHeight: '48%',
        }}
      >
        <Box
          data-testid="VerseMarket-Marketplace-ItemDisplay__TopBox__Left"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            gap: '1em',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <ComponentDisplay
            data-testid="VerseMarket-Marketplace-ItemDisplay__ItemPicture_Container"
            sx={{ width: '175px', height: '175px', p: '5px' }}
          >
            <Box
              data-testid="VerseMarket-Marketplace-ItemDisplay__ItemPicture_Wrapper"
              sx={{
                height: '100%',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'rgba(0,0,0,.5)',
                borderRadius: '5px',
              }}
            >
              No Image Available
            </Box>
          </ComponentDisplay>
          <ComponentContainer
            data-testid="VerseMarket-Marketplace-ItemDisplay__ItemLocations_Wrapper"
            sx={{ flexGrow: 1, p: '1em', alignItems: 'center' }}
          >
            <Typography
              data-testid="VerseMarket-Marketplace-ItemDisplay__ItemLocations_Title"
              variant="subtitle1"
            >
              Item Locations
            </Typography>
            <ComponentDisplay
              data-testid="VerseMarket-Marketplace-ItemDisplay-ItemLocations__ChipsList_Wrapper"
              sx={{ p: '.5em' }}
            >
              Location Chip Scroller
            </ComponentDisplay>
          </ComponentContainer>
        </Box>
        <FeatureContainer
          data-testid="VerseMarket-Marketplace-ItemDisplay__Item_Charts_Wrapper"
          sx={{ flexGrow: 1, p: '.5em' }}
        >
          Item Charts
        </FeatureContainer>
      </Box>
      <Box
        data-testid="VerseMarket-Marketplace-ItemDisplay__BottomBox"
        sx={{
          maxHeight: '48%',
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-around',
          gap: '1em',
        }}
      >
        <Box
          data-testid="VerseMarket-Marketplace-ItemDisplay-Bottom__LeftBox"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            gap: '1em',
            flexGrow: 1,
          }}
        >
          <ComponentContainer
            data-testid="VerseMarket-Marketplace-ItemDisplay__Description_Container"
            sx={{ p: '.5em', alignItems: 'center', gap: '.5em' }}
          >
            <ComponentDisplay
              data-testid="VerseMarket-Marketplace-ItemDisplay__Description_Wrapper"
              sx={{ p: '.5em' }}
            >
              Item Description
            </ComponentDisplay>
            <ComponentDisplay
              data-testid="VerseMarket-Marketplace-ItemDisplay-Description__Details__Container"
              sx={{ display: 'flex', flexDirection: 'row', p: '.5em' }}
            >
              <Box
                data-testid="VerseMarket-Marketplace-ItemDisplay-Description-Details__DataGroup_Wrapper"
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'space-around',
                  gap: '.5em',
                  justifyContent: 'center',
                }}
              >
                <Typography
                  data-testid="VerseMarket-Marketplace-ItemDisplay-Description-Details-DataGroup__Title"
                  align="center"
                >
                  Data Group
                </Typography>
                <Box
                  data-testid="VerseMarket-Marketplace-ItemDisplay-Description-Details-DataGroup__DataList_Wrapper"
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    gap: '.5em',
                  }}
                >
                  <Box data-testid="VerseMarket-Marketplace-ItemDisplay-Description-Details-DataGroup__Data_Wrapper">
                    <Typography>Detail</Typography>
                    <Typography>Data</Typography>
                  </Box>
                  <Box data-testid="VerseMarket-Marketplace-ItemDisplay-Description-Details-DataGroup__Data_Wrapper">
                    <Typography>Detail</Typography>
                    <Typography>Data</Typography>
                  </Box>
                  <Box data-testid="VerseMarket-Marketplace-ItemDisplay-Description-Details-DataGroup__Data_Wrapper">
                    <Typography>Detail</Typography>
                    <Typography>Data</Typography>
                  </Box>
                </Box>
              </Box>
            </ComponentDisplay>
          </ComponentContainer>
          <ComponentContainer
            data-testid="VerseMarket-Marketplace-ItemDisplay__OrderMarket"
            sx={{ p: '.5em', flexDirection: 'row', justifyContent: 'space-around' }}
          >
            <ComponentDisplay
              data-testid="VerseMarket-Marketplace-ItemDisplay-OrderMarket__BuyOrder__Container"
              sx={{ p: '.5em', gap: '1em' }}
            >
              <Typography data-testid="VerseMarket-Marketplace-ItemDisplay-OrderMarket-BuyOrder__Title">
                Buy Orders
              </Typography>
              <Box
                data-testid="VerseMarket-Marketplace-ItemDisplay-OrderMarket-BuyOrder__ListWrapper"
                sx={{ display: 'flex', flexDirection: 'column', gap: '.5em' }}
              >
                <ControlPanelBox
                  data-testid="VerseMarket-Marketplace-ItemDisplay-OrderMarket-BuiyOrder-List__Order_Wrapper"
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    px: '.5em',
                    gap: '.5em',
                  }}
                >
                  <div>User</div>
                  <div>Order Type</div>
                  <div>Price</div>
                  <IconButton>
                    <FileOpen />
                  </IconButton>
                </ControlPanelBox>
                <ControlPanelBox
                  data-testid="VerseMarket-Marketplace-ItemDisplay-OrderMarket-BuiyOrder-List__Order_Wrapper"
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    px: '.5em',
                    gap: '.5em',
                  }}
                >
                  <div>User</div>
                  <div>Order Type</div>
                  <div>Price</div>
                  <IconButton>
                    <FileOpen />
                  </IconButton>
                </ControlPanelBox>
              </Box>
            </ComponentDisplay>
            <ComponentDisplay
              data-testid="VerseMarket-Marketplace-ItemDisplay-OrderMarket__SellOrder__Container"
              sx={{ p: '.5em', gap: '1em' }}
            >
              <Typography data-testid="VerseMarket-Marketplace-ItemDisplay-OrderMarket-SellOrder__Title">
                Sell Orders
              </Typography>
              <Box
                data-testid="VerseMarket-Marketplace-ItemDisplay-OrderMarket-SellOrder__ListWrapper"
                sx={{ display: 'flex', flexDirection: 'column', gap: '.5em' }}
              >
                <ControlPanelBox
                  data-testid="VerseMarket-Marketplace-ItemDisplay-OrderMarket-SellOrder-List__Order_Wrapper"
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    px: '.5em',
                    gap: '.5em',
                  }}
                >
                  <div>User</div>
                  <div>Order Type</div>
                  <div>Price</div>
                  <IconButton>
                    <FileOpen />
                  </IconButton>
                </ControlPanelBox>
                <ControlPanelBox
                  data-testid="VerseMarket-Marketplace-ItemDisplay-OrderMarket-SellOrder-List__Order_Wrapper"
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    px: '.5em',
                    gap: '.5em',
                  }}
                >
                  <div>User</div>
                  <div>Order Type</div>
                  <div>Price</div>
                  <IconButton>
                    <FileOpen />
                  </IconButton>
                </ControlPanelBox>
              </Box>
            </ComponentDisplay>
          </ComponentContainer>
        </Box>
        <ComponentContainer
          data-testid="VerseMarket-Marketplace-ItemDisplay-Bottom__RightBox"
          sx={{
            minWidth: '200px',
            justifyContent: 'flex-start',
            p: '.5em',
            alignItems: 'center',
            gap: '1em',
          }}
        >
          <Typography>Market Order Book</Typography>
          <Divider variant="fullWidth" />
          <Box data-testid="VerseMarket-Marketplace-ItemDisplay__MarketOrder_ListWrapper">
            <Box
              data-testid="VerseMarket-Marketplace-ItemDisplay-MarketOrder-List__Range_Wrapper"
              sx={{ display: 'flex', flexDirection: 'row', gap: '.5em' }}
            >
              <div>170</div>
              <div>Sell Bar</div>
              <div>Buy Bar</div>
              <div>150</div>
            </Box>
          </Box>
        </ComponentContainer>
      </Box>
    </FeatureContainer>
  );
};
