import { articleCommentsResponseMock, articleResponseMock } from 'resources/test-data/articles'
import { Article } from 'articles/article'
import { getArticleComments, IArticle } from 'resources/article-provider'
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react'
import { ArticleComment } from 'articles/article-comment'
import { useArticle } from 'articles/article-context'

jest.mock('resources/article-provider')
jest.mock('articles/article-comment')
jest.mock('articles/article-context')

const getArticleCommentsMock = jest.mocked(getArticleComments)

const useArticleMock = jest.mocked(useArticle)
const selectArticleSpy = jest.fn()
let selectedArticle: IArticle | null = null
useArticleMock.mockImplementation(() => {
  return {
    selectedArticle,
    selectArticle: selectArticleSpy,
  }
})

const ArticleCommentMock = jest.mocked(ArticleComment)
const articleCommentPropsSpy = jest.fn()
ArticleCommentMock.mockImplementation((props) => {
  articleCommentPropsSpy(props)

  return <div data-testid="article-comment"/>
})

describe('<Article />', () => {

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('render', async () => {
    getArticleCommentsMock.mockResolvedValueOnce([])

    selectedArticle = articleResponseMock[0]
    const {container} = render(<Article />)
    expect(await screen.findByText(selectedArticle.title)).toBeInTheDocument()
    expect(await screen.findByText(selectedArticle.body)).toBeInTheDocument()
    expect(await screen.findByText('Loading comments...')).toBeInTheDocument()
    expect(getArticleCommentsMock).toBeCalledWith(selectedArticle.id)
    expect(container.outerHTML).toMatchSnapshot()
  })
  test('loading comments', async () => {
    getArticleCommentsMock.mockResolvedValueOnce(articleCommentsResponseMock)

    render(<Article />)

    await waitForElementToBeRemoved(screen.queryByText('Loading comments...'))
    expect(ArticleCommentMock).toBeCalledTimes(2)
    expect(articleCommentPropsSpy).toBeCalledWith({comment: articleCommentsResponseMock[0]})
    expect(articleCommentPropsSpy).toBeCalledWith({comment: articleCommentsResponseMock[1]})
  })
})
