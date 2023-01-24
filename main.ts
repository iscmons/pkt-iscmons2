
/**
 * ISCMONS block
 */
//% weight=100 color=#70c0f0 icon="\uf042" block="iscmons"
namespace bme280 {
    let TMP36pin = 0;
    
    /**
     * get humidity
     */
    //% blockId="BME280_HUMIDITY" block="humidity"
    //% weight=80 blockGap=8
    //% parts=bme280 trackArgs=0
    function TMP36read (text: string) {
        TMP36pin = pins.P0.analogRead();
        return TMP36pin;
    }
}
