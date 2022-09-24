export enum Form {
  Initial,
  Loading,
  Success,
  Error
}

export enum PageType {
  WEBSITE = 'website',
  ARTICLE = 'article'
}

export type FormState = {
  state: Form;
  message?: string;
};

export enum SubscribeSize {
  SMALL = 'small',
  LARGE = 'large'
}

export type SocialFollowers = {
  followers: number;
};

export type Subscribers = {
  count: number;
};

export type Views = {
  total: number;
};

export type Message = {
  id: number;
  created_at: number;
  user_id: string;
  content: any;
  user: {
    name: string;
  };
};

export enum ButtonType {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  TERTIARY = 'tertiary'
}

export type TagType = {
  id: string;
  name: string;
};

export type Article = {
  title: string;
  tags: TagType[];
  coverImage: string;
  summary: string;
  publishedDate?: Date;
  isPublic: boolean;
};

export type Reactions = {
  like_count: number;
  love_count: number;
  clap_count: number;
  party_count: number;
};

export type Language =
  | 'markup'
  | 'bash'
  | 'clike'
  | 'c'
  | 'cpp'
  | 'css'
  | 'javascript'
  | 'jsx'
  | 'coffeescript'
  | 'actionscript'
  | 'css-extr'
  | 'diff'
  | 'git'
  | 'go'
  | 'graphql'
  | 'handlebars'
  | 'json'
  | 'less'
  | 'makefile'
  | 'markdown'
  | 'objectivec'
  | 'ocaml'
  | 'python'
  | 'reason'
  | 'sass'
  | 'scss'
  | 'sql'
  | 'stylus'
  | 'tsx'
  | 'typescript'
  | 'wasm'
  | 'yaml';
