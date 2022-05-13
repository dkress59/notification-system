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
	 * default: false
	 */
	@Prop() autoHide: boolean
	/**
	 * default: 3000
	 */
	@Prop() autoHideAfterMs = 3000
	/**
	 * The last name
	 */
	@Prop() headline: string
	/**
	 * default: false
	 */
	@Prop({ mutable: true, reflect: true }) isHidden: boolean
	/**
	 * success (default) | info | warning | error
	 */
	@Prop() type: NotificationType

	@Event()
	toastDismissed: EventEmitter<HTMLElement>

	private rootElement: HTMLElement
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

	public dismiss() {
		this.isHidden = true
		this.rootElement.addEventListener('transitionend', () => {
			/* this.element.style.pointerEvents = 'none'
			this.element.style.position = 'absolute'
			this.element.style.height = '0px' */
			this.toastDismissed.emit()
			this.element.remove()
		})
	}

	componentDidLoad() {
		if (this.autoHide)
			this.autoHideTimeout = setTimeout(() => {
				this.dismiss()
			}, this.autoHideAfterMs)
	}

	disconnectedCallback() {
		if (this.autoHideTimeout) clearTimeout(this.autoHideTimeout)
	}

	render() {
		return (
			<aside
				class={this.getClassName()}
				ref={element => (this.rootElement = element as HTMLElement)}
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
