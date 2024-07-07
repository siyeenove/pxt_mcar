
# Cute:bot Pro Car Package

![](/image.png/)

This library is designed to drive mCar, You can get mCar here.

https://xxx

You can refer to this [wiki](http://wiki.siyeenova.com)

## Code Example
```JavaScript

mCar.irCallback(function () {
    if (mCar.irButton(mCarIRButtons.Up)) {
        mCar.carDir(mCarDir.FW, 100)
    }
    if (mCar.irButton(mCarIRButtons.Down)) {
        mCar.carDir(mCarDir.BW, 100)
    }
    if (mCar.irButton(mCarIRButtons.OK)) {
        mCar.carStop()
    }
})
basic.forever(function () {
	
})

```
## Supported targets
for PXT/microbit

## License
MIT

