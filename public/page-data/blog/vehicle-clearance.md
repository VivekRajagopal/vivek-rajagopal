# The Bottom Line of Vehicle Clearance

This post is a deviation from my usual. I'll be discussing the aspects of the **Australian Standards for Off-Street Car Parking** (AS 2890.1 - 2004). Namely, the vehicle clearance templates as defined within the standard. The motivation for writing this post came from trying to understand how the template is defined in order to use it accurately and, if necessary, to modify it in a justifiable and reasoned manner.

## There's a standard for this?

Yes really!

There is a standard that defines a *Vehicle Template* that designers use to test vehicle paths for ground clearance. The template is a geometric shape of the under side of a design vehicle. Since real vehicles come in all sorts of shapes and sizes, the standard provides two vehicle templates; the **B85** and **B99** templates. These templates cover a chosen percentage of recorded passenger vehicles sold during a certain time period. For the B85 its 85% of passenger vehicles, and for the B99 it is 99.8%.

These statistics are detailed in the standard itself and there is an added level of conservativeness built into the template definition as a factor of safety and uniformity between the two templates.

## How is the Vehicle Template defined?

The geometry of the vehicle template can be derived from six key parameters;

|      |      |
| ---- | ---- |
| **Front Overhang** | Distance from front wheel center to front of vehicle |
| **Wheel Base** | Distance between front and rear wheel centers |
| **Rear Overhang** | Distance from rear wheel center to rear of vehicle |
| **Clearance Height** | Distance from underside to ground (as a flat line) |
| **Approach Angle** | Max angle of change of the ground the vehicle can enter without scraping |
| **Departure Angle**| Max angle of change of the ground the vehicle can leave without scraping |

Here's a little diagram of all this 🙂

![...](https://firebasestorage.googleapis.com/v0/b/vivekr-2d3dc.appspot.com/o/vehicle-clearance-template.png?alt=media&token=7a6581ed-c833-4037-933a-23b62dd76781)

## What about the wheel radius?

Interestingly, the standard does not define a wheel radius to employ in defining the clearance template. It defines a "knife edge" where the base of the wheels should be. The intention is for the user to place the front and rear knife edges on the test vehicle path surface and see if the template intersects the ground. This allows the template to get unrealistically close to the test surface.

A more realistic vehicle clearance template should define a non-zero, but reasonably conservative, wheel radius. I opt for a wheel radius of 300mm that is conservative and also suitable for the real-life vehicle the B85 and B99 is likely to match.

Choosing a non-zero wheel radius also impacts the derivation of the geometry of the template. The Approach Angle and Departure Angle previous taken from the knife-edge must now be tangent to the wheel. This results in a slightly enlarged template geometry as the approach and departure angle lines are pushed away from the wheel centers.

## Putting it all together

No fun in reading all this if you can't *take it for a ride* right? I built a quick little app with **ReactJS** and **PaperJS** (a great Vector Graphics JS Library). 

Test drive it [here](https://vehicle-clearance.surge.sh) 😉