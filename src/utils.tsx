import jsx from 'texsaur'

import { NotificationType } from './types'

export function getIconElement(type: NotificationType): JSX.Element {
	let icon: string | JSX.Element = <span>&#10003;</span>
	if (type === NotificationType.INFO) icon = 'i'
	if (type === NotificationType.ERROR)
		icon = <span class="error">&#9586;</span>
	if (type === NotificationType.WARNING) icon = '!'
	return <span class="icon">{icon}</span>
}

export function getHeadlineElement(headline?: string): JSX.Element | undefined {
	if (headline) return <h4>{headline}</h4>
	return undefined
}

export function getButtonElement(
	onDismiss: (event: MouseEvent | KeyboardEvent) => void,
): JSX.Element {
	return (
		<span
			class="dismiss"
			tabindex="0"
			aria-role="button"
			onmousedown={onDismiss}
			onkeydown={event =>
				event.key.toLowerCase() === 'enter' ? onDismiss(event) : null
			}
		>
			&#x2715;
		</span>
	)
}

export function getStyleElement(css: string): HTMLStyleElement {
	const styleTag = document.createElement('style')
	styleTag.innerHTML = css
	return styleTag
}
