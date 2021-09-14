import {Getters, Mutations, Actions, Module, createMapper} from 'vuex-smart-module';
import {logger} from '~/util/logger';

class QueryState {
  useUser = true;
  useSince = false;
  useUntil = false;
  useFilter = false;
  text = '';
  from = '';
  to = '';
  since: string = new Date().toISOString().slice(0, 10);
  until: string = new Date().toISOString().slice(0, 10);
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
    hashtags: false,
  };
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

  get filter(): Record<string, unknown> {
    return this.state.filter;
  }

  get asObject(): QueryState {
    return Object.assign({}, this.state);
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

  dehydrate(): void {
    const object = this.getters.asObject;
    localStorage.setItem('data', JSON.stringify(object));

    logger.info('dehydrated', object);
  }

  rehydrate(): void {
    const data = localStorage.getItem('data');

    if (data) {
      const object = JSON.parse(data) as QueryState;
      this.mutations.setUseUser(object.useUser);
      this.mutations.setUseSince(object.useSince);
      this.mutations.setUseUntil(object.useUntil);
      this.mutations.setUseFilter(object.useFilter);
      this.mutations.setText(object.text);
      this.mutations.setFrom(object.from);
      this.mutations.setTo(object.to);
      this.mutations.setSince(object.since);
      this.mutations.setUntil(object.until);
      this.mutations.setFilterPositive(object.filter.positive);
      this.mutations.setFilterNegative(object.filter.negative);
      this.mutations.setFilterQuestion(object.filter.question);
      this.mutations.setFilterImages(object.filter.images);
      this.mutations.setFilterVideos(object.filter.videos);
      this.mutations.setFilterNews(object.filter.news);
      this.mutations.setFilterSafe(object.filter.safe);
      this.mutations.setFilterReplies(object.filter.replies);
      this.mutations.setFilterRetweets(object.filter.retweets);
      this.mutations.setFilterNativeRetweets(object.filter.nativeretweets);
      this.mutations.setFilterLinks(object.filter.links);
      this.mutations.setFilterVerified(object.filter.verified);
      this.mutations.setFilterHashTags(object.filter.hashtags);

      logger.info('rehydrated', this.state);
    } else {
      this.dehydrate();
    }
  }
}

export const queryModule = new Module({
  state: QueryState,
  getters: QueryGetters,
  mutations: QueryMutations,
  actions: QueryActions,
});

export const queryMapper = createMapper(queryModule);
