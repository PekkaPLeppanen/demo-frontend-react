import { type IArticle } from 'resources/article-provider'
import { createContext, PropsWithChildren, useContext, useState } from 'react'

export type IArticleContext = {
  selectedArticle: IArticle | null;
  selectArticle: (article: IArticle) => void;
};

const ArticleContext = createContext<IArticleContext | null>(null)

/**
 * Creates a context provider component, where all the children have access to the ArticleContext
 */
export function ArticleProvider(props: PropsWithChildren): JSX.Element {

  const [article, selectArticle] = useState<IArticle | null>(null)

  return (
    <ArticleContext.Provider value={{selectedArticle: article, selectArticle}}>
      {props.children}
    </ArticleContext.Provider>
  )
}

/**
 * Usage: const {article, selectArticle} = useArticle();
 */
export function useArticle(): IArticleContext {
  return useContext(ArticleContext) as IArticleContext
}
