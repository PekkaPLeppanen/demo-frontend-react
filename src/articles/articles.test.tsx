import { getAllArticles, IArticle } from 'resources/article-provider'
import { Articles } from './articles'
import { render, screen, waitFor } from '@testing-library/react'

jest.mock('resources/article-provider')

const getAllArticlesMock = jest.mocked(getAllArticles)

export function flushPromises(): Promise<void> {
  return new Promise(process.nextTick)
}

describe('<Articles />', () => {

  test('render', async () => {

    getAllArticlesMock.mockResolvedValueOnce([
      {
        id: 1,
        title: 'Foo bar'
      } as unknown as IArticle
    ])

    const view = render(<Articles/>)
    expect(screen.getByText('Latest topics')).toBeInTheDocument()
    expect(screen.getByText('Loading...')).toBeInTheDocument()
    expect(view.container.innerHTML).toMatchSnapshot('loading')

    expect(getAllArticles).toBeCalled()
    await waitFor(() => {
      expect(screen.getByText('Foo bar')).toBeInTheDocument()
    })
    expect(view.container.innerHTML).toMatchSnapshot('articles loaded')

  })
})
