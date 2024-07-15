<Autocomplete
              data-testid="CreateContract__Subtype-AutoComplete"
              options={flatOptions}
              value={formData.subtype}
              groupBy={(option) => optionsMap[option].group}
              getOptionLabel={(option) => optionsMap[option].label}
              renderInput={(params) => (
                <TextField {...params} label="SubType" size="small" />
              )}
              onChange={(_e, newValue) => {
                setFormData({
                  ...formData,
                  subtype: (newValue as IContractSubType) ?? '',
                });
              }}
              fullWidth
              sx={{ mt: 2, mb: '1em', maxWidth: '300px' }}
            />

<Box
        data-testid="Archetype__DisplayContainer"
        sx={{
          alignItems: 'center',
          display: 'flex',
          width: '100%',
          justifyContent: 'center',
          ml: '1em',
          maxHeight: '100%',
        }}
      >
        <Box
          data-testid="Archetype__DisplayWrapper"
          sx={{
            borderTop: '2px solid',
            borderBottom: '2px solid',
            borderRadius: '5px',
            borderColor: 'secondary.main',
            py: '.5em',
            px: '1em',
          }}
        >
        <Typography sx={{ fontWeight: 'bold', color: 'text.secondary', mb: '.5em' }}>
            Contract Archetype
          </Typography>
          <Box
            data-testid="Archetype__ChipWrapper"
            sx={{
              border: '1px solid',
              borderColor: 'primary.main',
              borderRadius: '5px',
              p: '.5em',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              py: '.5em',
            }}
          >
            {!archetype && <Typography>Select SubType</Typography>}
            {archetype && (
              <Chip
                icon={
                  options.find((option) => option.archetype === archetype)?.archetypeIcon
                }
                label={archetype}
                variant="outlined"
                color="secondary"
                onClick={handleArchetypeOpen}
              />
            )}