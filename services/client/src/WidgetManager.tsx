import { useAppSelector } from '@Redux/hooks';
import { selectWidget } from '@Redux/Slices/Widgets/widgets.selectors';

import { RadioWidget, WIDGET_RADIO } from './Widgets/Radio/Radio';

export const WidgetManager: React.FC = () => {
  const radioWidget = useAppSelector((state) => selectWidget(state, WIDGET_RADIO));
  return <>{radioWidget.open && <RadioWidget />}</>;
};
