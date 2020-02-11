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
}

class QueryActions extends Actions<QueryState, QueryGetters, QueryMutations, QueryMutations> {
  setUseUser(useUser: boolean) {
    this.mutations.setUseUser(useUser);
  }
  setUseSince(useSince: boolean) {
    this.mutations.setUseSince(useSince);
  }
  setUseUntil(useUntil: boolean) {
    this.mutations.setUseUntil(useUntil);
  }
  setUseFilter(useFilter: boolean) {
    this.mutations.setUseFilter(useFilter);
  }
  setText(text: string) {
    this.mutations.setText(text);
  }
  setFrom(from: string) {
    this.mutations.setFrom(from);
  }
  setTo(to: string) {
    this.mutations.setTo(to);
  }
  setSince(since: string) {
    this.mutations.setSince(since);
  }
  setUntil(until: string) {
    this.mutations.setUntil(until);
  }
  setFilterPositive(positive: boolean) {
    this.mutations.setFilterPositive(positive);
  }
  setFilterNegative(negative: boolean) {
    this.mutations.setFilterNegative(negative);
  }
  setFilterQuestion(question: boolean) {
    this.mutations.setFilterQuestion(question);
  }
  setFilterImages(images: boolean) {
    this.mutations.setFilterImages(images);
  }
  setFilterVideos(videos: boolean) {
    this.mutations.setFilterVideos(videos);
  }
  setFilterNews(news: boolean) {
    this.mutations.setFilterNews(news);
  }
  setFilterSafe(safe: boolean) {
    this.mutations.setFilterSafe(safe);
  }
  setFilterReplies(replies: boolean) {
    this.mutations.setFilterReplies(replies);
  }
  setFilterRetweets(retweets: boolean) {
    this.mutations.setFilterRetweets(retweets);
  }
  setFilterNativeRetweets(nativeretweets: boolean) {
    this.mutations.setFilterNativeRetweets(nativeretweets);
  }
  setFilterLinks(links: boolean) {
    this.mutations.setFilterLinks(links);
  }
  setFilterVerified(verified: boolean) {
    this.mutations.setFilterVerified(verified);
  }
  setFilterHashTags(hashtags: boolean) {
    this.mutations.setFilterHashTags(hashtags);
  }
}

export const queryModule = new Module({
  state: QueryState,
  getters: QueryGetters,
  mutations: QueryMutations,
  actions: QueryActions
});

export const queryMapper = createMapper(queryModule);
