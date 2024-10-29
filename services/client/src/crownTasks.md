<details id="WorkSpace-Section">
  <summary class="headerStyle"> 
    Workspace 
    <img class="iconStyle" src="assets/Workspace/DevIcon.png" alt="Dev Icon" width="40px" /> 
  </summary>

# WorkSpace

  <details id="WorkSpace-Branches-Section">
    <summary class="subHeaderStyle">
      Branches
      <img class="iconStyle" src="assets/Workspace/InDev.png" alt="Link Icon" width="25px" /> 
    </summary>

## Branches

### Route App Refactor

#### Links

[Jira Issue][ver-6-jira]<br>
[GIT PR][ver-6-pr]

#### Notes

  </details>
  <br>

  <details id="workspace-notes-drop">
    <summary class="subHeaderStyle">
      Notes
      <img class="iconStyle" src="assets/Workspace/Notes.png" alt="Link Icon" width="25px" /> 
    </summary>

## Notes

Option to add multiple missions in Create Mission Popup

    Grid the Accordian Summary
    Grid the Header & move to it's own Components
    Reordering Breaks
    Distance Incorrect
    Store Locations Locally

  </details>

</details>

  <br>

---

  <br>

<details id="Links-Section">
  <summary class="headerStyle">
    Links
    <img class="iconStyle" src="assets/Workspace/Links.png" alt="Link Icon" width="35px" /> 
  </summary>

# Links

  <div id="Link-Icon-Display" class="iconGroupDisplay">
    <a class="iconDisplay" href="https://verseledger.atlassian.net/jira/software/projects/VER/boards/1" target="_blank" rel="noopener noreferrer">
      <img src="assets/Workspace/Jira.png" alt="Jira Icon" width="35px" />
      Jira
    </a>
    <a class="iconDisplay" href="https://verseledger.atlassian.net/wiki/home" target="_blank" rel="noopener noreferrer">
      <img src="assets/Workspace/Confluence.png" alt="Confluence Icon" width="35px" />
      Confluence
    </a>
    <a class="iconDisplay" href="https://github.com/MandaCorpNetwork/verseledger" target="_blank" rel="noopener noreferrer">
      <img src="assets/Workspace/Github.png" alt="Github Icon" width="40px" /> 
      Github
    </a>
  </div>

  <details id="Links-Branches-Section">
    <summary class="subHeaderStyle">
      Branches
      <img class="iconStyle" src="assets/Workspace/InDev.png" alt="Link Icon" width="25px" /> 
    </summary>

## Branches

### VER-6

`Routes Tool Refactor`

[ver-6-jira]: https://mandacorp-network.atlassian.net/jira/software/projects/VER/issues/VER-6?jql=project%20%3D%20%22VER%22%20ORDER%20BY%20created%20DESC
[ver-6-pr]: https://github.com/MandaCorpNetwork/verseledger/pull/738

    [ver-6-jira]: https://mandacorp-network.atlassian.net/jira/software/projects/VER/issues/VER-6?jql=project%20%3D%20%22VER%22%20ORDER%20BY%20created%20DESC
    [ver-6-pr]: https://github.com/MandaCorpNetwork/verseledger/pull/738

  </details>
  <br>

  <description id="Links-App-Section">
    <summary class="subHeaderStyle">
      Apps
      <img class="iconStyle" src="assets/media/VerseLogos/verselogo-6.png" alt="Icon" width="auto" height="25px" />
    </summary>
  
  ## App Links

### Routes App

_Parent Files_
[RouteApp](./Components/Locations/Routes/RouteApp.tsx)
[RouteUtility](./Components/Locations/Routes/RouteUtilities.ts)

_Table Components_
[MoveObjective](./Components/Locations/Routes/DestinationQue/TableContent/MoveObjective.tsx)
[TableRow](./Components/Locations/Routes/DestinationQue/TableContent/TableRow.tsx)
[DestinationTask](./Components/Locations/Routes/DestinationQue/TableContent/DestinationTask.tsx)

_Tables_
[CustomTable](./Components/Locations/Routes/DestinationQue/CustomTable.tsx)
[DistanceTable](./Components/Locations/Routes/DestinationQue/DistanceTable.tsx)
[ScratchDistanceTable](./Components/Locations/Routes/DestinationQue/temp.tsx)

_Table Container_
[DestinationQue](./Components/Locations/Routes/DestinationQue/DestinationQue.tsx)

_Add Mission Popup_
[AddMission](./Popups/Mission/AddMission.tsx)
[QuickSCU](./Common/Components/App/SCUQuickSelect.tsx)

  </description>
  <br>

  <details id="Link-General-Section">
    <summary class="subHeaderStyle">
      General
      <img class="iconStyle" src="assets/Workspace/Settings.png" alt="Link Icon" width="25px" /> 
    </summary>

## General

`Jira Board`

[jira-board]: https://mandacorp-network.atlassian.net/jira/software/projects/VER/boards/1
[jira-board]: https://mandacorp-network.atlassian.net/jira/software/projects/VER/boards/1

`Confluence Home`

[confluence-home]: https://verseledger.atlassian.net/wiki/home
[confluence-home]: https://verseledger.atlassian.net/wiki/home

`GitHub Main`

[github-main]: https://github.com/MandaCorpNetwork/verseledger
[github-main]: https://github.com/MandaCorpNetwork/verseledger

</details>
</details>

<br>

---

<br>

<details id="Archive-Section">
  <summary class="headerStyle">
    Archive
    <img class="iconStyle" src="assets/Workspace/Folder.png" alt="Link Icon" width="35px" /> 
  </summary>

# Archive

<details id="Archive-Branches-Section">
  <summary class="subHeaderStyle">
    Branches
    <img class="iconStyle" src="assets/Workspace/InDev.png" alt="Link Icon" width="25px" /> 
  </summary>

## Branches

</details>
<br>

<details id="Archive-Notes-Section">
  <summary class="subHeaderStyle">
    Notes
    <img class="iconStyle" src="assets/Workspace/Notes.png" alt="Link Icon" width="25px" /> 
  </summary>

## Notes

### Typescript

#### Types

SetState Actions<br>
`React.Dispatch<React.SetStateAction<Type>>`

#### Tanstack

##### Forms

Validation Adapters

```ts
import { zodValidator } from '@tanstack/zod-form-adapter'
  import { z } from 'zod'
// ...
<form.Field
  name="firstName"
  validatorAdapter={zodValidator()}
  validators={{
    onChange: z.string().min(3, 'First name must be at least 3 characters'),
    onChangeAsyncDebounceMs: 500,
    onChangeAsync: z.string().refine(
      async (value) => {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        return !value.includes('error')
      },
      {
        message: "No 'error' allowed in first name",
      },
    ),
  }}
/>
```

</details>
<br>

<details id="Archive-Config-Section">
  <summary class="subHeaderStyle">
    Config
    <img class="iconStyle" src="assets/Workspace/Settings.png" alt="Link Icon" width="25px" /> 
  </summary>

`Styles`

```html
<style>
  .headerStyle {
    font-size: 1.5em;
    font-weight: bold;
    color: lightblue;
    display: flex;
    justify-items: center;
    margin-bottom: 10px;
  }
  .subHeaderStyle {
    color: orange;
    display: flex;
    justify-items: center;
    font-weight: bold;
  }
  .iconStyle {
    margin-left: 10px;
  }
  .iconGroupDisplay {
    display: flex;
    justify-content: center;
    gap: 50px;
  }
  .iconDisplay {
    display: flex;
    flex-direction: column;
    gap: 5px;
    align-items: center;
  }
</style>
```

`Templates`

```md
## Section

  <description id="-Section">
    <summary class="subHeaderStyle || headerStyle">
      Section
      <img class="iconStyle" src="assets/Workspace/" alt="Icon" width="25px || 45px" />
    </summary>
  </description>

## Image

  <img class="iconStyle" src="assets/Workspace/" alt="Icon" width="25px || 45px" />

## Branch

### Branch

#### Links

[JiraIssue][link]<br>
[PullRequest][link]

#### Notes

_paste notes_
```

<style> 
    .headerStyle {
      font-size: 1.5em; 
      font-weight: bold; 
      color: lightblue;
      display: flex;
      justify-items: center;
      margin-bottom: 10px;
      cursor: pointer;
    }
    .subHeaderStyle {
      color: orange;
      display: flex;
      justify-items: center;
      font-weight: bold;
      cursor: pointer;
    }
    .iconStyle {
      margin-left: 10px;
    }
    .iconGroupDisplay {
      display: flex;
      justify-content: center;
      gap: 50px;
    }
    .iconDisplay {
      display: flex;
      flex-direction: column;
      gap: 5px;
      align-items: center;
    }
  </style>
</details>
<br>

</details>

<br>

---
