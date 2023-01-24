/**
 * ISCMONS block
 */
//% weight=100 color=#70c0f0 icon="\uf042" block="ISCMONS"
namespace iscmons {
	
	let TMP36_voltage = 0;
	let TMP36_temp = 0;
	let a = 0;
		
	/**
    * read temperature
    */
    //% blockId="ISCMONS_TMP36" block="TMP36 read in C"
    //% weight=80 blockGap=8
    //% parts=tmp36 trackArgs=0
	export function TMP36_read_celsius(): void {
		TMP36_voltage = pins.P0.analogRead();
		TMP36_temp = 50*TMP36_voltage + 20;
		pins.LED.digitalWrite(true);
    	control.waitMicros(4000);
    	pins.LED.digitalWrite(false);
    	//return a;
	}
}
