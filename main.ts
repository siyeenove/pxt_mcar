/*
* This extension library was developed by the SIYEENOVE team and is only available for SIYEENOVE products.
* Date: July 20, 2024  
*/
enum mCarWheels {
    //%block="left wheel"
    LeftWheel = 1,
    //%block="right wheel"
    RightWheel = 2,
    //%block="all wheel"
    AllWheel = 3
}

enum wheelDir {
    //%block="forward"
    FW = 1,
    //%block="backward"
    BW = 2,
}

enum mCarDir {
    //% block="forward"
    FW = 1,
    //% block="backward"
    BW = 2
}

enum mCarTurn {
    //%block="left"
    Left = 0,
    //%block="right"
    Right = 1,
}

enum mCarServoIndex {
    //% block="S1"
    S1 = 1,
    //% block="S2"
    S2 = 2,
    //% block="S3"
    S3 = 3
}

enum mCarRGBLight {
    //%block="left RGB"
    RGBL = 2,
    //%block="right RGB"
    RGBR = 1,
    //%block="all RGB"
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
    //% block="Left"
    Three = 3,
    //% block="Centre"
    Two = 2,
    //% block="Right"
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

const enum mCarIRButtons {
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

enum batteryType {
    //% block="AA"
    AA = 1,
    //% block="Lithium"
    LithiumBattery
}

enum textview {
    //%block="Left"
    Left = 0,
    //%block="Right"
    Right = 1,
}

enum button {
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

let IR_Val = 0
let leftWheelSpeed = 0
let rightWheelSpeed = 0
let threeWayStateValue = 0
//% weight=10 color=#008C8C block="mCar" blockId="mCar" icon="\uf48b"
namespace mCar {
    let irstate: number;
    let state: number;

    /*
    * 
    * The I2C speed is 100Khz, and the slave address is 0x2a
    */
    let i2cAddr: number = 0x2a;


    /**
    * Set the speed and direction of the wheels
    */
    //% group="Wheels"
    //% block="Set %wheel %direction speed %speed\\%"
    //% speed.min=0 speed.max=100
    //% weight=380
    export function setWheelDirSpeed(wheel: mCarWheels, direction: wheelDir, speed: number): void {
        let i2cBuffer = pins.createBuffer(2)
        
        if (wheel == mCarWheels.LeftWheel || wheel == mCarWheels.AllWheel) {
            leftWheelSpeed = speed;
            i2cBuffer[0] = 0x05;
            if(direction == wheelDir.FW)         //forward
                i2cBuffer[1] = leftWheelSpeed + 101;
            else if (direction == wheelDir.BW)   //backward
                i2cBuffer[1] = leftWheelSpeed;
            pins.i2cWriteBuffer(i2cAddr, i2cBuffer);
        }
        if (wheel == mCarWheels.RightWheel || wheel == mCarWheels.AllWheel) {
            rightWheelSpeed = speed;
            i2cBuffer[0] = 0x06;
            if(direction == wheelDir.FW)          //forward
                i2cBuffer[1] = rightWheelSpeed;
            else if (direction == wheelDir.BW)    //backward
                i2cBuffer[1] = rightWheelSpeed + 101;
            pins.i2cWriteBuffer(i2cAddr, i2cBuffer)
        }
    }


    /**
    * Set the speed of the wheels
    */
    //% group="Wheels"
    //% block="Set left wheel speed %Lspeed\\% right wheel speed %Rspeed\\%"
    //% Lspeed.min=-100 Lspeed.max=100
    //% Rspeed.min=-100 Rspeed.max=100
    //% weight=379
    export function setWheelSpeed(Lspeed: number, Rspeed: number): void {
        let i2cBuffer = pins.createBuffer(2)
        
        i2cBuffer[0] = 0x05;
        if(Lspeed > 0){
            leftWheelSpeed = Lspeed;
            i2cBuffer[1] = leftWheelSpeed + 101;
        }else{
            leftWheelSpeed = Math.abs(Lspeed);
            i2cBuffer[1] = leftWheelSpeed;
        }
        pins.i2cWriteBuffer(i2cAddr, i2cBuffer);

        i2cBuffer[0] = 0x06;
        if(Rspeed > 0){
            rightWheelSpeed = Rspeed;
            i2cBuffer[1] = rightWheelSpeed;
        }else{
            rightWheelSpeed = Math.abs(Rspeed);
            i2cBuffer[1] = rightWheelSpeed + 101;
        }
        pins.i2cWriteBuffer(i2cAddr, i2cBuffer)
    }


    /*
     * wheels stop
     */
    //% group="Wheels"
    //% weight=370
    //%block="Set %Wheel to stop"
    export function wheelStop(wheel: mCarWheels): void {
        let i2cBuffer = pins.createBuffer(2)

        if (wheel == mCarWheels.LeftWheel || wheel == mCarWheels.AllWheel) {
            leftWheelSpeed = 0;
            i2cBuffer[0] = 0x05;
            i2cBuffer[1] = leftWheelSpeed; 
            pins.i2cWriteBuffer(i2cAddr, i2cBuffer)
        }
        if (wheel == mCarWheels.RightWheel || wheel == mCarWheels.AllWheel) {
            rightWheelSpeed = 0;
            i2cBuffer[0] = 0x06;
            i2cBuffer[1] = rightWheelSpeed;
            pins.i2cWriteBuffer(i2cAddr, i2cBuffer)
        }
    }


    /*
     * Wheels speed calibration.
     * When the speed of the left and right wheels of the mCar trolley is not consistent,
     * this function can adjust the speed of the wheel and save it permanently.
     */
    //% group="Wheels"
    //% weight=360
    //%block="Wheels speed offset: left wheel %offset1 right wheel %offset2"
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
     * Set car direction
     */
    //% group="Car"
    //% weight=340
    //%block="Car go %direction Speed %speed\\%"
    //% speed.min=0 speed.max=100
    export function carDirSpeed(direction : mCarDir, speed: number): void {
        leftWheelSpeed = speed;
        rightWheelSpeed = speed;

        if (direction == mCarDir.FW) {
            setWheelDirSpeed(mCarWheels.LeftWheel, wheelDir.FW, leftWheelSpeed);
            setWheelDirSpeed(mCarWheels.RightWheel, wheelDir.FW, rightWheelSpeed);
        }else if (direction == mCarDir.BW) {
            setWheelDirSpeed(mCarWheels.LeftWheel, wheelDir.BW, leftWheelSpeed);
            setWheelDirSpeed(mCarWheels.RightWheel, wheelDir.BW, rightWheelSpeed);
        }
    }


    /**
     * Car turn
     */
    //% group="Car"
    //% weight=320
    //%block="Car turn %direction Turn rate %percent\\% Speed %speed\\%"
    //% percent.min=0 percent.max=100
    //% speed.min=0 speed.max=100
    export function carTurn(direction: mCarTurn, percent: number, speed: number): void {
        if (direction == mCarTurn.Left) {
            leftWheelSpeed = speed - (speed*(percent/100));
            setWheelDirSpeed(mCarWheels.LeftWheel, wheelDir.FW, leftWheelSpeed);

            rightWheelSpeed = speed;
            setWheelDirSpeed(mCarWheels.RightWheel, wheelDir.FW, rightWheelSpeed);
        }
        else if (direction == mCarTurn.Right) {
            leftWheelSpeed = speed;
            setWheelDirSpeed(mCarWheels.LeftWheel, wheelDir.FW, leftWheelSpeed);
    
            rightWheelSpeed = speed - (speed*(percent/100));
            setWheelDirSpeed(mCarWheels.RightWheel, wheelDir.FW, rightWheelSpeed);
        }
    }


    /**
     * Car turn at place
     */
    //% group="Car"
    //% weight=320
    //%block="Car turn %direction at place Speed %speed\\%"
    //% speed.min=0 speed.max=100
    export function carTurnPlace(direction : mCarTurn, speed: number): void {
        leftWheelSpeed = speed;
        rightWheelSpeed = speed;

        if (direction == mCarTurn.Left) {
            setWheelDirSpeed(mCarWheels.LeftWheel, wheelDir.BW, leftWheelSpeed);
            setWheelDirSpeed(mCarWheels.RightWheel, wheelDir.FW, rightWheelSpeed);
        }else if (direction == mCarTurn.Right) {
            setWheelDirSpeed(mCarWheels.LeftWheel, wheelDir.FW, leftWheelSpeed);
            setWheelDirSpeed(mCarWheels.RightWheel, wheelDir.BW, rightWheelSpeed);
        }
    }


    /*
     * The car stopped
     */
    //% group="Car"
    //% weight=310
    //%block="Car stop"
    export function carStop(): void {
        wheelStop(mCarWheels.AllWheel);
    }


    /**
    * set LED headlights.
    */
    //% group="RGB LED headlights"
    //% block="Set %mCarRGBLight LED headlights color: $color"
    //% color.shadow="colorNumberPicker"
    //% weight=300
    export function rgbLight(light: mCarRGBLight, color: number) {
        let r: number, g: number, b: number = 0
        let buf = pins.createBuffer(2)
        r = color >> 16
        g = (color >> 8) & 0xFF
        b = color & 0xFF

        if (light == mCarRGBLight.RGBL || light == mCarRGBLight.RGBA){
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
        if (light == mCarRGBLight.RGBR || light == mCarRGBLight.RGBA) {
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
    * select a headlights and set the RGB color.
    * @param R R color value of RGB color, eg: 0
    * @param G G color value of RGB color, eg: 128
    * @param B B color value of RGB color, eg: 255
    */
    //% group="RGB LED headlights"
    //% inlineInputMode=inline
    //% blockId=RGB block="Set %mCarRGBLight LED headlights color: R %r G %g B %b"
    //% r.min=0 r.max=255
    //% g.min=0 g.max=255
    //% b.min=0 b.max=255
    //% weight=290
    export function singleHeadlights(light: mCarRGBLight, r: number, g: number, b: number): void {
        let buf = pins.createBuffer(2);
        if (light == mCarRGBLight.RGBL || light == mCarRGBLight.RGBA) {
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
        if (light == mCarRGBLight.RGBR || light == mCarRGBLight.RGBA) {
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
    * turn off all the LED lights
    */
    //% group="RGB LED headlights"
    //% block="Turn off all RGB LED headlights"
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
    * get a status value of the 3-way line following sensor
    */
    //% group="Tracking sensor"
    //% weight=270
    //% block="Get the status value of the tracking sensor"
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
    * get Grayscale Sensor State
    */
    //% group="Tracking sensor"
    //% weight=260
    //%block="Tracking sensor state is %TrackbitStateType"
    export function getGrayscaleSensorState(state: TrackbitStateType): boolean {
        return threeWayStateValue == state
    }


    /**
    * get Grayscale Sensor Value
    */
    //% group="Tracking sensor"
    //% weight=250
    //%block="Tracking sensor value"
    export function getGrayscaleSensorValue(): number {
        return threeWayStateValue
    }


    /**
    * check whether the channel is online
    */
    //% group="Tracking sensor"
    //% weight=240
    //% block="%TrackbitChannel tracking sensor state is %TrackbitType"
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
      * cars can extend the ultrasonic function to prevent collisions and other functions..
      * @param Sonarunit two states of ultrasonic module, eg: Centimeters
      */
    //% group="Sonar sensor"
    //% blockId=ultrasonic block="Sonar sensor unit %SonarUnit"
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


    //% shim=IRV1::irCode
    function irCode(): number {
        return 0;
    }


    //% group="Infrared sensor"
    //% weight=160
    //% block="On IR receiving"
    export function irCallback(handler: () => void) {  //handler是irCallback函数的函数型参数，也是irCallback函数生成语块里面要执行的语块。
        pins.setPull(DigitalPin.P9, PinPullMode.PullUp)
        control.onEvent(98, 3500, handler)             //注册一个触发事件，handler为触发事件要执行的函数。
        control.inBackground(() => {
            while (true) {
                IR_Val = irCode()
                if (IR_Val != 0xff00) {
                    control.raiseEvent(98, 3500, EventCreationMode.CreateAndFire) //触发上面注册的事件（control.onEvent（））
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
    export function irButton(irButton: mCarIRButtons): boolean {
        return (IR_Val & 0x00ff) == irButton as number
    }


    /**
     * Get IR value.
     * The correct infrared key value can only be read
     * when the infrared key value is not equal to 0 by logical judgment.
     */
    //% group="Infrared sensor"
    //% block="IR value"
    //% weight=150
    export function irValue(): number {
        return IR_Val & 0x00ff;
    }


    /**
     * servo control module
     */
    //% group="Expansion port"
    //% weight=120
    //% block="Set %ServoType servo %mCarServoIndex angel to %angle°"
    export function extendServoControl(servotype: ServoType, index: mCarServoIndex, angle: number): void {
        let angleMap: number
        if (servotype == ServoType.Servo90) {
            angleMap = Math.map(angle, 0, 90, 50, 200);
        }

        if (servotype == ServoType.Servo180) {
            angleMap = Math.map(angle, 0, 180, 50, 200);
        }

        if (servotype == ServoType.Servo270) {
            angleMap = Math.map(angle, 0, 270, 50, 200);
        }

        let buf = pins.createBuffer(2)
        if(index == mCarServoIndex.S1)
            buf[0] = 0x0d;
        else if (index == mCarServoIndex.S2)
            buf[0] = 0x0e;
        else if (index == mCarServoIndex.S3)
            buf[0] = 0x0f;
        buf[1] = angleMap;
        pins.i2cWriteBuffer(i2cAddr, buf);
    }


    /**
     * continuous servo control
     */
    //% group="Expansion port"
    //% weight=110
    //% block="Set continuous servo %mCarServoIndex speed to %speed\\%"
    //% speed.min=-100 speed.max=100
    export function continuousServoControl(index: mCarServoIndex, speed: number): void {
        speed = Math.map(speed, -100, 100, 0, 180)
        extendServoControl(ServoType.Servo180, index, speed)
    }


    /**
    * Get the battery voltage
    */
    //% group="Battery"
    //% weight=100
    //% block="Read %batType battery level"
    export function batteryLevel(batType: batteryType) : number {
        let i2cBuffer = pins.createBuffer(1);
        if (batType == batteryType.AA)
            i2cBuffer[0] = 0x01;
        else if (batType == batteryType.LithiumBattery)
            i2cBuffer[0] = 0x02;
        pins.i2cWriteBuffer(i2cAddr, i2cBuffer);

        let batLevel = pins.i2cReadNumber(i2cAddr, NumberFormat.UInt8LE, false);
        if (batLevel>100)
            batLevel = 100;
        
        return batLevel; 
    }


    /**
     * Send data to our app TextView.
     */
    //% group="APP command"
    //% weight=90
    //% block="%side textview display %str"
    export function display(side: textview, str: string): string {
        let strCmd;
        if (side == textview.Left){
            strCmd = "$-6-1-8-" + str + "-#";
        }else if (side == textview.Right){
            strCmd = "$-6-1-9-" + str + "-#";
        }
        return strCmd;
    }


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
     */
    //% group="APP command"
    //% weight=90
    //% block="%mybutton equal %button ?"
    export function button(mybutton: string, button: button): boolean {
        mybutton = mybutton + "#";
        if (mybutton == cmdArray[button]) {
            return true;
        } 
        return false;
    }


    /**
    * read version number
    */
    //% group="Others"
    //% weight=1
    //% block="Version number"
    export function readVersions(): string {
        let mCarVersions: number = 0;

        let i2cBuffer = pins.createBuffer(1);
        i2cBuffer[0] = 0x00;

        pins.i2cWriteBuffer(i2cAddr, i2cBuffer)
        mCarVersions = pins.i2cReadNumber(i2cAddr, NumberFormat.UInt8LE, false)

        return ("V" + convertToText(mCarVersions))
    }
}