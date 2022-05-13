import { h, JSX } from '@stencil/core'

import { NotificationType } from './types'

export function format(first?: string, middle?: string, last?: string): string {
	return (
		// eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
		(first || '') + (middle ? ` ${middle}` : '') + (last ? ` ${last}` : '')
	)
}

export function getIcon(type: NotificationType): JSX.Element {
	let icon = (<span>&#10003;</span>) as JSX.Element
	if (type === NotificationType.INFO) icon = 'i'
	if (type === NotificationType.ERROR)
		icon = (<span class="error">&#9586;</span>) as JSX.Element
	if (type === NotificationType.WARNING) icon = '!'
	return (
		<span class="icon" data-testid="notify-icon">
			{icon}
		</span>
	) as JSX.Element
}

export function getHeadline(headline?: string): JSX.Element | undefined {
	if (headline)
		return (<h4 data-testid="headline">{headline}</h4>) as JSX.Element
	return undefined
}

export function getButton(
	onDismiss: (event: MouseEvent) => any,
): JSX.Element | undefined {
	return (
		<span class="dismiss" data-testid="dismiss-button" onClick={onDismiss}>
			&#x2715;
		</span>
	) as JSX.Element
}

export function detachElement(element: HTMLElement): void {
	element.style.pointerEvents = 'none'
	element.style.position = 'absolute'
	element.style.height = '0px'
}

export function reattachElement(element: HTMLElement): void {
	element.style.pointerEvents = ''
	element.style.position = ''
	element.style.height = ''
}
