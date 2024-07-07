
# Cute:bot Pro Car Package

![](/image.png/)

This library is designed to drive mCar, You can get mCar here.

https://xxx

You can refer to this [wiki](http://wiki.siyeenova.com)

## Code Example
```JavaScript

mCar.irCallback(function () {
    if (mCar.irButton(mCarIRButtons.Up)) {
        mCar.distanceRunning(mCarOrientation.Advance, 10, mCarDistanceUnits.Cm)
    }
    if (mCar.irButton(mCarIRButtons.Menu)) {
        mCar.fullSpeedAhead()
    }
    if (mCar.irButton(mCarIRButtons.Zero)) {
        led.plot(0, 0)
        k = 1
    }
})
// tests go here; this will not be compiled when this package is used as an extension.
input.onButtonPressed(Button.A, function () {
    i += 1
    if (i == 1) {
        mCar.colorLight(mCarRGBLight.RGBA, 0xff0000)
    }
    if (i == 2) {
        mCar.colorLight(mCarRGBLight.RGBA, 0x00ff00)
    }
    if (i == 3) {
        mCar.colorLight(mCarRGBLight.RGBA, 0x0000ff)
        i = 0
    }
})
input.onButtonPressed(Button.B, function () {
    j += 1
    if (j == 1) {
        pins.digitalWritePin(DigitalPin.P1, 1)
        pins.digitalWritePin(DigitalPin.P2, 0)
        pins.digitalWritePin(DigitalPin.P13, 0)
        pins.digitalWritePin(DigitalPin.P14, 0)
    }
    if (j == 2) {
        pins.digitalWritePin(DigitalPin.P1, 0)
        pins.digitalWritePin(DigitalPin.P2, 1)
        pins.digitalWritePin(DigitalPin.P13, 0)
        pins.digitalWritePin(DigitalPin.P14, 0)
    }
    if (j == 3) {
        pins.digitalWritePin(DigitalPin.P1, 0)
        pins.digitalWritePin(DigitalPin.P2, 0)
        pins.digitalWritePin(DigitalPin.P13, 1)
        pins.digitalWritePin(DigitalPin.P14, 0)
    }
    if (j == 4) {
        pins.digitalWritePin(DigitalPin.P1, 0)
        pins.digitalWritePin(DigitalPin.P2, 0)
        pins.digitalWritePin(DigitalPin.P13, 0)
        pins.digitalWritePin(DigitalPin.P14, 1)
        j = 0
    }
})
let j = 0
let i = 0
let k = 0
music.setBuiltInSpeakerEnabled(false)
basic.pause(100)
mCar.extendServoControl(ServoType.Servo180, mCarServoIndex.S1, 0)
mCar.extendServoControl(ServoType.Servo180, mCarServoIndex.S2, 0)
mCar.extendServoControl(ServoType.Servo180, mCarServoIndex.S3, 0)
mCar.extendServoControl(ServoType.Servo180, mCarServoIndex.S4, 0)
basic.pause(500)
mCar.extendServoControl(ServoType.Servo180, mCarServoIndex.S1, 180)
mCar.extendServoControl(ServoType.Servo180, mCarServoIndex.S2, 180)
mCar.extendServoControl(ServoType.Servo180, mCarServoIndex.S3, 180)
mCar.extendServoControl(ServoType.Servo180, mCarServoIndex.S4, 180)
basic.pause(500)

k = 0
i = 0
j = 0
music.playTone(262, music.beat(BeatFraction.Half))
basic.forever(function () {
    if (mCar.ultrasonic(SonarUnit.Centimeters) <= 5) {
        mCar.pwmCruiseControl(0, 0)
    }
    if (k == 0) {
        mCar.extendMotorControl(100)
    } else if (k == 1) {
        for (let index = 0; index < 10000; index++) {
            mCar.trackbitStateValue()
            if (mCar.getGrayscaleSensorState(TrackbitStateType.Tracking_State_7) || (mCar.getGrayscaleSensorState(TrackbitStateType.Tracking_State_9) || (mCar.getGrayscaleSensorState(TrackbitStateType.Tracking_State_11) || (mCar.getGrayscaleSensorState(TrackbitStateType.Tracking_State_8) || mCar.getGrayscaleSensorState(TrackbitStateType.Tracking_State_3))))) {
                mCar.pwmCruiseControl(0, 70)
            } else if (mCar.getGrayscaleSensorState(TrackbitStateType.Tracking_State_6) || (mCar.getGrayscaleSensorState(TrackbitStateType.Tracking_State_13) || (mCar.getGrayscaleSensorState(TrackbitStateType.Tracking_State_14) || (mCar.getGrayscaleSensorState(TrackbitStateType.Tracking_State_12) || mCar.getGrayscaleSensorState(TrackbitStateType.Tracking_State_2))))) {
                mCar.pwmCruiseControl(70, 0)
            } else if (mCar.getGrayscaleSensorState(TrackbitStateType.Tracking_State_5) || mCar.getGrayscaleSensorState(TrackbitStateType.Tracking_State_1)) {
                mCar.pwmCruiseControl(50, 50)
            }
        }
        mCar.pwmCruiseControl(0, 0)
        k = 0
    }
})

```
## Supported targets
for PXT/microbit

## License
MIT

