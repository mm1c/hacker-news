import { getAgo, getHost } from "../../lib/utils";
import { IItemProps, IParam } from "../../types/interfaces";
import ExternalLink from "../ExternalLink/ExternalLink";
import { ChevronUpIcon } from "../icons/ChevronUpIcon/ChevronUpIcon";


const Item = (props: IItemProps) => {
  const {
    order,
    by,
    descendants,
    id,
    score,
    time,
    title,
    url
  } = props;

  const upVote = () => {
    console.log('upvote placeholder...');
  }

  const onHide = () => {
    console.log('on hide placeholder...');
  }

  /**
   * Get view data
   */
  const host = getHost(url);

  const userSearchParams: IParam[] = [
    { key: 'id', value: by },
  ];

  const itemSearchParams: IParam[] = [
    { key: 'id', value: id },
  ];

  const siteSearchParams: IParam[] = [
    { key: 'site', value: host },
  ];

  const commentsText = descendants === 0 ? 'discuss' : `${descendants} comments`;

  return (
    <article data-testid={`article_${order}`}>
      <div className="item-order">{order}</div>
      <div className="item__prefix">
        <div className="item__prefix-child item-upvote" onClick={upVote}>
          <ChevronUpIcon fill="whitesmoke" width="20px" height="20px" />
        </div>
        <div className="item__prefix-child item-points">
          {score}
        </div>
      </div>
      <div className="item__main">
        <div className="item-title">
          <a href={url} target="_blank" rel="noreferrer">{title}</a>
        </div>
        <div className="item-base-url">
          {
            !host ? null : (
              <ExternalLink endpoint='from' params={siteSearchParams} text={`(${host})`} />
            )
          }
        </div>
        <div className="item__info">
          <span className="item-by">
            by <ExternalLink endpoint='user' params={userSearchParams} text={by} /> / </span>
          <span className="item-ago" data-testid="ago">
            <ExternalLink endpoint='item' params={itemSearchParams} text={`${getAgo(time)}`} /> / </span>
          <span className="item-comments">
            <ExternalLink endpoint='item' params={itemSearchParams} text={commentsText} />
          </span>
        </div>
        <div className="item__hide-wrapper">
          <button className="btn-item-hide" onClick={onHide}>
            hide
          </button>
        </div>
      </div>
    </article>
  )
}

export default Item;