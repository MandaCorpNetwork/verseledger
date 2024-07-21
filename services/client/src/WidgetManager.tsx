/* eslint-disable prettier/prettier */
import { useAppSelector } from '@Redux/hooks';
import { selectWidget } from '@Redux/Slices/Widgets/widgets.selectors';
import { Logger } from '@Utils/Logger';

import { RadioWidget, WIDGET_RADIO } from './Widgets/Radio/Radio';

export const WidgetManager: React.FC = () => {
  const radioWidget = useAppSelector((state) => selectWidget(state, WIDGET_RADIO));
  Logger.info('Radio Widget State', radioWidget);
  return (
    <>
      {radioWidget.open && <RadioWidget />}
    </>
  );
};
