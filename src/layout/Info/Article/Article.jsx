import {
  Center
} from '@mantine/core'

import Images from './Images'

const Article = ({ 
  articleSummary,
  articleImages, 
  isFetching, 
}) => {

  if (isFetching) {
    return (
      <>
        <p>Loading...</p>
      </>
    )
  }

  if (!articleSummary.pageid) {
    return (
      <>
        <p>Article not found</p>
      </>
    )
  }

  console.log(articleSummary.extract_html)
  
  return (
    <>
      <Center h='100%'>
        <Images images={articleImages} />
        <div
          dangerouslySetInnerHTML={{ __html: articleSummary.extract_html }} 
        />
      </Center>
    </>
  )
}

export default Article

import propTypes from 'prop-types'

Article.propTypes = {
  articleSummary: propTypes.object,
  articleImages: propTypes.array,
  isFetching: propTypes.bool
}