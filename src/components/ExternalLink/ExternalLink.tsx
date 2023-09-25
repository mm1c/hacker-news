import { IExternalLinkProps, IParam } from "../../types/interfaces";

const HACKER_NEWS_URL = process.env.REACT_APP_HACKER_NEWS_URL;

const ExternalLink = (props: IExternalLinkProps) => {
  const {
    endpoint,
    params,
    text
  } = props;

  const getSearchParams = (params: IParam[]) => {
    return params.map((param: IParam) => `${param.key}=${param.value}`);
  }

  return (
    <a href={`${HACKER_NEWS_URL}/${endpoint}?${getSearchParams(params)}`} target="_blank" rel="noreferrer">
      {text}
    </a>
  )
}

export default ExternalLink;