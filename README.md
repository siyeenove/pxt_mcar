
# Siyeenove mCar Package

![](/image.png/)  

This library is designed to drive mCar, You can get mCar here.

[Buy](https://www.amazon.com/dp/B0DKX3G6M9)  

Product Tutorial: 

[Github](https://github.com/siyeenove/M1C0000)   
[Github PDF](https://siyeenove.github.io/M1C0000/mCar%20Tutorial%20-%20English.pdf)  

## Code Example
```JavaScript

// Process the received data in an infinite loop function. 
mCar.irCallBack(function () {
    // mCar performs different actions based on IR commands. 
    if (mCar.irButton(McarIRButtons.Up)) {
        // mCar goes forward at a speed of 100.
        mCar.carDirectionSpeed(McarDir.FW, 100)
    }
    if (mCar.irButton(McarIRButtons.Down)) {
        // mCar goes backward at a speed of 100.
        mCar.carDirectionSpeed(McarDir.BW, 100)
    }
    if (mCar.irButton(McarIRButtons.Left)) {
        // The mCar is turning left at a speed of 100 with a turn rate of 50.
        mCar.carTurn(McarTurn.Left, 50, 100)
    }
    if (mCar.irButton(McarIRButtons.Right)) {
        // The mCar is turning right at a speed of 100 with a turn rate of 50.
        mCar.carTurn(McarTurn.Right, 50, 100)
    }
    if (mCar.irButton(McarIRButtons.OK)) {
        // mCar stop
        mCar.carStop()
    }
    if (mCar.irValue() != 0) {
        // micro:bit 8 x 8 dot matrix Displays command values.
        basic.showNumber(mCar.irValue())
    }
})
// Set the calibration values of both mCar motors to 0.
mCar.wheelsAdjustment(0, 0)
basic.pause(1000)
basic.forever(function () {
	
})

```
## Supported targets
for PXT/microbit

## License
MIT

