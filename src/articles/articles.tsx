import { getAllArticles, IArticle } from 'resources/article-provider'
import 'articles/article-list.scss'
import React, { useEffect, useState } from 'react'

export function Articles(): JSX.Element {

  const [articles, setArticles] = useState<IArticle[]>([])

  useEffect(() => {
    getAllArticles()
      .then(articles => {
        setArticles(articles)
      })
  }, [])

  return (
    <>
      <h1>Latest topics</h1>
      {articles.length === 0
        ? <p>Loading...</p>
        : <ul className="article-list">
          {articles.map((article) =>
            (
              <li className="article-list__item" key={article.id}>
                {article.title}
              </li>
            ))}
        </ul>
      }
    </>
  )
}
