            

{formData.isEmergency && <SmallEmergencyOverlay />}

<TextField
              data-testid="LocationForm__StartingLocation-Output"
              label="Start Location"
              color="secondary"
              size="small"
              InputProps={{
                readOnly: true,
                startAdornment:
                  (formData.Locations?.length ?? 0) > 0 ? (
                    <LocationChip
                      locationId={
                        formData.Locations?.find((loc) => loc.tag === 'start')
                          ?.location as string
                      }
                      //onDelete={() => handleRemoveLocation( ,'start')}
                    />
                  ) : null,
              }}
              sx={{
                display: 'flex',
                width: '150px',
              }}
            />

             <TextField
              data-testid="LocationForm__EndingLocation-Output"
              label="End Location"
              color="secondary"
              size="small"
              InputProps={{
                readOnly: true,
                startAdornment:
                  (formData.Locations?.length ?? 0) > 1 ? (
                    <LocationChip
                      locationId={
                        formData.Locations?.find((loc) => loc.tag === 'end')
                          ?.location as string
                      }
                      //onDelete={() => handleRemoveLocation(formData.Locations?.find((loc) => loc.tag === 'end')?.id as string, 'end'}
                    />
                  ) : null,
              }}
              sx={{
                display: 'flex',
                width: '150px',
              }}
            />

            <Box
            data-testid="LocationForm__OtherLocation-Output"
            sx={{
              borderTop: '2px solid',
              borderBottom: '2px solid',
              borderRadius: '5px',
              borderColor: formData.isEmergency
                ? 'action.disabledBackground'
                : 'primary.main',
              mx: '20%',
              py: '.5em',
              px: '.2em',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography
              variant="body1"
              sx={{
                color: formData.isEmergency ? 'text.disabled' : 'text.secondary',
              }}
            >
              Other Locations
            </Typography>
            <Box
              data-testid="LocationForm__OtherLocation-List"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '.5em',
                maxHeight: '150px',
                overflowY: 'auto',
                p: '.5em',
                '&::-webkit-scrollbar': {
                  width: '10px',
                },
                '&::-webkit-scrollbar-track': {
                  background: 'rgb(8, 29, 68)',
                },
                '&::-webkit-scrollbar-thumb': {
                  borderRadius: '20px',
                  background: 'rgb(121, 192, 244, .5)',
                },
              }}
            >
              {formData.Locations?.map(
                (loc) =>
                  loc.tag === 'other' && (
                    <LocationChip
                      locationId={loc.location}
                      //onDelete={() => handleRemoveLocation()}
                      key={loc.location}
                    />
                  ),
              )}
            </Box>
          </Box>

                          {() ? (
                  <LocationChip
                    locationId={
                      formData.Locations?.find((loc) => loc.tag === 'end')
                        ?.location as string
                    }
                    onDelete={() =>
                      handleRemoveLocation(
                        formData.Locations?.find((loc) => loc.tag === 'end')
                          ?.location as string,
                        'end',
                      )
                    }
                  />
                ) : null,
                }