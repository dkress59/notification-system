export function format(first?: string, middle?: string, last?: string): string {
	return (
		// eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
		(first || '') + (middle ? ` ${middle}` : '') + (last ? ` ${last}` : '')
	)
}
