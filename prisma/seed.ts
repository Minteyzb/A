import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

const projects = [
  { slug: "air-pollution-water-quality-monitor", title: "Air Pollution and Water Quality Monitoring and Alerting System", imageUrl: "/images/pcb-iot-sensor.jpg", tags: ["IoT", "ESP8266", "PT100", "DHT22"],
    summary: "My senior project: real-time monitoring and alerts for industrial wastewater and workplace air.",
    body: "The system monitors air pollution in work areas and the quality of industrial wastewater, and alerts stakeholders in real time so people can act before conditions become unsafe.\n\nThe sensor board combines an ESP8266 module, a DHT22 temperature and humidity sensor and a PT100 temperature front end, laid out in Altium Designer." },
  { slug: "anfis-oven-temperature-controller", title: "ANFIS-Based Temperature Controller for an Oven Machine", imageUrl: null, tags: ["MATLAB", "ANFIS", "Control"],
    summary: "Intern project at Two Brothers Food Complex: an adaptive fuzzy controller to make oven temperature more accurate.",
    body: "During my internship I designed a new control mechanism for the company's oven machine, based on an adaptive neuro-fuzzy inference system (ANFIS), with the goal of increasing the accuracy of temperature control." },
  { slug: "diesel-generator-control-panel", title: "Diesel Generator Control Panel Trainer", imageUrl: "/images/generator-panel.jpg", tags: ["Arduino", "Relays", "Control panel"],
    summary: "A hands-on trainer panel with start, stop, emergency stop, oil pressure and temperature trips.",
    body: "A printed generator panel fitted with start, stop and emergency-stop switches, oil pressure and temperature simulation knobs, a reset button, indicator lamps and an LCD, driven by Arduino boards and relays." },
  { slug: "48-robot-controller-pcb", title: "48-Robot Controller Board", imageUrl: "/images/pcb-48-robot.jpg", tags: ["Altium", "ESP32", "Relays"],
    summary: "A custom control PCB with an ESP module, relay outputs, motor terminals, buzzer and power stage.",
    body: "A two-layer board designed in Altium Designer with an ESP module, relay output stage, screw terminals for motors and a power input section, advised by Miya." },
  { slug: "stm32-turning-card", title: "STM32 Turning Card PCB", imageUrl: "/images/pcb-turning-card.jpg", tags: ["Altium", "STM32"],
    summary: "A compact Altium board with a switch, diodes, a transistor driver and status LED.",
    body: "A small control card laid out in Altium Designer with through-hole and SMD parts, a driver transistor, protection diodes and a status LED." },
  { slug: "esp-iot-board-kicad", title: "ESP Wi-Fi Board with microSD and USB-C", imageUrl: "/images/pcb-kicad.jpg", tags: ["KiCad", "ESP", "USB-C"],
    summary: "A KiCad design with a Wi-Fi module, microSD slot, USB-C input and sensor headers.",
    body: "A compact board designed in KiCad with a Wi-Fi module, microSD card slot, USB-C power and data, voltage regulation and expansion headers." },
];

async function main() {
  for (const p of projects) await db.project.upsert({ where: { slug: p.slug }, update: {}, create: p });
  await db.post.upsert({
    where: { slug: "welcome" }, update: {},
    create: { slug: "welcome", title: "Welcome to my site", summary: "What you'll find here and what I'm working on.",
      body: "This is where I'll write about circuits, control systems and the software around them.\n\nSign in as admin to publish your own posts, with pictures and video." },
  });
}
main().finally(() => db.$disconnect());
