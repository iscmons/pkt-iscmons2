/**
 * ISCMONS block
 */
//% weight=100 color=#70c0f0 icon="\uf042" block="ISCMONS"
namespace iscmons {
	
	let a = 0;
	
	function get(): void{
		a = 1;
	}
	
	/**
     	* get pressure
     	*/
    	//% blockId="ISCMONS_TMP36" block="tmp36"
    	//% weight=80 blockGap=8
    	//% parts=tmp36 trackArgs=0
	export function doSomething(): number {
		get();
    		return a;
	}
}
