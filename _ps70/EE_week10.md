---
title: "Week 10: Multi-Color Drawing Machine"
collection: ps70
permalink: /ps70/week10
links_to_website: "/ps70/week10"
links_to_video: ""
links_to_code: ""
image: "ee.gif"
year: "2024"
include_on_website: true
excerpt: ""
---

Team: Kamryn Ohly, Zayid Alam, Rain YeYang, Aryan Naveen

## Assignment Description
Work with your team to build a 2+ DoF drawing machine. Your team is encouraged to heavily modify the example hardware and software. At a minimum, you should implement a new end-effector.

Drawing machines will need to demonstrate:
- Ability to calibrate motor position (i.e. guarantee the "home" position is the same each time you power on the device)
- Precision: ability to draw a circle and mark its center point. Calculate percent error.

## Project Overview
Our team developed an innovative drawing machine with two major contributions:
1. A novel end-effector design enabling multi-pen drawing capabilities, allowing users to create artwork with different colors
2. Implementation of a robust homing system using strategically placed limit switches for precise calibration


## Technical Implementation

### 1. End Effector Design
Our innovative end effector design leverages the fact that pens can write effectively at various angles. Key features include:
- Servo-controlled rotation mechanism that positions different pens at precise angles
- Adjustable mounting system to accommodate pens of varying lengths
- Smooth transitions between different pens for multi-color drawings

<div style="text-align: center;">
    <img src="/images/ps70/ee.gif" alt="End Effector Demo" style="width: 100%; max-width: 600px; height: auto;">
    <p><em>Multi-Pen End Effector in Action</em></p>
</div>

### 2. Homing Sequence Implementation
We developed a reliable homing system using limit switches for precise calibration:
- Two strategically placed limit switches:
  1. At the base of the gantry
  2. At the base of the second axis
- Custom-designed components to effectively trigger the limit switches

<div style="text-align: center;">
    <img src="/images/ps70/homing1.jpg" alt="Limit Switch 1" style="width: 30%; display: inline-block;">
    <img src="/images/ps70/homing2.jpg" alt="Limit Switch 2" style="width: 30%; display: inline-block;">
    <p><em>Limit Switch Mounting Locations and Components</em></p>
</div>

<div style="text-align: center;">
    <div style="position: relative; width: 100%; height: 0; padding-bottom: 56.25%;">
        <iframe
            style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
            src="https://drive.google.com/file/d/1d63S-plrpR9yVULQO5kGd3uOuvutxFXU/preview"
            frameborder="0"
            allowfullscreen>
        </iframe>
    </div>
    <p><em>Homing Sequence Test Demonstration</em></p>
</div>

### 3. Position Mapping System
We implemented a sophisticated mapping system that:
- Converts stepper motor positions to precise X,Y coordinates
- Enables complex shape drawing capabilities
- Provides compatibility with G-code and other standard instruction formats

## Code Implementation
Below is the core implementation of our drawing demonstration:

<details markdown="1">
<summary>Click to see the microcontroller code</summary>

```cpp
#include <AccelStepper.h>
#include <ESP32Servo.h>

// Motor 1
#define stepPin1 14
#define dirPin1 12

// Motor 2
#define stepPin2 26
#define dirPin2 27

// Pen Switch
#define penSwitch 5

// Servo Pin
Servo servo;
const int pin = 33;

// Limit switch y-axis
#define Y_AXIS_LIMIT_SWITCH_PIN 18

// x-axis limit switch
#define X_AXIS_LIMIT_SWITCH_PIN 19

// Use driver interface (step + dir)
#define motorInterfaceType 1

// Create stepper instances
AccelStepper stepper1(motorInterfaceType, stepPin1, dirPin1);
AccelStepper stepper2(motorInterfaceType, stepPin2, dirPin2);

// Global target position for both motors
int MAX_X = 25000;
int MAX_Y = 25000;

long x_delta = 5000;
long y_delta = 5000;
long middle_init = MAX_X/2;

class MyClass {
  private:
    // Private member variables
    int privateVar;
    
  public:
    // Constructor
    MyClass();
    
    // Constructor with parameters
    MyClass(int initialValue);
    
    // Public methods
    void setVar(int value);
    int getVar();
    
    // Other public methods
    void doSomething();
};

void setup() {
  Serial.begin(9600);
  // Pen Btn
  pinMode(penSwitch, INPUT_PULLUP);

  // Servo
  ESP32PWM::allocateTimer(0);
  ESP32PWM::allocateTimer(1);
  ESP32PWM::allocateTimer(2);
  ESP32PWM::allocateTimer(3);
  servo.setPeriodHertz(50);
  servo.attach(pin, 500, 2400);

  // Set speed and acceleration for motor 1
  stepper1.setMaxSpeed(3000);      // You can tweak this
  stepper1.setAcceleration(1500);  // And this too

  // Set speed and acceleration for motor 2
  stepper2.setMaxSpeed(1000);
  stepper2.setAcceleration(500);

  // Homing sequence
  pinMode(X_AXIS_LIMIT_SWITCH_PIN, INPUT_PULLUP);
  pinMode(Y_AXIS_LIMIT_SWITCH_PIN, INPUT_PULLUP);
  stepper1.setCurrentPosition(0);
  stepper2.setCurrentPosition(0);
}

bool y_axis_isHome = false;
bool x_axis_isHome = false;


bool isSetUp = false;

void loop() {
  // Ensure that we are home!
  if (!y_axis_isHome || !x_axis_isHome) {
    // Home the y-axis
    if (!y_axis_isHome) {
      if (digitalRead(Y_AXIS_LIMIT_SWITCH_PIN) == LOW)
      {
        // IT HAS REACHED Y HOME
        Serial.println("Y Home!");
        // Now give a bit of space
        stepper2.move(-10);
        stepper2.setCurrentPosition(0);
        y_axis_isHome = true;

      } else {
        Serial.println("Not activated.");
        stepper2.move(400);
        stepper2.runToPosition();
      }
    } else {
      if (!x_axis_isHome) {
        if (digitalRead(X_AXIS_LIMIT_SWITCH_PIN) == LOW)
        {
          // IT HAS REACHED Y HOME
          Serial.println("X Home!");
          // Give a bit of space
          stepper1.move(10);
          stepper1.setCurrentPosition(0);
          x_axis_isHome = true;
        } else {
          Serial.println("Not activated.");
          stepper1.move(-400);
          stepper1.runToPosition();
        }
      }
    }
  } else {
    // Move to middle of the drawing machine
    if (!isSetUp) {
      stepper1.moveTo(middle_init);
      stepper2.moveTo(-1 * middle_init);

      stepper1.runToPosition();
      stepper2.runToPosition();
      isSetUp = true;
    } else {
      // DO A FIGURE 8
      // int pen = digitalRead(penSwitch);

      // // Servo
      // if (pen == 1) {
      //   servo.write(108);
      // } else {
      //   servo.write(90);
      // }

      // // Motor 1: reverse direction at end
      // if (stepper1.distanceToGo() == 0) {
      //   // target1 = -target1;
      //   x_delta = -x_delta;
      //   stepper1.moveTo(middle_init + x_delta);
      // }

      // // Motor 2: same logic
      // if (stepper2.distanceToGo() == 0) {
      //   y_delta = -y_delta;
      //   stepper2.moveTo(-middle_init + y_delta);
      // }
    
      // // Run both motors
      // stepper1.run();
      // stepper2.run();


      // Do a circle!!
      static float theta = 0.0;
      static float radius = 5000; // You can tweak this
      static float stepSize = 0.02; // Smaller = smoother circle

      int pen = digitalRead(penSwitch);
      if (pen == 1) {
        servo.write(108); // Pen down
      } else {
        servo.write(90);  // Pen up
      }

      long x = middle_init + radius * cos(theta);
      long y = -middle_init + radius * sin(theta);

      stepper1.moveTo(x);
      stepper2.moveTo(y);

      stepper1.runToPosition();
      stepper2.runToPosition();

      theta += stepSize;
      if (theta >= 2 * PI) {
        theta = 0.0;
      }
    }
  }
}
```
</details>

## Final Demonstration
<div style="text-align: center;">
    <div style="position: relative; width: 100%; height: 0; padding-bottom: 56.25%;">
        <iframe
            style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
            src="https://drive.google.com/file/d/1gpPcNJMcbtygpBbWk5ljIUFpNKm58gfX/preview"
            frameborder="0"
            allowfullscreen>
        </iframe>
    </div>
    <p><em>Final Drawing Machine Demonstration</em></p>
</div>



