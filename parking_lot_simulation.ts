import { Display } from "./display.ts";
import { ParkingLot } from "./parking_lot.ts";

const bahnhofParking = new ParkingLot("Bahnhof Parking", 100);
const screen = new Display(bahnhofParking, "Display 1");

bahnhofParking.enter();
bahnhofParking.exit();
