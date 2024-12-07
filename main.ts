/*
* This extension library was developed by the SIYEENOVE team and is only available for SIYEENOVE products.
* Date: Dec 7, 2024  
*/
enum WheelDir {
    //%block="forward"
    FW = 1,
    //%block="backward"
    BW = 2,
}

enum McarWheels {
    //%block="left wheel"
    LeftWheel = 1,
    //%block="right wheel"
    RightWheel = 2,
    //%block="all wheels"
    AllWheel = 3
}

enum McarDir {
    //% block="forward"
    FW = 1,
    //% block="backward"
    BW = 2
}

enum McarTurn {
    //%block="left"
    Left = 0,
    //%block="right"
    Right = 1,
}

enum McarServoIndex {
    //% block="S1"
    S1 = 1,
    //% block="S2"
    S2 = 2,
    //% block="S3"
    S3 = 3
}

enum McarRGBLight {
    //%block="left headlight"
    RGBL = 2,
    //%block="right headlight"
    RGBR = 1,
    //%block="all headlights"
    RGBA = 3
}

enum TrackbitStateType {
    //% block="◌ ◌ ◌" 
    Tracking_State_0 = 7,
    //% block="◌ ◌ ●" 
    Tracking_State_1 = 6,
    //% block="◌ ● ◌" 
    Tracking_State_2 = 5,
    //% block="◌ ● ●" 
    Tracking_State_3 = 4,


    //% block="● ◌ ◌" 
    Tracking_State_4 = 3,
    //% block="● ◌ ●" 
    Tracking_State_5 = 2,
    //% block="● ● ◌" 
    Tracking_State_6 = 1,
    //% block="● ● ●" 
    Tracking_State_7 = 0
}

enum TrackbitType {
    //% block="●"
    State_0 = 0,
    //% block="◌"
    State_1 = 1
}
enum TrackbitChannel {
    //% block="left"
    Three = 3,
    //% block="centre"
    Two = 2,
    //% block="right"
    One = 1
}

enum ServoType {
    //% block="90°"
    Servo90 = 1,
    //% block="180°"
    Servo180 = 2,
    //% block="270°"
    Servo270 = 3
}

enum SonarUnit {
    //% block="cm"
    Centimeters,
    //% block="inches"
    Inches
}

const enum McarIRButtons {
    //% block="1"
    Number_1 = 0x45,
    //% block="2"
    Number_2 = 0x46,
    //% block="3"
    Number_3 = 0x47,
    //% block="4"
    Number_4 = 0x44,
    //% block="5"
    Number_5 = 0x40,
    //% block="6"
    Number_6 = 0x43,
    //% block="7"
    Number_7 = 0x07,
    //% block="8"
    Number_8 = 0x15,
    //% block="9"
    Number_9 = 0x09,
    //% block="*"
    Star = 0x16,
    //% block="0"
    Number_0 = 0x19,
    //% block="#"
    Hash = 0x0d,
    //% block=" "
    Unused_1 = -1,
    //% block="▲"
    Up = 0x18,
    //% block=" "
    Unused_2 = -2,
    //% block="◀"
    Left = 0x08,
    //% block="OK"
    OK = 0x1c,
    //% block="▶"
    Right = 0x5a,
    //% block=" "
    Unused_3 = -3,
    //% block="▼"
    Down = 0x52,
    //% block=" "
    Unused_4 = -4
}

enum BatteryType {
    //% block="3 AA batteries"
    AA = 1,
    //% block="1 lithium battery"
    LithiumBattery
}

enum Textview {
    //%block="left"
    Left = 0,
    //%block="right"
    Right = 1,
}

enum AppButton {
    //%block="F-pressed"
    F1 = 0,
    //%block="F-release"
    F0 = 1,
    //%block="OK-pressed"
    OK1 = 2,
    //%block="OK-release"
    OK0 = 3,
    //%block="B-pressed"
    B1 = 4,
    //%block="B-release"
    B0 = 5,
    //%block="L-pressed"
    L1 = 6,
    //%block="L-release"
    L0 = 7,
    //%block="R-pressed"
    R1 = 8,
    //%block="R-release"
    R0 = 9,
    //%block="1-pressed"
    ONE1 = 10,
    //%block="1-release"
    ONE0 = 11,
    //%block="2-pressed"
    TWO1 = 12,
    //%block="2-release"
    TWO0 = 13,
    //%block="3-pressed"
    THREE1 = 14,
    //%block="3-release"
    THREE0 = 15
}

//% weight=10 color=#008C8C block="mCar" blockId="mCar" icon="\uf48b"
namespace mCar {
    let IR_Val = 0
    let leftWheelSpeed = 0
    let rightWheelSpeed = 0
    let threeWayStateValue = 0

    let irstate: number;
    let state: number;

    /*
    * 
    * The I2C speed is 100Khz, and the slave address is 0x2a
    */
    let i2cAddr: number = 0x2a;


    /**
    * Set the speed and direction of the wheels
    * @param wheel: The wheels of mCar.
    * @param direction: The wheel goes forward or backward.
    * @param speed: The speed at which the wheels turn, eg: 0--100
    */
    //% group="Wheels"
    //% block="set %wheel %direction speed %speed\\%"
    //% speed.min=0 speed.max=100
    //% weight=380
    export function setWheelDirectionSpeed(wheel: McarWheels, direction: WheelDir, speed: number): void {
        let i2cBuffer = pins.createBuffer(2)
        
        if (wheel == McarWheels.LeftWheel || wheel == McarWheels.AllWheel) {
            leftWheelSpeed = speed;
            i2cBuffer[0] = 0x05;
            if(direction == WheelDir.FW)         //forward
                i2cBuffer[1] = leftWheelSpeed + 101;
            else if (direction == WheelDir.BW)   //backward
                i2cBuffer[1] = leftWheelSpeed;
            pins.i2cWriteBuffer(i2cAddr, i2cBuffer);
        }
        if (wheel == McarWheels.RightWheel || wheel == McarWheels.AllWheel) {
            rightWheelSpeed = speed;
            i2cBuffer[0] = 0x06;
            if(direction == WheelDir.FW)          //forward
                i2cBuffer[1] = rightWheelSpeed;
            else if (direction == WheelDir.BW)    //backward
                i2cBuffer[1] = rightWheelSpeed + 101;
            pins.i2cWriteBuffer(i2cAddr, i2cBuffer)
        }
    }


    /**
     * Set the speed and direction of the wheel.
     * @param leftSpeed: Set the speed and direction of the left wheel. 
     * @param rightSpeed: Set the speed and direction of the right wheel. 
     */
    //% group="Wheels"
    //% block="set left wheel speed %leftSpeed\\% right wheel speed %rightSpeed\\%"
    //% leftSpeed.min=-100 leftSpeed.max=100
    //% rightSpeed.min=-100 rightSpeed.max=100
    //% weight=379
    export function setWheelSpeed(leftSpeed: number, rightSpeed: number): void {
        let i2cBuffer = pins.createBuffer(2)
        
        i2cBuffer[0] = 0x05;
        if (leftSpeed > 0){
            leftWheelSpeed = leftSpeed;
            i2cBuffer[1] = leftWheelSpeed + 101;
        }else{
            leftWheelSpeed = Math.abs(leftSpeed);
            i2cBuffer[1] = leftWheelSpeed;
        }
        pins.i2cWriteBuffer(i2cAddr, i2cBuffer);

        i2cBuffer[0] = 0x06;
        if (rightSpeed > 0){
            rightWheelSpeed = rightSpeed;
            i2cBuffer[1] = rightWheelSpeed;
        }else{
            rightWheelSpeed = Math.abs(rightSpeed);
            i2cBuffer[1] = rightWheelSpeed + 101;
        }
        pins.i2cWriteBuffer(i2cAddr, i2cBuffer)
    }


    /** 
     * Wheels stop.
     * @param wheel: The wheels of mCar.
     */
    //% group="Wheels"
    //% weight=370
    //%block="set %wheel to stop"
    export function wheelStop(wheel: McarWheels): void {
        let i2cBuffer = pins.createBuffer(2)

        if (wheel == McarWheels.LeftWheel || wheel == McarWheels.AllWheel) {
            leftWheelSpeed = 0;
            i2cBuffer[0] = 0x05;
            i2cBuffer[1] = leftWheelSpeed; 
            pins.i2cWriteBuffer(i2cAddr, i2cBuffer)
        }
        if (wheel == McarWheels.RightWheel || wheel == McarWheels.AllWheel) {
            rightWheelSpeed = 0;
            i2cBuffer[0] = 0x06;
            i2cBuffer[1] = rightWheelSpeed;
            pins.i2cWriteBuffer(i2cAddr, i2cBuffer)
        }
    }


    /** 
     * Wheels speed calibration.
     * When the speed of the left and right wheels of the mCar trolley is not consistent,
     * this function can adjust the speed of the wheel and save it permanently.
     * @param offset1: left Wheel offset, eg: -10--0
     * @param offset1: right Wheel offset, eg: -10--0
     */
    //% group="Wheels"
    //% weight=360
    //%block="wheels speed offset: left wheel %offset1 right wheel %offset2"
    //% offset1.min=-10 offset1.max=0
    //% offset2.min=-10 offset2.max=0
    export function wheelsAdjustment(offset1: number, offset2: number): void {
        let buffer = pins.createBuffer(2)
        offset1 = Math.map(offset1, -10, 0, 10, 0);
        offset2 = Math.map(offset2, -10, 0, 10, 0);

        buffer[0] = 0x03;
        buffer[1] = offset1;
        pins.i2cWriteBuffer(i2cAddr, buffer)
        basic.pause(10);
        
        buffer[0] = 0x04;
        buffer[1] = offset2;
        pins.i2cWriteBuffer(i2cAddr, buffer)
        basic.pause(10);
    }


    /**
     * Set car direction.
     * @param direction: The direction of the mCar runs.
     * @param speed: The speed at which mCar runs.
     */
    //% group="Car"
    //% weight=340
    //%block="car go %direction Speed %speed\\%"
    //% speed.min=0 speed.max=100
    export function carDirectionSpeed(direction: McarDir, speed: number): void {
        leftWheelSpeed = speed;
        rightWheelSpeed = speed;

        if (direction == McarDir.FW) {
            setWheelDirectionSpeed(McarWheels.LeftWheel, WheelDir.FW, leftWheelSpeed);
            setWheelDirectionSpeed(McarWheels.RightWheel, WheelDir.FW, rightWheelSpeed);
        } else if (direction == McarDir.BW) {
            setWheelDirectionSpeed(McarWheels.LeftWheel, WheelDir.BW, leftWheelSpeed);
            setWheelDirectionSpeed(McarWheels.RightWheel, WheelDir.BW, rightWheelSpeed);
        }
    }


    /**
     * Car turn.
     * @param direction: The direction of the mCar runs.
     * @param percent: Control the Angle at which the mCar turns.
     * @param speed: The speed at which mCar runs.
     */
    //% group="Car"
    //% weight=320
    //%block="car turn %direction Turn rate %percent\\% Speed %speed\\%"
    //% percent.min=0 percent.max=100
    //% speed.min=0 speed.max=100
    export function carTurn(direction: McarTurn, percent: number, speed: number): void {
        if (direction == McarTurn.Left) {
            leftWheelSpeed = speed - (speed*(percent/100));
            setWheelDirectionSpeed(McarWheels.LeftWheel, WheelDir.FW, leftWheelSpeed);

            rightWheelSpeed = speed;
            setWheelDirectionSpeed(McarWheels.RightWheel, WheelDir.FW, rightWheelSpeed);
        }
        else if (direction == McarTurn.Right) {
            leftWheelSpeed = speed;
            setWheelDirectionSpeed(McarWheels.LeftWheel, WheelDir.FW, leftWheelSpeed);
    
            rightWheelSpeed = speed - (speed*(percent/100));
            setWheelDirectionSpeed(McarWheels.RightWheel, WheelDir.FW, rightWheelSpeed);
        }
    }


    /**
     * Car turn at place.
     * @param direction: The direction of the mCar runs.
     * @param speed: The speed at which mCar runs.
     */
    //% group="Car"
    //% weight=320
    //%block="car turn %direction at place Speed %speed\\%"
    //% speed.min=0 speed.max=100
    export function carTurnPlace(direction: McarTurn, speed: number): void {
        leftWheelSpeed = speed;
        rightWheelSpeed = speed;

        if (direction == McarTurn.Left) {
            setWheelDirectionSpeed(McarWheels.LeftWheel, WheelDir.BW, leftWheelSpeed);
            setWheelDirectionSpeed(McarWheels.RightWheel, WheelDir.FW, rightWheelSpeed);
        } else if (direction == McarTurn.Right) {
            setWheelDirectionSpeed(McarWheels.LeftWheel, WheelDir.FW, leftWheelSpeed);
            setWheelDirectionSpeed(McarWheels.RightWheel, WheelDir.BW, rightWheelSpeed);
        }
    }


    /** 
     * The car stopped
     */
    //% group="Car"
    //% weight=310
    //%block="car stop"
    export function carStop(): void {
        wheelStop(McarWheels.AllWheel);
    }


    /**
    * Set LED headlights.
    * @param light: Choose which headlights to use.
    * @param color: Colors to light up.
    */
    //% group="RGB LED headlights"
    //% block="set %light color: $color"
    //% color.shadow="colorNumberPicker"
    //% weight=300
    export function rgbLight(light: McarRGBLight, color: number) {
        let r: number, g: number, b: number = 0
        let buf = pins.createBuffer(2)
        r = color >> 16
        g = (color >> 8) & 0xFF
        b = color & 0xFF

        if (light == McarRGBLight.RGBL || light == McarRGBLight.RGBA){
            buf[0] = 0x07;
            buf[1] = r;
            pins.i2cWriteBuffer(i2cAddr, buf)
            buf[0] = 0x08;
            buf[1] = g;
            pins.i2cWriteBuffer(i2cAddr, buf)
            buf[0] = 0x09;
            buf[1] = b;
            pins.i2cWriteBuffer(i2cAddr, buf)
        }
        if (light == McarRGBLight.RGBR || light == McarRGBLight.RGBA) {
            buf[0] = 0x0a;
            buf[1] = r;
            pins.i2cWriteBuffer(i2cAddr, buf)
            buf[0] = 0x0b;
            buf[1] = g;
            pins.i2cWriteBuffer(i2cAddr, buf)
            buf[0] = 0x0c;
            buf[1] = b;
            pins.i2cWriteBuffer(i2cAddr, buf)
        }
    }


    /**
    * Select a headlight and set the RGB color.
    * @param r: red color value of RGB color, eg: 0
    * @param g: green color value of RGB color, eg: 128
    * @param b: blue color value of RGB color, eg: 255
    */
    //% group="RGB LED headlights"
    //% inlineInputMode=inline
    //% blockId=RGB block="set %mCarRGBLight color: red %r green %g blue %b"
    //% r.min=0 r.max=255
    //% g.min=0 g.max=255
    //% b.min=0 b.max=255
    //% weight=290
    export function singleHeadlights(light: McarRGBLight, r: number, g: number, b: number): void {
        let buf = pins.createBuffer(2);
        if (light == McarRGBLight.RGBL || light == McarRGBLight.RGBA) {
            buf[0] = 0x07;
            buf[1] = r;
            pins.i2cWriteBuffer(i2cAddr, buf)
            buf[0] = 0x08;
            buf[1] = g;
            pins.i2cWriteBuffer(i2cAddr, buf)
            buf[0] = 0x09;
            buf[1] = b;
            pins.i2cWriteBuffer(i2cAddr, buf)
        }
        if (light == McarRGBLight.RGBR || light == McarRGBLight.RGBA) {
            buf[0] = 0x0a;
            buf[1] = r;
            pins.i2cWriteBuffer(i2cAddr, buf)
            buf[0] = 0x0b;
            buf[1] = g;
            pins.i2cWriteBuffer(i2cAddr, buf)
            buf[0] = 0x0c;
            buf[1] = b;
            pins.i2cWriteBuffer(i2cAddr, buf)
        } 
    }


    /**
    * Turn off all the LED lights.
    */
    //% group="RGB LED headlights"
    //% block="turn off all RGB LED headlights"
    //% weight=280
    export function turnOffAllHeadlights(): void {
        let buf = pins.createBuffer(2);

        buf[0] = 0x07;
        buf[1] = 0;
        pins.i2cWriteBuffer(i2cAddr, buf)
        buf[0] = 0x08;
        buf[1] = 0;
        pins.i2cWriteBuffer(i2cAddr, buf)
        buf[0] = 0x09;
        buf[1] = 0;
        pins.i2cWriteBuffer(i2cAddr, buf)

        buf[0] = 0x0a;
        buf[1] = 0;
        pins.i2cWriteBuffer(i2cAddr, buf)
        buf[0] = 0x0b;
        buf[1] = 0;
        pins.i2cWriteBuffer(i2cAddr, buf)
        buf[0] = 0x0c;
        buf[1] = 0;
        pins.i2cWriteBuffer(i2cAddr, buf)
    }


    /**
    * Read 3 grayscale sensor values.
    */
    //% group="Tracking sensor"
    //% weight=270
    //% block="read tracking sensor status"
    export function trackbitStateValue() {
        //  left=P14      centre=P15    right=P16
        let channel1 = 0, channel2 = 0, channel3 = 0;
        pins.setPull(DigitalPin.P14, PinPullMode.PullUp);
        pins.setPull(DigitalPin.P15, PinPullMode.PullUp);
        pins.setPull(DigitalPin.P16, PinPullMode.PullUp);

        channel1 = pins.digitalReadPin(DigitalPin.P14);
        channel2 = pins.digitalReadPin(DigitalPin.P15);
        channel3 = pins.digitalReadPin(DigitalPin.P16);
        threeWayStateValue = (channel1 << 2) + (channel2 << 1) + channel3;
    }


    /**
     * Judge 3 gray sensor values.
     */
    //% group="Tracking sensor"
    //% weight=260
    //%block="tracking sensor state is %state"
    export function readGrayscaleSensorState(state: TrackbitStateType): boolean {
        return threeWayStateValue == state
    }


    /**
     * Return 3 grayscale sensor values.
     */
    //% group="Tracking sensor"
    //% weight=250
    //%block="tracking sensor value"
    export function returnGrayscaleSensorValue(): number {
        return threeWayStateValue
    }


    /**
     * Check whether the single grayscale Sensor is on the black line.
     */
    //% group="Tracking sensor"
    //% weight=240
    //% block="%channel tracking sensor state is %state"
    export function trackbitChannelState(channel: TrackbitChannel, state: TrackbitType): boolean {
        if (state == TrackbitType.State_1)
            if (threeWayStateValue & (1 << (channel - 1))) {
                return true
            }
            else {
                return false
            }
        else {
            if (threeWayStateValue & (1 << (channel - 1))) {
                return false
            }
            else {
                return true
            }
        }
    }


    /**
      * mCar extends the ultrasonic module to read the distance values measured by the ultrasonic module.
      * Returns the distance value measured by the ultrasonic module, eg: Centimeters
      */
    //% group="Sonar sensor"
    //% blockId=ultrasonic block="sonar distance %unit"
    //% weight=220
    export function ultrasonic(unit: SonarUnit, maxCmDistance = 500): number {
        // send pulse
        pins.setPull(DigitalPin.P13, PinPullMode.PullNone);
        pins.digitalWritePin(DigitalPin.P13, 0);
        control.waitMicros(2);
        pins.digitalWritePin(DigitalPin.P13, 1);
        control.waitMicros(10);
        pins.digitalWritePin(DigitalPin.P13, 0);
        // read pulse
        const d = pins.pulseIn(DigitalPin.P12, PulseValue.High, maxCmDistance * 50);
        switch (unit) {
            case SonarUnit.Centimeters:
                return Math.floor(d * 34 / 2 / 1000);
            case SonarUnit.Inches:
                return Math.floor(d * 34 / 2 / 1000 * 0.3937);
            default:
                return d;
        }
    }

    /**
     * 
     */
    //% shim=mCarInfrared::irCode
    function irCode(): number {
        return 0;
    }

    /**
      * This function runs in the background all the time to read the value 
      * to be controlled in the IR in real time.
      */
    //% group="Infrared sensor"
    //% weight=160
    //% block="on IR receiving"
    export function irCallBack(handler: () => void) {  
        //handler is the functional argument to the irCallback function and is the block
        //to be executed inside the irCallback function generation block.
        //(handler是irCallback函数的函数型参数，也是irCallback函数生成语块里面要执行的语块。)
        pins.setPull(DigitalPin.P9, PinPullMode.PullUp)
        //A trigger event is registered, and handler is the function to execute to trigger the event.
        control.onEvent(98, 3500, handler)             
        control.inBackground(() => {
            while (true) {
                IR_Val = irCode()
                if (IR_Val != 0xff00) {
                    //Fires the event registered above（control.onEvent（））
                    control.raiseEvent(98, 3500, EventCreationMode.CreateAndFire) 
                }
                basic.pause(20)
            }
        })
    }


    /**
     * Select the value of the infrared key that you want to be pressed.
     */
    //% blockId=infrared_button
    //% group="Infrared sensor"
    //% irButton.fieldEditor="gridpicker"
    //% irButton.fieldOptions.columns=3
    //% irButton.fieldOptions.tooltips="false"
    //% block="IR button %irButton is pressed"
    //% weight=151
    export function irButton(irButton: McarIRButtons): boolean {
        return (IR_Val & 0x00ff) == irButton as number
    }


    /**
     * Read IR value.
     * The correct infrared key value can only be read
     * when the infrared key value is not equal to 0 by logical judgment.
     * Return the key value of the infrared remote control, only the instruction code.
     */
    //% group="Infrared sensor"
    //% block="IR value"
    //% weight=150
    export function irValue(): number {
        return IR_Val & 0x00ff;
    }


    /**
     * servo control module, used for 90, 180, 270 degrees servo.
     * When the S1--S3 ports of mCar are connected to the servo, this function can control the servo.
     * @param servoType: Servo type, eg: 90, 180, 270
     * @param index: Servo interface on mCar, eg: S1, S2, S2
     * @param angle: The Angle of rotation of the servo.
     */
    //% group="Expansion port"
    //% weight=120
    //% block="set %index %servoType servo angle to %angle°"
    export function extendServoControl(index: McarServoIndex, servoType: ServoType, angle: number): void {
        let angleMap: number
        if (servoType == ServoType.Servo90) {
            angleMap = Math.map(angle, 0, 90, 50, 200);
        }

        if (servoType == ServoType.Servo180) {
            angleMap = Math.map(angle, 0, 180, 50, 200);
        }

        if (servoType == ServoType.Servo270) {
            angleMap = Math.map(angle, 0, 270, 50, 200);
        }

        let buf = pins.createBuffer(2)
        if (index == McarServoIndex.S1)
            buf[0] = 0x0d;
        else if (index == McarServoIndex.S2)
            buf[0] = 0x0e;
        else if (index == McarServoIndex.S3)
            buf[0] = 0x0f;
        buf[1] = angleMap;
        pins.i2cWriteBuffer(i2cAddr, buf);
    }


    /**
     * The steering gear rotates continuously, and is used for the steering gear of 360 degrees rotation.
     * @param index: Servo interface on mCar, eg: S1, S2, S2
     * @param speed: The speed at which the servo rotates.
     */
    //% group="Expansion port"
    //% weight=110
    //% block="set %index 360° servo speed to %speed\\%"
    //% speed.min=-100 speed.max=100
    export function continuousServoControl(index: McarServoIndex, speed: number): void {
        speed = Math.map(speed, -100, 100, 0, 180)
        extendServoControl(index, ServoType.Servo180, speed)
    }


    /**
     * Sets the battery type and returns the battery level.
     * @param batType: Type of battery. eg: 3 AA battery, 1 lithium battery
     * Return 0--100
     */
    //% group="Battery"
    //% weight=100
    //% block="battery level: %batType"
    export function batteryLevel(batType: BatteryType) : number {
        let i2cBuffer = pins.createBuffer(1);
        if (batType == BatteryType.AA)
            i2cBuffer[0] = 0x01;
        else if (batType == BatteryType.LithiumBattery)
            i2cBuffer[0] = 0x02;
        pins.i2cWriteBuffer(i2cAddr, i2cBuffer);

        let batLevel = pins.i2cReadNumber(i2cAddr, NumberFormat.UInt8LE, false);
        if (batLevel>100)
            batLevel = 100;
        
        return batLevel; 
    }


    /**
     * Send a string to the left and right text fields of the APP.
     * @param side：Text display box. eg: left, right
     * @param str：The string to display.
     */
    //% group="APP command"
    //% weight=91
    //% block="%side textview display %str"
    export function display(side: Textview, str: string): string {
        let strCmd;
        if (side == Textview.Left){
            strCmd = "$-6-1-8-" + str + "-#";
        }else if (side == Textview.Right){
            strCmd = "$-6-1-9-" + str + "-#";
        }
        return strCmd;
    }

    // APP commands.
    let cmdArray = [
        "$-6-1-0-1-#",   // F-pressed
        "$-6-1-0-0-#",   // F-release
        "$-6-1-1-1-#",   // OK-pressed
        "$-6-1-1-0-#",   // OK-release
        "$-6-1-2-1-#",   // B-pressed
        "$-6-1-2-0-#",   // B-release
        "$-6-1-3-1-#",   // L-pressed
        "$-6-1-3-0-#",   // L-release
        "$-6-1-4-1-#",   // R-pressed
        "$-6-1-4-0-#",   // R-release
        "$-6-1-5-1-#",   // 1-pressed
        "$-6-1-5-0-#",   // 1-release
        "$-6-1-6-1-#",   // 2-pressed
        "$-6-1-6-0-#",   // 2-release
        "$-6-1-7-1-#",   // 3-pressed
        "$-6-1-7-0-#",   // 3-release
    ];

    /**
     * Check the buttons on the App.
     * @param myButton: Bluetooth serial port reads APP string instructions.
     * @param button: State of the button on the APP.
     */
    //% group="APP command"
    //% weight=90
    //% block="%myButton equal %button"
    export function appButton(myButton: string, button: AppButton): boolean {
        myButton = myButton + "#";
        if (myButton == cmdArray[button]) {
            return true;
        } 
        return false;
    }


    /**
     * Read the firmware version of the chip on the mCar.
     * Returns a string, eg："Vx"
     */
    //% group="Others"
    //% weight=1
    //% block="version number"
    export function readVersions(): string {
        let mCarVersions: number = 0;

        let i2cBuffer = pins.createBuffer(1);
        i2cBuffer[0] = 0x00;

        pins.i2cWriteBuffer(i2cAddr, i2cBuffer)
        mCarVersions = pins.i2cReadNumber(i2cAddr, NumberFormat.UInt8LE, false)

        return ("V" + convertToText(mCarVersions))
    }
}