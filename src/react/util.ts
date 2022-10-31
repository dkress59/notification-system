import { MutableRefObject } from 'react'

export function getCurrentRef<T extends HTMLElement>({
	internalRef,
	ref,
}: {
	internalRef: MutableRefObject<null | T>
	ref?: MutableRefObject<null | T>
}): T | null {
	if (ref) return ref.current
	return internalRef.current
}
