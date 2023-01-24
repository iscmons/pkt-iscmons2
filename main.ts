/**
 * ISCMONS block
 */
//% weight=100 color=#70c0f0 icon="\uf042" block="ISCMONS"
namespace iscmons {
	
    // TMP36 variables
	let TMP36_voltage = 0;
	let TMP36_temp = 0;
	let a = 0;

    // BMP180 variables
    let BMP180_adr = 0;
    let BMP180_data_pressure;
    let BMP180_data_temperature;
		
	/**
    * TMP36 : read temperature
    */
    //% blockId="ISCMONS_TMP36" block="TMP36 read T in C"
    //% weight=80 blockGap=8
    //% parts=tmp36 trackArgs=0
	export function TMP36_read_celsius(): void {
		TMP36_voltage = pins.P0.analogRead();
		TMP36_temp = 50*TMP36_voltage + 20;
		pins.LED.digitalWrite(true);
    	control.waitMicros(4000);
        pins.LED.digitalWrite(false);
        control.waitMicros(4000);
    	//return a;
	}

    /**
    * BMP180 : read temperature
    */

    //% blockId="ISCMONS_BMP180" block="definir BMP"
    //% weight=80 blockGap=8
    //% parts=tmp36 trackArgs=0
    export function BMP180_create(adr_i2c: number): void {
        BMP180_adr = adr_i2c;
    }

    function getreg(reg: number): number {
        pins.i2cWriteNumber(BMP180_adr, reg, NumberFormat.UInt8BE);
        return pins.i2cReadNumber(BMP180_adr, NumberFormat.UInt8BE);
    }

    //% blockId="ISCMONS_BMP180" block="BMP read T in C"
    //% weight=80 blockGap=8
    //% parts=tmp36 trackArgs=0
    export function BMP180_read_temperature(): number {
        BMP180_data_temperature = (getreg(0xFA) << 12) + (getreg(0xFB) << 4) + (getreg(0xFC) >> 4)
        BMP180_data_temperature = ((BMP180_data_temperature * 5 + 128) >> 8) / 100.
        return BMP180_data_temperature;
    }

    //% blockId="ISCMONS_BMP180" block="BMP read p in Pa"
    //% weight=80 blockGap=8
    //% parts=tmp36 trackArgs=0
    export function BMP180_read_pressure(): number {
        BMP180_data_pressure = (getreg(0xF7) << 12) + (getreg(0xF8) << 4) + (getreg(0xF9) >> 4)
        return BMP180_data_pressure;
    }

    


}
