
namespace nrf24 {
    /**
     * Registers a custom gesture recognizer
     * @param id 
     * @param update true if gesture detected
     * @param handler 
     */

    export function NRF24(id: number,
        pin1: DigitalInOutPin,
        pin2: DigitalInOutPin): any {
    }
}


namespace bme280 {
    /**
     * Registers a custom gesture recognizer
     * @param id 
     * @param update true if gesture detected
     * @param handler 
     */

    export function BME280(id: number): any {
    }
}


namespace ssd1306 {
    /**
     * Registers a custom gesture recognizer
     * @param id 
     * @param update true if gesture detected
     * @param handler 
     */

    export function SSD1306_I2C(pixx: number, pixy: number, id: number): any {
    }
}
