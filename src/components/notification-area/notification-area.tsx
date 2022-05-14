import { Component, h, Host, JSX, Method, State } from '@stencil/core'

import { NotificationType } from '../../types'

@Component({
	tag: 'notification-area',
	styleUrl: 'notification-area.scss',
	shadow: true,
})
export class NotificationArea {
	@State() toasts: string[] = []
	@State() modal: string

	/**
	 * Takes the `<toast-notification />`-component's props in camelCase as an argument
	 */
	@Method()
	async spawnToast({
		autoHide,
		autoHideAfterMs,
		content,
		headline,
		type,
	}: {
		autoHide?: boolean
		autoHideAfterMs?: number
		content: string
		headline?: string
		type?: NotificationType
	}): Promise<void> {
		const attributes: string[] = []
		if (autoHide) attributes.push(`auto-hide="${autoHide}"`)
		if (autoHideAfterMs)
			attributes.push(`auto-hide-after-ms="${autoHideAfterMs}"`)
		if (headline) attributes.push(`headline="${headline}"`)
		if (type) attributes.push(`type="${type}"`)
		const newToast = `<toast-notification ${attributes.join(
			' ',
		)}>${content}</toast-notification>`
		this.toasts = [newToast, ...this.toasts]
		return Promise.resolve()
	}

	/**
	 * Takes the `<modal-notification />`-component's props in camelCase as an argument
	 */
	@Method()
	async spawnModal({
		condition,
		content,
		headline,
		showConfirm,
		showDecline,
		labelConfirm,
		labelDecline,
		type,
	}: {
		condition?: boolean
		content: string
		headline?: string
		showConfirm?: boolean
		showDecline?: boolean
		labelConfirm?: string
		labelDecline?: string
		type?: NotificationType
	}): Promise<void> {
		const attributes: string[] = []
		if (condition) attributes.push(`condition="${condition}"`)
		if (headline) attributes.push(`headline="${headline}"`)
		if (showConfirm) attributes.push(`show-confirm="${showConfirm}"`)
		if (showDecline) attributes.push(`show-decline="${showDecline}"`)
		if (labelConfirm) attributes.push(`label-confirm="${labelConfirm}"`)
		if (labelDecline) attributes.push(`label-decline="${labelDecline}"`)
		if (type) attributes.push(`type="${type}"`)
		const newModal = `<modal-notification ${attributes.join(
			' ',
		)}>${content}</modal-notification>`
		this.modal = newModal
		return Promise.resolve()
	}

	private getToasts(): JSX.Element {
		return (<span innerHTML={this.toasts.join('\n')} />) as JSX.Element
	}

	private getModal(): JSX.Element {
		return (<span innerHTML={this.modal} />) as JSX.Element
	}

	render(): JSX.Element {
		return (
			<Host>
				<slot />
				{this.getToasts()}
				{this.getModal()}
			</Host>
		) as JSX.Element
	}
}
