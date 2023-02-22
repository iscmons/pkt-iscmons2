/**
 * ISCMONS block
 */
//% weight=100 color=#70c0f0 icon="\uf042" block="ISCMONS"
namespace iscmons {
		
	/**
    * TMP36
    */
    //% blockId="ISCMONS_TMP36" block="TMP36 read T in C on %pin"
    //% weight=80 blockGap=8
    //% parts=TMP36 trackArgs=0
    export function TMP36_read_celsius(pin:AnalogInPin): void {
		let TMP36_voltage = pin.analogRead();
		let TMP36_temp = 50*TMP36_voltage + 20;
        console.log("coucou \n")
        //pins.LED.digitalWrite(true);
        control.waitMicros(1000000);
        console.log("coucou2 \n");
        //pins.LED.digitalWrite(false);
        control.waitMicros(1000000);
    	//return a;
	}

    /**
    * BMP180
    */
    function getreg(adr: number, reg: number): number {
        pins.i2cWriteNumber(adr, reg, NumberFormat.UInt8BE);
        return pins.i2cReadNumber(adr, NumberFormat.UInt8BE);
    }

    //% blockId="ISCMONS_BMP180T" block="BMP reads T in C"
    //% weight=80 blockGap=8
    //% parts=BMP180 trackArgs=0
    export function BMP180_read_temperature(adr_i2c: number): number {
        let BMP180_data_temperature = (getreg(adr_i2c, 0xFA) << 12) + (getreg(adr_i2c, 0xFB) << 4) + (getreg(adr_i2c,0xFC) >> 4)
        BMP180_data_temperature = ((BMP180_data_temperature * 5 + 128) >> 8) / 100.
        return BMP180_data_temperature;
    }

    //% blockId="ISCMONS_BMP180P" block="BMP reads p in Pa"
    //% weight=80 blockGap=8
    //% parts=BMP180 trackArgs=0
    export function BMP180_read_pressure(adr_i2c: number): number {
        let BMP180_data_pressure = (getreg(adr_i2c, 0xF7) << 12) + (getreg(adr_i2c, 0xF8) << 4) + (getreg(adr_i2c,0xF9) >> 4)
        return BMP180_data_pressure;
    }

    /**
    * HCSR04
    */

    //% blockId="ISCMONS_HCSR04" block="HCSR04 reads distance in cm on %echo with trigger on %trig"
    //% weight=80 blockGap=8
    //% parts=HCSR04 trackArgs=0
    export function HCSR04_measure(echo: DigitalInOutPin, trig: DigitalInOutPin): number {
        trig.digitalWrite(false);
        control.waitMicros(5);
        trig.digitalWrite(true);
        control.waitMicros(10);
        trig.digitalWrite(false);
        control.waitForEvent(0, 0);
        let data = echo.pulseIn(PulseValue.High);
        return (data*2)/29.1;
    }

    /**
    * BUZZER (checked)
    */

    //% blockId="ISCMONS_BUZZER" block="Buzzer turns %bool on %pin"
    //% weight=80 blockGap=8
    //% parts=BUZZER trackArgs=0
    export function Buzzer(pin: DigitalInOutPin, bool: boolean): void {
        //pins.P1.digitalWrite(bool);
        pin.digitalWrite(bool);
        return;
    }

    /**
    * SH1106 screen
    */

     //% blockId="ISCMONS_SH1106" block="SH1106 displays"
    //% weight=80 blockGap=8
    //% parts=SH1106 trackArgs=0
    export function SH1106_display(): void {

        return;
    }

    //% blockId="ISCMONS_SH1106" block="SH1106 changes contrast"
    //% weight=80 blockGap=8
    //% parts=SH1106 trackArgs=0
    export function SH1106_setcontrast(): void {
        return;
    }

    //% blockId="ISCMONS_SH1106" block="SH1106 sets text"
    //% weight=80 blockGap=8
    //% parts=SH1106 trackArgs=0
    export function SH1106_settext(): void {
        return;
    }

    /**
    * Data logger
    */


    


    /**
    * Servo moteur
    */

     //% blockId="ISCMONS_SERVO" block="Motor turn in "
    //% weight=80 blockGap=8
    //% parts=HCSR04 trackArgs=0

    

    


}
