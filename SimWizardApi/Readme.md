# Sim Wizard Api

## Overview

This is a backend ASP.Net Core restful web service for Angular-sim-wizard. It has `Swagger` configured and added to it in order for it to be browsed and easily tested.

## Development with `SimWizardApi`

The following steps describe how you can configure the prerequisites, install and run the Web Api.

### Installing the Prerequisites

- Visual Studio Code
Visual Studio Code can be downloaded from https://code.visualstudio.com/download

- .NET Core SDK 2.2 or later
You can download and install .NET Core SDK 2.2 from https://dotnet.microsoft.com/download/dotnet-core/2.2

- C# for Visual Studio Code
You can install the latest version of C# for Visual Studio Code from https://marketplace.visualstudio.com/items?itemName=ms-vscode.csharp

- It is assumed you already have SQL Server 2014 or later configured and running

### Running the Web Api

- Open the `SimWizardApi` folder with Visual Studio Code, when a dialog box asks if you want to add required assets to the project, select Yes.

- When there is another dialog box that tells you there are unresolved dependencies from 'SimWizardApi.csproj', select Restore and wait for it to complete the restore process. You may need to restart Visual Studio Code afterwards.

- Press Ctrl+F5 to run the app. In a browser, go to following URL: https://localhost:[port]/swagger. The Swagger UI should display the version's information. The port number could be either 5000 or 5001 as specified in launchSettings.json and can be changed to any port number.



