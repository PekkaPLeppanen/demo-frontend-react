import { getArticleComments, IArticle, IArticleComment } from 'resources/article-provider'
import { ArticleComment } from 'articles/article-comment'
import { useEffect, useState } from 'react'
import 'articles/article.scss'

export type ArticleProps = {
  article: IArticle;
}

export function Article({article}: ArticleProps) {

  const [comments, setComments] = useState<IArticleComment[]>()

  useEffect(() => {
    getArticleComments(article.id)
      .then(response => {
        setComments(response ?? [])
      })
  }, [article.id])

  return (
    <div className="article">
      <h2 className="article__title">{article.title}</h2>
      <p className="article__body">{article.body}</p>
      {
        comments
          ? comments.map(comment => <ArticleComment comment={comment} key={comment.id} />)
          : <p>Loading comments...</p>
      }
    </div>
  )

}
