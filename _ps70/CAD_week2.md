---
title: "Week 2: 2D Design & Cutting"
collection: ps70
permalink: /ps70/week2
links_to_website: "/ps70/week2"
links_to_video: ""
links_to_code: ""
image: "box.jpg"
year: "2024"
include_on_website: true
excerpt: ""
---


Finger-Joint Storage Design
======

We were tasked with designing a ''simple'' box that will contain our electronics for the remaining of the semester. 
I took this as an opportunity to practice full parametric design practices. In particular, I rigorously tested that modified my
defined parameters yielded valid box designs that can easily be exported and cut on the laser cutter. Below I have included various configurations and the resulting box.



<div class="tabs">
  <button class="tablink" onclick="openTab(event, 'Tab1')">Parameterized Model 1</button>
  <button class="tablink" onclick="openTab(event, 'Tab2')">Parameterized Model 2</button>
  <button class="tablink" onclick="openTab(event, 'Tab3')">Parameterized Model 3</button>

  <div id="Tab1" class="tabcontent">
    <img src="/images/ps70/box_model1.png" alt="Resulting Box Design for Tab 1." />
    <table border="1" style="width:100%; margin-bottom: 20px;">
      <tr>
        <th>Parameters</th>
        <th>Values</th>
      </tr>
      <tr>
        <td>Box Length</td>
        <td>200 mm</td>
      </tr>
      <tr>
        <td>Box Width</td>
        <td>150 mm</td>
      </tr>
      <tr>
        <td>Box Height</td>
        <td>120 mm</td>
      </tr>
      <tr>
        <td>Width Number of Fingers</td>
        <td>5</td>
      </tr>
      <tr>
        <td>Length Number of Fingers</td>
        <td>6</td>
      </tr>
      <tr>
        <td>Width Number of Fingers</td>
        <td>3</td>
      </tr>
    </table>
  </div>

  <div id="Tab2" class="tabcontent">
    <img src="/images/ps70/box_model2.png" alt="Resulting Box Design for Tab 2." />
    <table border="1" style="width:100%; margin-bottom: 20px;">
     <tr>
       <th>Parameters</th>
       <th>Values</th>
     </tr>
     <tr>
       <td>Box Length</td>
       <td>100 mm</td>
     </tr>
     <tr>
       <td>Box Width</td>
       <td>180 mm</td>
     </tr>
     <tr>
       <td>Box Height</td>
       <td>80 mm</td>
     </tr>
     <tr>
       <td>Width Number of Fingers</td>
       <td>10</td>
     </tr>
     <tr>
       <td>Length Number of Fingers</td>
       <td>8</td>
     </tr>
     <tr>
       <td>Height Number of Fingers</td>
       <td>5</td>
     </tr>    </table>
  </div>

  <div id="Tab3" class="tabcontent">
    <img src="/images/ps70/box_model3.png" alt="Resulting Box Design for Tab 3." />
    <table border="1" style="width:100%; margin-bottom: 20px;">
     <tr>
       <th>Parameters</th>
       <th>Values</th>
     </tr>
     <tr>
       <td>Box Length</td>
       <td>100 mm</td>
     </tr>
     <tr>
       <td>Box Width</td>
       <td>180 mm</td>
     </tr>
     <tr>
       <td>Box Height</td>
       <td>80 mm</td>
    </tr>
    <tr>
       <td>Width Number of Fingers</td>
       <td>3</td>
     </tr>
     <tr>
       <td>Length Number of Fingers</td>
       <td>4</td>
     </tr>
     <tr>
       <td>Height Number of Fingers</td>
       <td>2</td>
     </tr>
    </table>
  </div>
</div>

I finally cut the box described by the parameters in tab 1. The resulting box is shown below.

![Resulting Box Design for Tab 1.](/images/ps70/box.jpg)

Fusion 360 Tutorial
======

Followed the LEGO tutorial on Fusion 360 and created the following models [Visit Google](https://www.google.com).
![Tutorial Design Lego Brick.](/images/ps70/lego_brick_tutorial.png)



Household Object CAD Practice
======
<table border="1" style="width:100%; margin-bottom: 20px;">
    <tr>
    <th style="width:50%">Reference Objects</th>
    <th style="width:50%">Fusion 360 Objects</th>
    </tr>
    <tr>
    <td><img src="/images/ps70/bottle.jpg" style="width:100%; height:auto;" /></td>
    <td><img src="/images/ps70/water_bottle.png" style="width:100%; height:auto;"/></td>
    </tr>
    <tr>
    <td><img src="/images/ps70/plug.jpg" style="width:100%; height:auto;" /></td>
    <td><img src="/images/ps70/plugin_brick.png" style="width:100%; height:auto;" /></td>
    </tr>
</table>


<style>
.tabs {
  display: block;
  text-align: center;
  margin: 0 auto;
}

.tabcontent {
  display: none;
  margin: 0 auto;
  text-align: center;
}

.tablink {
  background-color: #f1f1f1;
  color: black;
  padding: 10px 20px;
  cursor: pointer;
  border: none;
  outline: none;
  transition: 0.3s;
  display: inline-block;
  margin: 5px;
}

.tablink:hover {
  background-color: #ddd;
}

.tablink.active {
  background-color: #ccc;
}
</style>

<script>
function openTab(evt, tabName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}

document.addEventListener("DOMContentLoaded", function() {
  document.querySelector(".tablink").click();
});
</script>
