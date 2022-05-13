# notify-toast



<!-- Auto Generated Below -->


## Properties

| Property          | Attribute            | Description                                   | Type                                                                                                      | Default                    |
| ----------------- | -------------------- | --------------------------------------------- | --------------------------------------------------------------------------------------------------------- | -------------------------- |
| `autoHide`        | `auto-hide`          | default: false                                | `boolean`                                                                                                 | `false`                    |
| `autoHideAfterMs` | `auto-hide-after-ms` | default: 3000                                 | `number`                                                                                                  | `3000`                     |
| `headline`        | `headline`           | The last name                                 | `string`                                                                                                  | `undefined`                |
| `isHidden`        | `is-hidden`          | default: false                                | `boolean`                                                                                                 | `false`                    |
| `type`            | `type`               | success (default) \| info \| warning \| error | `NotificationType.ERROR \| NotificationType.INFO \| NotificationType.SUCCESS \| NotificationType.WARNING` | `NotificationType.SUCCESS` |


## Events

| Event            | Description | Type                       |
| ---------------- | ----------- | -------------------------- |
| `toastDismissed` |             | `CustomEvent<HTMLElement>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
