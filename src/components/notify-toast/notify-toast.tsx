import {
	Component,
	Element,
	Event,
	EventEmitter,
	h,
	JSX,
	Method,
	Prop,
} from '@stencil/core'

import { NotificationType } from '../../types'
import {
	detachElement,
	getButton,
	getHeadline,
	getIcon,
	reattachElement,
} from '../../utils'

@Component({
	tag: 'notify-toast',
	styleUrl: 'notify-toast.scss',
	shadow: true,
})
export class NotifyToast {
	@Element() element: HTMLNotifyToastElement

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
	 * Whether the toast is initially hidden, or not.
	 */
	@Prop({ mutable: true, reflect: true }) isHidden = false
	/**
	 * The notification-type of the toast
	 * (success | info | warning | error).
	 */
	@Prop() type: NotificationType = NotificationType.SUCCESS

	/**
	 * Fires after the elements has transitioned out.
	 */
	@Event() toastDismissed: EventEmitter<HTMLElement>

	private shadowRoot: HTMLElement
	private hiddenClassName = 'opacity-0'
	private visibleClassName = 'opacity-100'
	private autoHideTimeout: NodeJS.Timeout | null = null

	private getClassName(): string {
		const classNames: string[] = []
		classNames.push(this.type)
		if (this.headline) classNames.push('headline')
		if (this.isHidden) classNames.push(this.hiddenClassName)
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

	private detachRootElement() {
		detachElement(this.element)
	}

	private reattachRootElement() {
		reattachElement(this.element)
	}

	/** Dismisses the toast entirely from the DOM */
	@Method()
	async dismiss(): Promise<void> {
		this.isHidden = true
		this.shadowRoot.addEventListener('transitionend', () => {
			this.toastDismissed.emit(this.shadowRoot)
			this.element.remove()
		})
		return Promise.resolve()
	}

	componentDidLoad(): void {
		if (this.autoHide)
			this.autoHideTimeout = setTimeout(() => {
				void this.dismiss()
			}, this.autoHideAfterMs)
		if (this.isHidden) this.detachRootElement()
	}

	componentDidUpdate(): void {
		this.reattachRootElement()
	}

	disconnectedCallback(): void {
		if (this.autoHideTimeout) clearTimeout(this.autoHideTimeout)
	}

	render(): JSX.Element {
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
}
