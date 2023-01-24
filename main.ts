
let TMP36pin = 0;
    
function TMP36read (text: string) {
    TMP36pin = pins.P0.analogRead();
    return TMP36pin;
}

