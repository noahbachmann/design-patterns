import { Publisher } from "./parking_lot.ts";

export interface Subscriber {
	log(enter: boolean): string;
}

export class Display implements Subscriber {
	publisher: Publisher;
	constructor(pb: Publisher) {
		this.publisher = pb;
	}

	log(enter: boolean): string {
		return `A car ${enter ? "entered" : "left"} the lot ${this.publisher.name}: ${this.publisher.occupied}`;
	}
}
