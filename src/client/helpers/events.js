export const EventEmitter = {
  events: {},
  subscribe(event, callback) {
    if (!this.events[event]) this.events[event] = [];
    this.events[event].push(callback);
  },
  dispatch(event, data) {
    if (!this.events[event]) return;
    this.events[event].forEach((callback) => callback(data));
  },
  unsubscribe(event) {
    if (!this.events[event]) return;
    delete this.events[event];
  },
};
