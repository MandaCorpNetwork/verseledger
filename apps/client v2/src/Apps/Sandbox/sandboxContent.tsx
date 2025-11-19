import { useMasterAppList } from "@Maps/apps";
import { Typography, useTheme } from "@mui/material";
import { VerseOSAppButton } from "@OS/VerseOS/components/dock/AppButton";

/**
 * A Component to Test UI Elements in DevMode on the [SandboxPage](http://localhost:3000/sandbox)
 *
 * The File is in the GitIgnore so all changes are purely local
 */
export const SandboxContent: React.FC<unknown> = () => {
  const theme = useTheme();
  const apps = useMasterAppList();

  return (
    <>
      <Typography align="center">
        Use{' '}
        <span
          style={{
            fontStyle: 'italic',
            fontSize: '0.8em',
            fontWeight: 'bold',
            color: theme.palette.text.secondary,
          }}
        >
          /src/Common/Components/Wrappers/SandboxContent.tsx
        </span>{' '}
        for testing & developing new UI and Styles
      </Typography>
      <div>
        <VerseOSAppButton app={apps[0]} children={<></>} />
      </div>
    </>
  );
};
