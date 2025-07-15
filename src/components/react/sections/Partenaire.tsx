import React from 'react'
import type { EmblaPluginType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'

type PropType = {
  plugins?: EmblaPluginType[]
}

export function EmblaCarousel(props:PropType) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, props.plugins)

  
}
