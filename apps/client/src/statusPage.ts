const origin = 'https://453tt7dpwtfm.statuspage.io';

export const statusPage = () => {
  const frame = document.createElement('iframe');
  frame.src = origin + '/embed/frame';
  frame.style.position = 'fixed';
  frame.style.border = 'none';
  frame.style.boxShadow = '0 20px 32px -8px rgba(9,20,66,0.25)';
  frame.style.zIndex = '9999';
  frame.style.transition = 'left 1s ease, bottom 1s ease, right 1s ease';

  frame.title = 'Verseledger Status';
  frame.ariaHidden = 'true';

  const mobile = screen.width < 450;
  if (mobile) {
    frame.src += '?mobile=true';
    frame.style.height = '20vh';
    frame.style.width = '100vw';
    frame.style.left = '-9999px';
    frame.style.bottom = '-9999px';
    frame.style.transition = 'bottom 1s ease';
  } else {
    frame.style.height = '115px';
    frame.style.width = '320px';
    frame.style.left = 'auto';
    frame.style.right = '-9999px';
    frame.style.bottom = '60px';
  }

  document.body.appendChild(frame);

  const actions = {
    showFrame: () => {
      frame.tabIndex = 0;
      if (mobile) {
        frame.style.left = '0';
        frame.style.bottom = '0';
      } else {
        frame.style.left = 'auto';
        frame.style.right = '60px';
      }
    },
    dismissFrame: () => {
      frame.style.left = '-9999px';
      frame.tabIndex = -1;
    },
  };

  window.addEventListener(
    'message',
    (event) => {
      if (event.origin !== origin) return;
      if (event.data.action && Object.hasOwn(actions, event.data.action)) {
        // @ts-expect-error Key props
        actions[event.data.action](event.data);
      }
    },
    false,
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).statusEmbedTest = actions.showFrame;
};
