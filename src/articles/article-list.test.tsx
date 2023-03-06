import { getAllArticles, IArticle } from 'resources/article-provider'
import { ArticleList } from 'articles/article-list'
import { render, screen } from '@testing-library/react'

jest.mock('resources/article-provider')

const getAllArticlesMock = jest.mocked(getAllArticles)

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
    expect(view.container.innerHTML).toMatchSnapshot('loading')

    expect(getAllArticles).toBeCalled()
    expect(await screen.findByText('Foo bar')).toBeInTheDocument()
    expect(view.container.innerHTML).toMatchSnapshot('articles loaded')

  })
})
