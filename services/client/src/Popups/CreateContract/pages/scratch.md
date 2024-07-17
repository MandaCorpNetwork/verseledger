fontWeight: manualControlled ? 'bold' : 'normal',
color: formData.isEmergency ? 'text.disabled' : manualControlled ? 'secondary.main' : 'text.secondary',
backgroundImage: manualControlled ? 'linear-gradient(145deg, rgba(0,180,255,0.3), rgba(0,73,130,.77))' : 'linear-gradient(145deg, rgba(0,0,0,.2), rgba(0,0,0,.5))',
boxShadow: formData.isEmergency ? 'none' : manualControlled ? '0 0 5px 2px rgba(0,180,255,.5)' : '0 0 5px 1px rgba(0,0,0,0.5)',
textShadow: manualControlled ? '0 0 5px rgba(0,180,255,.5)' : 'none',



'$.Mui-disabled': {
  color: 'text.disabled',
  textShadow: 'none',
  boxShadow: 'none',
  backgroundImage: 'linear-gradient(145deg, rgba(0,0,0,.2), rgba(0,0,0,.5))',
},
if (manualControlled) {
  setManualControlled(true);
}