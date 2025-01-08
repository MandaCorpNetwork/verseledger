import { VLPopup } from '@Common/Components/Wrappers/PopupWrapper';

export const UPDATE_POPUP = 'updatePopup';

export const UpdatePopup: React.FC = () => {
  return (
    <VLPopup title="@POPUPS.TITLES.UPDATES" name={UPDATE_POPUP}>
      <div>Yupppppp</div>
    </VLPopup>
  );
};
