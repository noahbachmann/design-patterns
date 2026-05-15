import { Publisher, Subscriber } from "./parking_lot.ts";

export class Display implements Subscriber {
	constructor(
		pb: Publisher,
		public name: string,
	) {
		pb.subscribe(this);
	}

	log(message: string) {
		console.log(this.name + ": " + message);
	}
}
