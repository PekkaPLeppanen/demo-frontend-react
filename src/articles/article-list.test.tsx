import { getAllArticles, IArticle } from 'resources/article-provider'
import { ArticleList } from 'articles/article-list'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { useArticle } from 'articles/article-context'
import { articleResponseMock } from 'resources/test-data/articles'
import { Article } from './article'

jest.mock('resources/article-provider')
jest.mock('articles/article-context')
jest.mock('articles/article')

const getAllArticlesMock = jest.mocked(getAllArticles)

const useArticleMock = jest.mocked(useArticle)
const selectArticleSpy = jest.fn()
let selectedArticle: IArticle | null = null
useArticleMock.mockImplementation(() => {
  return {
    selectedArticle,
    selectArticle: selectArticleSpy,
  }
})

const ArticleMock = jest.mocked(Article)
ArticleMock.mockImplementation(() => <div data-testid="article"/>)

describe('<ArticleList />', () => {

  test('render', async () => {

    getAllArticlesMock.mockResolvedValueOnce([
      {
        id: 1,
        title: 'Foo bar'
      } as unknown as IArticle
    ])

    const view = render(<ArticleList/>)
    expect(screen.getByText('Latest topics')).toBeInTheDocument()
    expect(screen.getByText('Loading...')).toBeInTheDocument()
    expect(screen.queryByTestId('article')).not.toBeInTheDocument()
    expect(view.container.innerHTML).toMatchSnapshot('loading')

    expect(getAllArticles).toBeCalled()
    expect(await screen.findByText('Foo bar')).toBeInTheDocument()
    expect(view.container.innerHTML).toMatchSnapshot('articles loaded')

  })
  test('selecting article', async () => {

    getAllArticlesMock.mockResolvedValueOnce([
      {
        id: 1,
        title: 'Foo bar'
      } as unknown as IArticle
    ])
    render(<ArticleList/>)
    const item = await screen.findByText('Foo bar')
    fireEvent.click(item)
    expect(selectArticleSpy).toBeCalledWith({
      id: 1,
      title: 'Foo bar'
    })

  })
  test('render selected article', async () => {

    getAllArticlesMock.mockResolvedValueOnce([])
    selectedArticle = articleResponseMock[0]
    render(<ArticleList/>)
    await waitFor(() => {
      expect(screen.getByTestId('article')).toBeInTheDocument()
    })

  })
})
