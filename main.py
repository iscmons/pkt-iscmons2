"""

ISCMONS block

"""
# % weight=100 color=#70c0f0 icon="\uf042" block="ISCMONS"
"""

Servo moteur

"""
# % blockId="ISCMONS_SERVO" block="Motor turn in "
# % weight=80 blockGap=8
# % parts=HCSR04 trackArgs=0
@namespace
class iscmons:
    """
    
    TMP36
    
    """
    # % blockId="ISCMONS_TMP36" block="TMP36 read T in C"
    # % weight=80 blockGap=8
    # % parts=TMP36 trackArgs=0
    # return a;
    def TMP36_read_celsius():
        TMP36_voltage = pins.P0.analog_read()
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
    # % blockId="ISCMONS_BMP180T" block="BMP reads T in C"
    # % weight=80 blockGap=8
    # % parts=BMP180 trackArgs=0
    def BMP180_read_temperature(adr_i2c: number):
        BMP180_data_temperature = (getreg(adr_i2c, 0xFA) << 12) + (getreg(adr_i2c, 0xFB) << 4) + (getreg(adr_i2c, 0xFC) >> 4)
        BMP180_data_temperature = ((BMP180_data_temperature * 5 + 128) >> 8) / 100.
        return BMP180_data_temperature
    # % blockId="ISCMONS_BMP180P" block="BMP reads p in Pa"
    # % weight=80 blockGap=8
    # % parts=BMP180 trackArgs=0
    def BMP180_read_pressure(adr_i2c2: number):
        BMP180_data_pressure = (getreg(adr_i2c2, 0xF7) << 12) + (getreg(adr_i2c2, 0xF8) << 4) + (getreg(adr_i2c2, 0xF9) >> 4)
        return BMP180_data_pressure
    """
    
    HCSR04
    
    """
    # % blockId="ISCMONS_HCSR04" block="HCSR04 reads distance in cm"
    # % weight=80 blockGap=8
    # % parts=HCSR04 trackArgs=0
    def HCSR04_measure():
        pins.P0.digital_write(False)
        control.wait_micros(5)
        pins.P0.digital_write(True)
        control.wait_micros(10)
        pins.P0.digital_write(False)
        control.wait_for_event(0, 0)
        data = pins.P1.pulse_in(PulseValue.HIGH)
        return (data * 2) / 29.1