import { NotificationType } from "./types";
export namespace Components {
	interface BannerArea {
		/**
		  * Takes the `<banner-notification />`-component's props in camelCase as an argument
		 */
		"spawnBanner": ({ autoHide, autoHideAfterMs, content, headline, type, }: { autoHide?: boolean; autoHideAfterMs?: number; content: string; headline?: string; type?: NotificationType; }) => void;
	}
	interface BannerNotification {
		/**
		  * Whether to automatically hide the banner, or not. If false (or undefined), a dismiss-button will be rendered.
		 */
		"autoHide": boolean;
		/**
		  * The time in milliseconds after which the banner shall be hidden (requires the auto-hide attribute to be set to "true").
		 */
		"autoHideAfterMs": number;
		/**
		  * Entirely dismisses the banner from the DOM
		 */
		"dismiss": () => void;
		/**
		  * If provided, the banner will be rendered with a headline which is styled slightly more prominent than the body text.
		 */
		"headline": string;
		/**
		  * The notification-type of the banner (success | info | warning | error).
		 */
		"type": NotificationType;
	}
	interface ModalNotification {
		/**
		  * If set to 'false' the 'Confirm'-button will be disabled.
		 */
		"condition": boolean | undefined;
		/**
		  * Entirely dismisses the modal from the DOM
		 */
		"dismiss": () => void;
		/**
		  * If provided, the modal will be rendered with a headline which is styled slightly more prominent than the body text.
		 */
		"headline": string;
		/**
		  * Label for the 'Confirm'-button
		 */
		"labelConfirm": string;
		/**
		  * Label for the 'Decline'-button
		 */
		"labelDecline": string;
		/**
		  * Whether to show the 'Confirm'-button.
		 */
		"showConfirm": boolean;
		/**
		  * Whether to show the 'Decline'-button.
		 */
		"showDecline": boolean;
		/**
		  * The notification-type of the modal (success | info | warning | error).
		 */
		"type": NotificationType;
	}
	interface NotificationArea {
		/**
		  * Takes the `<modal-notification />`-component's props in camelCase as an argument
		 */
		"spawnModal": ({ condition, content, headline, showConfirm, showDecline, labelConfirm, labelDecline, type, }: { condition?: boolean; content: string; headline?: string; showConfirm?: boolean; showDecline?: boolean; labelConfirm?: string; labelDecline?: string; type?: NotificationType; }) => void;
		/**
		  * Takes the `<toast-notification />`-component's props in camelCase as an argument
		 */
		"spawnToast": ({ autoHide, autoHideAfterMs, content, headline, type, }: { autoHide?: boolean; autoHideAfterMs?: number; content: string; headline?: string; type?: NotificationType; }) => void;
	}
	interface ToastNotification {
		/**
		  * Whether to automatically hide the toast, or not. If false (or undefined), a dismiss-button will be rendered.
		 */
		"autoHide": boolean;
		/**
		  * The time in milliseconds after which the toast shall be hidden (requires the auto-hide attribute to be set to "true").
		 */
		"autoHideAfterMs": number;
		/**
		  * Entirely dismisses the toast from the DOM
		 */
		"dismiss": () => void;
		/**
		  * If provided, the toast will be rendered with a headline which is styled slightly more prominent than the body text.
		 */
		"headline": string;
		/**
		  * The notification-type of the toast (success | info | warning | error).
		 */
		"type": NotificationType;
	}
}
export namespace Elements {
	interface HTMLBannerAreaElement extends Components.BannerArea, HTMLElement {
	}
	var HTMLBannerAreaElement: {
		prototype: HTMLBannerAreaElement;
		new(): HTMLBannerAreaElement;
	};
	interface HTMLBannerNotificationElement extends Components.BannerNotification, HTMLElement {
	}
	var HTMLBannerNotificationElement: {
		prototype: HTMLBannerNotificationElement;
		new(): HTMLBannerNotificationElement;
	};
	interface HTMLModalNotificationElement extends Components.ModalNotification, HTMLElement {
	}
	var HTMLModalNotificationElement: {
		prototype: HTMLModalNotificationElement;
		new(): HTMLModalNotificationElement;
	};
	interface HTMLNotificationAreaElement extends Components.NotificationArea, HTMLElement {
	}
	var HTMLNotificationAreaElement: {
		prototype: HTMLNotificationAreaElement;
		new(): HTMLNotificationAreaElement;
	};
	interface HTMLToastNotificationElement extends Components.ToastNotification, HTMLElement {
	}
	var HTMLToastNotificationElement: {
		prototype: HTMLToastNotificationElement;
		new(): HTMLToastNotificationElement;
	};
	interface HTMLElementTagNameMap {
		"banner-area": HTMLBannerAreaElement;
		"banner-notification": HTMLBannerNotificationElement;
		"modal-notification": HTMLModalNotificationElement;
		"notification-area": HTMLNotificationAreaElement;
		"toast-notification": HTMLToastNotificationElement;
	}
}
declare namespace LocalJSX {
	interface BannerArea {
	}
	interface BannerNotification {
		/**
		  * Whether to automatically hide the banner, or not. If false (or undefined), a dismiss-button will be rendered.
		 */
		"autoHide"?: boolean;
		/**
		  * The time in milliseconds after which the banner shall be hidden (requires the auto-hide attribute to be set to "true").
		 */
		"autoHideAfterMs"?: number;
		/**
		  * If provided, the banner will be rendered with a headline which is styled slightly more prominent than the body text.
		 */
		"headline"?: string;
		/**
		  * Fires after the elements has transitioned out.
		 */
		"onBannerDismissed"?: (event: CustomEvent<HTMLElement>) => void;
		/**
		  * The notification-type of the banner (success | info | warning | error).
		 */
		"type"?: NotificationType;
	}
	interface ModalNotification {
		/**
		  * If set to 'false' the 'Confirm'-button will be disabled.
		 */
		"condition"?: boolean | undefined;
		/**
		  * If provided, the modal will be rendered with a headline which is styled slightly more prominent than the body text.
		 */
		"headline"?: string;
		/**
		  * Label for the 'Confirm'-button
		 */
		"labelConfirm"?: string;
		/**
		  * Label for the 'Decline'-button
		 */
		"labelDecline"?: string;
		/**
		  * Fires when the 'Confirm'-button is pressed.
		 */
		"onConfirmTriggered"?: (event: CustomEvent<HTMLElement>) => void;
		/**
		  * Fires when the 'Decline'-button is pressed.
		 */
		"onDeclineTriggered"?: (event: CustomEvent<HTMLElement>) => void;
		/**
		  * Fires after the elements has transitioned out.
		 */
		"onModalDismissed"?: (event: CustomEvent<HTMLElement>) => void;
		/**
		  * Whether to show the 'Confirm'-button.
		 */
		"showConfirm"?: boolean;
		/**
		  * Whether to show the 'Decline'-button.
		 */
		"showDecline"?: boolean;
		/**
		  * The notification-type of the modal (success | info | warning | error).
		 */
		"type"?: NotificationType;
	}
	interface NotificationArea {
	}
	interface ToastNotification {
		/**
		  * Whether to automatically hide the toast, or not. If false (or undefined), a dismiss-button will be rendered.
		 */
		"autoHide"?: boolean;
		/**
		  * The time in milliseconds after which the toast shall be hidden (requires the auto-hide attribute to be set to "true").
		 */
		"autoHideAfterMs"?: number;
		/**
		  * If provided, the toast will be rendered with a headline which is styled slightly more prominent than the body text.
		 */
		"headline"?: string;
		/**
		  * Fires after the elements has transitioned out.
		 */
		"onToastDismissed"?: (event: CustomEvent<HTMLElement>) => void;
		/**
		  * The notification-type of the toast (success | info | warning | error).
		 */
		"type"?: NotificationType;
	}
	interface IntrinsicElements {
		"banner-area": BannerArea;
		"banner-notification": BannerNotification;
		"modal-notification": ModalNotification;
		"notification-area": NotificationArea;
		"toast-notification": ToastNotification;
	}
}
