/**
 * ISCMONS block
 */
//% weight=100 color=#70c0f0 icon="\uf042" block="ISCMONS"
namespace iscmons {
		
	/**
    * TMP36
    */

    //% blockId="ISCMONS_TMP36" block="reads T in C on %pin with TMP36"
    //% weight=80 blockGap=8
    //% parts=TMP36 trackArgs=0
    //% group="TMP36"  
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

    //% blockId="ISCMONS_BMP180T" block="reads T in C with BMP180 on I2C %id"
    //% weight=80 blockGap=8
    //% parts=BMP180 trackArgs=0
    //% group="BMP180"  
    export function BMP180_read_temperature(id: number): number {
        let BMP180_data_temperature = (getreg(id, 0xFA) << 12) + (getreg(id, 0xFB) << 4) + (getreg(id,0xFC) >> 4)
        BMP180_data_temperature = ((BMP180_data_temperature * 5 + 128) >> 8) / 100.
        return BMP180_data_temperature;
    }

    //% blockId="ISCMONS_BMP180P" block="reads p in Pa with BMP180 on I2C %id"
    //% weight=80 blockGap=8
    //% parts=BMP180 trackArgs=0
    //% group="BMP180"  
    export function BMP180_read_pressure(id: number): number {
        let BMP180_data_pressure = (getreg(id, 0xF7) << 12) + (getreg(id, 0xF8) << 4) + (getreg(id,0xF9) >> 4)
        return BMP180_data_pressure;
    }

    /**
    * HCSR04
    */

    //% blockId="ISCMONS_HCSR04" block="reads distance in cm with HCSR04 with echo on %echo with trigger on %trig"
    //% weight=80 blockGap=8
    //% parts=HCSR04 trackArgs=0
    //% group="HCSR04"  
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

    //% blockId="ISCMONS_BUZZER" block="turns %bool buzzer on %pin"
    //% weight=80 blockGap=8
    //% parts=BUZZER trackArgs=0
    //% group="BUZZER"  
    export function Buzzer(pin: DigitalInOutPin, bool: boolean): void {
        //pins.P1.digitalWrite(bool);
        pin.digitalWrite(bool);
        return;
    }

    /**
    * SH1106 screen
    */

    //% blockId="ISCMONS_SH1106a" block="SH1106 displays"
    //% weight=80 blockGap=8
    //% parts=SH1106 trackArgs=0
    //% group="Screen"  
    export function SH1106_display(): void {

        return;
    }

    //% blockId="ISCMONS_SH1106b" block="SH1106 changes contrast"
    //% weight=80 blockGap=8
    //% parts=SH1106 trackArgs=0
    //% group="Screen"  
    export function SH1106_setcontrast(): void {
        return;
    }

    //% blockId="ISCMONS_SH1106"c block="SH1106 sets text"
    //% weight=80 blockGap=8
    //% parts=SH1106 trackArgs=0
    //% group="Screen"  
    export function SH1106_settext(): void {
        return;
    }

    /**
    * Data logger
    */

    //% blockId="ISCMONS_File" block="writes %text in %filename"
    //% weight=80 blockGap=8
    //% parts=SH1106 trackArgs=0
    //% group="Data logger"  
    export function write_filename(filename: string, text: string): void {
        storage.appendLine(filename, text);
    }
    
    /**
    * Servo moteur
    */

    //% blockId="ISCMONS_Servo" block="turns on the servo on %pin with %rate percent during %microsecond"
    //% weight=80 blockGap=8
    //% parts=SH1106 trackArgs=0
    //% group="Servo moteur"  
    export function servo_turn(pin: DigitalInOutPin, rate: number, millisecond: number): void {
        for (let i = 0; i < millisecond*10; i++) {
            pin.digitalWrite(true);
            control.waitMicros(rate);
            pin.digitalWrite(false);
            control.waitMicros(100-rate);
        }  
    }  

    /**
    * brushless moteur
    */

    //% blockId="ISCMONS_motor" block="turns %bool motor on %pin"
    //% weight=80 blockGap=8
    //% parts=Motor trackArgs=0
    //% group="motor"  
    export function motor_turn(pin: DigitalInOutPin, bool: boolean): void {
        pin.digitalWrite(bool);
        return;
    }
    
    /**
     * Motor pasàpas
     */

    //% blockId="ISCMONS_motorpasapas" block="motor is turn on"
    //% weight=80 blockGap=8
    //% parts=Motor trackArgs=0
    //% group="button"  
    export function motor_is_turn_on(pin: DigitalInOutPin): void {

        pins.P1.digitalWrite(true);
        pins.P2.digitalWrite(true);
        pins.P3.digitalWrite(false);
        pins.P4.digitalWrite(false);

        control.waitMicros(10000);

        pins.P1.digitalWrite(false);
        pins.P2.digitalWrite(true);
        pins.P3.digitalWrite(true);
        pins.P4.digitalWrite(false);

        control.waitMicros(10000);

        pins.P1.digitalWrite(false);
        pins.P2.digitalWrite(false);
        pins.P3.digitalWrite(true);
        pins.P4.digitalWrite(true);

        control.waitMicros(10000);

        pins.P1.digitalWrite(true);
        pins.P2.digitalWrite(false);
        pins.P3.digitalWrite(false);
        pins.P4.digitalWrite(true);

        control.waitMicros(10000);

        return;
    }



    /**
    * button
    */

    //% blockId="ISCMONS_button" block="button on %pin is pressed"
    //% weight=80 blockGap=8
    //% parts=Motor trackArgs=0
    //% group="button"  
    export function button_is_pressed(pin: DigitalInOutPin): boolean {
        return pin.digitalRead();
    }

 
}
