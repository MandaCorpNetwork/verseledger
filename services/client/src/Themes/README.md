# Themes

Verse Ledger UI is fully customizable through the Theme System.
We use a dynamic structure for creating Page & Component layouts and styles.
Developers in with access to the codebase would be able to create new themes and even extend existing ones with ease, and this document helps to break down the structure of the system, what can be done, and what you need to cover in order to create your own theme.

## Setup

### Folder Structure
In order to get started with a new theme, you first need to setup your Theme's Folder.
Inside `src/Themes/`, create a folder with the name of your theme.

In this folder you will need to create your constructor 