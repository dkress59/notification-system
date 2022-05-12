import { h, JSX } from '@stencil/core'

import { NotificationType } from './types'

export function format(first?: string, middle?: string, last?: string): string {
	return (
		// eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
		(first || '') + (middle ? ` ${middle}` : '') + (last ? ` ${last}` : '')
	)
}

export function getIcon(type: NotificationType): JSX.Element {
	if (type === NotificationType.INFO) return 'i'
	if (type === NotificationType.ERROR)
		return (
			<span class="text-xl inline-block -mt-1 transform-gpu -rotate-12">
				&#9586;
			</span>
		) as JSX.Element
	if (type === NotificationType.WARNING) return '!'
	return (<span>&#10003;</span>) as JSX.Element
}
