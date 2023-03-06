import { ArticleComment } from 'articles/article-comment'
import { articleCommentsResponseMock } from 'resources/test-data/articles'
import { render, screen } from '@testing-library/react'

describe('<ArticleComment />', () => {
  test('render', async () => {
    const articleComment = articleCommentsResponseMock[0]
    const {container, unmount} = render(<ArticleComment comment={articleComment}/>)
    expect(container.outerHTML).toMatchSnapshot()
    expect(screen.getByText(articleComment.body)).toBeInTheDocument()
    expect(screen.getByText(articleComment.email)).toBeInTheDocument()
    unmount()
  })
})
