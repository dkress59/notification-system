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
	tag: 'notify-modal',
	styleUrl: 'notify-modal.scss',
	shadow: true,
})
export class MyComponent {
	@Element() element: HTMLNotifyModalElement

	/**
	 * If provided, the modal will be rendered with a headline
	 * which is styled slightly more prominent than the body text.
	 */
	@Prop() headline: string
	/**
	 * Whether the modal is initially hidden, or not.
	 */
	@Prop({ mutable: true, reflect: true }) isHidden = false
	/**
	 * The notification-type of the modal
	 * (success | info | warning | error).
	 */
	@Prop() type: NotificationType = NotificationType.SUCCESS
	/**
	 * Whether to show the 'Confirm'-button.
	 */
	@Prop() showConfirm = false
	/**
	 * Whether to show the 'Decline'-button.
	 */
	@Prop() showDecline = false
	/**
	 * Label for the 'Confirm'-button
	 */
	@Prop() labelConfirm = 'Confirm'
	/**
	 * Label for the 'Decline'-button
	 */
	@Prop() labelDecline = 'Decline'
	/**
	 * If set to 'false' the 'Confirm'-button will be disabled.
	 */
	// eslint-disable-next-line @stencil/strict-mutable
	@Prop({ mutable: true, reflect: true }) condition: boolean | undefined =
		undefined

	/**
	 * Fires after the elements has transitioned out.
	 */
	@Event() modalDismissed: EventEmitter<HTMLElement>
	/**
	 * Fires when the 'Confirm'-button is pressed.
	 */
	@Event() confirmTriggered: EventEmitter<HTMLElement>
	/**
	 * Fires when the 'Decline'-button is pressed.
	 */
	@Event() declineTriggered: EventEmitter<HTMLElement>

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
		return getButton(() => void this.dismiss())
	}

	private detachRootElement() {
		detachElement(this.element)
	}

	private reattachRootElement() {
		reattachElement(this.element)
	}

	private confirmTriggeredFinal() {
		if (this.condition !== false)
			this.confirmTriggered.emit(this.shadowRoot)
		void this.dismiss()
	}

	private declineTriggeredFinal() {
		this.declineTriggered.emit(this.shadowRoot)
		void this.dismiss()
	}

	/** Dismisses the modal entirely from the DOM */
	@Method()
	async dismiss(): Promise<void> {
		this.isHidden = true
		this.shadowRoot.addEventListener('transitionend', () => {
			this.modalDismissed.emit(this.shadowRoot)
			this.element.remove()
		})
		return Promise.resolve()
	}

	componentDidLoad(): void {
		if (this.isHidden) {
			this.detachRootElement()
		}
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
				{(this.showConfirm || this.showDecline) && (
					<footer>
						{!!this.showConfirm && (
							<button
								class="confirm"
								disabled={this.condition === false}
								data-testid="confirm-button"
								onClick={() => this.confirmTriggeredFinal()}
							>
								{this.labelConfirm}
							</button>
						)}
						{!!this.showDecline && (
							<button
								class="decline"
								data-testid="decline-button"
								onClick={() => this.declineTriggeredFinal()}
							>
								{this.labelDecline}
							</button>
						)}
					</footer>
				)}
			</aside>
		) as JSX.Element
	}
}
