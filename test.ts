mCar.irCallBack(function () {
    if (mCar.irButton(McarIRButtons.Up)) {
        mCar.carDirectionSpeed(McarDir.FW, 100)
    }
    if (mCar.irButton(McarIRButtons.Down)) {
        mCar.carDirectionSpeed(McarDir.BW, 100)
    }
    if (mCar.irButton(McarIRButtons.Left)) {
        mCar.carTurn(McarTurn.Left, 50, 100)
    }
    if (mCar.irButton(McarIRButtons.Right)) {
        mCar.carTurn(McarTurn.Right, 50, 100)
    }
    if (mCar.irButton(McarIRButtons.OK)) {
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
mCar.setWheelDirectionSpeed(McarWheels.AllWheel, 0, WheelDir.FW)
basic.pause(1000)
mCar.setWheelDirectionSpeed(McarWheels.AllWheel, 0, WheelDir.BW)
basic.pause(1000)
mCar.wheelStop(McarWheels.LeftWheel)
mCar.singleHeadlights(McarRGBLight.RGBA, 255, 255, 255)
basic.showNumber(mCar.batteryLevel(BatteryType.AA))
basic.pause(1000)
basic.showString(mCar.readVersions())
basic.pause(1000)
let strip = neopixel.create(DigitalPin.P8, 2, NeoPixelMode.RGB)
strip.showColor(neopixel.colors(NeoPixelColors.Orange))
basic.forever(function () {
    mCar.trackbitStateValue()
    if (mCar.readGrayscaleSensorState(TrackbitStateType.Tracking_State_0)) {
        basic.showIcon(IconNames.No)
        basic.pause(1000)
    }
    mCar.extendServoControl(ServoType.Servo180, McarServoIndex.S1, 0)
    if (mCar.readGrayscaleSensorState(TrackbitStateType.Tracking_State_7)) {
        basic.showIcon(IconNames.Yes)
        basic.pause(1000)
    }
    basic.showNumber(mCar.ultrasonic(SonarUnit.Centimeters))
    basic.pause(1000)
    mCar.extendServoControl(ServoType.Servo180, McarServoIndex.S1, 180)
})