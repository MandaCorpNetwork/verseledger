import { DropZone } from '@Common/Components/Functional/Dropzone';
import { VLPopup } from '@Popups/PopupWrapper/Popup';

export const POPUP_IMPORT_FILE = 'importFile';

export type ImportFileProps = {
  title?: string;
};

export const ImportFilePopup: React.FC<ImportFileProps> = (props) => {
  const { title } = props;
  return (
    <VLPopup name={POPUP_IMPORT_FILE} title={`Import ${title}`}>
      <DropZone />
    </VLPopup>
  );
};
