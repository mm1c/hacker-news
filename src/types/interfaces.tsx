

export interface IHackerNewsItem {
  /*
    SOURCE: https://github.com/HackerNews/API
    **********************************************
    id	The item's unique id.
    deleted	true if the item is deleted.
    type	The type of item. One of "job", "story", "comment", "poll", or "pollopt".
    by	The username of the item's author.
    time	Creation date of the item, in Unix Time.
    text	The comment, story or poll text. HTML.
    dead	true if the item is dead.
    parent	The comment's parent: either another comment or the relevant story.
    poll	The pollopt's associated poll.
    kids	The ids of the item's comments, in ranked display order.
    url	The URL of the story.
    score	The story's score, or the votes for a pollopt.
    title	The title of the story, poll or job. HTML.
    parts	A list of related pollopts, in display order.
    descendants	In the case of stories or polls, the total comment count.
  */

  id: number
  deleted?: boolean
  type?: "job" | "story" | "comment" | "poll" | "pollopt"
  by?: string
  time?: number
  text?: string
  dead?: boolean
  parent?: number
  poll?: number
  kids?: number[]
  url?: string
  score?: number
  title?: string
  parts?: number[]
  descendants?: number
}

export interface IHeaderProps {
  navItems: INavItemProps[]
}

export interface INavItemProps {
  text: string
  path: string
}

export interface IPaginationProps {
  direction: string
  onSwitchPage: (direction: string) => {}
}

export interface IParam {
  key: string
  value: string | number | undefined
}

export interface IExternalLinkProps {
  endpoint: string
  params: IParam[]
  text: string | undefined
}

export interface IItemProps extends IHackerNewsItem {
  order: number
}

export interface IItemsProps {
  endpoint: string
}

export interface IChevronUpIconProps {
  fill: string
  height: string
  width: string
}

export interface IItemsViewData {
  prev: IHackerNewsItem[]
  current: IHackerNewsItem[]
  next: IHackerNewsItem[]
}