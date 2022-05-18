import { NotificationType } from './types'

function setTestId(element: HTMLElement, value: string) {
	element.setAttribute('data-testid', value)
}

export function getIconElement(type: NotificationType): HTMLSpanElement {
	const iconElement = document.createElement('span')
	iconElement.setAttribute('data-testid', 'icon-type')
	setTestId(iconElement, 'icon-type')
	iconElement.classList.add('icon')
	let icon = '&#10003;'
	if (type === NotificationType.INFO) icon = 'i'
	if (type === NotificationType.ERROR)
		icon = '<span class="error">&#9586;</span>'
	if (type === NotificationType.WARNING) icon = '!'
	iconElement.innerHTML = icon
	return iconElement
}

export function getHeadlineElement(
	headline?: string,
): HTMLHeadingElement | undefined {
	if (headline) {
		const headlineElement = document.createElement('h4')
		setTestId(headlineElement, 'headline')
		headlineElement.innerHTML = headline
		return headlineElement
	}
	return undefined
}

export function getButtonElement(
	onDismiss: (event: MouseEvent | KeyboardEvent) => void,
): HTMLSpanElement {
	const buttonElement = document.createElement('span')
	buttonElement.classList.add('dismiss')
	setTestId(buttonElement, 'btn-dismiss')
	buttonElement.setAttribute('tabindex', '0')
	buttonElement.setAttribute('aria-role', 'button')
	buttonElement.addEventListener('mousedown', onDismiss)
	buttonElement.addEventListener('keydown', event =>
		event.key.toLowerCase() === 'enter' ? onDismiss(event) : null,
	)
	buttonElement.innerHTML = '&#x2715;'
	return buttonElement
}

export function getStyleElement(css: string): HTMLStyleElement {
	const styleTag = document.createElement('style')
	styleTag.innerHTML = css
	return styleTag
}
