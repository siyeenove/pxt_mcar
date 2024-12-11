
# Siyeenove mCar Package

![](/image.png/)  

This library is designed to drive mCar, You can get mCar here.

[Buy](https://www.amazon.com/dp/B0DKX3G6M9)  

Product Tutorial: 

[Github](https://github.com/siyeenove/M1C0000)   
[Github PDF](https://siyeenove.github.io/M1C0000/mCar%20Tutorial%20-%20English.pdf)  

## Code Example
```JavaScript
//mCar ran forward at full speed.
mCar.setWheelDirectionSpeed(mCar.McarWheels.LeftWheel, mCar.WheelDir.FW, 100)
```

```JavaScript
//Set the speed and direction of the left and right wheels of the mCar. 
mCar.setWheelSpeed(-100, 100)
```

```JavaScript
//Set mCar left and right wheels to stop.
mCar.wheelStop(mCar.McarWheels.AllWheel)
```

```JavaScript
//Wheels speed calibration.
//When the speed of the left and right wheels of the mCar trolley is not consistent,
//this function can adjust the speed of the wheel and save it permanently.
mCar.wheelsAdjustment(0, 0) 
```

```JavaScript
//mCar ran forward at full speed.
mCar.carDirectionSpeed(mCar.McarDir.FW, 100)
```

```JavaScript
//Set mCar to turn left at full speed.
mCar.carTurnPlace(mCar.McarTurn.Left, 100)
```

```JavaScript
//Set mCar to turn left at full speed at 50% turn rate.
mCar.carTurn(mCar.McarTurn.Left, 50, 100)
```

```JavaScript
//mCar stop.
mCar.carStop()
```

```JavaScript
//Set mCar two headlights on red.
mCar.rgbLight(mCar.McarRGBLight.RGBA, 0xff0000)  
```

```JavaScript
//Set mCar two headlights on blue.
mCar.singleHeadlights(mCar.McarRGBLight.RGBA, 0, 0, 255)
```

```JavaScript
//Set mCar two headlights off.
mCar.turnOffAllHeadlights()
```

```JavaScript
//Read and display the value of the 3-way grayscale sensor.
basic.forever(function () {
    mCar.trackbitStateValue()
    if (mCar.readGrayscaleSensorState(mCar.TrackbitStateType.TrackingState0)) {
        basic.showNumber(mCar.returnGrayscaleSensorValue())
    } else if (mCar.trackbitChannelState(mCar.TrackbitChannel.Three, mCar.TrackbitType.State0)) {
        basic.showNumber(mCar.returnGrayscaleSensorValue())
    }
})
```

```JavaScript
//Read and display the value of the Sonar.
basic.forever(function () {
    basic.showNumber(mCar.sonar(mCar.SonarUnit.Centimeters))
    basic.pause(500)
})
```

```JavaScript
//Read and display the value of the "OK" key of the infrared remote control.
mCar.irCallBack(function () {
    if (mCar.irButton(mCar.McarIRButtons.OK)) {
        basic.showNumber(mCar.irValue())
    }
})
```

```JavaScript
//Set the 180-degree servo of S1 port to turn 0-180 degrees.
basic.forever(function () {
    mCar.extendServoControl(mCar.McarServoIndex.S1, mCar.ServoType.Servo180, 0)
    basic.pause(1000)
    mCar.extendServoControl(mCar.McarServoIndex.S1, mCar.ServoType.Servo180, 180)
    basic.pause(1000)
})
```

```JavaScript
//Set the 360-degree servo at S1 port to turn clockwise and counterclockwise.
basic.forever(function () {
    mCar.continuousServoControl(mCar.McarServoIndex.S1, -100)
    basic.pause(1000)
    mCar.continuousServoControl(mCar.McarServoIndex.S1, 100)
    basic.pause(1000)
})
```

```JavaScript
//Set mCar external 3 AA batteries, and infinite loop display power level.
basic.showNumber(mCar.batteryLevel(mCar.BatteryType.AA))
basic.forever(function () {
    basic.pause(1000)
    basic.showNumber(mCar.batteryLevel(mCar.BatteryType.AA))
})
```

```JavaScript
//Send a string to the left and right text fields of the APP via Bluetooth serial port.
bluetooth.onBluetoothConnected(function () {
    basic.showIcon(IconNames.Happy)
    while (true) {
        bluetooth.uartWriteString(mCar.display(mCar.Textview.Left, ""))
        basic.pause(1000)
    }
})
bluetooth.onBluetoothDisconnected(function () {
    basic.showIcon(IconNames.Sad)
})
basic.forever(function () {
	
})
```

```JavaScript
//Check whether the character received by the Bluetooth serial port is the instruction of the APP.
let data = ""
bluetooth.onBluetoothConnected(function () {
    basic.showIcon(IconNames.Happy)
    while (true) {
        data = bluetooth.uartReadUntil(serial.delimiters(Delimiters.Hash))
        if (mCar.appButton(data, mCar.AppButton.F1)) {
            basic.showIcon(IconNames.Heart)
            basic.pause(1000)
        }
    }
})
bluetooth.onBluetoothDisconnected(function () {
    basic.showIcon(IconNames.Sad)
})
basic.forever(function () {
	
})
```

```JavaScript
//Read the firmware version of the chip on the mCar.
basic.forever(function () {
    basic.showString(mCar.readVersions())
    basic.pause(1000)
})

```

## Supported targets
for PXT/microbit

## License
MIT

