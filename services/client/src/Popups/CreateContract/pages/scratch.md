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

            archetype.map

            Keyframe where the background color changes from `background: 'rgba(24,252,252,0)'` to `background: 'rgba(24,252,252,1)'` then back to `background: 'rgba(24,252,252,0)'` where it's smooth-quick in and smooth-slow out on hover, and holds at `background: 'rgba(24,252,252,1)'` while scrolling.

            <Box
          ref={scrollWrapperRef}
          data-testid="ContractDetails-Form-ArchetypeSelect__SelectScroll_Wrapper"
          sx={{
            display: 'flex',
            overflowX: 'auto',
            width: '100%',
            '&::-webkit-scrollbar': {
              height: '6px',
            },
            '&::-webkit-scrollbar-thumb': {
              borderRadius: '10px',
              background: 'rgba(121,192,244,0)',
            },
            '&::-webkit-scrollbar-track': {
              background: 'rgba(8,29,68,0)',
              borderRadius: '10px',
            },
          }}
        >
         useEffect(() => {
    const handleScroll = () => {
      if (scrollWrapperRef.current) {
        scrollWrapperRef.current.style.opacity = '1';
        clearTimeout(scrollWrapperRef.current.hideTimeout);
        scrollWrapperRef.current.hideTimeout = setTimeout(() => {
          scrollWrapperRef.current.style.opacity = '0';
        }, 1000); // Hide scrollbar after 1 second of inactivity
      }
    };

    if (scrollWrapperRef.current) {
      scrollWrapperRef.current.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (scrollWrapperRef.current) {
        scrollWrapperRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  inertiaFactor seems to only apply to scrolling in one direction.
  Additionally it doesn't change the velocity of the Inertia, just the duration of the decrease.
  /**
   * The `inertiaFactor` parameter seems to only apply to scrolling in one direction. Additionally, it doesn't change the velocity of the Inertia, just the duration of the decrease. A faster scroll velocity should result in a longer duration of the decrease, and a slower scroll velocity should result in a shorter duration of the decrease.
   */
  This would be fine, however, it is a static factor and therefore doesn't change the duration of the decrease based on the velocity of the scroll. A Faster Scroll Velocity should result in a longer duration of the decrease, and a slower scroll velocity should result in a shorter duration of the decrease.