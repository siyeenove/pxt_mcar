mCar.irCallBack(function () {
    if (mCar.irButton(mCar.McarIRButtons.Up)) {
        mCar.carDirectionSpeed(mCar.McarDir.FW, 100)
    }
    if (mCar.irButton(mCar.McarIRButtons.Down)) {
        mCar.carDirectionSpeed(mCar.McarDir.BW, 100)
    }
    if (mCar.irButton(mCar.McarIRButtons.Left)) {
        mCar.carTurn(mCar.McarTurn.Left, 50, 100)
    }
    if (mCar.irButton(mCar.McarIRButtons.Right)) {
        mCar.carTurn(mCar.McarTurn.Right, 50, 100)
    }
    if (mCar.irButton(mCar.McarIRButtons.OK)) {
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
mCar.setWheelDirectionSpeed(mCar.McarWheels.AllWheel, 0, mCar.WheelDir.FW)
basic.pause(1000)
mCar.setWheelDirectionSpeed(mCar.McarWheels.AllWheel, 0, mCar.WheelDir.BW)
basic.pause(1000)
mCar.wheelStop(mCar.McarWheels.LeftWheel)
mCar.singleHeadlights(mCar.McarRGBLight.RGBA, 255, 255, 255)
basic.showNumber(mCar.batteryLevel(mCar.BatteryType.AA))
basic.pause(1000)
basic.showString(mCar.readVersions())
basic.pause(1000)
basic.forever(function () {
    mCar.trackbitStateValue()
    if (mCar.readGrayscaleSensorState(mCar.TrackbitStateType.TrackingState0)) {
        basic.showIcon(IconNames.No)
        basic.pause(1000)
    }
    mCar.extendServoControl(mCar.McarServoIndex.S1, mCar.ServoType.Servo180, 0)
    if (mCar.readGrayscaleSensorState(mCar.TrackbitStateType.TrackingState7)) {
        basic.showIcon(IconNames.Yes)
        basic.pause(1000)
    }
    basic.showNumber(mCar.sonar(mCar.SonarUnit.Centimeters))
    basic.pause(1000)
    mCar.extendServoControl(mCar.McarServoIndex.S1, mCar.ServoType.Servo180, 180)
})