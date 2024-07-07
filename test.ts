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
// tests go here; this will not be compiled when this package is used as an extension.
input.onButtonPressed(Button.A, function () {
    i += 1
    if (i == 1) {
        mCar.rgbLight(mCarRGBLight.RGBA, 0xff0000)
    }
    if (i == 2) {
        mCar.rgbLight(mCarRGBLight.RGBA, 0x00ff00)
    }
    if (i == 3) {
        mCar.rgbLight(mCarRGBLight.RGBA, 0x0000ff)
        i = 0
    }
})
input.onButtonPressed(Button.B, function () {
    j += 1
    if (j == 1) {
        pins.digitalWritePin(DigitalPin.P0, 1)
        pins.digitalWritePin(DigitalPin.P1, 0)
        pins.digitalWritePin(DigitalPin.P2, 0)
    }
    if (j == 2) {
        pins.digitalWritePin(DigitalPin.P0, 0)
        pins.digitalWritePin(DigitalPin.P1, 1)
        pins.digitalWritePin(DigitalPin.P2, 0)
    }
    if (j == 3) {
        pins.digitalWritePin(DigitalPin.P0, 0)
        pins.digitalWritePin(DigitalPin.P1, 0)
        pins.digitalWritePin(DigitalPin.P2, 1)
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
basic.pause(500)
mCar.extendServoControl(ServoType.Servo180, mCarServoIndex.S1, 180)
mCar.extendServoControl(ServoType.Servo180, mCarServoIndex.S2, 180)
mCar.extendServoControl(ServoType.Servo180, mCarServoIndex.S3, 180)
basic.pause(500)

k = 0
i = 0
j = 0
music.playTone(262, music.beat(BeatFraction.Half))
basic.forever(function () {
    if (mCar.ultrasonic(SonarUnit.Centimeters) <= 5) {
        mCar.carStop()
    }
})
