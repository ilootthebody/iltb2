---
title: "Magic Item Generator Options"
author: njm
date: 2022-12-20 20:05:00 -0500
categories: [Website, Generators]
tags: [Generators]
---

The [magic item generator](/generators/magic-item-generator.html) has changed a lot since its first iteration and will continue to change as I get feedback, learn new skills, and have new ideas. Some of these changes have resulted in the addition of new options and modifiers you can select to alter the items it generates or change the way they are presented. The sections below describe these additional options so you can make best use of them.

If you have suggestions for ways to improve the generators or specific feature requests then please let me know! I love getting feedback and I want to make this tool something that people will actually use. The option to add curses was actually a suggestion from a comment on Reddit so I do actually take your feedback to heart!

## Show Price

The 'Show Price' option allows you toggle on/off the suggested price of each item. When selected, the generator will display the suggested price as part of the item details (the italicized line just under the item name).

The price is calculated by taking the base price of the item and adding a number based on the [power level](/posts/magic-item-generator-power-levels/) of each effect on that item: mundane = 25gp, low = 100gp, medium = 250gp, and high = 500gp (curses are worth 0gp). For example, let's say the generator spits out a shortsword with two effects: 1 medium and 1 high. The price for that item would be the sum of the shortsword's base value, the medium effect value, and the high effect value for a total of 760gp (10 + 250 + 500 = 760).

## Show Suggested Level

The 'Show Suggested Level' option allows you to toggle on/off the suggested level for each item. When selected, the generator will display the suggested level as part of the item details (the italicized line just under the item name).

The suggested level provides a guideline for the minimum level your players should be to receive that particular item. This can also be used as a rough indication of how powerful each item is. For example, an item with a suggested level of 13 is significantly more powerful than an item with a suggested level of 4. This is by no means meant to be a strict requirement. The goal of the suggested level system is to provide a more clear indication of an item's power, taking into account the combination of multiple effects of different power levels on a single item.

The suggested level is calculated based on the number of effects on the item and the power level of each effect. Each effect power level is given a numeric weight: mundane = 1, low = 2, medium = 3, and high = 4 (curses have a weight of 0). The suggested level is simply equal to the sum of the weights of all of the effects on a particular item. For example, an item with 1 high effect, 2 medium effects, and 1 mundane effect would have a suggested level of 11 (4 + 3 + 3 + 1 = 11).

## Condense Item Description

When generating an item with multiple effects, the generator's default behavior is to list each effect on a separate line. Enabling the 'Condense Item Description' option causes the generator to list each effect one after the other as a single paragraph. If you also have the 'Add Curse' option enabled, the additional curse is still printed on a separate line below the rest of the effects.

## Add Curse

The 'Add Curse' option allows you to add an additional curse effect to a magic item. When selected, the generator will display each item's normal magical effects along with an additional curse effect just below it.

Note: Selecting the 'Add Curse' option will deselect the 'Curse' power level option. I felt that it would be silly to have a an already cursed item with an additional curse.
