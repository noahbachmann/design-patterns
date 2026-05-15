import { Rectangle, Rectangular } from "./geometry_third_party.ts";

export interface Quadratic {
	getSide(): number;
}

export class Square extends Rectangle implements Quadratic {
	constructor(
		width: number,
		height: number,
		private side: number,
	) {
		super(width, height);
	}

	public toString(): string {
		return `Square(${this.side})`;
	}

	public getSide(): number {
		return this.side;
	}
}

export class RectangleAdapter implements Rectangular {
	constructor(private square: Quadratic) {}

	public getWidth(): number {
		return this.square.getSide();
	}

	public getHeight(): number {
		return this.square.getSide();
	}
}
