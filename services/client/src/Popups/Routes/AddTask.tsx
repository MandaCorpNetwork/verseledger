import { VLPopup } from "@Popups/PopupWrapper/Popup";

export const POPUP_ADD_TASK = 'add_stop';

export const AddTask: React.FC = () => {
  return (
    <VLPopup
      data-testid="AddTask_Form"
      name={POPUP_ADD_TASK}
    >
      Test
    </VLPopup>
  )
}