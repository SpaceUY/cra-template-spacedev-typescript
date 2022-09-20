/**
 * # PubSubEvent Type
 *
 * By extending this type we enable type-safe events.
 *
 * The key will be the event name, while the type will be the payload type.
 *
 * ## Example:
 * ```typescript
 * type PubSubEvent = {
 *   countIncreased: number;
 *   postCreated: Post;
 * };
 * ```
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export type PubSubEvent = {};
