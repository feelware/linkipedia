import {
  Box,
  ScrollArea,
  Title,
  Text,
} from '@mantine/core'

import Images from './Images'

const Article = ({ 
  summary,
  images, 
  isFetchingSummary, 
}) => {

  if (isFetchingSummary) {
    return (
      <>
        <p>Loading...</p>
      </>
    )
  }

  if (!summary.pageid) {
    return (
      <>
        <p>Article not found</p>
      </>
    )
  }
  
  console.log(summary)

  return (
    <>
      <ScrollArea h='100%'>
        <Box 
          m={20}
          mt={30}
        >
          <Title>
            {summary.title}
          </Title>

          <Text
            size='sm'
            c='dimmed'
            pt={12}
          >
            {summary.description}
          </Text>

          <div 
            dangerouslySetInnerHTML={{ 
              __html: summary.extract_html 
            }} 
          />
        </Box>
      </ScrollArea>
    </>
  )
}

export default Article

import propTypes from 'prop-types'

Article.propTypes = {
  summary: propTypes.object,
  images: propTypes.array,
  isFetchingSummary: propTypes.bool
}