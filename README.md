
# Siyeenove mCar Package

![](/image.png/)

This library is designed to drive mCar, You can get mCar here.

[Official website](http://siyeenove.com)

You can refer to this [tutorial](http://siyeenove.com/tutorial)

## Code Example
```JavaScript

mCar.irCallback(function () {
    if (mCar.irButton(mCarIRButtons.Up)) {
        mCar.carDir(mCarDir.FW, 100)
    }
    if (mCar.irButton(mCarIRButtons.Down)) {
        mCar.carDir(mCarDir.BW, 100)
    }
    if (mCar.irButton(mCarIRButtons.Left)) {
        mCar.carTurn(mCarTurn.Left, 50, 100)
    }
    if (mCar.irButton(mCarIRButtons.Right)) {
        mCar.carTurn(mCarTurn.Right, 50, 100)
    }
    if (mCar.irButton(mCarIRButtons.OK)) {
        mCar.carStop()
    }
    if (mCar.irValue() != 0) {
        basic.showNumber(mCar.irValue())
    }
})
mCar.wheelsAdjustment(0, 0)
basic.pause(1000)
basic.forever(function () {
	
})

```
## Supported targets
for PXT/microbit

## License
MIT

