import { PubSub } from "../core/pub-sub/PubSub";

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
export type PubSubEvent = {};

/**
 * # PubSub
 *
 * Extend the type `PubSubEvent` to enable type-safe events.
 *
 * The key will be the event name, while the type will be the payload type.
 *
 * ## Type extension:
 * ```typescript
 * // utilities/pub-sub.utility.ts
 * type PubSubEvent = {
 *   countIncreased: number;
 *   postCreated: Post;
 * };
 *
 * ```
 *
 * ## Usage:
 * ```typescript
 * import pubSub from "utilities/pub-sub.utility.ts";
 *
 * pubSub.subscribe("countIncreased", (newCount) => {
 *   console.log("countIncreased", newCount);
 * });
 *
 * pubSub.publish("countIncreased", 1);
 * ```
 */
const pubSub = new PubSub<PubSubEvent>();

export { pubSub };
