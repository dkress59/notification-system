import {
	Component,
	Element,
	Event,
	EventEmitter,
	h,
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
	@Element() element: HTMLNotifyBannerElement

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

	private shadowRoot: HTMLElement
	private hiddenClassName = 'opacity-0'
	private visibleClassName = 'opacity-100'
	private autoHideTimeout: NodeJS.Timeout | null = null

	private getClassName(): string {
		const classNames: string[] = []
		classNames.push(this.type)
		if (this.headline) classNames.push('headline')
		if (this.isHiding) classNames.push(this.hiddenClassName)
		else classNames.push(this.visibleClassName)
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

	private getBanner(): JSX.Element {
		return (
			<aside
				class={this.getClassName()}
				ref={element => (this.shadowRoot = element as HTMLElement)}
			>
				{this.getHeadline()}
				{this.getIcon()}
				<div>
					<slot />
				</div>
				{this.getButton()}
			</aside>
		) as JSX.Element
	}

	/** Entirely dismisses the banner entirely from the DOM */
	@Method()
	async dismiss(): Promise<void> {
		this.isHiding = true
		this.shadowRoot.addEventListener('transitionend', () => {
			this.bannerDismissed.emit(this.shadowRoot)
			this.element.remove()
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
		return this.getBanner()
	}
}
