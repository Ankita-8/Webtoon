// Generated by dts-bundle-generator v8.0.1

import { NextFunction, Request, RequestHandler, Response } from 'express';

declare const validations: {
	enabled: {
		[key: string]: boolean;
	};
	disable(): void;
	/**
	 * Checks whether the IP address is valid, and that it does not have a port
	 * number in it.
	 *
	 * See https://github.com/express-rate-limit/express-rate-limit/wiki/Error-Codes#err_erl_invalid_ip_address.
	 *
	 * @param ip {string | undefined} - The IP address provided by Express as request.ip.
	 *
	 * @returns {void}
	 */
	ip(ip: string | undefined): void;
	/**
	 * Makes sure the trust proxy setting is not set to `true`.
	 *
	 * See https://github.com/express-rate-limit/express-rate-limit/wiki/Error-Codes#err_erl_permissive_trust_proxy.
	 *
	 * @param request {Request} - The Express request object.
	 *
	 * @returns {void}
	 */
	trustProxy(request: Request): void;
	/**
	 * Makes sure the trust proxy setting is set in case the `X-Forwarded-For`
	 * header is present.
	 *
	 * See https://github.com/express-rate-limit/express-rate-limit/wiki/Error-Codes#err_erl_unset_trust_proxy.
	 *
	 * @param request {Request} - The Express request object.
	 *
	 * @returns {void}
	 */
	xForwardedForHeader(request: Request): void;
	/**
	 * Ensures totalHits value from store is a positive integer.
	 *
	 * @param hits {any} - The `totalHits` returned by the store.
	 */
	positiveHits(hits: any): void;
	/**
	 * Ensures a single store instance is not used with multiple express-rate-limit instances
	 */
	unsharedStore(store: Store): void;
	/**
	 * Ensures a given key is incremented only once per request.
	 *
	 * @param request {Request} - The Express request object.
	 * @param store {Store} - The store class.
	 * @param key {string} - The key used to store the client's hit count.
	 *
	 * @returns {void}
	 */
	singleCount(request: Request, store: Store, key: string): void;
	/**
	 * Warns the user that the behaviour for `max: 0` / `limit: 0` is
	 * changing in the next major release.
	 *
	 * @param limit {number} - The maximum number of hits per client.
	 *
	 * @returns {void}
	 */
	limit(limit: number): void;
	/**
	 * Warns the user that the `draft_polli_ratelimit_headers` option is deprecated
	 * and will be removed in the next major release.
	 *
	 * @param draft_polli_ratelimit_headers {any | undefined} - The now-deprecated setting that was used to enable standard headers.
	 *
	 * @returns {void}
	 */
	draftPolliHeaders(draft_polli_ratelimit_headers?: any): void;
	/**
	 * Warns the user that the `onLimitReached` option is deprecated and
	 * will be removed in the next major release.
	 *
	 * @param onLimitReached {any | undefined} - The maximum number of hits per client.
	 *
	 * @returns {void}
	 */
	onLimitReached(onLimitReached?: any): void;
	/**
	 * Warns the user when the selected headers option requires a reset time but
	 * the store does not provide one.
	 *
	 * @param resetTime {Date | undefined} - The timestamp when the client's hit count will be reset.
	 *
	 * @returns {void}
	 */
	headersResetTime(resetTime?: Date): void;
	/**
	 * Checks the options.validate setting to ensure that only recognized
	 * validations are enabled or disabled.
	 *
	 * If any unrecognized values are found, an error is logged that
	 * includes the list of supported vaidations.
	 */
	validationsConfig(): void;
	/**
	 * Checks to see if the instance was created inside of a request handler,
	 * which would prevent it from working correctly, with the default memory
	 * store (or any other store with localKeys.)
	 */
	creationStack(store: Store): void;
};
export type Validations = typeof validations;
/**
 * Callback that fires when a client's hit counter is incremented.
 *
 * @param error {Error | undefined} - The error that occurred, if any.
 * @param totalHits {number} - The number of hits for that client so far.
 * @param resetTime {Date | undefined} - The time when the counter resets.
 */
export type IncrementCallback = (error: Error | undefined, totalHits: number, resetTime: Date | undefined) => void;
/**
 * Method (in the form of middleware) to generate/retrieve a value based on the
 * incoming request.
 *
 * @param request {Request} - The Express request object.
 * @param response {Response} - The Express response object.
 *
 * @returns {T} - The value needed.
 */
export type ValueDeterminingMiddleware<T> = (request: Request, response: Response) => T | Promise<T>;
/**
 * Express request handler that sends back a response when a client is
 * rate-limited.
 *
 * @param request {Request} - The Express request object.
 * @param response {Response} - The Express response object.
 * @param next {NextFunction} - The Express `next` function, can be called to skip responding.
 * @param optionsUsed {Options} - The options used to set up the middleware.
 */
export type RateLimitExceededEventHandler = (request: Request, response: Response, next: NextFunction, optionsUsed: Options) => void;
/**
 * Event callback that is triggered on a client's first request that exceeds the limit
 * but not for subsequent requests. May be used for logging, etc. Should *not*
 * send a response.
 *
 * @param request {Request} - The Express request object.
 * @param response {Response} - The Express response object.
 * @param optionsUsed {Options} - The options used to set up the middleware.
 */
export type RateLimitReachedEventHandler = (request: Request, response: Response, optionsUsed: Options) => void;
/**
 * Data returned from the `Store` when a client's hit counter is incremented.
 *
 * @property totalHits {number} - The number of hits for that client so far.
 * @property resetTime {Date | undefined} - The time when the counter resets.
 */
export type ClientRateLimitInfo = {
	totalHits: number;
	resetTime: Date | undefined;
};
export type IncrementResponse = ClientRateLimitInfo;
/**
 * A modified Express request handler with the rate limit functions.
 */
export type RateLimitRequestHandler = RequestHandler & {
	/**
	 * Method to reset a client's hit counter.
	 *
	 * @param key {string} - The identifier for a client.
	 */
	resetKey: (key: string) => void;
	/**
	 * Method to fetch a client's hit count and reset time.
	 *
	 * @param key {string} - The identifier for a client.
	 *
	 * @returns {ClientRateLimitInfo} - The number of hits and reset time for that client.
	 */
	getKey: (key: string) => Promise<ClientRateLimitInfo | undefined> | ClientRateLimitInfo | undefined;
};
/**
 * An interface that all hit counter stores must implement.
 *
 * @deprecated 6.x - Implement the `Store` interface instead.
 */
export type LegacyStore = {
	/**
	 * Method to increment a client's hit counter.
	 *
	 * @param key {string} - The identifier for a client.
	 * @param callback {IncrementCallback} - The callback to call once the counter is incremented.
	 */
	incr: (key: string, callback: IncrementCallback) => void;
	/**
	 * Method to decrement a client's hit counter.
	 *
	 * @param key {string} - The identifier for a client.
	 */
	decrement: (key: string) => void;
	/**
	 * Method to reset a client's hit counter.
	 *
	 * @param key {string} - The identifier for a client.
	 */
	resetKey: (key: string) => void;
	/**
	 * Method to reset everyone's hit counter.
	 */
	resetAll?: () => void;
};
/**
 * An interface that all hit counter stores must implement.
 */
export type Store = {
	/**
	 * Method that initializes the store, and has access to the options passed to
	 * the middleware too.
	 *
	 * @param options {Options} - The options used to setup the middleware.
	 */
	init?: (options: Options) => void;
	/**
	 * Method to fetch a client's hit count and reset time.
	 *
	 * @param key {string} - The identifier for a client.
	 *
	 * @returns {ClientRateLimitInfo} - The number of hits and reset time for that client.
	 */
	get?: (key: string) => Promise<ClientRateLimitInfo | undefined> | ClientRateLimitInfo | undefined;
	/**
	 * Method to increment a client's hit counter.
	 *
	 * @param key {string} - The identifier for a client.
	 *
	 * @returns {IncrementResponse | undefined} - The number of hits and reset time for that client.
	 */
	increment: (key: string) => Promise<IncrementResponse> | IncrementResponse;
	/**
	 * Method to decrement a client's hit counter.
	 *
	 * @param key {string} - The identifier for a client.
	 */
	decrement: (key: string) => Promise<void> | void;
	/**
	 * Method to reset a client's hit counter.
	 *
	 * @param key {string} - The identifier for a client.
	 */
	resetKey: (key: string) => Promise<void> | void;
	/**
	 * Method to reset everyone's hit counter.
	 */
	resetAll?: () => Promise<void> | void;
	/**
	 * Method to shutdown the store, stop timers, and release all resources.
	 */
	shutdown?: () => Promise<void> | void;
	/**
	 * Flag to indicate that keys incremented in one instance of this store can
	 * not affect other instances. Typically false if a database is used, true for
	 * MemoryStore.
	 *
	 * Used to help detect double-counting misconfigurations.
	 */
	localKeys?: boolean;
	/**
	 * Optional value that the store prepends to keys
	 *
	 * Used by the double-count check to avoid false-positives when a key is counted twice, but with different prefixes
	 */
	prefix?: string;
};
export type DraftHeadersVersion = "draft-6" | "draft-7";
/**
 * Validate configuration object for enabling or disabling specific validations.
 *
 * The keys must also be keys in the validations object, except `enable`, `disable`,
 * and `default`.
 */
export type EnabledValidations = {
	[key in keyof Omit<Validations, "enabled" | "disable"> | "default"]?: boolean;
};
/**
 * The configuration options for the rate limiter.
 */
export type Options = {
	/**
	 * How long we should remember the requests.
	 *
	 * Defaults to `60000` ms (= 1 minute).
	 */
	windowMs: number;
	/**
	 * The maximum number of connections to allow during the `window` before
	 * rate limiting the client.
	 *
	 * Can be the limit itself as a number or express middleware that parses
	 * the request and then figures out the limit.
	 *
	 * Defaults to `5`.
	 */
	limit: number | ValueDeterminingMiddleware<number>;
	/**
	 * The response body to send back when a client is rate limited.
	 *
	 * Defaults to `'Too many requests, please try again later.'`
	 */
	message: any | ValueDeterminingMiddleware<any>;
	/**
	 * The HTTP status code to send back when a client is rate limited.
	 *
	 * Defaults to `HTTP 429 Too Many Requests` (RFC 6585).
	 */
	statusCode: number;
	/**
	 * Whether to send `X-RateLimit-*` headers with the rate limit and the number
	 * of requests.
	 *
	 * Defaults to `true` (for backward compatibility).
	 */
	legacyHeaders: boolean;
	/**
	 * Whether to enable support for the standardized rate limit headers (`RateLimit-*`).
	 *
	 * Defaults to `false` (for backward compatibility, but its use is recommended).
	 */
	standardHeaders: boolean | DraftHeadersVersion;
	/**
	 * The name of the property on the request object to store the rate limit info.
	 *
	 * Defaults to `rateLimit`.
	 */
	requestPropertyName: string;
	/**
	 * If `true`, the library will (by default) skip all requests that have a 4XX
	 * or 5XX status.
	 *
	 * Defaults to `false`.
	 */
	skipFailedRequests: boolean;
	/**
	 * If `true`, the library will (by default) skip all requests that have a
	 * status code less than 400.
	 *
	 * Defaults to `false`.
	 */
	skipSuccessfulRequests: boolean;
	/**
	 * Method to generate custom identifiers for clients.
	 *
	 * By default, the client's IP address is used.
	 */
	keyGenerator: ValueDeterminingMiddleware<string>;
	/**
	 * Express request handler that sends back a response when a client is
	 * rate-limited.
	 *
	 * By default, sends back the `statusCode` and `message` set via the options.
	 */
	handler: RateLimitExceededEventHandler;
	/**
	 * Method (in the form of middleware) to determine whether or not this request
	 * counts towards a client's quota.
	 *
	 * By default, skips no requests.
	 */
	skip: ValueDeterminingMiddleware<boolean>;
	/**
	 * Method to determine whether or not the request counts as 'succesful'. Used
	 * when either `skipSuccessfulRequests` or `skipFailedRequests` is set to true.
	 *
	 * By default, requests with a response status code less than 400 are considered
	 * successful.
	 */
	requestWasSuccessful: ValueDeterminingMiddleware<boolean>;
	/**
	 * The `Store` to use to store the hit count for each client.
	 *
	 * By default, the built-in `MemoryStore` will be used.
	 */
	store: Store | LegacyStore;
	/**
	 * The list of validation checks that should run.
	 */
	validate: boolean | EnabledValidations;
	/**
	 * Whether to send `X-RateLimit-*` headers with the rate limit and the number
	 * of requests.
	 *
	 * @deprecated 6.x - This option was renamed to `legacyHeaders`.
	 */
	headers?: boolean;
	/**
	 * The maximum number of connections to allow during the `window` before
	 * rate limiting the client.
	 *
	 * Can be the limit itself as a number or express middleware that parses
	 * the request and then figures out the limit.
	 *
	 * @deprecated 7.x - This option was renamed to `limit`. However, it will not
	 * be removed from the library in the foreseeable future.
	 */
	max?: number | ValueDeterminingMiddleware<number>;
	/**
	 * If the Store generates an error, allow the request to pass.
	 */
	passOnStoreError: boolean;
};
/**
 * The extended request object that includes information about the client's
 * rate limit.
 */
export type AugmentedRequest = Request & {
	[key: string]: RateLimitInfo;
};
/**
 * The rate limit related information for each client included in the
 * Express request object.
 */
export type RateLimitInfo = {
	limit: number;
	used: number;
	remaining: number;
	resetTime: Date | undefined;
};
/**
 *
 * Create an instance of IP rate-limiting middleware for Express.
 *
 * @param passedOptions {Options} - Options to configure the rate limiter.
 *
 * @returns {RateLimitRequestHandler} - The middleware that rate-limits clients based on your configuration.
 *
 * @public
 */
export declare const rateLimit: (passedOptions?: Partial<Options>) => RateLimitRequestHandler;
/**
 * The record that stores information about a client - namely, how many times
 * they have hit the endpoint, and when their hit count resets.
 *
 * Similar to `ClientRateLimitInfo`, except `resetTime` is a compulsory field.
 */
export type Client = {
	totalHits: number;
	resetTime: Date;
};
/**
 * A `Store` that stores the hit count for each client in memory.
 *
 * @public
 */
export declare class MemoryStore implements Store {
	/**
	 * The duration of time before which all hit counts are reset (in milliseconds).
	 */
	windowMs: number;
	/**
	 * These two maps store usage (requests) and reset time by key (for example, IP
	 * addresses or API keys).
	 *
	 * They are split into two to avoid having to iterate through the entire set to
	 * determine which ones need reset. Instead, `Client`s are moved from `previous`
	 * to `current` as they hit the endpoint. Once `windowMs` has elapsed, all clients
	 * left in `previous`, i.e., those that have not made any recent requests, are
	 * known to be expired and can be deleted in bulk.
	 */
	previous: Map<string, Client>;
	current: Map<string, Client>;
	/**
	 * A reference to the active timer.
	 */
	interval?: NodeJS.Timeout;
	/**
	 * Confirmation that the keys incremented in once instance of MemoryStore
	 * cannot affect other instances.
	 */
	localKeys: boolean;
	/**
	 * Method that initializes the store.
	 *
	 * @param options {Options} - The options used to setup the middleware.
	 */
	init(options: Options): void;
	/**
	 * Method to fetch a client's hit count and reset time.
	 *
	 * @param key {string} - The identifier for a client.
	 *
	 * @returns {ClientRateLimitInfo | undefined} - The number of hits and reset time for that client.
	 *
	 * @public
	 */
	get(key: string): Promise<ClientRateLimitInfo | undefined>;
	/**
	 * Method to increment a client's hit counter.
	 *
	 * @param key {string} - The identifier for a client.
	 *
	 * @returns {ClientRateLimitInfo} - The number of hits and reset time for that client.
	 *
	 * @public
	 */
	increment(key: string): Promise<ClientRateLimitInfo>;
	/**
	 * Method to decrement a client's hit counter.
	 *
	 * @param key {string} - The identifier for a client.
	 *
	 * @public
	 */
	decrement(key: string): Promise<void>;
	/**
	 * Method to reset a client's hit counter.
	 *
	 * @param key {string} - The identifier for a client.
	 *
	 * @public
	 */
	resetKey(key: string): Promise<void>;
	/**
	 * Method to reset everyone's hit counter.
	 *
	 * @public
	 */
	resetAll(): Promise<void>;
	/**
	 * Method to stop the timer (if currently running) and prevent any memory
	 * leaks.
	 *
	 * @public
	 */
	shutdown(): void;
	/**
	 * Recycles a client by setting its hit count to zero, and reset time to
	 * `windowMs` milliseconds from now.
	 *
	 * NOT to be confused with `#resetKey()`, which removes a client from both the
	 * `current` and `previous` maps.
	 *
	 * @param client {Client} - The client to recycle.
	 * @param now {number} - The current time, to which the `windowMs` is added to get the `resetTime` for the client.
	 *
	 * @return {Client} - The modified client that was passed in, to allow for chaining.
	 */
	private resetClient;
	/**
	 * Retrieves or creates a client, given a key. Also ensures that the client being
	 * returned is in the `current` map.
	 *
	 * @param key {string} - The key under which the client is (or is to be) stored.
	 *
	 * @returns {Client} - The requested client.
	 */
	private getClient;
	/**
	 * Move current clients to previous, create a new map for current.
	 *
	 * This function is called every `windowMs`.
	 */
	private clearExpired;
}

export {
	rateLimit as default,
};

export {};