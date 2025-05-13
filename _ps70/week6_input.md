---
title: "Week 6: Sensor Input and Calibration"
collection: ps70
permalink: /ps70/week6
links_to_website: "/ps70/week6"
links_to_video: ""
links_to_code: ""
image: "capacitive_sensor.jpg"
year: "2025"
include_on_website: true
excerpt: ""
---

## Assignment Overview

This week's tasks involved creating and configuring sensors to measure physical quantities using a microcontroller. The focus was on avoiding the `delay()` function and utilizing timers, as well as employing C++ class structures.

## Capacitive Sensor Design

- **Setup:** I used two pieces of copper separated by a piece of velostat for the capacitive sensor. This setup is shown in the image below:

  ![Capacitive Sensor Setup](/images/publications/capacitive_sensor.jpg)

- **Functionality:** I connected one side to a pin for digital writing and read the difference from the other pin, similar to tx-rx sensing as outlined [here](https://nathanmelenbrink.github.io/lab/input/capacitance/txrx.html).

- **Schematic:** The schematic for the sensor setup is shown below:

  ![Sensor Schematic](/images/publications/simple_sensor_schematic.jpg)

- **Calibration:** I calibrated the sensor using the number of nuts as a unit of measurement, with the experiment setup shown below where essentially I used number of nuts as the weight:

  ![Calibration Setup](/images/publications/IMG_1083.jpg)

  The results indicate an exponential decrease in readings with larger weights, aligning with the expected behavior of tx-rx sensors because the difference between the input signal and output signal decreases as the pieces of copper become closer together.

  | Number of M2 Washers | Reading |
  |----------------------|---------|
  | 0                    | 47000   |
  | 1                    | 46000   |
  | 2                    | 45000   |
  | 3                    | 43000   |
  | 4                    | 32000   |
  | 5                    | 17000   |

## Thermistor Setup

- **Circuit:** I followed the wiring instructions from class for the thermistor setup. The circuit is depicted in the image below:

  ![Thermistor Circuit](/images/publications/thermistor_circuit.jpg)

## CNC Preparation

- **CAD Files:** Prepared CAD files for CNC week, considering both 2D DXF files for routing sheet material and 3D STL files for milling 2.5D shapes.
