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
	tag: 'notify-banner',
	styleUrl: 'notify-banner.scss',
	shadow: true,
})
export class NotifyBanner {
	@Element() lightRoot: HTMLNotifyBannerElement

	/**
	 * Whether to automatically hide the banner, or not.
	 * If false (or undefined), a dismiss-button will be rendered.
	 */
	@Prop() autoHide = false
	/**
	 * The time in milliseconds after which the banner shall be hidden
	 * (requires the auto-hide attribute to be set to "true").
	 */
	@Prop() autoHideAfterMs = 3000
	/**
	 * If provided, the banner will be rendered with a headline
	 * which is styled slightly more prominent than the body text.
	 */
	@Prop() headline: string
	/**
	 * The notification-type of the banner
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
	@Event() bannerDismissed: EventEmitter<HTMLElement>

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

	/** Entirely dismisses the banner entirely from the DOM */
	@Method()
	async dismiss(): Promise<void> {
		this.isHiding = true
		this.root.addEventListener('transitionend', () => {
			this.bannerDismissed.emit()
			this.root.remove()
		})
		return Promise.resolve()
	}

	componentDidLoad(): void {
		if (this.autoHide)
			this.autoHideTimeout = setTimeout(() => {
				void this.dismiss()
			}, this.autoHideAfterMs)
		setTimeout(() => {
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
