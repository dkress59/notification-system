import { ForwardedRef, MutableRefObject } from 'react'

export function getCurrentRef<T extends HTMLElement>({
	internalRef,
	ref,
}: {
	internalRef: MutableRefObject<null | T>
	ref: ForwardedRef<T>
}): T | null {
	if (ref) return (ref as MutableRefObject<null | T>).current
	return internalRef.current
}
