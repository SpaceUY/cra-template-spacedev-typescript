type PubSubEventHandler<T> = (payload?: T) => void;

type PubSubUnsubscribeHandler = () => void;

type Subscriptions<PubSubEvent> = Record<
  keyof PubSubEvent,
  // this is ok here because later we only accept PubSubEventHandler<PubSubEvent[T]>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  PubSubEventHandler<any>[]
>;

/**
 * # PubSub
 *
 * Publish and subscribe to events from anywhere in the app.
 *
 * Note: this feature belongs to the app's core, **you should NOT edit this file**.
 */
export class PubSub<PubSubEvent extends Record<string, unknown>> {
  private subscriptions: Subscriptions<PubSubEvent> =
    {} as Subscriptions<PubSubEvent>;

  subscribe<T extends keyof PubSubEvent>(
    eventName: T,
    handler: PubSubEventHandler<PubSubEvent[T]>,
  ): PubSubUnsubscribeHandler {
    if (!this.subscriptions[eventName]) {
      this.subscriptions[eventName] = [];
    }

    this.subscriptions[eventName].push(handler);

    return () => {
      if (this.subscriptions[eventName] instanceof Array) {
        this.subscriptions[eventName] = this.subscriptions[eventName].filter(
          (_handler) => _handler !== handler,
        );

        if (this.subscriptions[eventName].length === 0) {
          delete this.subscriptions[eventName];
        }
      }
    };
  }

  publish<T extends keyof PubSubEvent>(
    eventName: T,
    payload: PubSubEvent[T],
  ): void;

  publish<T extends keyof PubSubEvent>(eventName: T): void;

  publish<T extends keyof PubSubEvent>(
    eventName: T,
    payload?: PubSubEvent[T],
  ): void {
    if (this.subscriptions[eventName] instanceof Array) {
      this.subscriptions[eventName].forEach((_handler) => {
        _handler(payload);
      });
    }
  }
}
