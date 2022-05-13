import {
	Component,
	Element,
	Event,
	EventEmitter,
	h,
	JSX,
	Prop,
} from '@stencil/core'

import { NotificationType } from '../../types'
import { getIcon } from '../../utils'

@Component({
	tag: 'notify-toast',
	styleUrl: 'notify-toast.scss',
	/* styleUrls: [
		'../../css/global.scss',
		'../../css/custom.scss',
		'notify-toast.scss',
	], */
	shadow: true,
})
export class MyComponent {
	@Element() element: HTMLElement

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

	@Event()
	toastDismissed: EventEmitter<HTMLElement>

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

	private getTitle(): JSX.Element | undefined {
		if (this.headline)
			return (
				<h4 data-testid="toast-title">{this.headline}</h4>
			) as JSX.Element
		return undefined
	}

	private getIcon(): JSX.Element {
		return (
			<span class="icon" data-testid="toast-icon">
				{getIcon(this.type)}
			</span>
		) as JSX.Element
	}

	private getButton(): JSX.Element | undefined {
		if (!this.autoHide)
			return (
				<span
					class="dismiss"
					data-testid="toast-dismiss-button"
					onClick={() => {
						this.dismiss()
					}}
				>
					&#x2715;
				</span>
			) as JSX.Element
		return undefined
	}

	private detachRootElement() {
		this.element.style.pointerEvents = 'none'
		this.element.style.position = 'absolute'
		this.element.style.height = '0px'
	}

	private reattachRootElement() {
		this.element.style.pointerEvents = ''
		this.element.style.position = ''
		this.element.style.height = ''
	}

	public dismiss() {
		this.isHidden = true
		this.shadowRoot.addEventListener('transitionend', () => {
			this.toastDismissed.emit()
			this.element.remove()
		})
	}

	componentDidLoad() {
		if (this.autoHide)
			this.autoHideTimeout = setTimeout(() => {
				this.dismiss()
			}, this.autoHideAfterMs)
		if (this.isHidden) {
			this.detachRootElement()
		}
	}

	componentDidUpdate() {
		this.reattachRootElement()
	}

	disconnectedCallback() {
		if (this.autoHideTimeout) clearTimeout(this.autoHideTimeout)
	}

	render() {
		return (
			<aside
				class={this.getClassName()}
				ref={element => (this.shadowRoot = element as HTMLElement)}
			>
				{this.getTitle()}
				{this.getIcon()}
				<div>
					<slot />
				</div>
				{this.getButton()}
			</aside>
		) as JSX.Element
	}
}
