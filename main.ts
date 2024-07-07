
enum mCarWheels {
    //%block="left wheel"
    LeftWheel = 1,
    //%block="right wheel"
    RightWheel = 2,
    //%block="all wheel"
    AllWheel = 3
}

enum wheelDir {
    //%block="clockwise"
    CW = 1,
    //%block="counterclockwise"
    CCW = 2,
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
    //%block="all RGB lights"
    RGBA = 3
}

enum TrackbitStateType {
    //% block="◌ ◌ ◌" 
    Tracking_State_0 = 0,
    //% block="◌ ◌ ●" 
    Tracking_State_1 = 1,
    //% block="◌ ● ◌" 
    Tracking_State_2 = 2,
    //% block="◌ ● ●" 
    Tracking_State_3 = 3,


    //% block="● ◌ ◌" 
    Tracking_State_4 = 4,
    //% block="● ◌ ●" 
    Tracking_State_5 = 5,
    //% block="● ● ◌" 
    Tracking_State_6 = 6,
    //% block="● ● ●" 
    Tracking_State_7 = 7,
}

enum TrackbitType {
    //% block="◌" 
    State_0 = 0,
    //% block="●" 
    State_1 = 1
}
enum TrackbitChannel {
    //% block="1"
    One = 1,
    //% block="2"
    Two = 2,
    //% block="3"
    Three = 3,
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

enum mCarIRButtons {
    //% block="menu"
    Menu = 2,
    //% block="up"
    Up = 5,
    //% block="left"
    Left = 8,
    //% block="right"
    Right = 10,
    //% block="down"
    Down = 13,
    //% block="ok"
    OK = 9,
    //% block="plus"
    Plus = 4,
    //% block="minus"
    Minus = 12,
    //% block="back"
    Back = 6,
    //% block="0"
    Zero = 14,
    //% block="1"
    One = 16,
    //% block="2"
    Two = 17,
    //% block="3"
    Three = 18,
    //% block="4"
    Four = 20,
    //% block="5"
    Five = 21,
    //% block="6"
    Six = 22,
    //% block="7"
    Seven = 24,
    //% block="8"
    Eight = 25,
    //% block="9"
    Nine = 26
}

let IR_Val = 0
let leftWheelSpeed = 0
let rightWheelSpeed = 0
let threeWayStateValue = 0
//% weight=100 color=#008C8C block="mCar" blockId="mCar" icon="\uf48b"
namespace mCar {
    let irstate: number;
    let state: number;

    /*
    * 
    * The I2C speed is 100Khz, and the slave address is 0x2f
    * The PWM frequency between the motor and the LED is about 200Hz
    *
    * Read the chip firmware version command: 0x2f + w + DeviceNumber + 0x2f + R 
    * DeviceNumber: 0=firmware version
    * Return: 0-255
    * 
    * Calibrate motor speed command: 0x2f + w + DeviceNumber + Speed + Offset
    * DeviceNumber: 1=LeftMotor, 2=RightMotor
    * Speed: 30, 60, 90
    * Offset: 0-20, 0-10 map 0-10, 11-20 map -1 - -10
    * 
    * Set the motor speed command: 0x2f + w + DeviceNumber + Speed
    * DeviceNumber: 3=LeftMotor, 4=RightMotor
    * Speed: 0--100, motor reverse speed, from small to large; 
    *       101--201, motor forward speed, from small to large (mapped to 0-100)
    * 
    * Set LED brightness command: 0x2f + w + DeviceNumber + RData + GData + BData 
    * DeviceNumber: 5=LeftRgbLed, 6=RightRgbLed
    * RData: 0-255; GData: 0-255; BData: 0-255
    * 
    * Set the servo motor command: 0x2f + w + DeviceNumber + + Type + Degree 
    * DeviceNumber: 7=ServoS1, 8=ServoS2, 9=ServoS3
    * Type: 1=90servo; 2=180servo; 3=360servo
    * Degree: 0-360
    * 
    * Read battery level command: 0x2f + w + DeviceNumber + 0x2f + R 
    * DeviceNumber: 10=battery
    * Return: 0-100 map 0-100%
    */
    let i2cAddr: number = 0x2F;


    /**
    * Set the speed and direction of the wheels
    */
    //% group="Wheels"
    //% block="set %wheel speed %speed\\%, %direction"
    //% speed.min=0 speed.max=100
    //% weight=380
    export function setWheelSpeedDir(wheel: mCarWheels, speed: number, direction: wheelDir): void {
        let i2cBuffer = pins.createBuffer(2)
        
        if (wheel == mCarWheels.LeftWheel || wheel == mCarWheels.AllWheel) {
            leftWheelSpeed = speed;
            i2cBuffer[0] = 0x03;
            if(direction == wheelDir.CW)
                i2cBuffer[1] = leftWheelSpeed;
            else if (direction == wheelDir.CCW)
                i2cBuffer[1] = leftWheelSpeed + 101;
            pins.i2cWriteBuffer(i2cAddr, i2cBuffer);
        }
        if (wheel == mCarWheels.RightWheel || wheel == mCarWheels.AllWheel) {
            rightWheelSpeed = speed;
            i2cBuffer[0] = 0x04;
            if(direction == wheelDir.CW)
                i2cBuffer[1] = rightWheelSpeed;
            else if (direction == wheelDir.CCW)
                i2cBuffer[1] = rightWheelSpeed + 101;
            pins.i2cWriteBuffer(i2cAddr, i2cBuffer)
        }
    }


    /*
     * wheels stop
     */
    //% group="Wheels"
    //% weight=370
    //%block="set %Wheel to stop"
    export function wheelStop(wheel: mCarWheels): void {
        let i2cBuffer = pins.createBuffer(2)

        if (wheel == mCarWheels.LeftWheel || wheel == mCarWheels.AllWheel) {
            leftWheelSpeed = 0;
            i2cBuffer[0] = 0x03;
            i2cBuffer[1] = leftWheelSpeed; 
            pins.i2cWriteBuffer(i2cAddr, i2cBuffer)
        }
        if (wheel == mCarWheels.RightWheel || wheel == mCarWheels.AllWheel) {
            rightWheelSpeed = 0;
            i2cBuffer[0] = 0x04;
            i2cBuffer[1] = rightWheelSpeed;
            pins.i2cWriteBuffer(i2cAddr, i2cBuffer)
        }
    }


    /*
     * Wheels speed calibration
     */
    //% group="Wheels"
    //% weight=360
    //%block="Wheels speed offset: %offset1, %offset2, %offset3"
    //% offset1.min=-10 offset1.max=10
    //% offset2.min=-10 offset2.max=10
    //% offset3.min=-10 offset3.max=10
    export function wheelsAdjustment(offset1: number, offset2: number, offset3: number): void {
        let buffer = pins.createBuffer(3)
        
        buffer[0] = 0x01;
        buffer[1] = 30;
        buffer[2] = offset1 > 0 ? offset1 : 10 - offset1;
        pins.i2cWriteBuffer(i2cAddr, buffer)
        basic.pause(1000);
        
        buffer[0] = 0x01;
        buffer[1] = 60;
        buffer[2] = offset2 > 0 ? offset2 : 10 - offset2;
        pins.i2cWriteBuffer(i2cAddr, buffer)
        basic.pause(1000);
        
        buffer[0] = 0x01;
        buffer[1] = 90;
        buffer[2] = offset3 > 0 ? offset3 : 10 - offset3;
        pins.i2cWriteBuffer(i2cAddr, buffer)
        basic.pause(1000);

        wheelStop(mCarWheels.AllWheel);
    }


    /**
     * Set car direction
     */
    //% group="Car"
    //% weight=340
    //%block="Car go %direction, speed: %speed\\%"
    //% speed.min=0 speed.max=100
    export function carDir(direction : mCarDir, speed: number): void {
        let i2cBuffer = pins.createBuffer(2)
        leftWheelSpeed = speed;
        rightWheelSpeed = speed;

        if (direction == mCarDir.FW) {
            i2cBuffer[0] = 0x03;
            i2cBuffer[1] = leftWheelSpeed;
            pins.i2cWriteBuffer(i2cAddr, i2cBuffer)

            i2cBuffer[0] = 0x04;
            i2cBuffer[1] = rightWheelSpeed;
            pins.i2cWriteBuffer(i2cAddr, i2cBuffer)
        }
        else if (direction == mCarDir.BW) {
            i2cBuffer[0] = 0x03;
            i2cBuffer[1] = leftWheelSpeed + 101;
            pins.i2cWriteBuffer(i2cAddr, i2cBuffer)
    
            i2cBuffer[0] = 0x04;
            i2cBuffer[1] = rightWheelSpeed + 101;
            pins.i2cWriteBuffer(i2cAddr, i2cBuffer)
        }
    }


    /**
     * Car turn
     */
    //% group="Car"
    //% weight=320
    //%block="Car turn %direction, turn rate: %percent\\%, speed: %speed\\%"
    //% percent.min=0 r.max=100
    //% speed.min=0 speed.max=100
    export function carTurn(direction: mCarTurn, percent: number, speed: number): void {
        let i2cBuffer = pins.createBuffer(2);
        leftWheelSpeed = speed;
        rightWheelSpeed = speed;
    
        if (direction == mCarTurn.Left) {
            i2cBuffer[0] = 0x03;
            i2cBuffer[1] = leftWheelSpeed - (leftWheelSpeed*(percent/100));
            pins.i2cWriteBuffer(i2cAddr, i2cBuffer)

            i2cBuffer[0] = 0x04;
            i2cBuffer[1] = rightWheelSpeed;
            pins.i2cWriteBuffer(i2cAddr, i2cBuffer)
        }
        else if (direction == mCarTurn.Right) {
            i2cBuffer[0] = 0x03;
            i2cBuffer[1] = leftWheelSpeed;
            pins.i2cWriteBuffer(i2cAddr, i2cBuffer)
    
            i2cBuffer[0] = 0x04;
            i2cBuffer[1] = rightWheelSpeed - (rightWheelSpeed*(rightWheelSpeed/100));
            pins.i2cWriteBuffer(i2cAddr, i2cBuffer)
        }
    }


    /**
     * Car turn at place
     */
    //% group="Car"
    //% weight=320
    //%block="Car turn %direction at place, speed: %speed//%"
    //% speed.min=0 speed.max=100
    export function carTurnPlace(direction : mCarTurn, speed: number): void {
        let i2cBuffer = pins.createBuffer(2)
        leftWheelSpeed = speed;
        rightWheelSpeed = speed;

        if (direction == mCarTurn.Left) {
            i2cBuffer[0] = 0x03;
            i2cBuffer[1] = leftWheelSpeed;
            pins.i2cWriteBuffer(i2cAddr, i2cBuffer)

            i2cBuffer[0] = 0x04;
            i2cBuffer[1] = rightWheelSpeed + 101;
            pins.i2cWriteBuffer(i2cAddr, i2cBuffer)
        }
        else if (direction == mCarTurn.Right) {
            i2cBuffer[0] = 0x03;
            i2cBuffer[1] = leftWheelSpeed + 101;
            pins.i2cWriteBuffer(i2cAddr, i2cBuffer)
    
            i2cBuffer[0] = 0x04;
            i2cBuffer[1] = rightWheelSpeed;
            pins.i2cWriteBuffer(i2cAddr, i2cBuffer)
        }
    }


    /*
     * The car stopped
     */
    //% group="Car"
    //% weight=310
    //%block="Car stop"
    export function carStop(): void {
        let i2cBuffer = pins.createBuffer(2)
        leftWheelSpeed = 0;
        rightWheelSpeed = 0;

        i2cBuffer[0] = 0x03;
        i2cBuffer[1] = leftWheelSpeed;
        pins.i2cWriteBuffer(i2cAddr, i2cBuffer)

        i2cBuffer[0] = 0x04;
        i2cBuffer[1] = rightWheelSpeed;
        pins.i2cWriteBuffer(i2cAddr, i2cBuffer)
    }


    /**
    * set LED headlights.
    */
    //% group="RGB LED headlights"
    //% block="set RGB LED headlights %mCarRGBLight color to $color"
    //% color.shadow="colorNumberPicker"
    //% weight=300
    export function rgbLight(light: mCarRGBLight, color: number) {
        let r: number, g: number, b: number = 0
        let buf = pins.createBuffer(4)
        r = color >> 16
        g = (color >> 8) & 0xFF
        b = color & 0xFF

        if(light == mCarRGBLight.RGBL)
            buf[0] = 0x05;
        if(light == mCarRGBLight.RGBR)
            buf[0] = 0x06;
        buf[1] = r;
        buf[2] = g;
        buf[3] = b;
        pins.i2cWriteBuffer(i2cAddr, buf)
    }


    /**
    * select a headlights and set the RGB color.
    * @param R R color value of RGB color, eg: 0
    * @param G G color value of RGB color, eg: 128
    * @param B B color value of RGB color, eg: 255
    */
    //% group="RGB LED headlights"
    //% inlineInputMode=inline
    //% blockId=RGB block="set RGB LED headlights %mCarRGBLight color to R:%r G:%g B:%b"
    //% r.min=0 r.max=255
    //% g.min=0 g.max=255
    //% b.min=0 b.max=255
    //% weight=290
    export function singleHeadlights(light: mCarRGBLight, r: number, g: number, b: number): void {
        let buf = pins.createBuffer(4);
        if (light == mCarRGBLight.RGBL || light == mCarRGBLight.RGBA) {
            buf[0] = 0x05;
            buf[1] = r;
            buf[2] = g;
            buf[3] = b;
            pins.i2cWriteBuffer(i2cAddr, buf);
        }
        if (light == mCarRGBLight.RGBR || light == mCarRGBLight.RGBA) {
            buf[0] = 0x06;
            buf[1] = r;
            buf[2] = g;
            buf[3] = b;
            pins.i2cWriteBuffer(i2cAddr, buf);
        } 
    }


    /**
    * turn off all the LED lights
    */
    //% group="RGB LED headlights"
    //% block="Turn off all RGB LED headlights"
    //% weight=280
    export function turnOffAllHeadlights(): void {
        let buf = pins.createBuffer(4);

        buf[0] = 0x05;
        buf[1] = 0;
        buf[2] = 0;
        buf[3] = 0;
        pins.i2cWriteBuffer(i2cAddr, buf);

        buf[0] = 0x06;
        buf[1] = 0;
        buf[2] = 0;
        buf[3] = 0;
        pins.i2cWriteBuffer(i2cAddr, buf);
    }


    /**
    * get a status value of the 3-way line following sensor
    */
    //% group="Tracking sensor"
    //% weight=270
    //% block="Get the status value of the 3-way line sensor"
    export function trackbitStateValue() {
        let channel1 = 0, channel2 = 0, channel3 = 0;

        channel1 = pins.digitalReadPin(DigitalPin.P14);
        channel2 = pins.digitalReadPin(DigitalPin.P15);
        channel3 = pins.digitalReadPin(DigitalPin.P16);
        threeWayStateValue = channel1 + (channel2 << 1) + (channel3 << 2);
    }


    /**
    * get Grayscale Sensor State
    */
    //% group="Tracking sensor"
    //% weight=260
    //%block="tracking sensor state is %TrackbitStateType"
    export function getGrayscaleSensorState(state: TrackbitStateType): boolean {
        return threeWayStateValue == state
    }
    
    /**
    * check whether the channel is online
    */
    //% group="Tracking sensor"
    //% weight=240
    //% block="channel %TrackbitChannel tracking sensor %TrackbitType"
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
    //% blockId=ultrasonic block="sonar sensor unit %SonarUnit"
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


    //% shim=IRV2::irCode
    function irCode(): number {
        return 0;
    }

    //% group="Infrared sensor"
    //% weight=160
    //% block="on IR receiving"
    export function irCallback(handler: () => void) {
        pins.setPull(DigitalPin.P9, PinPullMode.PullUp)
        control.onEvent(98, 3500, handler)
        control.inBackground(() => {
            while (true) {
                IR_Val = irCode()
                if (IR_Val != 0xff00) {
                    control.raiseEvent(98, 3500, EventCreationMode.CreateAndFire)
                }
                basic.pause(20)
            }
        })
    }

    /**
     * get IR value
     */
    //% group="Infrared sensor"
    //% block="IR button %mCarIRButtons is pressed"
    //% weight=150
    export function irButton(Button: mCarIRButtons): boolean {
        return (IR_Val & 0x00ff) == Button
    }


    /**
     * servo control module
     */
    //% group="Expansion port"
    //% weight=120
    //% block="set %ServoType servo %mCarServoIndex angel to %angle°"
    export function extendServoControl(servotype: ServoType, index: mCarServoIndex, angle: number): void {
        let angleMap: number
        if (servotype == ServoType.Servo90) {
            angleMap = Math.map(angle, 0, 90, 0, 180);
        }

        if (servotype == ServoType.Servo180) {
            angleMap = Math.map(angle, 0, 180, 0, 180);
        }

        if (servotype == ServoType.Servo270) {
            angleMap = Math.map(angle, 0, 270, 0, 180);
        }

        let buf = pins.createBuffer(3)
        if(index == mCarServoIndex.S1)
            buf[0] = 0x07;
        else if (index == mCarServoIndex.S2)
            buf[0] = 0x08;
        else if (index == mCarServoIndex.S3)
            buf[0] = 0x09;
        buf[1] = servotype;
        buf[2] = angle;
        pins.i2cWriteBuffer(i2cAddr, buf);
    }

    /**
     * continuous servo control
     */
    //% group="Expansion port"
    //% weight=110
    //% block="set continuous servo %mCarServoIndex speed to %speed\\%"
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
    //% block="Read the battery level"
    export function batteryLevel() : number {
        let i2cBuffer = pins.createBuffer(1);
        i2cBuffer[0] = 0x0A;
        pins.i2cWriteBuffer(i2cAddr, i2cBuffer);

        let batLevel = pins.i2cReadNumber(i2cAddr, NumberFormat.UInt8LE, false);
        return batLevel;
    }


    /**
    * read version number
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