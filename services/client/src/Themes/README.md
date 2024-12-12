# Themes

Verse Ledger UI is fully customizable through the Theme System.
We use a dynamic structure for creating Page & Component layouts and styles.
Developers in with access to the codebase would be able to create new themes and even extend existing ones with ease, and this document helps to break down the structure of the system, what can be done, and what you need to cover in order to create your own theme.

## Setup

In order to get started with a new theme, you first need to setup your Theme's Folder.
Inside `src/Themes/`, create a folder with the name of your theme.

In this folder you will need to create your constructor files. These files are passed to the baseThemesMap for your Theme.
You will need to create:

- ThemeName.components.tsx
- ThemeName.generator.tsx
- ThemeName.layouts.tsx
- ThemeName.palette.tsx
- ThemeName.styles.tsx
<br>
  You will also need to create three folders:
- Layouts
- Styles
- Components

### Generator

The Generate is a function for running `createTheme` from Mui that passes in arguments for assisting in creating the theme with conditionals for the user.
This function is ran in `App.tsx` during the Loading process to pass the result to the ThemeProvider

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
> To learn more about createTheme, checkout [createThemeAPI](https://mui.com/material-ui/customization/theming/).

> View Example of a generator file: [VerseOS.generator](./VerseOS/VerseOS.generator.tsx).

### Palette
**This File is optional, you can opt to use a preexisting palette if you choose**
The Palette File is a Theme creation for a color palette to be used as the base color palette for your theme that can be overwritten by a user defined palette in the Final Constructor.
> [ViewExample](./VerseOS/VerseOS.palette.tsx)

### Styles
The Styles file is a Map of SX Properties that is used by the StyleGeneration utility function to create the Styled Components using the styled function from Mui. The key is the name of the Component. 
Component Construction is done in the [ComponentsFolder](/src/Common/Components/).

* Example of `.components.tsx` map:
```ts
    export const themeNameStyles: ThemeStyledComponents = {
        ...themeNameCoreBoxes,
    }
```

The styles themselves are stored in the Styles Folder for the theme.
We try to define multiple Styles in a single file in order to cut down on file bloat. Here, you can define a group of Sx Objects or Sx Functions you want to pass to the Theme's StyleMap.
If you are using a function it must return a `SxProps<Theme>` I.E. `(theme: Theme) => SxProps<Theme>`. <br>
[Example Setup](./PirateOS/Styles/CoreBoxes.tsx)
```ts
    //CoreBoxes File
    export const themeNameCoreBoxes: ThemeStyledComponents = {
        'SomeComponent': (theme: Theme): SxProps<Theme> => ({
        backgroundColor: theme.palette.background.paper,
        alignItems: 'space-evenly',
        ...(theme.fidelity === 'high' && {
            backgroundImage: `url(${TextureFile})`
        }),
        ...(theme.fidelity === 'high' && 
            theme.animations === 'high' && {
                animation: 'someAnimation 0.3s infinite ease',
        }),
    }),
    }
```

All of the actual Components used run the GenerateStyles Function.<br>
[Example of Component](/src/Common/Components/Core/Boxes/AppContainer.tsx)
```ts
    //SomeComponent File
    const defaultStyles: SxProps<Theme> = {
        display: 'flex',
        padding: '1em',
    };

    export const SomeComponent = styled(Box)(({ theme }) => ({
        ...generateStyles(theme, defaultStyles, 'SomeComponent'),
    }));
    
    //DefaultStyles can also be a function:
    const functionDefaultStyles: SxProps<Theme> = (theme: Theme) => ({
        display: 'flex',
        padding: '1em',
        backgroundColor: theme.palette.secondary.main,
    })

    export const SomeComponent = styled(Box)(({ theme }) => ({
        ...generateStyles(theme, defaultStyles(theme), 'SomeComponent'),
    }));
```

Here you see it takes in the Current Theme, a Default Styles, and a Component Key.
The actual generatorFuction finds the custom style based on the current Theme, and then Targeting it's StyleMap to fetch the style function or SxObject.
It then spreads the default styles, and then the customStyles to overwrite and/or extend the default styles in an Sx Object. This is what is returned.
[Utility Function](/src/Utils/GenerateStyles.ts)

#### Layouts
The Layouts Folder is for Files being passed to the `ThemeName.styles` that are specifically for small One-Off components that we want to change the Style properties for to effect the layout. The naming convention for the Layout objects or functions themselves is `ParentComponentName.ComponentName`.

We provide a Callback function through our `useDynamicTheme` Hook to easily fetch the said Object through it's key then spread it on a Component. This can also be useful for providing useful changes to defined or undefined Components based on In-Component-Conditions to overwrite the Style.

[Example Of Hook Use](/src/Routes/Settings/UserSettings.tsx)

### Components
If you are needing to change the actual Components inside of a Functional Component based on the given Theme, you can define those Components with Keys in the ThemeName.components map.