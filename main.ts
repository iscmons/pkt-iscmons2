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

    //% blockId="ISCMONS_BME280T" block="reads T in C with BME280 on I2C %id"
    //% weight=80 blockGap=8
    //% parts=BME280 trackArgs=0
    //% group="BME280"
    export function BME280_read_temperature(id: number): number {
        return BME280(id).temperature;
    }

    //% blockId="ISCMONS_BME280P" block="reads p in Pa with BME280 on I2C %id"
    //% weight=80 blockGap=8
    //% parts=BME280 trackArgs=0
    //% group="BME280"
    export function BME280_read_pressure(id: number): number {
        return BME280(id).pressure;
    }

    //% blockId="ISCMONS_BME280H" block="reads h in percent with BME280 on I2C %id"
    //% weight=80 blockGap=8
    //% parts=BME280 trackArgs=0
    //% group="BME280"
    export function BME280_read_humidity(id: number): number {
        return BME280(id).pressure;
    }

    /**
    * HCSR04
    */

    //% blockId="ISCMONS_HCSR04" block="reads distance in mm with HCSR04 with echo on %echo with trigger on %trig"
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
    * SSD1306 screen
    */

    //% blockId="ISCMONS_SSD1306" block="SH1106 displays %text on I2C %id"
    //% weight=80 blockGap=8
    //% parts=SH1106 trackArgs=0
    //% group="Screen"  
    export function SSD1306_settext(id: number, text: string): void {
        let display = SSD1306_I2C(128, 64, id)
        display.text(text, 0, 0, 1)
        display.show()
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
    * lego moteur (checked)
    */

    //% blockId="ISCMONS_motor1" block="turn forward motor on %pin1 and %pin2"
    //% weight=80 blockGap=8
    //% parts=Motor trackArgs=0
    //% group="Lego Motor"
    export function motor_forward(pin1: DigitalInOutPin, pin2: DigitalInOutPin): void {
        pin1.digitalWrite(true);
        pin2.digitalWrite(false);
        return;
    }

    //% blockId="ISCMONS_motor2" block="turn backward motor on %pin1 and %pin2"
    //% weight=80 blockGap=8
    //% parts=Motor trackArgs=0
    //% group="Lego Motor"
    export function motor_backward(pin1: DigitalInOutPin, pin2: DigitalInOutPin): void {
        pin1.digitalWrite(false);
        pin2.digitalWrite(true);
        return;
    }

    //% blockId="ISCMONS_motor3" block="stop motor on %pin1 and %pin2"
    //% weight=80 blockGap=8
    //% parts=Motor trackArgs=0
    //% group="Lego Motor"
    export function motor_stop(pin1: DigitalInOutPin, pin2: DigitalInOutPin): void {
        pin1.digitalWrite(false);
        pin2.digitalWrite(false);
        return;
    }
    
    /**
     * Motor pasàpas (checked)
     */

    //% blockId="ISCMONS_motorpasapas" block="turn on motor on %pin1 , %pin2 , %pin3 , %pin4"
    //% weight=80 blockGap=8
    //% parts=Motor trackArgs=0
    //% group="Brushless motor"  
    export function motor_is_turn_on(pin1: DigitalInOutPin, pin2: DigitalInOutPin, pin3: DigitalInOutPin, pin4: DigitalInOutPin): void {

        pin1.digitalWrite(true);
        pin2.digitalWrite(true);
        pin3.digitalWrite(false);
        pin4.digitalWrite(false);

        control.waitMicros(10000);

        pin1.digitalWrite(false);
        pin2.digitalWrite(true);
        pin3.digitalWrite(true);
        pin4.digitalWrite(false);

        control.waitMicros(10000);

        pin1.digitalWrite(false);
        pin2.digitalWrite(false);
        pin3.digitalWrite(true);
        pin4.digitalWrite(true);

        control.waitMicros(10000);

        pin1.digitalWrite(true);
        pin2.digitalWrite(false);
        pin3.digitalWrite(false);
        pin4.digitalWrite(true);

        control.waitMicros(10000);

        return;
    }

    /**
    * Button (checked)
    */

    //% blockId="ISCMONS_button1" block="button on %pin is pressed"
    //% weight=80 blockGap=8
    //% parts=Motor trackArgs=0
    //% group="Button"  
    export function button_is_pressed(pin: DigitalInOutPin): boolean {
        return pin.digitalRead();
    }

    //% blockId="ISCMONS_button2" block="button on %pin is not pressed"
    //% weight=80 blockGap=8
    //% parts=Motor trackArgs=0
    //% group="Button"  
    export function button_is_not_pressed(pin: DigitalInOutPin): boolean {
        return !pin.digitalRead();
    }

    /**
    * Magnet (checket)
    */

    //% blockId="ISCMONS_magnet" block="turn on the magnet %bool on pin %pin"
    //% weight=80 blockGap=8
    //% parts=Motor trackArgs=0
    //% group="Magnet"  
    export function magnet_turn(pin: DigitalInOutPin, bool: boolean): void {
        pin.digitalWrite(bool);
        return;
    }


    /**
    * LED (checked)
    */

    //% blockId="ISCMONS_led" block="turn on the led %bool on pin %pin"
    //% weight=80 blockGap=8
    //% parts=Motor trackArgs=0
    //% group="LED"  
    export function led_turn(pin: DigitalInOutPin, bool: boolean): void {
        pin.digitalWrite(bool);
        return;
    }


    /**
    * RADIO 
    */

    //% blockId="ISCMONS_nrf24s" block="send %numb with nfr24 on SPI %id with CE on %pin1 and CSN on %pin2"
    //% weight=160 blockGap=8
    //% parts=Motor trackArgs=0
    //% group="nrf24"  
    export function send_nrf24_number(numb: number, id: number , pin1: DigitalInOutPin, pin2: DigitalInOutPin): boolean {
        let radio = NRF24(id, pin2, pin1);
        return radio.send_number(numb);
    }

    //% blockId="ISCMONS_nrf24r" block="get number from nfr24 on SPI %id with CE on %pin1 and CSN on %pin2"
    //% weight=160 blockGap=8
    //% parts=Motor trackArgs=0
    //% group="nrf24"  
    export function get_nrf24_number(id: number, pin1: DigitalInOutPin, pin2: DigitalInOutPin): number {
        let radio = NRF24(id, pin2, pin1);
        return radio.get_received_number();
    }



 
}
