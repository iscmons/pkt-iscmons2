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
    """
    
    BMP180
    
    """
    def getreg(adr: number, reg: number):
        pins.i2c_write_number(adr, reg, NumberFormat.UINT8_BE)
        return pins.i2c_read_number(adr, NumberFormat.UINT8_BE)
    # % blockId="ISCMONS_BMP180T" block="reads T in C with BMP180 on I2C %id"
    # % weight=80 blockGap=8
    # % parts=BMP180 trackArgs=0
    # % group="BMP180"  
    def BMP180_read_temperature(id2: number):
        BMP180_data_temperature = (getreg(id2, 0xFA) << 12) + (getreg(id2, 0xFB) << 4) + (getreg(id2, 0xFC) >> 4)
        BMP180_data_temperature = ((BMP180_data_temperature * 5 + 128) >> 8) / 100.
        return BMP180_data_temperature
    # % blockId="ISCMONS_BMP180P" block="reads p in Pa with BMP180 on I2C %id"
    # % weight=80 blockGap=8
    # % parts=BMP180 trackArgs=0
    # % group="BMP180"  
    def BMP180_read_pressure(id3: number):
        BMP180_data_pressure = (getreg(id3, 0xF7) << 12) + (getreg(id3, 0xF8) << 4) + (getreg(id3, 0xF9) >> 4)
        return BMP180_data_pressure
    """
    
    HCSR04
    
    """
    # % blockId="ISCMONS_HCSR04" block="reads distance in cm with HCSR04 with echo on %echo with trigger on %trig"
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
    
    SH1106 screen
    
    """
    # % blockId="ISCMONS_SH1106" block="SH1106 displays"
    # % weight=80 blockGap=8
    # % parts=SH1106 trackArgs=0
    # % group="Screen"  
    def SH1106_display():
        return
    # % blockId="ISCMONS_SH1106" block="SH1106 changes contrast"
    # % weight=80 blockGap=8
    # % parts=SH1106 trackArgs=0
    # % group="Screen"  
    def SH1106_setcontrast():
        return
    # % blockId="ISCMONS_SH1106" block="SH1106 sets text"
    # % weight=80 blockGap=8
    # % parts=SH1106 trackArgs=0
    # % group="Screen"  
    def SH1106_settext():
        return
    """
    
    Data logger
    
    """
    # % blockId="ISCMONS_File" block="writes %text in %filename"
    # % weight=80 blockGap=8
    # % parts=SH1106 trackArgs=0
    # % group="Data logger"  
    def write_filename(filename: str, text: str):
        storage.append_line(filename, text)
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