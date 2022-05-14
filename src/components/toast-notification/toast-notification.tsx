import {
	Component,
	Element,
	Event,
	EventEmitter,
	h,
	Host,
	JSX,
	Method,
	Prop,
	State,
} from '@stencil/core'

import { NotificationType } from '../../types'
import { getButton, getHeadline, getIcon } from '../../utils'

@Component({
	tag: 'toast-notification',
	styleUrl: 'toast-notification.scss',
	shadow: true,
})
export class ToastNotification {
	@Element() lightRoot: HTMLToastNotificationElement

	/**
	 * Whether to automatically hide the toast, or not.
	 * If false (or undefined), a dismiss-button will be rendered.
	 */
	@Prop() autoHide = false
	/**
	 * The time in milliseconds after which the toast shall be hidden
	 * (requires the auto-hide attribute to be set to "true").
	 */
	@Prop() autoHideAfterMs = 3000
	/**
	 * If provided, the toast will be rendered with a headline
	 * which is styled slightly more prominent than the body text.
	 */
	@Prop() headline: string
	/**
	 * The notification-type of the toast
	 * (success | info | warning | error).
	 */
	@Prop() type: NotificationType = NotificationType.SUCCESS

	/**
	 * Used for transitioning in and out.
	 */
	@State() isHiding = true

	/**
	 * Fires after the elements has transitioned out.
	 */
	@Event() toastDismissed: EventEmitter<HTMLElement>

	private root: HTMLElement
	private hiddenClassName = 'hidden'
	private autoHideTimeout: NodeJS.Timeout | null = null

	private getClassName(): string {
		const classNames = Array.from(this.lightRoot.classList).filter(
			className => className !== this.hiddenClassName,
		)
		if (this.isHiding) classNames.push(this.hiddenClassName)
		return classNames.join(' ')
	}

	private getHeadline(): JSX.Element | undefined {
		return getHeadline(this.headline)
	}

	private getIcon(): JSX.Element {
		return getIcon(this.type)
	}

	private getButton(): JSX.Element | undefined {
		if (!this.autoHide) return getButton(() => void this.dismiss())
		return undefined
	}

	/** Entirely dismisses the toast entirely from the DOM */
	@Method()
	async dismiss(): Promise<void> {
		this.isHiding = true
		this.root.addEventListener('transitionend', () => {
			this.toastDismissed.emit()
			this.root.remove()
		})
		return Promise.resolve()
	}

	componentDidLoad(): void {
		if (this.autoHide)
			this.autoHideTimeout = setTimeout(() => {
				void this.dismiss()
			}, this.autoHideAfterMs)
		this.root.style.transition = 'none'
		setTimeout(() => {
			this.root.style.transition = ''
			this.isHiding = false
		}, 1)
	}

	disconnectedCallback(): void {
		if (this.autoHideTimeout) clearTimeout(this.autoHideTimeout)
	}

	render(): JSX.Element {
		return (
			<Host
				class={this.getClassName()}
				ref={ref => (this.root = ref as HTMLElement)}
			>
				{this.getHeadline()}
				{this.getIcon()}
				<section>
					<slot />
				</section>
				{this.getButton()}
			</Host>
		) as JSX.Element
	}
}
