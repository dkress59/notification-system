import React from 'react'

import { BannerAreaProps } from '../types'

export function BannerArea({ children, ref }: BannerAreaProps) {
	return <banner-area ref={ref}>{children}</banner-area>
}
