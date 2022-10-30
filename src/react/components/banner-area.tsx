import React from 'react'

import { BannerAreaProps } from '../types'

export function BannerArea({ children, forwardRef }: BannerAreaProps) {
	return <banner-area ref={forwardRef}>{children}</banner-area>
}
