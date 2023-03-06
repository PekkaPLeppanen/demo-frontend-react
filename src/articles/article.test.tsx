import { articleCommentsResponseMock, articleResponseMock } from 'resources/test-data/articles'
import { Article } from 'articles/article'
import { getArticleComments } from 'resources/article-provider'
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react'
import { ArticleComment } from 'articles/article-comment'

jest.mock('resources/article-provider')
jest.mock('articles/article-comment')

const getArticleCommentsMock = jest.mocked(getArticleComments)

describe('<Article />', () => {

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('render', async () => {
    getArticleCommentsMock.mockResolvedValueOnce([])

    const article = articleResponseMock[0]
    const {container} = render(<Article article={article}/>)
    expect(await screen.findByText(article.title)).toBeInTheDocument()
    expect(await screen.findByText(article.body)).toBeInTheDocument()
    expect(await screen.findByText('Loading comments...')).toBeInTheDocument()
    expect(getArticleCommentsMock).toBeCalledWith(article.id)
    expect(container.outerHTML).toMatchSnapshot()
  })
  test('loading comments', async () => {
    getArticleCommentsMock.mockResolvedValueOnce(articleCommentsResponseMock)

    const article = articleResponseMock[0]
    render(<Article article={article}/>)

    await waitForElementToBeRemoved(screen.queryByText('Loading comments...'))
    expect(ArticleComment).toBeCalledTimes(2)
    expect(ArticleComment).toBeCalledWith({comment: articleCommentsResponseMock[0]}, {})
    expect(ArticleComment).toBeCalledWith({comment: articleCommentsResponseMock[1]}, {})
  })
})
