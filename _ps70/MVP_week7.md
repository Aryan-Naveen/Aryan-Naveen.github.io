---
title: "Week 7: FoldX MVP prototype"
collection: ps70
permalink: /ps70/week7
links_to_website: "/ps70/week7"
links_to_video: ""
links_to_code: ""
image: "fold.gif"
year: "2025"
include_on_website: true
excerpt: ""
---

## Assignment Description
For this week's assignment, we were tasked with creating a Minimum Viable Product (MVP) that tackles the most challenging or intimidating aspect of our final project. In my case, this meant addressing the core functionality of my clothes folding robot project.

## MVP Implementation
For my MVP, I focused on two critical aspects of the clothes folding robot:

### 1. Actuation System Design
The primary focus was on designing and implementing the actuation method for the folding mechanism. Key features include:
- Developed a double linkage system for precise folding movements
- Conducted extensive experimentation with various linkage ratios to optimize:
  - Rotation degrees
  - Torque requirements
  - Movement precision
- Fine-tuned the placement of linkages to achieve desired folding patterns

### 2. Basic Fold Sequencing
Implemented a fundamental sequencing system for the folding operations:
- Programmed basic fold patterns
- Established timing between different folding movements
- Created a simple control system for fold coordination

<div style="display: flex; justify-content: space-between; gap: 20px;">
    <div style="flex: 1; text-align: center;">
        <p><strong>Final Fold Sequence</strong></p>
        <img src="/images/ps70/fold.gif" alt="Folding Sequence Demo" style="width: 100%; height: auto;">
    </div>
    <div style="flex: 1; text-align: center;">
        <p><strong>Linkage Prototype</strong></p>
        <img src="/images/ps70/prototype.gif" alt="Linkage Prototype Demo" style="width: 100%; height: auto;">
    </div>
</div>

Below is the implementation of the control system for the folding mechanism:

<details markdown="1">
<summary>Click to see the control code</summary>

```cpp
#include <ESP32Servo.h>

class FoldController {
    public:
        Servo servo;
        int restPos;
        int foldPos;
        bool folded;
        
        FoldController(int r, int f, int pin) {
            restPos = r;
            foldPos = f;

            servo.setPeriodHertz(50);
            servo.attach(pin, 500, 2400);
            servo.write(restPos);
        }

        void reset() {
            servo.write(restPos);
        }

        void fold() {
            this->servo.write(foldPos);
            delay(400);
            this->servo.write(restPos);
            delay(200);
        } 
};

class Button {
    public:
        int pinIn;
        int lastVal;
        int currVal;

        Button(int pin) {
            pinIn = pin;
        }

        void init() {
            pinMode(pinIn, INPUT_PULLUP);
            lastVal = digitalRead(pinIn);
        }

        bool wasPressed() {
            currVal = digitalRead(pinIn);
            bool pressed = (lastVal == LOW && currVal == HIGH);
            lastVal = currVal;
            return pressed;
        }
};

// Pin definitions
int leftPin = 32;
int rightPin = 26;
int centralPin = 25;
int buttonPin = 33;

// Initialize controllers
FoldController left_flap(180, 0, leftPin);
FoldController right_flap(0, 150, rightPin);
FoldController middle_flap(180, 100, centralPin);
Button button(buttonPin);

void setup() {
    // Initialize timers for servo control
    ESP32PWM::allocateTimer(0);
    ESP32PWM::allocateTimer(1);
    ESP32PWM::allocateTimer(2);
    ESP32PWM::allocateTimer(3);
    
    // Initialize components
    button.init();
    left_flap.reset();
    right_flap.reset();
    middle_flap.reset();
}

void loop() {
    if (button.wasPressed()) {
        left_flap.fold();
        right_flap.fold();
        middle_flap.fold();
    }
}
```
</details>

## Input/Output System
The current implementation uses a straightforward control mechanism:
- **Input**: Simple button interface
- **Output**: Automated sequence of folding movements
- Basic user interaction for initiating the folding process

## Next Steps and Improvements

### 1. Scaling Up
- Increase the size of the mechanism to handle larger clothing items
- Upgrade to higher torque servos for more robust operation
- Optimize the mechanism for different clothing sizes and types

### 2. Material Improvements
Focus on two key aspects:
- **Durability**:
  - Select materials that can withstand repeated use
  - Implement robust mechanical connections (currently using glue and finger joints for rigid connections and link joints are with small screws and washers) 
  - Design for long-term reliability
- **Aesthetics**:
  - Choose visually appealing materials
  - Create a professional finish
  - Develop a cohesive design language

### 3. Drawer Interface System
Design an integrated storage solution that will:
- Automatically dispense folded clothes into a custom container
- Create a modular container system that fits standard drawer dimensions
- Implement a smooth transition from folding mechanism to storage
- Design containers that can easily slide into existing dresser drawers
- Develop a system for organizing different types of clothing
