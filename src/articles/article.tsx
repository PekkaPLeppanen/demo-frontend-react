import { getArticleComments, IArticleComment } from 'resources/article-provider'
import { ArticleComment } from 'articles/article-comment'
import { useEffect, useState } from 'react'
import 'articles/article.scss'
import { useArticle } from './article-context'

export function Article() {

  const [comments, setComments] = useState<IArticleComment[]>()
  const {selectedArticle} = useArticle()

  useEffect(() => {
    if (!selectedArticle) {
      return
    }
    getArticleComments(selectedArticle?.id)
      .then(response => {
        setComments(response ?? [])
      })
  }, [selectedArticle])

  return (
    <div className="article">
      <h2 className="article__title">{selectedArticle?.title}</h2>
      <p className="article__body">{selectedArticle?.body}</p>
      {
        comments
          ? comments.map(comment => <ArticleComment comment={comment} key={comment.id}/>)
          : <p>Loading comments...</p>
      }
    </div>
  )

}
