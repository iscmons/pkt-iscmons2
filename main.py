"""

ISCMONS block

"""
# % weight=100 color=#70c0f0 icon="\uf042" block="ISCMONS"
@namespace
class iscmons:
    """
    
    TMP36
    
    """
    # % blockId="ISCMONS_TMP36" block="reads T in C on %pin with TMP36"
    # % weight=80 blockGap=8
    # % parts=TMP36 trackArgs=0
    # % group="TMP36"  
    # return a;
    def TMP36_read_celsius(pin: AnalogInPin):
        TMP36_voltage = pin.analog_read()
        TMP36_temp = 50 * TMP36_voltage + 20
        print("coucou \n")
        # pins.LED.digitalWrite(true);
        control.wait_micros(1000000)
        print("coucou2 \n")
        # pins.LED.digitalWrite(false);
        control.wait_micros(1000000)
    # % blockId="ISCMONS_BME280T" block="reads T in C with BME280 on I2C %id"
    # % weight=80 blockGap=8
    # % parts=BME280 trackArgs=0
    # % group="BME280"
    def BME280_read_temperature(id2: number):
        return BME280(id2).temperature
    # % blockId="ISCMONS_BME280P" block="reads p in Pa with BME280 on I2C %id"
    # % weight=80 blockGap=8
    # % parts=BME280 trackArgs=0
    # % group="BME280"
    def BME280_read_pressure(id3: number):
        return BME280(id3).pressure
    # % blockId="ISCMONS_BME280H" block="reads h in percent with BME280 on I2C %id"
    # % weight=80 blockGap=8
    # % parts=BME280 trackArgs=0
    # % group="BME280"
    def BME280_read_humidity(id4: number):
        return BME280(id4).pressure
    """
    
    HCSR04
    
    """
    # % blockId="ISCMONS_HCSR04" block="reads distance in mm with HCSR04 with echo on %echo with trigger on %trig"
    # % weight=80 blockGap=8
    # % parts=HCSR04 trackArgs=0
    # % group="HCSR04"  
    def HCSR04_measure(echo: DigitalInOutPin, trig: DigitalInOutPin):
        trig.digital_write(False)
        control.wait_micros(5)
        trig.digital_write(True)
        control.wait_micros(10)
        trig.digital_write(False)
        control.wait_for_event(0, 0)
        data = echo.pulse_in(PulseValue.HIGH)
        return (data * 2) / 29.1
    """
    
    BUZZER (checked)
    
    """
    # % blockId="ISCMONS_BUZZER" block="turns %bool buzzer on %pin"
    # % weight=80 blockGap=8
    # % parts=BUZZER trackArgs=0
    # % group="BUZZER"  
    def Buzzer(pin2: DigitalInOutPin, bool2: bool):
        # pins.P1.digitalWrite(bool);
        pin2.digital_write(bool2)
        return
    """
    
    SSD1306 screen
    
    """
    # % blockId="ISCMONS_SSD1306" block="SH1106 displays %text on I2C %id"
    # % weight=80 blockGap=8
    # % parts=SH1106 trackArgs=0
    # % group="Screen"  
    def SSD1306_settext(id5: number, text: str):
        display = SSD1306_I2C(128, 64, id5)
        display.text(text, 0, 0, 1)
        display.show()
        return
    """
    
    Data logger
    
    """
    # % blockId="ISCMONS_File" block="writes %text in %filename"
    # % weight=80 blockGap=8
    # % parts=SH1106 trackArgs=0
    # % group="Data logger"  
    def write_filename(filename: str, text2: str):
        storage.append_line(filename, text2)
    """
    
    Servo moteur
    
    """
    # % blockId="ISCMONS_Servo" block="turns on the servo on %pin with %rate percent during %microsecond"
    # % weight=80 blockGap=8
    # % parts=SH1106 trackArgs=0
    # % group="Servo moteur"  
    def servo_turn(pin3: DigitalInOutPin, rate: number, millisecond: number):
        for i in range(millisecond * 10):
            pin3.digital_write(True)
            control.wait_micros(rate)
            pin3.digital_write(False)
            control.wait_micros(100 - rate)
    """
    
    lego moteur (checked)
    
    """
    # % blockId="ISCMONS_motor1" block="turn forward motor on %pin1 and %pin2"
    # % weight=80 blockGap=8
    # % parts=Motor trackArgs=0
    # % group="Lego Motor"
    def motor_forward(pin1: DigitalInOutPin, pin22: DigitalInOutPin):
        pin1.digital_write(True)
        pin22.digital_write(False)
        return
    # % blockId="ISCMONS_motor2" block="turn backward motor on %pin1 and %pin2"
    # % weight=80 blockGap=8
    # % parts=Motor trackArgs=0
    # % group="Lego Motor"
    def motor_backward(pin12: DigitalInOutPin, pin23: DigitalInOutPin):
        pin12.digital_write(False)
        pin23.digital_write(True)
        return
    # % blockId="ISCMONS_motor3" block="stop motor on %pin1 and %pin2"
    # % weight=80 blockGap=8
    # % parts=Motor trackArgs=0
    # % group="Lego Motor"
    def motor_stop(pin13: DigitalInOutPin, pin24: DigitalInOutPin):
        pin13.digital_write(False)
        pin24.digital_write(False)
        return
    """
    
    Motor pasàpas (checked)
    
    """
    # % blockId="ISCMONS_motorpasapas" block="turn on motor on %pin1 , %pin2 , %pin3 , %pin4"
    # % weight=80 blockGap=8
    # % parts=Motor trackArgs=0
    # % group="Brushless motor"  
    def motor_is_turn_on(pin14: DigitalInOutPin, pin25: DigitalInOutPin, pin32: DigitalInOutPin, pin4: DigitalInOutPin):
        pin14.digital_write(True)
        pin25.digital_write(True)
        pin32.digital_write(False)
        pin4.digital_write(False)
        control.wait_micros(10000)
        pin14.digital_write(False)
        pin25.digital_write(True)
        pin32.digital_write(True)
        pin4.digital_write(False)
        control.wait_micros(10000)
        pin14.digital_write(False)
        pin25.digital_write(False)
        pin32.digital_write(True)
        pin4.digital_write(True)
        control.wait_micros(10000)
        pin14.digital_write(True)
        pin25.digital_write(False)
        pin32.digital_write(False)
        pin4.digital_write(True)
        control.wait_micros(10000)
        return
    """
    
    Button (checked)
    
    """
    # % blockId="ISCMONS_button1" block="button on %pin is pressed"
    # % weight=80 blockGap=8
    # % parts=Motor trackArgs=0
    # % group="Button"  
    def button_is_pressed(pin5: DigitalInOutPin):
        return pin5.digital_read()
    # % blockId="ISCMONS_button2" block="button on %pin is not pressed"
    # % weight=80 blockGap=8
    # % parts=Motor trackArgs=0
    # % group="Button"  
    def button_is_not_pressed(pin6: DigitalInOutPin):
        return not pin6.digital_read()
    """
    
    Magnet (checket)
    
    """
    # % blockId="ISCMONS_magnet" block="turn on the magnet %bool on pin %pin"
    # % weight=80 blockGap=8
    # % parts=Motor trackArgs=0
    # % group="Magnet"  
    def magnet_turn(pin7: DigitalInOutPin, bool3: bool):
        pin7.digital_write(bool3)
        return
    """
    
    LED (checked)
    
    """
    # % blockId="ISCMONS_led" block="turn on the led %bool on pin %pin"
    # % weight=80 blockGap=8
    # % parts=Motor trackArgs=0
    # % group="LED"  
    def led_turn(pin8: DigitalInOutPin, bool4: bool):
        pin8.digital_write(bool4)
        return
    """
    
    RADIO 
    
    """
    # % blockId="ISCMONS_nrf24" block="send %numb with nfr24 on SPI %id with CE on %pin1 and CSN on %pin2"
    # % weight=80 blockGap=8
    # % parts=Motor trackArgs=0
    # % group="nrf24"  
    def send_nrf24_number(pin15: DigitalInOutPin, pin26: DigitalInOutPin, numb: number, id6: number):
        radio = NRF24(id6, pin26, pin15)
        return radio.send_number(numb)
    # % blockId="ISCMONS_nrf24" block="get number from nfr24 on SPI %id with CE on %pin1 and CSN on %pin2"
    # % weight=80 blockGap=8
    # % parts=Motor trackArgs=0
    # % group="nrf24"  
    def get_nrf24_number(pin16: DigitalInOutPin, pin27: DigitalInOutPin, id7: number):
        radio2 = NRF24(id7, pin27, pin16)
        return radio2.get_received_number()