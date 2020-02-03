import { Getters, Mutations, Actions, Module, createMapper } from 'vuex-smart-module';
import logger from '~/util/logger';

class QueryState {
  useUser: boolean = true;
  useSince: boolean = false;
  useUntil: boolean = false;
  useFilter: boolean = false;
  text: string = '';
  from: string = '';
  to: string = '';
  since: string = new Date().toISOString().substr(0, 10);
  until: string = new Date().toISOString().substr(0, 10);
  filter: {
    positive: boolean;
    negative: boolean;
    question: boolean;
    images: boolean;
    videos: boolean;
    news: boolean;
    safe: boolean;
    replies: boolean;
    retweets: boolean;
    nativeretweets: boolean;
    links: boolean;
    verified: boolean;
    hashtags: boolean;
  } = {
    positive: false,
    negative: false,
    question: false,
    images: false,
    videos: false,
    news: false,
    safe: false,
    replies: false,
    retweets: false,
    nativeretweets: false,
    links: false,
    verified: false,
    hashtags: false
  };
  query: string[] = [];

  asObject(): QueryState {
    return Object.assign({}, this);
  }

  dehydrate() {
    const object = this.asObject();
    localStorage.setItem('data', JSON.stringify(object));

    logger.info('dehydrated', object);
  }

  rehydrate(): void {
    const data = localStorage.getItem('data');

    if (data) {
      const object = JSON.parse(data);
      Object.assign(this, object);

      logger.info('rehydrated', object);
    } else {
      this.dehydrate();
    }
  }
}

class QueryGetters extends Getters<QueryState> {
  get useUser(): boolean {
    return this.state.useUser;
  }
  get useSince(): boolean {
    return this.state.useSince;
  }
  get useUntil(): boolean {
    return this.state.useUntil;
  }
  get useFilter(): boolean {
    return this.state.useFilter;
  }
  get text(): string {
    return this.state.text;
  }
  get from(): string {
    return this.state.from;
  }
  get to(): string {
    return this.state.to;
  }
  get since(): string {
    return this.state.since;
  }
  get until(): string {
    return this.state.until;
  }
  get filter(): object {
    return this.state.filter;
  }
  get query(): string[] {
    return this.state.query;
  }
}

class QueryMutations extends Mutations<QueryState> {
  setUseUser(useUser: boolean) {
    this.state.useUser = useUser;
  }
  setUseSince(useSince: boolean) {
    this.state.useSince = useSince;
  }
  setUseUntil(useUntil: boolean) {
    this.state.useUntil = useUntil;
  }
  setUseFilter(useFilter: boolean) {
    this.state.useFilter = useFilter;
  }
  setFrom(from: string) {
    this.state.from = from;
  }
  setText(text: string) {
    this.state.text = text;
  }
  setTo(to: string) {
    this.state.to = to;
  }
  setSince(since: string) {
    this.state.since = since;
  }
  setUntil(until: string) {
    this.state.until = until;
  }
  setFilterPositive(positive: boolean) {
    this.state.filter.positive = positive;
  }
  setFilterNegative(negative: boolean) {
    this.state.filter.negative = negative;
  }
  setFilterQuestion(question: boolean) {
    this.state.filter.question = question;
  }
  setFilterImages(images: boolean) {
    this.state.filter.images = images;
  }
  setFilterVideos(videos: boolean) {
    this.state.filter.videos = videos;
  }
  setFilterNews(news: boolean) {
    this.state.filter.news = news;
  }
  setFilterSafe(safe: boolean) {
    this.state.filter.safe = safe;
  }
  setFilterReplies(replies: boolean) {
    this.state.filter.replies = replies;
  }
  setFilterRetweets(retweets: boolean) {
    this.state.filter.retweets = retweets;
  }
  setFilterNativeRetweets(nativeretweets: boolean) {
    this.state.filter.nativeretweets = nativeretweets;
  }
  setFilterLinks(links: boolean) {
    this.state.filter.links = links;
  }
  setFilterVerified(verified: boolean) {
    this.state.filter.verified = verified;
  }
  setFilterHashTags(hashtags: boolean) {
    this.state.filter.hashtags = hashtags;
  }
  generateQuery() {
    this.state.query.length = 0;
    this.state.query.push(this.state.text);

    if (this.state.useUser) {
      if (this.state.from) {
        this.state.query.push(`from:${this.state.from}`);
      }

      if (this.state.to) {
        this.state.query.push(`to:${this.state.to}`);
      }
    }

    if (this.state.useSince) {
      this.state.query.push(`since:${this.state.since}`);
    }

    if (this.state.useUntil) {
      this.state.query.push(`until:${this.state.until}`);
    }

    if (this.state.useFilter) {
      for (const [key, value] of Object.entries(this.state.filter)) {
        if (value) {
          if (key === 'positive') {
            this.state.query.push(':)');
          } else if (key === 'negative') {
            this.state.query.push(':(');
          } else if (key === 'question') {
            this.state.query.push('?');
          } else {
            this.state.query.push(`filter:${key}`);
          }
        }
      }
    }
  }
}

class QueryActions extends Actions<QueryState, QueryGetters, QueryMutations, QueryMutations> {
  setUseUser(useUser: boolean) {
    this.mutations.setUseUser(useUser);
    this.mutations.generateQuery();
  }
  setUseSince(useSince: boolean) {
    this.mutations.setUseSince(useSince);
    this.mutations.generateQuery();
  }
  setUseUntil(useUntil: boolean) {
    this.mutations.setUseUntil(useUntil);
    this.mutations.generateQuery();
  }
  setUseFilter(useFilter: boolean) {
    this.mutations.setUseFilter(useFilter);
    this.mutations.generateQuery();
  }
  setText(text: string) {
    this.mutations.setText(text);
    this.mutations.generateQuery();
  }
  setFrom(from: string) {
    this.mutations.setFrom(from);
    this.mutations.generateQuery();
  }
  setTo(to: string) {
    this.mutations.setTo(to);
    this.mutations.generateQuery();
  }
  setSince(since: string) {
    this.mutations.setSince(since);
    this.mutations.generateQuery();
  }
  setUntil(until: string) {
    this.mutations.setUntil(until);
    this.mutations.generateQuery();
  }
  setFilterPositive(positive: boolean) {
    this.mutations.setFilterPositive(positive);
    this.mutations.generateQuery();
  }
  setFilterNegative(negative: boolean) {
    this.mutations.setFilterNegative(negative);
    this.mutations.generateQuery();
  }
  setFilterQuestion(question: boolean) {
    this.mutations.setFilterQuestion(question);
    this.mutations.generateQuery();
  }
  setFilterImages(images: boolean) {
    this.mutations.setFilterImages(images);
    this.mutations.generateQuery();
  }
  setFilterVideos(videos: boolean) {
    this.mutations.setFilterVideos(videos);
    this.mutations.generateQuery();
  }
  setFilterNews(news: boolean) {
    this.mutations.setFilterNews(news);
    this.mutations.generateQuery();
  }
  setFilterSafe(safe: boolean) {
    this.mutations.setFilterSafe(safe);
    this.mutations.generateQuery();
  }
  setFilterReplies(replies: boolean) {
    this.mutations.setFilterReplies(replies);
    this.mutations.generateQuery();
  }
  setFilterRetweets(retweets: boolean) {
    this.mutations.setFilterRetweets(retweets);
    this.mutations.generateQuery();
  }
  setFilterNativeRetweets(nativeretweets: boolean) {
    this.mutations.setFilterNativeRetweets(nativeretweets);
    this.mutations.generateQuery();
  }
  setFilterLinks(links: boolean) {
    this.mutations.setFilterLinks(links);
    this.mutations.generateQuery();
  }
  setFilterVerified(verified: boolean) {
    this.mutations.setFilterVerified(verified);
    this.mutations.generateQuery();
  }
  setFilterHashTags(hashtags: boolean) {
    this.mutations.setFilterHashTags(hashtags);
    this.mutations.generateQuery();
  }
}

export const queryModule = new Module({
  state: QueryState,
  getters: QueryGetters,
  mutations: QueryMutations,
  actions: QueryActions
});

export const queryMapper = createMapper(queryModule);
