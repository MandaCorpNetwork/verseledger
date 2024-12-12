# Themes

Verse Ledger UI is fully customizable through the Theme System.
We use a dynamic structure for creating Page & Component layouts and styles.
Developers in with access to the codebase would be able to create new themes and even extend existing ones with ease, and this document helps to break down the structure of the system, what can be done, and what you need to cover in order to create your own theme.

## Setup

### Folder Structure

In order to get started with a new theme, you first need to setup your Theme's Folder.
Inside `src/Themes/`, create a folder with the name of your theme.

In this folder you will need to create your constructor files. These files are passed to the baseThemesMap for your Theme.
You will need to create:

- <ThemeName>.components.tsx
- <ThemeName>.generator.tsx
- <ThemeName>.layouts.tsx
- <ThemeName>.palette.tsx
  You will also need to create two folders:
- Layouts
- Styles

#### Generator

The Generate is a function for running `createTheme` from Mui that passes in arguments for assisting in creating the theme with conditionals for the user.
This function is ran in `App.tsx` during the Loading process to pass the result to the <ThemeProvider>

> Example Setup:

```ts
import type {} from '@mui/lab/themeAugmentation';
    //Ensure you import this type for MuiLab Theme Extensions
    export const generateThemeName = (palette: Theme, fidelity: ThemeFidelity, animations: ThemeAnimations, transitions: ThemeOptions['transitions']) => {
        const colors = palette.palette;
        // Add this line for easy reference to colors and be able to pass the defined palette colors and simplify running the defined colors through the Alpha Function
        // Also use this method to reference the Palette functions instead of specifcally identifying the rgb or hex here to allow colors to be overwritten

        return createTheme({
            themeType: 'Short theme id',
            palette: palette.palette,
            fidelity,
            animations,
            ...transitions,
            //The Rest is optional things to pass to the theme for the generating process.
            shape: {},
            breakpoints: {},
            typography: {},
            components: {
                // Required Options below
                MuiLoadingButton: {
                    defaultProps: {
                        variant: 'outlined', // Use what you want
                        loadingIndicator: <LoadingWheel logoSize={20} wheelSize={35} />, //This is really what is required to be defined
                        loadingPosition: 'center', // Ensure it is set to center to prevent UI issues
                        size: 'medium', // Use medium by default to prevent clipping.
                    },
                },
            },
        });
    }
```
