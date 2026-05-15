export interface Publisher {
	enter(): void;
	exit(): void;
	subscribe(subscriber: Subscriber): void;
	subscribers: Subscriber[];
}

export interface Subscriber {
	log(message: string): void;
}

export class ParkingLot implements Publisher {
	public occupied: number = 0;

	constructor(
		public name: string,
		public capacity: number,
		public subscribers: Subscriber[] = [],
	) {}

	enter() {
		if (!this.isFull()) {
			++this.occupied;
			this.subscribers.forEach((sub) => sub.log(this.stringifyMessage(true)));
		} else {
			throw new Error(`the parking lot is full`);
		}
	}

	exit() {
		if (!this.isEmpty()) {
			--this.occupied;
			this.subscribers.forEach((sub) => sub.log(this.stringifyMessage(false)));
		} else {
			throw new Error(`the parking lot is empty`);
		}
	}

	isFull() {
		return this.occupied == this.capacity;
	}

	isEmpty() {
		return this.occupied == 0;
	}

	private stringifyMessage(enter: boolean): string {
		return `A car ${enter ? "entered" : "left"} the lot ${this.name}: ${this.occupied}/${this.capacity} occupied`;
	}

	subscribe(subscriber: Subscriber) {
		this.subscribers.push(subscriber);
		subscriber.log(`${this.name}: ${this.occupied}/${this.capacity} occupied`);
	}
}
