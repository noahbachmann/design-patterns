export interface Publisher {
	enter(): number;
	exit(): number;
	occupied: number;
	name: string;
}

export class ParkingLot implements Publisher {
	public occupied: number = 0;

	constructor(
		public name: string,
		public capacity: number,
	) {}

	enter(): number {
		if (!this.isFull()) {
			return ++this.occupied;
		} else {
			throw new Error(`the parking lot is full`);
		}
	}

	exit(): number {
		if (!this.isEmpty()) {
			return --this.occupied;
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
}
