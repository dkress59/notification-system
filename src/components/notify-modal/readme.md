# notify-modal



<!-- Auto Generated Below -->


## Properties

| Property       | Attribute       | Description                                                                                                         | Type                                                                                                      | Default                    |
| -------------- | --------------- | ------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- | -------------------------- |
| `condition`    | `condition`     | If set to 'false' the 'Confirm'-button will be disabled.                                                            | `boolean \| undefined`                                                                                    | `undefined`                |
| `headline`     | `headline`      | If provided, the modal will be rendered with a headline which is styled slightly more prominent than the body text. | `string`                                                                                                  | `undefined`                |
| `labelConfirm` | `label-confirm` | Label for the 'Confirm'-button                                                                                      | `string`                                                                                                  | `'Confirm'`                |
| `labelDecline` | `label-decline` | Label for the 'Decline'-button                                                                                      | `string`                                                                                                  | `'Decline'`                |
| `showConfirm`  | `show-confirm`  | Whether to show the 'Confirm'-button.                                                                               | `boolean`                                                                                                 | `false`                    |
| `showDecline`  | `show-decline`  | Whether to show the 'Decline'-button.                                                                               | `boolean`                                                                                                 | `false`                    |
| `type`         | `type`          | The notification-type of the modal (success \| info \| warning \| error).                                           | `NotificationType.ERROR \| NotificationType.INFO \| NotificationType.SUCCESS \| NotificationType.WARNING` | `NotificationType.SUCCESS` |


## Events

| Event              | Description                                    | Type                       |
| ------------------ | ---------------------------------------------- | -------------------------- |
| `confirmTriggered` | Fires when the 'Confirm'-button is pressed.    | `CustomEvent<HTMLElement>` |
| `declineTriggered` | Fires when the 'Decline'-button is pressed.    | `CustomEvent<HTMLElement>` |
| `modalDismissed`   | Fires after the elements has transitioned out. | `CustomEvent<HTMLElement>` |


## Methods

### `dismiss() => Promise<void>`

Entirely dismisses the modal from the DOM

#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
