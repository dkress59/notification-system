# toast-notification

<!-- Auto Generated Below -->

## Properties

| Property          | Attribute            | Description                                                                                                            | Type                                                                                                      | Default                    |
| ----------------- | -------------------- | ---------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- | -------------------------- |
| `autoHide`        | `auto-hide`          | Whether to automatically hide the toast, or not. If false (or undefined), a dismiss-button will be rendered.           | `boolean`                                                                                                 | `false`                    |
| `autoHideAfterMs` | `auto-hide-after-ms` | The time in milliseconds after which the toast shall be hidden (requires the auto-hide attribute to be set to "true"). | `number`                                                                                                  | `3000`                     |
| `headline`        | `headline`           | If provided, the toast will be rendered with a headline which is styled slightly more prominent than the body text.    | `string`                                                                                                  | `undefined`                |
| `type`            | `type`               | The notification-type of the toast (success \| info \| warning \| error).                                              | `NotificationType.ERROR \| NotificationType.INFO \| NotificationType.SUCCESS \| NotificationType.WARNING` | `NotificationType.SUCCESS` |

## Events

| Event            | Description                                    | Type                       |
| ---------------- | ---------------------------------------------- | -------------------------- |
| `toastDismissed` | Fires after the elements has transitioned out. | `CustomEvent<HTMLElement>` |

## Methods

### `dismiss() => Promise<void>`

Entirely dismisses the toast from the DOM

#### Returns

Type: `Promise<void>`
