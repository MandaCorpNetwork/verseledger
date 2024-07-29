import AegsClose from '../../Assets/Sounds/Aegs/aegsClose.wav?url';
import AegsDenied from '../../Assets/Sounds/Aegs/aegsDenied.wav?url';
import AegsError from '../../Assets/Sounds/Aegs/aegsError.wav?url';
import AegsGeneralNotify from '../../Assets/Sounds/Aegs/aegsGeneralNotify.wav?url';
import AegsLoading from '../../Assets/Sounds/Aegs/aegsLoading.wav?url';
import AegsMessageNotify from '../../Assets/Sounds/Aegs/aegsMessageNotify.wav?url';
import AegsNavigate from '../../Assets/Sounds/Aegs/aegsNavigate.wav?url';
import AegsOpen from '../../Assets/Sounds/Aegs/aegsOpen.wav?url';
import AegsSend from '../../Assets/Sounds/Aegs/aegsSend.wav?url';
import AegsSuccess from '../../Assets/Sounds/Aegs/aegsSuccess.wav?url';
import AegsToggleOff from '../../Assets/Sounds/Aegs/aegsToggleOff.wav?url';
import AegsToggleOn from '../../Assets/Sounds/Aegs/aegsToggleOn.wav?url';
import AegsWarning from '../../Assets/Sounds/Aegs/aegsWarning.wav?url';
import AnvilClose from '../../Assets/Sounds/Anvil/anvilClose.wav?url';
import AnvilDenied from '../../Assets/Sounds/Anvil/anvilDenied.wav?url';
import AnvilError from '../../Assets/Sounds/Anvil/anvilError.wav?url';
import AnvilGeneralNotify from '../../Assets/Sounds/Anvil/anvilGeneralNotify.wav?url';
import AnvilLoading from '../../Assets/Sounds/Anvil/anvilLoading.wav?url';
import AnvilMessageNotify from '../../Assets/Sounds/Anvil/anvilMessageNotify.wav?url';
import AnvilNavigate from '../../Assets/Sounds/Anvil/anvilNavigate.wav?url';
import AnvilOpen from '../../Assets/Sounds/Anvil/anvilOpen.wav?url';
import AnvilSend from '../../Assets/Sounds/Anvil/anvilSend.wav?url';
import AnvilSuccess from '../../Assets/Sounds/Anvil/anvilSuccess.wav?url';
import AnvilToggleOff from '../../Assets/Sounds/Anvil/anvilToggleOff.wav?url';
import AnvilToggleOn from '../../Assets/Sounds/Anvil/anvilToggleOn.wav?url';
import AnvilWarning from '../../Assets/Sounds/Anvil/anvilWarning.wav?url';
import SysClose from '../../Assets/Sounds/System/sysClose.wav?url';
import SysHover from '../../Assets/Sounds/System/sysHover.wav?url';
import SysNavigate from '../../Assets/Sounds/System/sysNavigate.wav?url';
import SysOpen from '../../Assets/Sounds/System/sysOpen.wav?url';
import SysPrimaryClick from '../../Assets/Sounds/System/sysPrimaryClick.wav?url';

export const soundEffectOptions = {
  close: [
    {
      src: new Audio(SysClose),
      name: 'System - Close',
    },
    {
      src: new Audio(AegsClose),
      name: 'Aegs - Close',
    },
    {
      src: new Audio(AnvilClose),
      name: 'Anvil - Close',
    },
  ],
  denied: [
    {
      src: new Audio(AegsDenied),
      name: 'Aegs - Denied',
    },
    {
      src: new Audio(AnvilDenied),
      name: 'Anvil - Denied',
    },
  ],
  error: [
    {
      src: new Audio(AegsError),
      name: 'Aegs - Error',
    },
    {
      src: new Audio(AnvilError),
      name: 'Anvil - Error',
    },
  ],
  generalNotify: [
    {
      src: new Audio(AegsGeneralNotify),
      name: 'Aegs - Error',
    },
    {
      src: new Audio(AnvilGeneralNotify),
      name: 'Anvil - General Notify',
    },
  ],
  loading: [
    {
      src: new Audio(AegsLoading),
      name: 'Aegs - Loading',
    },
    {
      src: new Audio(AnvilLoading),
      name: 'Anvil - Loading',
    },
  ],
  messageNotify: [
    {
      src: new Audio(AegsMessageNotify),
      name: 'Aegs - Message Notify',
    },
    {
      src: new Audio(AnvilMessageNotify),
      name: 'Anvil - Message Notify',
    },
  ],
  navigate: [
    {
      src: new Audio(SysNavigate),
      name: 'System - Navigate',
    },
    {
      src: new Audio(AegsNavigate),
      name: 'Aegs - Navigate',
    },
    {
      src: new Audio(AnvilNavigate),
      name: 'Anvil - Navigate',
    },
  ],
  open: [
    {
      src: new Audio(SysOpen),
      name: 'System - Open',
    },
    {
      src: new Audio(AegsOpen),
      name: 'Aegs - Open',
    },
    {
      src: new Audio(AnvilOpen),
      name: 'Anvil - Open',
    },
  ],
  send: [
    {
      src: new Audio(AegsSend),
      name: 'Aegs - Send',
    },
    {
      src: new Audio(AnvilSend),
      name: 'Anvil - Send',
    },
  ],
  success: [
    {
      src: new Audio(AegsSuccess),
      name: 'Aegs - Success',
    },
    {
      src: new Audio(AnvilSuccess),
      name: 'Anvil - Success',
    },
  ],
  toggleOff: [
    {
      src: new Audio(AegsToggleOff),
      name: 'Aegs - Toggle Off',
    },
    {
      src: new Audio(AnvilToggleOff),
      name: 'Anvil - Toggle Off',
    },
  ],
  toggleOn: [
    {
      src: new Audio(AegsToggleOn),
      name: 'Aegs - Toggle On',
    },
    {
      src: new Audio(AnvilToggleOn),
      name: 'Anvil - Toggle On',
    },
  ],
  warning: [
    {
      src: new Audio(AegsWarning),
      name: 'Aegs - Warning',
    },
    {
      src: new Audio(AnvilWarning),
      name: 'Anvil - Warning',
    },
  ],
  hover: [
    {
      src: new Audio(SysHover),
      name: 'System - Hover',
    },
  ],
  clickMain: [
    {
      src: new Audio(SysPrimaryClick),
      name: 'System - Primary Click',
    },
  ],
};

export const soundEffectPacks = {
  systemDefault: {
    name: 'System Default',
    pack: {
      close: soundEffectOptions.close[0].src,
      denied: soundEffectOptions.denied[0].src,
      error: soundEffectOptions.error[0].src,
      generalNotify: soundEffectOptions.generalNotify[0].src,
      loading: soundEffectOptions.loading[0].src,
      messageNotify: soundEffectOptions.messageNotify[0].src,
      navigate: soundEffectOptions.navigate[0].src,
      send: soundEffectOptions.send[0].src,
      success: soundEffectOptions.success[0].src,
      toggleOff: soundEffectOptions.toggleOff[0].src,
      toggleOn: soundEffectOptions.toggleOn[0].src,
      warning: soundEffectOptions.warning[0].src,
      hover: soundEffectOptions.hover[0].src,
      open: soundEffectOptions.open[0].src,
      clickMain: soundEffectOptions.clickMain[0].src,
    },
  },
  aegsPack: {
    name: 'Aegs Pack',
    pack: {
      close: soundEffectOptions.close[1].src,
      denied: soundEffectOptions.denied[0].src,
      error: soundEffectOptions.error[0].src,
      generalNotify: soundEffectOptions.generalNotify[0].src,
      loading: soundEffectOptions.loading[0].src,
      messageNotify: soundEffectOptions.messageNotify[0].src,
      navigate: soundEffectOptions.navigate[1].src,
      send: soundEffectOptions.send[0].src,
      success: soundEffectOptions.success[0].src,
      toggleOff: soundEffectOptions.toggleOff[0].src,
      toggleOn: soundEffectOptions.toggleOn[0].src,
      warning: soundEffectOptions.warning[0].src,
      hover: soundEffectOptions.hover[0].src,
      open: soundEffectOptions.open[1].src,
      clickMain: soundEffectOptions.clickMain[0].src,
    },
  },
  anvilPack: {
    name: 'Anvil Pack',
    pack: {
      close: soundEffectOptions.close[2].src,
      denied: soundEffectOptions.denied[1].src,
      error: soundEffectOptions.error[1].src,
      generalNotify: soundEffectOptions.generalNotify[1].src,
      loading: soundEffectOptions.loading[1].src,
      messageNotify: soundEffectOptions.messageNotify[1].src,
      navigate: soundEffectOptions.navigate[2].src,
      send: soundEffectOptions.send[1].src,
      success: soundEffectOptions.success[1].src,
      toggleOff: soundEffectOptions.toggleOff[1].src,
      toggleOn: soundEffectOptions.toggleOn[1].src,
      warning: soundEffectOptions.warning[1].src,
      hover: soundEffectOptions.hover[0].src,
      open: soundEffectOptions.open[2].src,
      clickMain: soundEffectOptions.clickMain[0].src,
    },
  },
};
