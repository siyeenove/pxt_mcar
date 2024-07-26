mCar.irCallback(function () {
    if (mCar.irButton(mCarIRButtons.Up)) {
        mCar.carDirSpeed(mCarDir.FW, 100)
    }
    if (mCar.irButton(mCarIRButtons.Down)) {
        mCar.carDirSpeed(mCarDir.BW, 100)
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

    // The correct infrared key value can only be read 
    // when the infrared key value is not equal to 0 by logical judgment.
    //if (mCar.irValue() != 0) {
    //    basic.showNumber(mCar.irValue())
    //}
})

// When the speed of the left and right wheels of the mCar trolley is not consistent, 
// this function can adjust the speed of the wheel and save it permanently.
mCar.wheelsAdjustment(0, 0)

basic.pause(1000)
mCar.setWheelDirSpeed(mCarWheels.AllWheel, 0, wheelDir.FW)
basic.pause(1000)
mCar.setWheelDirSpeed(mCarWheels.AllWheel, 0, wheelDir.BW)
basic.pause(1000)
mCar.wheelStop(mCarWheels.LeftWheel)
mCar.singleHeadlights(mCarRGBLight.RGBA, 255, 255, 255)
basic.showNumber(mCar.batteryLevel(batteryType.AA))
basic.pause(1000)
basic.showString(mCar.readVersions())
basic.pause(1000)
let strip = neopixel.create(DigitalPin.P8, 2, NeoPixelMode.RGB)
strip.showColor(neopixel.colors(NeoPixelColors.Orange))
basic.forever(function () {
    mCar.trackbitStateValue()
    if (mCar.getGrayscaleSensorState(TrackbitStateType.Tracking_State_0)) {
        basic.showIcon(IconNames.No)
        basic.pause(1000)
    }
    mCar.extendServoControl(ServoType.Servo180, mCarServoIndex.S1, 0)
    if (mCar.getGrayscaleSensorState(TrackbitStateType.Tracking_State_7)) {
        basic.showIcon(IconNames.Yes)
        basic.pause(1000)
    }
    basic.showNumber(mCar.ultrasonic(SonarUnit.Centimeters))
    basic.pause(1000)
    mCar.extendServoControl(ServoType.Servo180, mCarServoIndex.S1, 180)
})