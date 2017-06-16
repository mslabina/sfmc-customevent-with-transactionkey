# Salesforce Marketing Cloud - Custom Event with Transaction Key

## Introduction

This is a basic example for a custom entry event that allows creating unique journey results using transaction keys as mentioned in the marketing cloud documentation under [Journey Settings](http://help.marketingcloud.com/en/documentation/journey_builder/interaction_settings/) and [Create Unique Journey Results using Transaction Keys](https://developer.salesforce.com/docs/atlas.en-us.noversion.mc-app-development.meta/mc-app-development/transaction-key.htm).

## Setup

1. Before this example can be used, a package containing a Journey Builder Trigger needs to be created in [Salesforce Marketing Cloud App Center](https://appcenter-auth.s1.marketingcloudapps.com). A documentation for this task can be found here: [Create a Marketing Cloud App](https://developer.salesforce.com/docs/atlas.en-us.noversion.mc-app-development.meta/mc-app-development/create-a-mc-app.htm).
	- __Important__: The trigger's "Public Extension"-setting needs to be set to "This application and other installed Applications" and the example needs to be available via HTTPS which has to be running on the default port 443.
2. The unique key of the created Journey Builder Trigger needs to be added to config.json properties `key` and `configurationArguments.applicationExtensionKey`
3. _Optional_: An icon for the custom event can be added to config.json under `metaData.icon` (which isn't present in the example)

## Usage

1. If the setup in App Center has been done correctly and the files are available under the specified endpoint you should be able to see "Custom Event with Transaction" under _Journey Builder > Entry Sources > New Event_
2. Complete the "Properties" step in the wizard as you would for a "Contact Data"-event
3. At the "Select DE" step you need to provide the Data Extension ID (__Important__: this is the unique id, not the external key or name! This id has the uuid format: `XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX`)
4. At the "Transaction Key" step provide the following information:
	- _COLUMN NAME_: The name of a column containing a unique identifer for a row in your source data extension (e.g. `MyRowId`).
	- _DE_NAME.COLUMN_NAME_: The name of the source data extension and the column name provided in the Colum Name input field separated by a dot (e.g. `MyDataExtension.MyRowId`).
5. Define a contact filter if desired, but make sure "Add Transaction Key to filter" in the top right corner is enabled.
6. Check the event summary and confirm.

__Important__: To make sure the transaction keys are used on evaluation of decision splits and unique results are possible, you need to select "Add Transaction Key to filter" on every split path filter expression.

## Contributors

|Major Contributors | |
|:----|----:|
|Markus Slabina |[![mslabina on Twitter](https://raw.githubusercontent.com/ExactTarget/fuelux/gh-pages/invertobird-sm.png)](https://twitter.com/mslabina) [![mslabina on Github](https://raw.githubusercontent.com/ExactTarget/fuelux/gh-pages/invertocat-sm.png)](https://github.com/mslabina) |

## License (MIT)

__Copyright © 2017 [Markus Slabina](https://github.com/mslabina)__

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
