/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { NotificationType } from "./types";
export namespace Components {
    interface MyComponent {
        /**
          * The first name
         */
        "first": string;
        /**
          * The last name
         */
        "last": string;
        /**
          * The middle name
         */
        "middle": string;
    }
    interface NotifyBanner {
        /**
          * Whether to automatically hide the banner, or not. If false (or undefined), a dismiss-button will be rendered.
         */
        "autoHide": boolean;
        /**
          * The time in milliseconds after which the banner shall be hidden (requires the auto-hide attribute to be set to "true").
         */
        "autoHideAfterMs": number;
        /**
          * Entirely dismisses the banner entirely from the DOM
         */
        "dismiss": () => Promise<void>;
        /**
          * If provided, the banner will be rendered with a headline which is styled slightly more prominent than the body text.
         */
        "headline": string;
        /**
          * The notification-type of the banner (success | info | warning | error).
         */
        "type": NotificationType;
    }
    interface NotifyModal {
        /**
          * If set to 'false' the 'Confirm'-button will be disabled.
         */
        "condition": boolean | undefined;
        /**
          * Entirely dismisses the modal from the DOM
         */
        "dismiss": () => Promise<void>;
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
    interface NotifyToast {
        /**
          * Whether to automatically hide the toast, or not. If false (or undefined), a dismiss-button will be rendered.
         */
        "autoHide": boolean;
        /**
          * The time in milliseconds after which the toast shall be hidden (requires the auto-hide attribute to be set to "true").
         */
        "autoHideAfterMs": number;
        /**
          * Entirely dismisses the toast entirely from the DOM
         */
        "dismiss": () => Promise<void>;
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
declare global {
    interface HTMLMyComponentElement extends Components.MyComponent, HTMLStencilElement {
    }
    var HTMLMyComponentElement: {
        prototype: HTMLMyComponentElement;
        new (): HTMLMyComponentElement;
    };
    interface HTMLNotifyBannerElement extends Components.NotifyBanner, HTMLStencilElement {
    }
    var HTMLNotifyBannerElement: {
        prototype: HTMLNotifyBannerElement;
        new (): HTMLNotifyBannerElement;
    };
    interface HTMLNotifyModalElement extends Components.NotifyModal, HTMLStencilElement {
    }
    var HTMLNotifyModalElement: {
        prototype: HTMLNotifyModalElement;
        new (): HTMLNotifyModalElement;
    };
    interface HTMLNotifyToastElement extends Components.NotifyToast, HTMLStencilElement {
    }
    var HTMLNotifyToastElement: {
        prototype: HTMLNotifyToastElement;
        new (): HTMLNotifyToastElement;
    };
    interface HTMLElementTagNameMap {
        "my-component": HTMLMyComponentElement;
        "notify-banner": HTMLNotifyBannerElement;
        "notify-modal": HTMLNotifyModalElement;
        "notify-toast": HTMLNotifyToastElement;
    }
}
declare namespace LocalJSX {
    interface MyComponent {
        /**
          * The first name
         */
        "first"?: string;
        /**
          * The last name
         */
        "last"?: string;
        /**
          * The middle name
         */
        "middle"?: string;
    }
    interface NotifyBanner {
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
    interface NotifyModal {
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
    interface NotifyToast {
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
        "my-component": MyComponent;
        "notify-banner": NotifyBanner;
        "notify-modal": NotifyModal;
        "notify-toast": NotifyToast;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "my-component": LocalJSX.MyComponent & JSXBase.HTMLAttributes<HTMLMyComponentElement>;
            "notify-banner": LocalJSX.NotifyBanner & JSXBase.HTMLAttributes<HTMLNotifyBannerElement>;
            "notify-modal": LocalJSX.NotifyModal & JSXBase.HTMLAttributes<HTMLNotifyModalElement>;
            "notify-toast": LocalJSX.NotifyToast & JSXBase.HTMLAttributes<HTMLNotifyToastElement>;
        }
    }
}
