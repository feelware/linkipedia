import {
  Image,
} from '@mantine/core'

import {
  Carousel
} from '@mantine/carousel'

import classes from './Images.module.css'

const Images = ({ images }) => {
  if (!images) {
    return
  }

  return (
    <>
      <Carousel height={200} classNames={classes}>
        <Carousel.Slide>
          <Image />
        </Carousel.Slide>
      </Carousel>
    </>
  )
}

export default Images

import propTypes from 'prop-types'

Images.propTypes = {
  images: propTypes.array
}