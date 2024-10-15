import { useAppSelector } from '@Redux/hooks';
import { selectWidget } from '@Redux/Slices/Widgets/widgets.selectors';
import { RoutesWidget, WIDGET_ROUTES } from '@Widgets/Routes/Routes';

import { RadioWidget, WIDGET_RADIO } from './Widgets/Radio/Radio';

export const WidgetManager: React.FC = () => {
  const radioWidget = useAppSelector((state) => selectWidget(state, WIDGET_RADIO));
  const routeWidget = useAppSelector((state) => selectWidget(state, WIDGET_ROUTES));
  return (
    <>
      {radioWidget.open && <RadioWidget />}
      {routeWidget.open && <RoutesWidget />}
    </>
  );
};
